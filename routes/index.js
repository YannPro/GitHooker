var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
var util = require('../util');

let emailNotifyAddress = ["275615920@qq.com"]


router.get('/ping', function(req, res, next) {
  let repoName = "测试项目";
  let error = new Error("测试错误");
  let stderr = "测试输出错误";
  let stdout = "测试输出内容";

  util.sendEmailNotify(emailNotifyAddress, `${repoName} 部署出错`, `Project ${repoName} sh Error ${error.message}  过程输出错误 ${stderr}  其他输出  ${stdout}  `, function(err){
    console.log("send Email Nofity " + err);
  });
  res.status(200).send("pong");
});

let scripts ={
  "Test":"/var/www/html/deploy-script/Test-deploy",
  "blog-server":"/var/www/html/deploy-script/blog_server_deploy.sh"
}

router.post('/gitHook', function(req, res, next) {
  console.log(req.body);
  console.log("hhhh")
  try{
    let repoName = req.repository.name;
    console.log('repoName is ' + repoName);
    console.log('scripts[repoName] is ' + scripts[repoName]);
    if (scripts[repoName] != undefined){
      let doRunScripts = scripts[repoName];
      console.log('we are going to deploy this ' + doRunScripts);
      let scriptRun = exec(`sh ${doRunScripts}`,
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                util.sendEmailNotify(emailNotifyAddress, `部署出错`, `Project过程输出错误  `, function(err){
                  console.log("send Email Nofity " + err);
                });
            }
            else{
              // do test
              console.log(` deploy done`);
              util.sendEmailNotify(emailNotifyAddress, `部署成功`, `部署成功`, function(err){
                console.log("send Email Nofity " + err);
              });
            }
        });
    }
    else{
      console.log('ignore - it is undefined ');
    }

  }
  catch (err){
    console.log("catch exception:::::::::::", err)
  }
  res.status(200).send("pong");
});

module.exports = router;
