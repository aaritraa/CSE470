const { addService } = require("../controller/vet_profile_controller.js");
const services_model = require("../model/models/services_model.js");

jest.mock('../model/models/services_model.js'); 

const request = {
    body: {
        _id: "6602709d0337a5ee2ae59538",
        title: "30 Minutes 1:1 Call",
        providerEmail: "steve@gmail.com",
        providerName: "Steve Smith",
        type: "Voice Call",
        description: "Ask and discuss anything with me for a 30 Minutes 1:1 Call.",
        rate: 500
    }
};

const response = {
    json: jest.fn(), 
    status: jest.fn().mockReturnThis() 
};

it('test addService', async () => {
  
    const mockedService = {
        
        _id: "6602709d0337a5ee2ae59538",
        title: "30 Minutes 1:1 Call",
        providerEmail: "steve@gmail.com",
        providerName: "Steve Smith",
        type: "Voice Call",
        description: "Ask and discuss anything with me for a 30 Minutes 1:1 Call.",
        rate: 500

    };


    const serviceInstance = new services_model(); 
    serviceInstance.save = jest.fn().mockResolvedValue(mockedService);

    services_model.mockImplementation(() => serviceInstance);

    await addService(request, response);

    expect(response.json).toHaveBeenCalledWith({
        message: 'Service added successfully',
        service: serviceInstance 
    });

});
