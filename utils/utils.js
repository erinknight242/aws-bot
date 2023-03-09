function random(range = 10) {
  return Math.floor(Math.random() * range);
}

function timeOfDay(timeString = new Date().toLocaleTimeString([], { hour: "2-digit"} )) {
  const timeArray = timeString.split(' ');
  let hour = parseInt(timeArray[0]);
  if (timeArray.length === 2 && timeArray[1] === 'PM' && hour < 12) {
    hour += 12;
  }
  let timeOfDay = 'morning';

  if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
  } else if (hour < 20) {
    timeOfDay = 'evening';
  } else if (hour < 4) {
    timeOfDay = 'night'
  } else {
    timeOfDay = 'night';
  }

  return timeOfDay;
}

function getText(message) {
  return message.blocks[0].elements[0].elements[1].text;
}

module.exports = { random, timeOfDay, getText };
