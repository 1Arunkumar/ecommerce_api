const Product = require('../models/product');

// function to show all the products
module.exports.products = function(req, res){
    Product.find({}, function(err, foundProducts){
        if(err){
            res.send(err);
        }else{
            res.send(foundProducts);
        }
    });
}

// function to create a new product
module.exports.create = function(req, res){
    const newProduct = new Product({
        name: req.body.name,
        quantity: req.body.quantity
    });
    newProduct.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.send('New product added successfully.');
        }
    });
}

// function to delete a product using it's ID
module.exports.delete = function(req, res){
    Product.deleteOne(
        {_id: req.params.productID},
        function(err){
            if(err){
                res.send(err);
            }else{
                res.send({
                    message: "Product deleted"
                });
            }
        });
}

// function to update a product's quantity
module.exports.updateQunatity = async function(req, res){
   
       try {
        const ID = req.params.productID;
        // find the product using id
       let found=  await Product.findById(ID)
        const newQty = parseInt(found.quantity) + parseInt(req.query.number);
        // update the product's quantity
       let updatedProduct= await Product.findByIdAndUpdate(ID, {quantity: newQty})
            
                updatedProduct.quantity = newQty;
                res.send({
                    product: updatedProduct,
                    message: 'updated successfully'
                });
            
        

       } catch (error) {
        return res.send(error);
       }
            // Note - To increment the quantity of the product put number as a positive value in the query 
            //        and to decrement the quantity put the number as negative value in the query
        }
    
