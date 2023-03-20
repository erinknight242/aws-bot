import { regex, reply, barks, conferenceRooms } from "../whereIs";
import * as utils from "../../utils/utils";
const sayMock = jest.fn();
const randomSpy = jest.spyOn(utils, "random");

describe("whereIs script", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("regex detects 'where is' variations", () => {
    expect(regex.test("where is something?")).toBe(true);
    expect(regex.test("where’s something?")).toBe(true);
    expect(regex.test("Where's something?")).toBe(true);
    expect(regex.test("Wheres something?")).toBe(true);
    expect(regex.test("Where is something?")).toBe(true);
    expect(regex.test("Where is something")).toBe(true);
    expect(regex.test("wheres something")).toBe(true);
  });

  it("responds with a bark if location unknown", () => {
    randomSpy.mockImplementationOnce(() => {
      return 0;
    });
    reply("Where is something?", sayMock);
    expect(sayMock).toHaveBeenCalledTimes(1);
    expect(sayMock).toHaveBeenCalledWith(barks[0]);
  });

  it("responds with the URL if conference room known", () => {
    reply("Where is bluebird?", sayMock);
    expect(sayMock).toHaveBeenCalledTimes(1);
    expect(sayMock).toHaveBeenCalledWith(
      expect.objectContaining({
        blocks: expect.arrayContaining([
          expect.objectContaining({
            image_url: conferenceRooms["bluebird"],
          }),
        ]),
      })
    );
  });
});
