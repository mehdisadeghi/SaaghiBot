#!env node
/*
 * SaaghiBot
 * Copyright: (c) 2016, 2017, 2018 Mehdi Sadeghi
 * License: MIT
 */
const TelegramBot = require('node-telegram-bot-api')
const khayyam = require('./khayyam.js')
const path = require('path')
const ua = require('universal-analytics')

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
    console.error('TELEGRAM_BOT_TOKEN environment variable not defined.')
    process.exit(1)
}
const bot = new TelegramBot(token, {polling: true})

const helpMessage = `به ساقی‌بات خوش آمدید!

ساقی‌بات یک روبات تلگرام است. اسم خودمانی‌اش ساقی است. کارش اینست که بزم و دل ما را با یک دو بیتی از خیام شاد کند.

ساده‌ترین راه استفاده از ساقی چت کردن با اوست. هر کلمه‌ای که برایش بنویسید، او برایتان یک رباعی از خیام پیدا می‌کند که حاوی آن کلمه باشد.

اما بهترین راه استفاده از ساقی یادکرد (مِنشِن) کردن او در گروه‌هاست.
به محض اینکه ساقی را یاد کنید، او یک رباعی اتفاقی نمایش می‌دهد. اگر کلماتی پس از نامش بنویسید، او یک رباعی با آن کلمات پیشنهاد می‌کند. مثال:
@SaaghiBot زلف
مثالا بالا یک یا چند رباعی لیست می‌کند تا یکی را از میانشان انتخاب کنید.

از این گذشته ساقی [اوپن‌سورس](https://github.com/mehdisadeghi/SaaghiBot) است. [اینجا](https://mehdix.ir/saaghibot-released.html) درباره‌اش نوشته‌ام.

اگر به مدد ساقی نیاز شد /start و /help را اجرا کنید.

خوش باشید
ساقی
.`

const notFoundMessage = `گفتند یافت می‌نشود جسته‌ایم ما
گفت آن کو *یافت می‌نشود* آنم آرزوست
.`

bot.onText(/^[^\/][\S\s]*$/i, (msg, match) => {

    const chatId = msg.chat.id

    if (process.env.UA) {
        let visitor = ua(process.env.UA, msg.from.id+'', {strictCidFormat: false})
        visitor.event('Telegram', 'Chat', msg.text).send()
    }

    let robayis = khayyam.process_query(msg.text)
    if (!robayis || robayis.length == 0) {
        bot.sendMessage(chatId, notFoundMessage, {'parse_mode': 'Markdown'}).catch( error => {
            console.log(JSON.stringify(error))
        })
    } else {
        let index = khayyam.getRandomInt(0, robayis.length)
        bot.sendMessage(chatId, robayis[index].message_text).catch( error => {
          console.log(JSON.stringify(error))
        })
    }
})

bot.on('inline_query', (query) => {

    if (process.env.UA) {
        let visitor = ua(process.env.UA, query.from.id, {strictCidFormat: false})
        visitor.event('Telegram', 'Query', query.query).send()
    }

    // Telegram allows up to 50 results.
    let resp = khayyam.process_query(query.query).slice(0, 50)
    bot.answerInlineQuery(query.id, resp).catch( error => {
        console.log(JSON.stringify(error))
    })
})

bot.onText(/\/help/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    if (process.env.UA) {
        let visitor = ua(process.env.UA, msg.from.id, {strictCidFormat: false})
        visitor.event('Telegram', 'Help').send()
    }

    const chatId = msg.chat.id

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, helpMessage, {'parse_mode': 'Markdown'}).catch( error => {
        console.log(JSON.stringify(error))
    })
})

bot.onText(/\/start/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    if (process.env.UA) {
        let visitor = ua(process.env.UA, msg.from.id, {strictCidFormat: false})
        visitor.event('Telegram', 'Start').send()
    }

    const chatId = msg.chat.id

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, helpMessage, {'parse_mode': 'Markdown'}).catch( error => {
        console.log(JSON.stringify(error))
    })
})
