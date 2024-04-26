const { addToCart } = require("../controller/services_controller.js");
const cart_model = require("../model/models/cart_model.js");

jest.mock("../model/models/cart_model.js");

const request = {
    body: {
      userEmail: "testuser@example.com",
      product: "Test Product",
      providerEmail: "provider@example.com",
      amount: 1,
    },
  };
  
  const response = {
    status: jest.fn().mockReturnThis(), // Allows chaining
    json: jest.fn(),
  };
  
  describe("addToCart Function", () => {
    it("should add item to cart successfully", async () => {
      const mockCartItem = {
        _id: "60c72b2f4f1a462884f1aabc",
        userEmail: "testuser@example.com",
        product: "Test Product",
        providerEmail: "provider@example.com",
        amount: 1,
        status: "pending",
      };

      const newItem = new cart_model(); 
      newItem.save = jest.fn().mockResolvedValue(mockCartItem);

      cart_model.mockImplementation(() => newItem);

      await addToCart(request, response);
  
      
  
      expect(response.json).toHaveBeenCalledWith({
        message: "Item added to cart successfully",
        data: newItem, 
      });
    });
  
    
  });