var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

router.get('/ping', function(req, res, next) {
  res.status(200).send("pong");
});

let scripts ={
  "Test-script":"/var/www/html/deploy-script/Test-deploy",
}

router.post('/gitHook', function(req, res, next) {
  console.log(req.body);
  try{
    let repoName = req.body.repository.name;
    console.log('repoName is ' + repoName);
    console.log('scripts[repoName] is ' + scripts[repoName]);
    if (scripts[repoName] != undefined){
      let doRunScripts = scripts["Test-script"];
      console.log('we are going to deploy this ' + doRunScripts);
      let scriptRun = exec(`sh ${doRunScripts}`,
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    }
    else{
      console.log('ignore - it is undefined ');
    }

  }
  catch (err){

  }
  res.status(200).send("pong");
});

module.exports = router;
