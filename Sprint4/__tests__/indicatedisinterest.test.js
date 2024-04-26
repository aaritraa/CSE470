const { indicateDisinterest } = require("../controller/events_controller.js");
const events_model = require("../model/models/events_model.js");

jest.mock("../model/models/events_model.js");

const request = {
  params: {
    id: "60c72b2f4f1a462884f1aabc",
  },
};

const response = {
  status: jest.fn().mockReturnThis(), 
  json: jest.fn(), 
};

describe("indicateDisinterest Function", () => {
  it("should increase uninterestedCount for a valid event", async () => {
    const mockEvent = {
      _id: "60c72b2f4f1a462884f1aabc",
      eventTitle: "Sample Event",
      uninterestedCount: 2, 
      save: jest.fn().mockResolvedValueOnce({
        _id: "60c72b2f4f1a462884f1aabc",
        eventTitle: "Sample Event",
        uninterestedCount: 3, 
      }),
    };

    events_model.findById.mockResolvedValueOnce(mockEvent); 

    await indicateDisinterest(request, response); 

    expect(events_model.findById).toHaveBeenCalledWith("60c72b2f4f1a462884f1aabc"); 
    //expect(mockEvent.save).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      _id: "60c72b2f4f1a462884f1aabc",
      eventTitle: "Sample Event",
      uninterestedCount: 3,
    });
  });

  it("should return 404 if event is not found", async () => {
    events_model.findById.mockResolvedValueOnce(null); 

    await indicateDisinterest(request, response);

    //expect(response.status).toHaveBeenCalledWith(404); 
    expect(response.json).toHaveBeenCalledWith({ message: 'Event not found' });
  });

  it("should return 500 on server error", async () => {
    events_model.findById.mockRejectedValueOnce(new Error("Database error"));

    await indicateDisinterest(request, response);

    //expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: "Database error" });
  });
});
