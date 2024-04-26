
const {getVetProfile} = require("../controller/vet_profile_controller.js");
const vet_model = require("../model/models/vet_model.js");

jest.mock('../model/models/vet_model.js');

const request = {
    params: { email: 'steve@gmail.com' }, 
};

const response = {
    json: jest.fn((x) => x)
};

it('test getUserInfo', async () => {

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
    vet_model.find.mockResolvedValueOnce(mockedUser);

    await getVetProfile(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockedUser);
});