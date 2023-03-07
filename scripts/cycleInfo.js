tempData = [
  { name: "Build Cycle 1", startDate: "10/17/22", endDate: "12/2/22"},
  { name: "Cycle 1 Cool Down", startDate: "12/5/22", endDate: "1/6/23"},
  { name: "Build Cycle 2", startDate: "1/9/23", endDate: "2/17/23"},
  { name: "Cycle 2 Cool Down", startDate: "2/20/23", endDate: "3/10/23"},
  { name: "Build Cycle 3", startDate: "3/13/23", endDate: "4/21/23"},
  { name: "Cycle 3 Cool Down", startDate: "4/24/23", endDate: "5/5/23"},
]

module.exports = (app) => {
  app.command("/cycle", async ({ command, ack, say }) => {
    try {
      await ack();
      reply(say, command.text);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
  });

  app.event('app_mention', async ({ event, context, client, say }) => {
    try {
      if (event.text.search(/cycle/)) {
        reply(say);
      }
    }
    catch (error) {
      console.error(error);
    }
  });

  function reply(say, string) {
    let currentDate = true;
    let date = null;
    let output = '';
    let today = new Date();
    if (string) {
      date = new Date(string);
      currentDate = false;
      output = `On ${date.toLocaleDateString()}, we `;
      if (date > today) {
        output += "will be in "
      } else if (date < today) {
        output += "were in "
      } else {
        output += "are in "
      }
    } else {
      date = today;
      output = `We are in `
    }
    let left = null;
    let right = null;
    for (let i = 0; i < tempData.length; i++) {
      const testStart = new Date(tempData[i].startDate);
      const testEnd = new Date(tempData[i].endDate);
      if (testStart > date) {
        break;
      }
      if (testStart <= date) {
        left = i;
      }
      if (testEnd >= date) {
        right = i;
      }
    }
    if (left === null) {
      output += "the before times.";
    } else if (right === null && left === tempData.length - 1) {
      output += "undefined territory.";
    } else if (left !== right) {
      output += `between build cycles. ${tempData[left + 1].name} will start on ${tempData[left + 1].startDate}`;
    } else {
      output += `${tempData[left].name} until ${tempData[left].endDate}`;
    }

    say(output);
  }
}
