import * as cycleInfo from '../cycleInfo';
const tempDataSpy = jest.spyOn(cycleInfo, 'tempData');

describe('cycle info script', () => {
  tempDataSpy.mockImplementation(() => {
    return [
      { name: 'Test Build Cycle 1', startDate: '1/1/23', endDate: '1/10/23' },
      {
        name: 'Test Cycle 1 Cool Down',
        startDate: '1/12/23',
        endDate: '1/20/23',
      },
      { name: 'Test Build Cycle 2', startDate: '1/22/23', endDate: '1/30/23' },
      {
        name: 'Test Cycle 2 Cool Down',
        startDate: '2/2/23',
        endDate: '2/15/23',
      },
    ];
  });

  it('responds with the correct cycle status', () => {
    // Before cycle data exists
    let date = new Date('12/1/22').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleStatusReply(date)).toBe("Build cycles haven't started yet");

    // Mid-cycle
    date = new Date('1/15/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleStatusReply(date)).toBe('5 work days left in Test Cycle 1 Cool Down');

    // Last day of cycle
    date = new Date('1/10/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleStatusReply(date)).toBe(
      "It's the last day of the cycle! Test Cycle 1 Cool Down will start on 1/12/23"
    );

    // Weekend (in between cycles)
    date = new Date('1/11/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleStatusReply(date)).toBe(
      'Enjoy your weekend! Test Cycle 1 Cool Down will start on 1/12/23'
    );

    // After cycles defined
    date = new Date('4/11/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleStatusReply(date)).toBe(
      "Build cycles haven't been defined for today's date"
    );
  });

  it('responds with the correct cycle info', () => {
    // Before cycle data exists
    let date = new Date('12/1/22').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleInfoReply(date)).toBe('On 12/1/2022, we were in the before times.');

    // Mid-cycle
    date = new Date('1/15/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleInfoReply(date)).toBe(
      'On 1/15/2023, we were in Test Cycle 1 Cool Down until 1/20/23'
    );

    // Last day of cycle
    date = new Date('1/10/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleInfoReply(date)).toBe(
      'On 1/10/2023, we were in Test Build Cycle 1 until 1/10/23'
    );

    // Weekend (in between cycles)
    date = new Date('1/11/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleInfoReply(date)).toBe(
      'On 1/11/2023, we were in between build cycles. Test Cycle 1 Cool Down will start on 1/12/23'
    );

    // After cycles defined
    date = new Date('4/11/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.cycleInfoReply(date)).toBe('On 4/11/2023, we will be in undefined territory.');
  });

  it('gets the correct cycle array indicies based on the given date', () => {
    // Before cycle data exists
    let date = new Date('12/1/22').setHours(0, 0, 0, 0);
    let cycleData = cycleInfo.getDateBounds(date);
    expect(cycleData.left).toBe(null);

    // In a cycle
    date = new Date('1/18/23').setHours(0, 0, 0, 0);
    cycleData = cycleInfo.getDateBounds(date);
    expect(cycleData.left).toBe(1);
    expect(cycleData.right).toBe(1);

    // Between cycles (weekend)
    date = new Date('1/11/23').setHours(0, 0, 0, 0);
    cycleData = cycleInfo.getDateBounds(date);
    expect(cycleData.left).toBe(0);
    expect(cycleData.right).toBe(null);

    // After cycle data ends
    date = new Date('3/1/23').setHours(0, 0, 0, 0);
    cycleData = cycleInfo.getDateBounds(date);
    expect(cycleData.left).toBe(3);
    expect(cycleData.right).toBe(null);
  });

  it('returns the correct number of weekdays between two date strings, inclusive', () => {
    let startDate = new Date('1/1/23').setHours(0, 0, 0, 0);
    let endDate = new Date('1/20/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.getWeekdaysCount(startDate, endDate)).toBe(15);

    startDate = new Date('1/20/23').setHours(0, 0, 0, 0);
    endDate = new Date('1/20/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.getWeekdaysCount(startDate, endDate)).toBe(1);

    startDate = new Date('1/28/23').setHours(0, 0, 0, 0);
    endDate = new Date('1/20/23').setHours(0, 0, 0, 0);
    expect(cycleInfo.getWeekdaysCount(startDate, endDate)).toBe(0);
  });
});
