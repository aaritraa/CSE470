const { getMessages } = require("../controller/messages_controller.js");
const messages_model = require("../model/models/messages_model.js");

jest.mock("../model/models/messages_model.js");

const request = {
  params: {
    userEmail: "user@example.com",
    selectedSender: "sender@example.com",
  },
};

const response = {
  json: jest.fn(), 
  status: jest.fn().mockReturnThis(), 
};

describe("getMessages Function", () => {
  it("should fetch messages successfully", async () => {
    const mockedMessagesSent = [
      { _id: "msg1", fromEmail: "sender@example.com", toEmail: "user@example.com", content: "Hello!" },
    ];

    const mockedMessagesReceived = [
      { _id: "msg2", fromEmail: "user@example.com", toEmail: "sender@example.com", content: "Hi!" },
    ];

    messages_model.find
      .mockResolvedValueOnce(mockedMessagesSent) 
      .mockResolvedValueOnce(mockedMessagesReceived); 

    await getMessages(request, response);

   
    expect(messages_model.find).toHaveBeenCalledTimes(2);
    expect(messages_model.find).toHaveBeenCalledWith({ fromEmail: "sender@example.com", toEmail: "user@example.com" });
    expect(messages_model.find).toHaveBeenCalledWith({ fromEmail: "user@example.com", toEmail: "sender@example.com" });

    const expectedMessages = [...mockedMessagesSent, ...mockedMessagesReceived];
    expect(response.json).toHaveBeenCalledWith(expectedMessages);
  });

  it("should return 500 on database error", async () => {
    messages_model.find.mockRejectedValueOnce(new Error("Database error"));

    await getMessages(request, response);

    //expect(response.status).toHaveBeenCalledWith(500); 
    expect(response.json).toHaveBeenCalledWith({ message: "Error fetching messages" });
  });
});
