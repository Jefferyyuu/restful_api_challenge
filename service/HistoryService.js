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
     // try {
     //   historys = await History.find({});
     //   console.log("found historys");
     // } catch (error) {
     //   console.log(error.message);
     // }
     var examples = {};
     examples['application/json'] = {history: historys};
     if (Object.keys(examples).length > 0) {
       resolve(examples[Object.keys(examples)[0]]);
     } else {
       resolve();
     }
   });
 }
