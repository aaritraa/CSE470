const services_model = require("../model/models/services_model.js");
const cart_model = require("../model/models/cart_model.js");

const showServices = (req, res) => {

    services_model.find()
        .then((services) => {
            console.log(services);
            res.json(services);
        })
        .catch( err => res.json(err) )


    // services_model.find({}, (err, services) => {
    //     if (err) {
    //         console.error("Error finding services:", err);
    //         return res.status(500).json({ error: "Internal Server Error" });
    //     }
    //     res.json(services);
    // });
};


const addToCart = async (req, res) => {
    try {
      const { userEmail, product, providerEmail, amount } = req.body;
      const status = 'pending';
  
      // Create a new entry in the cart model
      const newCartItem = new cart_model({
        email: userEmail,
        userEmail,
        product,
        providerEmail,
        amount,
        status
      });
  
      // Save the new entry
      await newCartItem.save();
  
      res.status(201).json({ message: 'Item added to cart successfully', data: newCartItem });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    showServices,
    addToCart
};