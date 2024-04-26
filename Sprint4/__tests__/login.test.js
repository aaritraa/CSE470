
const {find_user} = require("../controller/users_controller.js");
const users_model = require("../model/models/users_model.js");

jest.mock('../model/models/users_model.js');

const request = {
    body: {
        email: 'ridwannoortasin@gmail.com',
        password: '1234'
    }
}

const response = {
    json: jest.fn((x) => x)
};

it('test user login', async () => {

    const mockedUser = {
        _id: 1,
        firstName: "Ridwan",
        lastName: "Noor",
        email: 'ridwannoortasin@gmail.com',
        password: '1234',
        role: "normal",
        address: "Road 2, Niketon, Gulshan-1, Dhaka",
        bio: "My bio"
    }
    users_model.findOne.mockResolvedValueOnce(mockedUser);

    await find_user(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(['Ridwan Noor', mockedUser]);
});