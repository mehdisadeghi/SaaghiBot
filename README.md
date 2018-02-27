# SaaghiBot
Yet another telegram bot. This one is a poet.

## What is this?
SaaghiBot is a telegram app based on nodejs. It polls updates from Telegram and processes them.

## What it does?
It returns random quatrains out of 106 quatrains which are listed in `omarkkhayyam_list.yaml` file. It also supports a basic search.

## How to use
Try mentioning @SaaghiBot in Telegram chats, with or without search terms.

## How to run a copy
Install it from NPM:

    yarn install saaghibot
    TELEGRAM_BOT_TOKEN=<bot_token_obtained_from_botfather> saaghibot

## Development
Obtain a bot token from [BotFather](https://t.me/botfather) and make sure to enable inline queries for your bot using `/setinline`.
Then run the following:

    yarn install
    TELEGRAM_BOT_TOKEN=<bot_token_obtained_from_botfather> yarn start

## License
MIT