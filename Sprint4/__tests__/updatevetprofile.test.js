const { updateVetProfile } = require("../controller/vet_profile_controller.js");
const vet_model = require("../model/models/vet_model.js");

jest.mock('../model/models/vet_model.js');

const request = {
    params: {
        id: '6603d637b4fcb1455618f21e' 
    },
    body: {
        name: 'Steve Smith',
        email: 'steve@gmail.com',
        qualification: 'PhD, Pet University of Biological Science',
        workplace: 'Researcher @ Vet',
        password: "pets"
    }
};

const response = {
    json: jest.fn(), 
    status: jest.fn().mockReturnThis() 
};

it('test updateVetProfile - success case', async () => {
    const mockedVet = {
        _id: '6603d637b4fcb1455618f21e',
        name: 'Steve Smith',
        email: 'steve@gmail.com',
        qualification: 'PhD, Pet University of Biological Science',
        workplace: 'Researcher @ Vet',
        password: "pets"
    };

    vet_model.findByIdAndUpdate.mockResolvedValueOnce(mockedVet); 

    await updateVetProfile(request, response);

    expect(response.json).toHaveBeenCalledWith(mockedVet); 
});

it('test updateVetProfile - profile not found', async () => {
    vet_model.findByIdAndUpdate.mockResolvedValueOnce(null); 

    await updateVetProfile(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Vet not found' });
});

it('test updateVetProfile - internal server error', async () => {
    vet_model.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error')); 

    await updateVetProfile(request, response);

    expect(response.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
});
