const posts_model = require("../model/models/posts_model.js") 



// getAllPosts
const getAllPosts = (req, res) => {
    //console.log('in')
    //console.log("getAllPosts, req.body= ", req.body)
    posts_model.find()
        .then(posts => {
            //console.log("res.json= ", posts)
            res.json(posts)
        })
        .catch(err => res.json(err))
}

const updateLikes = (req, res) => {
    //const post_id = req.params.id;
    const { post_id, newLikes } = req.body
    console.log("updateLikes, req.body= ", req.body)
    posts_model.findOneAndUpdate({ _id: post_id }, { likes: newLikes })
        .then(res.json("Updated Likes"))
        .catch(err => res.json(err))
}

const updateComments =(req,res) =>{
    //console.log('in')
    //const post_id = req.params.id;
    const { post_id, userName, newComment } = req.body
    //console.log(userName)
    //console.log("updateComments, req.body= ", req.body)
    const commentArray = [userName, newComment]
    posts_model.findByIdAndUpdate({_id: post_id}, {$push:{comments:commentArray} }, { new: true })
        .then((resp) => {
            //console.log("res.json= ", resp)
            res.json(resp)
            //console.log(post_id)
            
        })
        .catch(err => res.json(err))
}


module.exports = {
    getAllPosts,
    updateLikes,
    updateComments
    
}