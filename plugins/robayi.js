var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
var request = require('superagent');
// Promises lib, you can use bluebirs, vow or other.
var vow = require('vow');
var khayyam = require('../khayyam.js');

module.exports = {
  // Match only on commands.
  type: MESSAGE_TYPES.COMMAND,
  weight: 1,
  test: function (info) {
    // Check that the command is `robayi`.
    return info.data.command === '_';
  },
  handler: function (info, bot) {
    "use strict";
    // console.log('Got something: ' + info.data.params);
    // Command `/weather London` has info.data.params = `London`
    var deferred = vow.defer();
    var keywords = info.data.params;
    let robayis = khayyam.process_query({'query': keywords.toString()});
    let result = "";
    if (robayis && robayis.length > 0){
      result = robayis[0];
    }else{
      result = "گفتند یافت می‌نوشد جسته‌ایم ما\nگفت آن کو یافت می‌نشود آنم آرزوست";
    }
    bot.sendMessage(result)
          .then(function (resp) {
            deferred.resolve(resp);
          }, function (reason) {
            deferred.reject(reason);
          });
    return deferred.promise();
  }
};
