"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barks = exports.conferenceRooms = exports.reply = exports.regex = void 0;
const utils_1 = require("../utils/utils");
exports.regex = /where ?[i'’]?s ([^?]*)([?]*)/i;
exports.default = (app) => {
    app.event('app_mention', async ({ event, say }) => {
        if (event.text.match(exports.regex)) {
            (0, exports.reply)(event.text, say);
        }
    });
    app.message(exports.regex, async ({ message, say }) => {
        if (message.channel_type === 'im') {
            (0, exports.reply)(message.text, say);
        }
    });
};
const reply = async (question, say) => {
    const questionRegex = new RegExp(exports.regex);
    const textMatch = questionRegex.exec(question);
    if (textMatch && textMatch?.length >= 1) {
        const room = textMatch[1].toLowerCase().trim();
        const url = exports.conferenceRooms[room];
        if (url) {
            await say({
                blocks: [
                    {
                        type: 'image',
                        image_url: url,
                        alt_text: 'Map image',
                    },
                ],
                text: 'In the Louisville office',
            });
        }
        else {
            await say(exports.barks[(0, utils_1.random)(exports.barks.length)]);
        }
    }
};
exports.reply = reply;
exports.conferenceRooms = {
    bluebird: 'https://www.eknightmusic.com/images/maps/bluebird.jpg',
    'blue spruce': 'https://www.eknightmusic.com/images/maps/bluespruce.jpg',
    carnegie: 'https://www.eknightmusic.com/images/maps/carnegie.jpg',
    chickadee: 'https://www.eknightmusic.com/images/maps/chickadee.jpg',
    cottonwood: 'https://www.eknightmusic.com/images/maps/cottonwood.jpg',
    "fiddler's green": 'https://www.eknightmusic.com/images/maps/fiddlersgreen.jpg',
    'fiddlers green': 'https://www.eknightmusic.com/images/maps/fiddlersgreen.jpg',
    flagstaff: 'https://www.eknightmusic.com/images/maps/flagstaff.jpg',
    'grays & torreys': 'https://www.eknightmusic.com/images/maps/graystorreys.jpg',
    'grays and torreys': 'https://www.eknightmusic.com/images/maps/graystorreys.jpg',
    hummingbird: 'https://www.eknightmusic.com/images/maps/hummingbird.jpg',
    it: 'https://www.eknightmusic.com/images/maps/it.jpg',
    maple: 'https://www.eknightmusic.com/images/maps/maple.jpg',
    'maroon bells': 'https://www.eknightmusic.com/images/maps/maroonbells.jpg',
    'never summer': 'https://www.eknightmusic.com/images/maps/neversummer.jpg',
    'old stage': 'https://www.eknightmusic.com/images/maps/oldstage.jpg',
    'quandary peak': 'https://www.eknightmusic.com/images/maps/quandarypeak.jpg',
    'red rocks': 'https://www.eknightmusic.com/images/maps/redrocks.jpg',
    studio: 'https://www.eknightmusic.com/images/maps/studio.jpg',
    tanglewood: 'https://www.eknightmusic.com/images/maps/tanglewood.jpg',
    'the bathroom': 'https://www.eknightmusic.com/images/maps/restroom.jpg',
    'the breakroom': 'https://www.eknightmusic.com/images/maps/breakroom.jpg',
    'the break room': 'https://www.eknightmusic.com/images/maps/breakroom.jpg',
    'the gym': 'https://www.eknightmusic.com/images/maps/thegym.jpg',
    'the kitchen': 'https://www.eknightmusic.com/images/maps/breakroom.jpg',
    'the restroom': 'https://www.eknightmusic.com/images/maps/restroom.jpg',
    'the studio': 'https://www.eknightmusic.com/images/maps/studio.jpg',
    'the training room': 'https://www.eknightmusic.com/images/maps/hummingbird.jpg',
    'training 103': 'https://www.eknightmusic.com/images/maps/hummingbird.jpg',
    wellness: 'https://www.eknightmusic.com/images/maps/thegym.jpg',
    woodpecker: 'https://www.eknightmusic.com/images/maps/woodpecker.jpg',
};
exports.barks = [
    'I only know how to find conference rooms.',
    "I don't think that is a conference room.",
    'I dunno...',
    'Not sure; did you spell it correctly?',
];
//# sourceMappingURL=whereIs.js.map