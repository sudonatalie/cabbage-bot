const Discord = require('discord.js');
const bot = new Discord.Client();

const GoogleImages = require('google-images');
const searchClient = new GoogleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_API_KEY);

const randomImage = function(imageSearchResults) {
  const urls = imageSearchResults
    // Get urls
    .map(image => image.url)
    // Filter to files with extensions that Discord recognizes
    .filter(url => (/\.(gif|jpg|jpeg|png)$/i).test(url));
  // Select one randomly
  return urls[Math.floor(Math.random() * urls.length)];
};

bot.on('message', message => {
  // !cabbagebot
  if (message.content === '!cabbagebot') {

    // If the message is from cabbagebot, freak out
    if (message.author.username === 'cabbagebot') {
      message.reply({
        file: 'https://i.imgur.com/U5EJjfG.jpg'
      });
    }
    // Otherwise reply with a cabbage image
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

  // !mrscabbagebot
  else if (message.content === '!mrscabbagebot') {
    // Reply with a banana image
    // Search for images
    searchClient.search('banana')
      // Choose a random image from the list
      .then(randomImage)
      // Reply with image file
      .then(url => message.reply({
        file: url
      }));
  }

  // !cabbageboy
  else if (message.content === '!cabbageboy') {
    // Reply with a "young happy man holding cabbage"...
    message.reply({
      file: 'https://thumbs.dreamstime.com/b/young-happy-man-cabbage-2350823.jpg'
    });
  }

  // !cabbagebaby
  else if (message.content === '!cabbagebaby') {
    // Reply with baby
    message.reply({
      file: 'https://s1.1zoom.ru/b5050/271/Cabbage_Creative_White_background_Infants_528329_2880x1800.jpg'
    });
  }

  // !cabbagedog
  else if (message.content === '!cabbagedog') {
    // Reply with corgi attack
    message.reply({
      file: 'https://cdn.discordapp.com/attachments/241039241197518850/496931244924469248/zK7h7Zl.gif'
    });
  }

});

bot.login(process.env.DISCORD_TOKEN);
