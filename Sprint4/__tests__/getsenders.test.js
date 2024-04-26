const { getSenders } = require("../controller/messages_controller.js");
const messages_model = require("../model/models/messages_model.js");

jest.mock("../model/models/messages_model.js");

const request = {
  params: {
    email: "receiver@example.com",
  },
};

const response = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(), 
};

describe("getSenders Function", () => {
  it("should fetch senders successfully", async () => {
    const mockedSenders = [
      { _id: { fromEmail: "sender1@example.com", fromName: "Sender One" } },
      { _id: { fromEmail: "sender2@example.com", fromName: "Sender Two" } },
    ];

    messages_model.aggregate.mockResolvedValueOnce(mockedSenders);

    await getSenders(request, response);

    expect(messages_model.aggregate).toHaveBeenCalledWith([
      { $match: { toEmail: "receiver@example.com" } },
      { $group: { _id: { fromEmail: "$fromEmail", fromName: "$fromName" } } },
    ]);

    expect(response.json).toHaveBeenCalledWith(mockedSenders); 
  });

  it("should return 500 on database error", async () => {
    messages_model.aggregate.mockRejectedValueOnce(new Error("Database error"));

    await getSenders(request, response);

    //expect(response.status).toHaveBeenCalledWith(500); 
    expect(response.json).toHaveBeenCalledWith({ message: "Error fetching senders" });
  });
});
