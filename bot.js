const auth = require('./auth.json');

const Discord = require('discord.js');
const bot = new Discord.Client();

const GoogleImages = require('google-images');
const searchClient = new GoogleImages(auth.google.cse_id, auth.google.api_key);

bot.on('message', message => {
  if (message.content === '!cabbagebot') {
    // Search for images
    searchClient.search('cabbage')
      // Choose a random image from the list
      .then(images => images[Math.floor(Math.random() * images.length)])
      // Get its url
      .then(image => image.url)
      // Reply with image file
      .then(url => message.reply({
        file: url
      }));
  }
});

bot.login(auth.discord.token);
