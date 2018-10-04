const auth = require('./auth.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

const cabbage_images = [
  'https://i.imgur.com/zK7h7Zl.gif',
  'https://i.imgur.com/cH4Hz3i.jpg',
  'https://i.imgur.com/nB3xyas.gif',
  'https://i.imgur.com/kJbYFFUb.jpg',
  'https://thumbs.dreamstime.com/b/young-happy-man-cabbage-2350823.jpg',
  'https://images.pexels.com/photos/968254/pexels-photo-968254.jpeg?auto=compress&cs=tinysrgb&h=350',
  'https://images.pexels.com/photos/33315/cabbage-vegetable-power-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350',
  'https://www.driftlessorganics.com/wp-content/uploads/2012/12/cabbage5varieties.jpg',
  'https://5.imimg.com/data5/DK/YY/MY-44851652/chinese-cabbage-500x500.jpg',
  'https://i.kinja-img.com/gawker-media/image/upload/s--DOKITCv8--/c_scale,f_auto,fl_progressive,q_80,w_800/qa3hubiqsx11tetz82ky.jpg',
  'https://www.ocado.com/productImages/188/18854011_0_640x640.jpg?identifier=fbcf77f693ea22a2b6562d2bca844219',
  'https://www.health.harvard.edu/media/content/images/p_7_RedCabbage_H1805_gi185088185.jpg',
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/14/1-cabbage-variety-1515510722.jpg?resize=480:*',
  'https://www.healthline.com/assets/1155x1528/hlcmsresource/images/AN_images/farmer-holding-cabbage-1296x728.jpg'
]

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === '!cabbagebot') {
    msg.reply({
      file: cabbage_images[Math.floor(Math.random() * cabbage_images.length)]
    });
  }
});

bot.login(auth.token);
