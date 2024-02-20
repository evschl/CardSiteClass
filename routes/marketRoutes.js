const express = require('express');
const router = express.Router();
const controller = require('../controllers/marketController');

//GET /items: Send all items to the user
router.get('/', controller.index);

//GET /items/new: Send html for creating a new item
router.get('/new', controller.new);

//POST /items: Create a new item
router.post('/', controller.create);

//GET /items/:id: Send item information by id
router.get('/:id', controller.show);

//GET /items/:id/edit: Send html form for editing existing item by id
router.get('/:id/edit', controller.edit);

//PUT /items/:id: Update item by id
router.put('/:id', controller.update);

//DELETE /items/:id: Delete item by id
router.delete('/:id', controller.delete);

module.exports = router;