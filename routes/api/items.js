const express = require("express");
const router = express.Router();


//Item Model
const Item = require('../../modals/Item');

//@router Get api/items
//@desc Get All Items
//@acess Public
router.get('/',(req,res)=>{
    Item.find()
        .sort({date:-1})
        .then(items=>res.json(items));
});

//@router POST api/items
//@desc Create A Item
//@acess Public
router.post('/',(req,res)=>{
    const newItem = new Item({
        name:req.body.name
    });
    newItem.save().then(item=>res.json(item));
});

//@router DELETE api/items/:id
//@desc DELETE A Item
//@acess Public
router.delete('/:id',(req,res)=>{
   Item.findById(req.params.id)
   .then(item => 
    item.remove()
    .then(
        ()=>res.json({sucess:true}
    )))
    .catch(err=>res.status(400).json({sucess:false}));
    
});

module.exports = router;