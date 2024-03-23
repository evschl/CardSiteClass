const model = require('../models/itemListing');

//GET /items: Send user to marketplace
exports.index = (req, res, next) => {
    model.find()
    .then(items=>res.render('./card/index', {items}))
    .catch(err=>next(err));
};

//GET /items/new: Send html for creating a new item
exports.new = (req, res) => {
    res.render('./card/new');
};

//POST /items: Create a new item
exports.create = (req, res, next) => {
    let item = new model(req.body);
    item.save()
    .then(item=>res.redirect('/items'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
}

//GET /items/:id: Send the details of an item identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid item id');
        err.status = 404;
        return next(err);
    }

    model.findById(id)
    .then(item=>{
        if(item) {
            res.render('./card/show', {item});
        } else {
            let err = new Error('Cannot find item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//GET /items/:id/edit: Send html form for editing an existing item
exports.edit = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid item id');
        err.status = 404;
        return next(err);
    }

    model.findById(id)
    .then(item=>{
        if(item) {
            return res.render('./card/edit', {item});
        } else {
            let err = new Error("Cannot find item with id " + id + ".");
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//PUT /items/:id: Update item by id
exports.update = (req, res, next) => {
    let item = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid item id');
        err.status = 404;
        return next(err);
    }

    model.findByIdAndUpdate(id, item, {useFindAndModify: false, runValidators: true})
    .then(item=>{
        if(item) {
            res.redirect('/items/' + id);
        } else {
            let err = new Error("Cannot find item with id " + id + ".");
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid item id');
        err.status = 404;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(item=>{
        if(item) {
            res.redirect('/items');
        } else {
            let err = new Error("Could not find item with id " + id + ".");
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};