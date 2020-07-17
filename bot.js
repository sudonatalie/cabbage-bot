const Discord = require('discord.js');
const GoogleImages = require('google-images');
const Snoowrap = require('snoowrap');
const Markov = require('markov-strings').default;
const he = require('he');

const bot = new Discord.Client();

const searchClient = new GoogleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_API_KEY);

const reddit = new Snoowrap({
  userAgent: 'Cabbagebot/1.0',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

var markov = null;

const rebuildMarkov = function () {
  // Search for "cabbage" posts on Reddit
  const cabbagePromise = reddit
    .search({
      query: 'cabbage',
      time: 'all',
      sort: 'relevance',
      limit: 1000
    })
    .map(post => `${post.title}\n${post.selftext}`.trim());

  // Fetch the hot self-posts from the FortNiteBR subreddit
  const fortnitePromise = reddit.getSubreddit('FortNiteBR')
    .getHot({
      limit: 1000
    })
    .filter(post => post.is_self)
    .map(post => `${post.title}\n${post.selftext}`);

  // Combine both results
  return Promise.all([cabbagePromise, fortnitePromise])
    .then(bothResults => {
      const texts = bothResults.flat();

      // Initialize Markov chain text generator
      markov = new Markov(texts, { stateSize: 2 });
      return markov.buildCorpusAsync();
    })
    .catch(error => console.log(error));
};

const randomImage = function (imageSearchResults) {
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
        files: [{
          attachment: 'https://i.imgur.com/U5EJjfG.jpg'
        }]
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
          files: [{
            attachment: url
          }]
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
        files: [{
          attachment: url
        }]
      }));
  }

  // !cabbageboy
  else if (message.content === '!cabbageboy') {
    // Reply with a "young happy man holding cabbage"...
    message.reply({
      files: [{
        attachment: 'https://thumbs.dreamstime.com/b/young-happy-man-cabbage-2350823.jpg'
      }]
    });
  }

  // !cabbagebaby
  else if (message.content === '!cabbagebaby') {
    // Reply with baby
    message.reply({
      files: [{
        attachment: 'https://s1.1zoom.ru/b5050/271/Cabbage_Creative_White_background_Infants_528329_2880x1800.jpg'
      }]
    });
  }

  // !cabbagedog
  else if (message.content === '!cabbagedog') {
    // Reply with corgi attack
    message.reply({
      files: [{
        attachment: 'https://cdn.discordapp.com/attachments/241039241197518850/496931244924469248/zK7h7Zl.gif'
      }]
    });
  }

  // !cabbageai
  else if (message.content === '!cabbageai') {
    markovPromise
      .then(() => {
        // Generate a post
        const result = markov.generate({
          maxTries: 100,
          filter: (result) => {
            return result.score > 5 &&
              result.refs.length > 2 &&
              result.string.length < 400 &&
              result.string.toLowerCase().includes("cabbage");
          }
        });
        // Decode HTML entities
        const response = he.decode(result.string);
        // Send reply on Discord
        message.reply(response);
      })
      // Silently catch if fail to generate sentence
      .catch(error => console.log(error));
  }
});

// Rebuild corpus every hour
var markovPromise = rebuildMarkov();
var hour = 60 * 60 * 1000;
setInterval(() => {
  markovPromise = rebuildMarkov();
}, hour);

bot.login(process.env.DISCORD_TOKEN);
