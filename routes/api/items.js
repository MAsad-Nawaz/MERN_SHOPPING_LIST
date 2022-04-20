const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');


//Item Model
const Item = require('../../modals/Item');

//@router Get api/items
//@desc Get All Items
//@acess Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

//@router POST api/items
//@desc Create A Item
//@acess Private
router.post('/', auth, async (req, res) => {
    // const newItem = new Item({
    //     name:req.body.name
    // });
    // newItem.save().then(item=>res.json(item));
    const newItem = new Item({
        name: req.body.name
    });

    try {
        const item = await newItem.save();
        if (!item) throw Error('Something went wrong saving the item');

        res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//@router DELETE api/items/:id
//@desc DELETE A Item
//@acess Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item =>
            item.remove()
                .then(
                    () => res.json({ sucess: true }
                    )))
        .catch(err => res.status(400).json({ sucess: false }));

});

module.exports = router;