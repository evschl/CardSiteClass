const model = require('../models/itemListing');

//GET /items: Send user to marketplace
exports.index = (req, res) => {
    let items = model.find();
    res.render('./items/index', {items});
};

//GET /items/new: Send html for creating a new item
exports.new = (req, res) => {
    res.render('./items/new');
};

//POST /items: Create a new item
exports.create = (req, res) => {
    let item = req.body;
    model.save(item);
    res.redirect('/items');
}

//GET /items/:id: Send the details of an item identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item){
        res.render('./items/item', {item});
    }else{ 
        let err = new Error("Cannot find an item with id " + id + ".");
        err.status = 404;
        next(err);
    }
};

//GET /items/:id/edit: Send html form for editing an existing item
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./item/edit', {item});
    } else {
        let err = new Error("Cannot find item with id " + id + ".");
        err.status = 404;
        next(err);
    }
};

//PUT /items/:id: Update item by id
exports.update = (req, res, next) => {
    let item = req.body;
    let id = req.params.id;
    if(model.updateById(id, item)) {
        res.redirect('/items/' + id);
    } else {
        let err = new Error("Cannot find item with id " + id + ".");
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/items');
    } else {
        let err = new Error("Cannot find item with id " + id + ".");
        err.status = 404;
        next(err);
    }
}