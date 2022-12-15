'use strict';


/**
 * Lookup domain
 * Lookup domain and return all IPv4 addresses
 *
 * domain String Domain name
 * returns model.Query
 **/
exports.lookup_domain = function(domain) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Simple IP validation
 * Simple IP valication
 *
 * request Handler.ValidateIPRequest IP to validate
 * returns handler.ValidateIPResponse
 **/
 exports.validate_ip = function(request) {
   return new Promise(function(resolve, reject) {
     var req_string = JSON.stringify(request);
     const obj = JSON.parse(req_string);
     var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
     var isIp4 = false;
     if (obj.ip.match(ipformat)) {
       isIp4 = true;
     }
     var examples = {};
     examples['application/json'] = {status: isIp4};
     if (Object.keys(examples).length > 0) {
       resolve(examples[Object.keys(examples)[0]]);
     } else {
       resolve();
     }
   });
 }
