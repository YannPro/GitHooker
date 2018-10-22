
var request = require('request');
var Promise = require('promise');
var _ = require('underscore')._;
var configObj = require('./config');
var config = configObj.getConfig();


var sendEmailNotify = exports.sendEmailNotify = function(emails, subject,content, callback) {
  let emailstr = emails.join("#");
  let data = `{"type":"email", "target":"yann849723885@gmail.com#275615920@qq.com", "subject":"${subject}", "content":"${content}"}`;
  let json_obj = JSON.parse(data);
  let url = config.notifyServer +  "/util/notify/add";
  console.log(url, json_obj)
  request({
    json:    true,
    method:  "POST",
    url:     url,
    body:    json_obj
  }, function(error, response, body){
    console.log(body);  
    if (error) {
      callback(error);
    }
    else{
      callback(null);
    }
  });

}
