const Telegraf = require('telegraf');
const fetch = require('node-fetch');

const config = require('./config.json');
const bot = new Telegraf(config.bot_token);

console.log("Bot instantiated");

bot.start((ctx) => {
  console.log('started:', ctx.from.id);
  return ctx.reply('Welcome!');
});

bot.command('help', (ctx) => ctx.reply('Try send a sticker!'));
bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'));
bot.on('sticker', (ctx) => ctx.reply(''));


async function coinSearch (query = '', offset, limit) {
  const apiUrl = `https://api.coinmarketcap.com/v1/ticker?&limit=${limit}`;
  const response = await fetch(apiUrl);
  const coins = await response.json();
  return coins;
}

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  const offset = parseInt(inlineQuery.offset) || 0
  const coins = await coinSearch(inlineQuery.query, offset, 10)
  console.log(coins);

  const results = coins.map((coin) => ({
    type: 'article',
    id: coin.id,
    title: `${coin.name}: ${coin.price_usd}\$`,
    input_message_content: {
      message_text: `${coin.name}: ${coin.price_usd}\$`
    }
  }));

  return answerInlineQuery(results, {});
})


bot.startPolling()
