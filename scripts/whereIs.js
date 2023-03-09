const { url } = require('inspector');
const { getText, random } = require('../utils/utils');

const conferenceRooms = {
  bluebird: "https://www.eknightmusic.com/images/maps/bluebird.jpg",
  "blue spruce": "https://www.eknightmusic.com/images/maps/bluespruce.jpg",
  carnegie: "https://www.eknightmusic.com/images/maps/carnegie.jpg",
  chickadee: "https://www.eknightmusic.com/images/maps/chickadee.jpg",
  cottonwood: "https://www.eknightmusic.com/images/maps/cottonwood.jpg",
  "fiddler's green": "https://www.eknightmusic.com/images/maps/fiddlersgreen.jpg",
  flagstaff: "https://www.eknightmusic.com/images/maps/flagstaff.jpg",
  "grays & torreys": "https://www.eknightmusic.com/images/maps/graystorreys.jpg",
  "grays and torreys": "https://www.eknightmusic.com/images/maps/graystorreys.jpg",
  hummingbird: "https://www.eknightmusic.com/images/maps/hummingbird.jpg",
  it: "https://www.eknightmusic.com/images/maps/it.jpg",
  maple: "https://www.eknightmusic.com/images/maps/maple.jpg",
  "maroon bells": "https://www.eknightmusic.com/images/maps/maroonbells.jpg",
  "never summer": "https://www.eknightmusic.com/images/maps/neversummer.jpg",
  "old stage": "https://www.eknightmusic.com/images/maps/oldstage.jpg",
  "quandary peak": "https://www.eknightmusic.com/images/maps/quandarypeak.jpg",
  "red rocks": "https://www.eknightmusic.com/images/maps/redrocks.jpg",
  studio: "https://www.eknightmusic.com/images/maps/studio.jpg",
  tanglewood: "https://www.eknightmusic.com/images/maps/tanglewood.jpg",
  "the bathroom": "https://www.eknightmusic.com/images/maps/restroom.jpg",
  "the break room": "https://www.eknightmusic.com/images/maps/breakroom.jpg",
  "the gym": "https://www.eknightmusic.com/images/maps/thegym.jpg",
  "the kitchen": "https://www.eknightmusic.com/images/maps/breakroom.jpg",
  "the restroom": "https://www.eknightmusic.com/images/maps/restroom.jpg",
  "the studio": "https://www.eknightmusic.com/images/maps/studio.jpg",
  "the training room": "https://www.eknightmusic.com/images/maps/hummingbird.jpg",
  "training 103": "https://www.eknightmusic.com/images/maps/hummingbird.jpg",
  wellness: "https://www.eknightmusic.com/images/maps/thegym.jpg",
  woodpecker: "https://64.media.tumblr.com/3ce1699f571e06b859c28cc982146d78/faf70da087c6ae0e-77/s1280x1920/16f54d1e168ddc035ec92ed3efdbd29fa595ad18.jpg",
}

const barks = [
  "I only know how to find conference rooms.",
  "I don't think {0} is a conference room.",
  "I dunno...",
  "Not sure; did you spell it correctly?"
]

const questionRegex = /where ?[i']?s ([^\?]*)[\?]*/i;

module.exports = (app) => {
  app.message(questionRegex, async ({ message, say }) => {
    const room = getText(message).match(questionRegex)[1].toLowerCase().trim();
    const url = conferenceRooms[room];
    if (url) {
      await say({
        blocks: [
          {
          "type": "image",
          "image_url": url,
          "alt_text": "Map image"
        }],

          text: "In the Louisville office"
      });
    } else {
      await say(barks[random(barks.length)]);
    }
  });
}
