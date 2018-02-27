# SaaghiBot [![npm version](https://badge.fury.io/js/saaghibot.svg)](https://badge.fury.io/js/saaghibot)
Yet another telegram bot. This one is a poet.

## What is this?
SaaghiBot is a telegram app based on nodejs. It polls updates from Telegram and processes them.

## What it does?
It returns random quatrains out of 106 quatrains which are listed in `omarkkhayyam_list.yaml` file. It also supports a basic search.

## How to use
Try mentioning @SaaghiBot in Telegram chats, with or without search terms.

## How to run a copy
First make sure you have a not so old version of nodejs with ES6 support installed. Then from npm:

    # yarn global add saaghibot // or alternatively npm i -g saaghibot

Then run the bot using your bot token:

    $ TELEGRAM_BOT_TOKEN=<bot_token_obtained_from_botfather> saaghibot

## Development
Obtain a bot token from [BotFather](https://t.me/botfather) and make sure to enable inline queries for your bot using `/setinline`.
Then run the following:

    $ yarn install
    $ TELEGRAM_BOT_TOKEN=<bot_token_obtained_from_botfather> yarn start

## License
MIT