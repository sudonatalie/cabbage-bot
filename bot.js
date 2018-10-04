const Discord = require('discord.js');
const bot = new Discord.Client();

const GoogleImages = require('google-images');
const searchClient = new GoogleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_API_KEY);

const randomImage = function(searchResults) {
  const urls = searchResults.map(image => image.url)
      .filter(url => (/\.(gif|jpg|jpeg|png)$/i).test(url));
  const url = urls[Math.floor(Math.random() * urls.length)];
  return url;
};

bot.on('message', message => {
  if (message.content === '!cabbagebot') {
    // If the message is from cabbagebot, freak out
    if (message.author.username === 'cabbagebot') {
      message.reply({
        file: 'https://i.imgur.com/U5EJjfG.jpg'
      });
    }
    else {
      // Search for images
      searchClient.search('cabbage')
        // Choose a random image from the list
        .then(randomImage)
        // Reply with image file
        .then(url => message.reply({
          file: url
        }));
    }
  }
  else if (message.content === '!mrscabbagebot') {
    // Search for images
    searchClient.search('banana')
      // Choose a random image from the list
      .then(randomImage)
      // Reply with image file
      .then(url => message.reply({
        file: url
      }));
  }
});

bot.login(process.env.DISCORD_TOKEN);
