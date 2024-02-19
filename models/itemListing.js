const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        name: 'Mind Goblin',
        image: './public/images/mindgoblin.jpg',
        condition: 'LP',
        category: 'TCG',
        subcategory: 'Magical Meeting',
        price: 3.25,
        posted: DateTime.fromISO('2024-01-24T17:30:000').toFormat('ff')
    },
    {
        id: '2',
        name: 'Gisele, Heiress of Winds',
        image: './public/images/gisele.jpg',
        condition: 'MP',
        category: 'TCG',
        subcategory: 'Magical Meeting',
        price: 1.50,
        posted: DateTime.fromISO('2024-01-25T17:30:000').toFormat('ff')
    },
    {
        id: '3',
        name: 'Bazooka Cannon',
        image: './public/images/bazookacannon.jpg',
        condition: 'NM',
        category: 'TCG',
        subcategory: 'CardBattle',
        price: 11.25,
        posted: DateTime.fromISO('2024-01-26T17:30:000').toFormat('ff')
    },
    {
        id: '4',
        name: 'Tarot Themed (54pcs)',
        image: './public/images/tarot.jpg',
        condition: 'NM',
        category: 'Playing',
        subcategory: 'Themed',
        price: 18.65,
        posted: DateTime.fromISO('2024-01-27T17:30:000').toFormat('ff')
    },
    {
        id: '5',
        name: 'Replacement Jokers (2)',
        image: './public/images/jokers.jpg',
        condition: 'NM',
        category: 'Playing',
        subcategory: '',
        price: 0.17,
        posted: DateTime.fromISO('2024-01-28T17:30:000').toFormat('ff')
    },
    {
        id: '6',
        name: 'Matthew Tkachuk',
        image: './public/images/matthewtkachuk.jpg',
        condition: 'NM (PSA 9.5)',
        category: 'Sports',
        subcategory: 'NHL',
        price: 550.00,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
];

//Initializes array for use in webpages
exports.find = () => items;
exports.findById = id => items.find(item => item.id === id);

//Creates new ID for item and saves it to array
exports.save = function(item) {
    item.id = uuidv4();
    item.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    items.push(item);
};

//Updates item by ID and overwrites in array
exports.updateById = function(id, newItem) {
    let item = items.find(item => item.id === id);
    if(item) {
        item.image = newItem.image;
        item.price = newItem.price;
        return true;
    } else {
        return false;
    }
};

//Deletes item by id by splicing from array
exports.deleteById = function(id) {
    let index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        return true;
    } else {
        return false;
    }
};