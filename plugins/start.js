var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
//var request = require('superagent');
// Promises lib, you can use bluebirs, vow or other.
var vow = require('vow');
var khayyam = require('../khayyam.js');

module.exports = {
  // Match only on commands.
  type: MESSAGE_TYPES.COMMAND,
  weight: 1,
  test: function (info) {
    // Check that the command is `robayi`.
    return info.data.command === 'start';
  },
  handler: function (info, bot) {
    "use strict";
    // console.log('Got something: ' + info.data.params);
    // Command `/weather London` has info.data.params = `London`
    var deferred = vow.defer();
    var keywords = info.data.params;
    let result = "بهترین راه استفاده از ساقی یادکرد (مِنشِن)\
 کردن او در گروه‌هاست. به محض اینکه ساقی را یاد کنید،";
    result += " او یک رباعی اتفاقی نمایش می‌دهد. اگر کلماتی پس\
 از نامش بنویسید، او یک رباعی با آن کلمات پیشنهاد می‌کند. مثال:";
    result += "\n@SaaghiBot زلف\n\n"
    result += "مثالا بالا چند رباعی با کلمه *زلف* لیست می‌کند تا یکی\
 را از میانشان انتخاب کنید. اگر به مدد ساقی نیاز شد /start و /help را اجرا کنید.\
 \nخوش باشید.\nامضا: ساقی";
    bot.sendMessage(result, {'parse_mode': 'Markdown'})
          .then(function (resp) {
            deferred.resolve(resp);
          }, function (reason) {
            deferred.reject(reason);
          });
    return deferred.promise();
  }
};
