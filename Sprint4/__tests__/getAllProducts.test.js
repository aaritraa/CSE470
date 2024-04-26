
const {getAllProducts} = require("../controller/products_controller.js");
const products_model = require("../model/models/products_model.js");

jest.mock('../model/models/products_model.js');

const request = {
    body: {}
}

const response = {
    json: jest.fn((x) => x)
};

it('test getAllProducts', async () => {

    const mock = {
        "_id": {
          "$oid": "6612897c7bc6d2ab4bc9b0c4"
        },
        "image": "file_1712490876638.jpg",
        "__v": 0,
        "description": "A protein-rich diet with the first 3-4 ingredients being proteins from animal sources Low carb and low-glycemic ingredients to provide stable energy levels Patented GanedenBC³⁰ probiotic for digestive and immune health Made without grains, white potatoes, corn, tapioca or wheat.",
        "price": "1200",
        "title": "High Meat Kibble"
    }

    products_model.find.mockResolvedValueOnce(mock);

    await getAllProducts(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mock);
});