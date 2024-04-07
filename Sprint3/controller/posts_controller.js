const posts_model = require("../model/models/posts_model.js") 



// getAllPosts
const getAllPosts = (req, res) => {
    //console.log('in')
    posts_model.find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
}

const updateLikes = (req, res) => {
    //const post_id = req.params.id;
    const { post_id, newLikes } = req.body
    posts_model.findOneAndUpdate({ _id: post_id }, { likes: newLikes })
        .then(res.json("Updated Likes"))
        .catch(err => res.json(err))
}

const updateComments =(req,res) =>{
    //console.log('in')
    //const post_id = req.params.id;
    const { post_id, userName, newComment } = req.body
    console.log(userName)

    const commentArray = [userName, newComment]
    posts_model.findByIdAndUpdate({_id: post_id}, {$push:{comments:commentArray} }, { new: true })
        .then((res) => {
            res.json(res)
            console.log(post_id)
            console.log(res.data)
        })
        .catch(err => res.json(err))
}


module.exports = {
    getAllPosts,
    updateLikes,
    updateComments
    
}