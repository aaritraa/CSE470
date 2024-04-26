
const {vetLogin} = require("../controller/vet_profile_controller.js");
const vet_model = require("../model/models/vet_model.js");

jest.mock('../model/models/vet_model.js');

const request = {
    body: {
        email: 'steve@gmail.com',
        password: 'pets'
    }
}

const response = {
    json: jest.fn((x) => x)
};

it('test user login', async () => {

    const mockedUser = {
        _id: {
            $oid: "6603d637b4fcb1455618f21e"
        },
        email: "steve@gmail.com",
        name: "Steve Smith",
        qualification: "PhD, Pet University of Biological Science",
        workplace: "Researcher @ Vet",
        password: "pets"
    }
    vet_model.findOne.mockResolvedValueOnce(mockedUser);

    await vetLogin(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith([mockedUser["name"], mockedUser]);
});