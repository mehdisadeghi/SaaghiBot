var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
// Promises lib, you can use bluebirs, vow or other.
var vow = require('vow');

module.exports = {
  // Match only on commands.
  type: MESSAGE_TYPES.COMMAND,
  weight: 1,
  test: function (info) {
    // Check that the command is `help`.
    return info.data.command === 'help';
  },
  handler: function (info, bot) {
    "use strict";
    // console.log('Got something: ' + info.data.params);
    // Command `/weather London` has info.data.params = `London`
    var deferred = vow.defer();
    var keywords = info.data.params;
    let result = "بهترین راه استفاده از ساقی یادکرد\
(مِنشِن) کردن او در گروه‌هاست. به محض اینکه ساقی را یاد کنید،";
    result += " او یک رباعی اتفاقی نمایش می‌دهد. اگر کلماتی پس از\
نامش بنویسید، او یک رباعی با آن کلمات پیشنهاد می‌کند. مثال:";
    result += "\n@SaaghiBot زلف\n\n";
    result += "برای دیدن پیام آغازین ساقی /start را وارد کنید.\n\n";
    result += "دیگر اینکه ساقی یک برنامه‌ی اوپن سورس است. کد آنرا می‌توانید روی گیت‌هاب ببینید. \
اگر به مشکلی برخورد کردید یا ایده‌ای داشتید لطفا آنرا\
[ روی گیت‌هاب](https://github.com/mehdisadeghi/SaaghiBot) گزارش کنید";
    result += " یا \
[در وبسایت ساقی](mehdix.ir/projects/SaaghiBot) کامنت بگذارید.";

    result += " در غیر اینصورت به ساقی ایمیل بزنید: saaghibot@mehdix.ir.";
    //result += " خوش باشید.\nامضا: ساقی";
    bot.sendMessage(result, {'parse_mode': 'Markdown',
                             'disable_web_page_preview': true})
          .then(function (resp) {
            deferred.resolve(resp);
          }, function (reason) {
            deferred.reject(reason);
          });
    return deferred.promise();
  }
};
