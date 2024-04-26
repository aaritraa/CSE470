const { getAllEvents } = require("../controller/events_controller.js");
const events_model = require("../model/models/events_model.js");

jest.mock("../model/models/events_model.js");

const request = {}; 
const response = {
  status: jest.fn().mockReturnThis(), 
  json: jest.fn(), 
};

describe("getAllEvents Function", () => {
  it("should return all events successfully", async () => {
    const mockEvents = [
      {
        _id: "60c72b2f4f1a462884f1aabc",
        creatorEmail: "aritra@gmail.com",
        creatorName: "Aritra Ghose",
        description: "Get together for the Pet Owners Community",
        dateAndTime: "April 7, 2024",
        interestCount: 41,
        eventTitle: "Get Together 2024",
        uninterestedCount: 6,
      },
      {
        _id: "60c72b2f4f1a462884f1abcd",
        creatorEmail: "aritra@gmail.com",
        creatorName: "Aritra Ghose",
        description: "Get together for the Pet Owners Community",
        dateAndTime: "April 10, 2024",
        interestCount: 20,
        eventTitle: "Get Together 2024",
        uninterestedCount: 5,
      },
    ];

    events_model.find.mockResolvedValueOnce(mockEvents);

    await getAllEvents(request, response);

    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(mockEvents);
  });

  it("should handle errors when fetching all events", async () => {
    
    events_model.find.mockRejectedValueOnce(new Error("Database error"));

    await getAllEvents(request, response);

   
    expect(response.json).toHaveBeenCalledWith({
      message: "Database error",
    });
  });
});
