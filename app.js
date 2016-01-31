/*
 * SaaghiBot
 * Copyright: (c) 2016 Mehdi Sadeghi
 * License: MIT
 */
var khayyam = require('./khayyam.js');
var path = require('path');
var TelegramBot = require('telegram-bot-node').Bot;
var myBot = new TelegramBot('180954511:AAGETHo5IjovnhPaG_2a6FUT908mm_AMRek', {
	name: 'ساقی',
	polling: true,
  // Folder with plugins.
  plugins: path.resolve(__dirname, './plugins/')
});

// Listen to `message` event for polling.
myBot.on('message', function (msg) {
	myBot.handle(msg);
});

// Listen to `inline_query' event for polling
myBot.on('inline_query', function (query) {
	khayyam.handle_query(myBot, query);
});

// Listen to `chosen_inline_result' for polling
myBot.on('chosen_inline_result', function (chosen_result) {
	console.log('chosen_inline_result received: ' + Object.keys(chosen_result));
	return myBot;
});