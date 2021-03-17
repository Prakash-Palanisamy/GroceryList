const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


mongoose.connect('mongodb://localhost:27017/capstone-project-1', { useNewUrlParser: true , useUnifiedTopology: true }, () =>
{
    console.log("Sever connected check localhost:5000");
})

const grocerySchema = new mongoose.Schema({
    groceryItem: String,
    isPurchased: Boolean,
});


const Grocery = mongoose.model("grocery", grocerySchema);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/grocery/add", async (req, res) =>{
  const grocery = new Grocery ({
    groceryItem: req.body.groceryItem,
    isPurchased:req.body.isPurchased,
  })
 try{
    const data= await grocery.save()
    res.json(data)
 }catch(err){
   res.send('Error')
 }
});


  app.get("/grocery/getAll", async (req, res) => {
    const allGroceryItems = await Grocery.find({})
    res.json({
        allGroceryItems
    });
  });
  

  app.put("/grocery/updatePurchaseStatus", async (req, res) =>{
    const id =req.body._id;
   try{
      const grocery = await Grocery.findById(id)
          grocery.isPurchased= req.body.isPurchased
          
      const data= await grocery.save()
      res.send({result: 'Item updated successfully'})
   }catch(err){
     res.send('Error')
   }
  });


    
  app.delete("/grocery/deleteGroceryItem", async (req,res) => {
    const id =req.body._id;
    await Grocery.findByIdAndRemove(id).exec();
    res.send({result: 'Item deleted successfully'});
  });
  

const db = mongoose.connection;

db.once("open", () => {
  app.listen(5000);
});