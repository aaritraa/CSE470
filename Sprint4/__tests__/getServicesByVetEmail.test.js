
const {getServicesByVetEmail} = require("../controller/vet_profile_controller.js");
const vet_model = require("../model/models/vet_model.js");
const mongoose = require('mongoose');
//const vet_model = require("../model/models/vet_model.js");
const services_model = require("../model/models/services_model.js");

jest.mock('../model/models/vet_model.js');
jest.mock('../model/models/services_model.js');

const request = {
    params: { email: 'steve@gmail.com' }, 
};

const response = {
    json: jest.fn((x) => x)
};

it('services by vet', async () => {

    const mockedUser = {
            _id: {
              $oid: "6602709d0337a5ee2ae59538"
            },
            title: "30 Minutes 1:1 Call",
            providerEmail: "steve@gmail.com",
            providerName: "Steve Smith",
            type: "Voice Call",
            description: "Ask and discuss anything with me for a 30 Minutes 1:1 Call.",
            rate: 500
   
    }
    services_model.find.mockResolvedValueOnce(mockedUser);

    await getServicesByVetEmail(request, response);
    expect(response.json).toHaveBeenCalledTimes(1);
    //expect(response.json).toHaveBeenCalledWith(mockedUser);
});