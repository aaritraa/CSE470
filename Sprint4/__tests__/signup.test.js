
const {signup} = require("../controller/users_controller.js");
const users_model = require("../model/models/users_model.js");

jest.mock('../model/models/users_model.js');

const request = {
    body: { firstName: 'vvv', lastName: 'bbb', email: 'v@g', password: '1111' }
}

const response = {
    json: jest.fn((x) => x)
};

it('test user signup', async () => {

    const mockedUser = {
        _id: 1,
        firstName: "vvv",
        lastName: "bbb",
        email: 'v@g',
        password: '1111',
        role: "normal",
        address: "",
        bio: "",
        __v: 0

    }
    users_model.find.mockResolvedValueOnce(mockedUser);

    await signup(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(["Email already exists",""]);
});