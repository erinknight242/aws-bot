"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getText = exports.timeOfDay = exports.random = void 0;
const random = (range = 10) => {
    return Math.floor(Math.random() * range);
};
exports.random = random;
const timeOfDay = (timeString = new Date().toLocaleTimeString([], { hour: '2-digit' })) => {
    const timeArray = timeString.split(' ');
    let hour = parseInt(timeArray[0]);
    if (timeArray.length === 2 && timeArray[1] === 'PM' && hour < 12) {
        hour += 12;
    }
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) {
        timeOfDay = 'afternoon';
    }
    else if (hour > 17) {
        timeOfDay = 'evening';
    }
    return timeOfDay;
};
exports.timeOfDay = timeOfDay;
const getText = (message) => {
    return message.blocks[0].elements[0].elements[1].text?.trim();
};
exports.getText = getText;
//# sourceMappingURL=utils.js.map