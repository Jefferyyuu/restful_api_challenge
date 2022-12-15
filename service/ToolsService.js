'use strict';
const dns = require('dns');


/**
 * Lookup domain
 * Lookup domain and return all IPv4 addresses
 *
 * domain String Domain name
 * returns model.Query
 **/
exports.lookup_domain = function(domain) {
  return new Promise(function(resolve, reject) {
    dns.lookup("domain", (err, address, family) => {
      if(err) reject(err);
      resolve(address);
    });
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
     var res = {};
     res['application/json'] = {status: isIp4};
     if (Object.keys(res).length > 0) {
       resolve(res[Object.keys(res)[0]]);
     } else {
       resolve();
     }
   });
 }
