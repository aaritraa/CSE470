
const {getServicePayments} = require("../controller/service_payments_controller.js");
const service_payments_model = require("../model/models/service_payments_model.js");

jest.mock('../model/models/service_payments_model.js');

const request = {
    body: {
        userEmail: 'ridwannoortasin@gmail.com'
    }
}

const response = {
    json: jest.fn((x) => x)
};

it('test getServicePayments', async () => {

    const mock = {
        "_id": {
          "$oid": "66124144ce44d0f9a7ac372c"
        },
        "title": "60 Minutes 1:1 Call",
        "email": "ridwannoortasin@gmail.com",
        "name": "Ridwan Noor Tasin",
        "address": "Dhaka",
        "phone": "112341234",
        "cardNum": "111122222233333",
        "cvc": "123",
        "price": "1200",
        "__v": 0
      }

    service_payments_model.find.mockResolvedValueOnce(mock);

    await getServicePayments(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mock);
});