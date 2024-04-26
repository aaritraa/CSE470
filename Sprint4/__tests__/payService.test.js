
const {payService} = require("../controller/service_payments_controller.js");
const service_payments_model = require("../model/models/service_payments_model.js");

jest.mock('../model/models/service_payments_model.js');

const request = {
    body: {
        title: '30 Minutes 1:1 Call',
        email: 'ridwannoortasin@gmail.com',
        name: 'Ridwan Noor Tasin',
        address: 'Road 2',
        phone: '1342512345',
        cardNum: '111112222222',
        cvc: '121',
        price: '500'
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

    service_payments_model.create.mockResolvedValueOnce(mock);

    await payService(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith("Payment Successful");
});