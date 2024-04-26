
const {updateProfile} = require("../controller/users_controller.js");
const users_model = require("../model/models/users_model.js");

jest.mock('../model/models/users_model.js');

const request = {
    body: {
        userEmail: 'ridwannoortasin@gmail.com',
        firstName: 'Ridwan',
        lastName: 'Noor',
        address: 'Road 2, Niketon, Gulshan-1, Dhaka',
        bio: 'My bio'
    }
}

const response = {
    json: jest.fn((x) => x)
};

it('test getUserInfo', async () => {

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
    users_model.findOneAndUpdate.mockResolvedValueOnce(mockedUser);

    await updateProfile(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockedUser);
});