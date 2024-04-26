const { sendMessage } = require("../controller/messages_controller.js");
const messages_model = require("../model/models/messages_model.js");

jest.mock("../model/models/messages_model.js");

const request = {
  body: {
    fromEmail: "sender@example.com",
    fromName: "Sender",
    toEmail: "receiver@example.com",
    toName: "Receiver",
    content: "Hello, this is a test message."
  }
};

const response = {
  status: jest.fn().mockReturnThis(), 
  json: jest.fn(), 
};

describe("sendMessage Function", () => {
  it("should send a message successfully", async () => {
   
    const mockMessage = {
      fromEmail: "sender@example.com",
      fromName: "Sender",
      toEmail: "receiver@example.com",
      toName: "Receiver",
      content: "Hello, this is a test message.",
      _id: "60c72b2f4f1a462884f1aabc", 
      save: jest.fn().mockResolvedValueOnce(),
    };

    messages_model.mockImplementationOnce(() => mockMessage);

    await sendMessage(request, response);

    expect(messages_model).toHaveBeenCalledWith({
      fromEmail: "sender@example.com",
      fromName: "Sender",
      toEmail: "receiver@example.com",
      toName: "Receiver",
      content: "Hello, this is a test message.",
    });

    expect(mockMessage.save).toHaveBeenCalledTimes(1); 
    //expect(response.status).toHaveBeenCalledWith(201); 
    expect(response.json).toHaveBeenCalledWith({ message: "Message sent successfully" });
  });

  it("should return 500 on server error", async () => {
    messages_model.mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    await sendMessage(request, response);

    //expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: "Error sending message" });
  });
});
