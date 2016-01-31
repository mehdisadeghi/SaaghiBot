/*
 * This file is part of SaaghiBot
 * Copyright: (c) 2016 Mehdi Sadeghi
 * License: MIT
 */
var yaml = require('yamljs');
 
// Load yaml file using YAML.load 
var khayyam = yaml.load('omarkhayyam_list.yaml');

// Number of quatrains
var count = Object.keys(khayyam.RUBAIYAT).length;

/**
 * @class
 * @name DocumentAnalyzer
 * @static
 * @implements {IAnalyzer}
 */
 module.exports = {
    handle_query: function (bot, query) {
        "use strict";
        let results = process_query(query);

        // Zero cache time if no query is provided, otherwise default value (300)
        let cache_time = query.query.length === 0 ? 0 : 300;

        bot.answerInlineQuery (
            query.id,
            results,
            {'next_offset': 0,
            'cache_time': cache_time});
        return bot;
    },
    process_query: process_query,
    getRandomInt: getRandomInt,
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Convert an Arabic numeral into its hindu-arabic representation.
function convertToHinduArabic(number) {
    "use strict";
    number = number.toString();
    var map = {'0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'};
    let result = [];
    for (let i = 0; i < number.length; i++) {
        result.push ( map[number[i]] || number[i]);
    }
    return result.join('');
}


function process_query(query){
    "use strict";
    let results = [];
    // If no query is provided show a randome quatrain
    if (!query.query) {
        let randomInt = getRandomInt(1, count);
        let robayiDict = khayyam.RUBAIYAT[randomInt];
        let title = 'رباعی شماره ' + convertToHinduArabic(randomInt);
        let robayiText = robayiDict.A + '\n' + robayiDict.B + '\n' + robayiDict.C + '\n' + robayiDict.D;
        results.push(
            {'type': 'article',
            'id': randomInt.toString(),
            'title': title,
            'message_text': robayiText,
            'parse_mode': 'Markdown',
            'url': 'http://mehdix.ir/projects/SaaghiBot/',
            'hide_url': true,
            'description': robayiText});
    }
    else {
        let searchTerms = query.query.split(' ');
        // Search quatrains for the given keywords
        for (let k in khayyam.RUBAIYAT) {
            // Extract lines
            let robayi = khayyam.RUBAIYAT[k];
            let robayiText = robayi.A + '\n' + robayi.B + '\n' + robayi.C + '\n' + robayi.D;

            // If any robayi matches the query, add it to the results
            let match = true;
            searchTerms.forEach (function (element, index, array){
                //console.log('Inside foreach: ' + match + ' ' + element + ' ' + index + ' ' + array + ' ' + robayiText);
                // Regexes are hard, therefore here is a dumb way to findout all the matches
                match = match && robayiText.match(element);
            });
            //console.log('match is: ' + match);
            // If match is still true add the line to the results
            if (match) {
                let title = 'رباعی شماره ' + convertToHinduArabic(robayi.ID);
                results.push(
                    {'type': 'article',
                    'id': robayi.ID.toString(),
                    'title': title,
                    'message_text': robayiText,
                    'parse_mode': 'Markdown',
                    'url': 'http://mehdix.ir/projects/SaaghiBot/',
                    'hide_url': true,
                    'description': robayiText});
            }
        }
    }
    return results;
}