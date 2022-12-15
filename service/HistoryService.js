'use strict';

 const mongoose = require('mongoose');
 const History = require('../models/history.model.js');

 /**
  * List queries
  * List queries
  *
  * returns List
  **/
 exports.queries_history = function() {

   return new Promise(function(resolve, reject) {
     var historys = {};
     try {
       historys = History.find().limit(20);
       console.log("found historys", historys);
     } catch (error) {
       console.log(error.message);
     }
     var res = {};
     res['application/json'] = {history: historys};
     if (Object.keys(res).length > 0) {
       resolve(res[Object.keys(res)[0]]);
     } else {
       resolve();
     }
   });
 }
