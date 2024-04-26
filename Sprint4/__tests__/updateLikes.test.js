
const {updateLikes} = require("../controller/posts_controller.js");
const posts_model = require("../model/models/posts_model.js");

jest.mock('../model/models/posts_model.js');

const request = {
    body: { post_id: '661286fb7bc6d2ab4bc99948', newLikes: 20 }
}

const response = {
    json: jest.fn((x) => x)
};

it('test updateLikes', async () => {

    const mockedUser = {
        "_id": {
          "$oid": "661286fb7bc6d2ab4bc99948"
        },
        "image": "file_1712490235423.jpg",
        "likes": 20,
        "comments": [
          [
            "Ridwan Noor",
            "bhab"
          ],
          [
            "Tom Cruise",
            "comment1"
          ],
          [
            "Abtahi Noor",
            "Nice"
          ],
          [
            "Abtahi Noor",
            "Its nice"
          ]
        ],
        "__v": 0,
        "caption": "Model Goldie",
        "type": "normalPost",
        "userName": "Ridwan Noor"
    }

    posts_model.findOneAndUpdate.mockResolvedValueOnce(mockedUser);

    await updateLikes(request, response);
    //expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith("Updated Likes");
});