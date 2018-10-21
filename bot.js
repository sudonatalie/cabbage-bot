const Discord = require('discord.js');
const GoogleImages = require('google-images');
const Snoowrap = require('snoowrap');
const Markov = require('markov-strings');

const bot = new Discord.Client();

const searchClient = new GoogleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_API_KEY);

const reddit = new Snoowrap({
  userAgent: 'Cabbagebot/1.0',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

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

  // !cabbageai
  else if (message.content === '!cabbageai') {
    // Search for "cabbage" posts on Reddit
    const cabbagePromise = reddit.search({
        query: 'title:cabbage',
        time: 'all',
        sort: 'relevance',
        limit: 500,
        syntax: 'lucene'
      });

    // Fetch the hot posts from the FortNiteBR subreddit
    const fortnitePromise = reddit.getSubreddit('FortNiteBR')
      .getHot({
        limit: 500
      });

    // Combine both results
    Promise.all([cabbagePromise, fortnitePromise])
      .then(bothResults => {
        const listings = bothResults[0].concat(bothResults[1]);

        // Filter to self posts and construct list of their title/body texts
        const texts = listings.reduce((accumulator, listing) => {
          if (listing.is_self) {
             accumulator.push(`${listing.title}\n${listing.selftext}`);
          }
          return accumulator;
        }, []);

        // Initialize Markov chain text generator
        const markov = new Markov(texts);
        markov.buildCorpus().then(() => {
          // Generate a post
          markov.generateSentence().then(result => {
            var raw = result.string;
            // Minor cleanup of garbage entities/whitespace
            var response = raw.replace(/&#x200B;/g, '').replace(/\n\s*\n+/g, '\n');
            // Send reply on Discord
            message.reply(response);
          });
        });
      })
      .catch(error => console.log(error));
  }
});

bot.login(process.env.DISCORD_TOKEN);
