var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
// Promises lib, you can use bluebirs, vow or other.
var vow = require('vow');
var khayyam = require('../khayyam.js');

module.exports = {
  // Match only on commands.
  type: MESSAGE_TYPES.COMMAND,
  weight: 1,
  test: function (info) {
    // Check that the command is `_`.
    return info.data.command === '_';
  },
  handler: function (info, bot) {
    "use strict";
    // console.log('Robayi.js got something: ' +\
    // info.message.text + ' from user: ' + info.message.from.username);
    // Command `/weather London` has info.data.params = `London`
    var deferred = vow.defer();
    var keywords = info.data.params;
    let robayis = khayyam.process_query({'query': keywords});
    let result = "";
    if (robayis && robayis.length > 0){
      let index = khayyam.getRandomInt(0, robayis.length);
      result = robayis[index].message_text;
    }else{
      result = "گفتند یافت می‌نشود جسته‌ایم ما\nگفت آن کو *یافت می‌نشود* آنم آرزوست";
    }
    bot.sendMessage(result, {'parse_mode': 'Markdown'})
          .then(function (resp) {
            deferred.resolve(resp);
          }, function (reason) {
            deferred.reject(reason);
          });
    return deferred.promise();
  }
};
