
const {getProductPayments} = require("../controller/payments_controller.js");
const payments_model = require("../model/models/payments_model.js");

jest.mock('../model/models/payments_model.js');

const request = {
    body: {
        userEmail: 'ridwannoortasin@gmail.com'
    }
}

const response = {
    json: jest.fn((x) => x)
};

it('test getProductPayments', async () => {

    const mock = {
        "_id": {
            "$oid": "6610e7c50c99fd30f0dbbf57"
        },
        "title": "asdf",
        "email": "ridwannoortasin@gmail.com",
        "name": "Ridwan Noor Tasin",
        "address": "Gulshan-1, Dhaka",
        "phone": "234254",
        "cardNum": "111222222233333",
        "cvc": "123",
        "price": "3",
        "__v": 0
    }

    payments_model.find.mockResolvedValueOnce(mock);

    await getProductPayments(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mock);
});