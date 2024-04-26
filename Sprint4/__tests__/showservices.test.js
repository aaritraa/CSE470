const { showServices } = require("../controller/services_controller.js");
const services_model = require("../model/models/services_model.js");

jest.mock("../model/models/services_model.js");

const response = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
};

describe("showServices Test", () => {
    it("should return a list of services", async () => {
        const mockServices = [
            {
                title: "Service 1",
                providerEmail: "example1@example.com",
                providerName: "Provider 1",
                type: "Type 1",
                description: "Description 1",
                rate: 100
            },
            {
                title: "Service 2",
                providerEmail: "example2@example.com",
                providerName: "Provider 2",
                type: "Type 2",
                description: "Description 2",
                rate: 200
            }
        ];

        services_model.find.mockResolvedValueOnce(mockServices);

        await showServices({}, response);

        expect(response.json).toHaveBeenCalledWith(mockServices);
    });


});
