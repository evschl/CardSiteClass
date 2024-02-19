const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        name: 'Mind Goblin',
        condition: 'LP',
        category: 'TCG',
        subcategory: 'Magical Meeting',
        posted: DateTime.fromISO('2024-01-24T17:30:000').toFormat('ff')
    },
    {
        id: '2',
        name: 'Gisele, Heiress of Winds',
        condition: 'MP',
        category: 'TCG',
        subcategory: 'Magical Meeting',
        posted: DateTime.fromISO('2024-01-25T17:30:000').toFormat('ff')
    },
    {
        id: '3',
        name: 'Bazooka Cannon',
        condition: 'NM',
        category: 'TCG',
        subcategory: 'CardBattle',
        posted: DateTime.fromISO('2024-01-26T17:30:000').toFormat('ff')
    },
    {
        id: '4',
        name: 'Tarot Themed (54pcs)',
        condition: 'NM',
        category: 'Playing',
        subcategory: 'Themed',
        posted: DateTime.fromISO('2024-01-27T17:30:000').toFormat('ff')
    },
    {
        id: '5',
        name: 'Replacement Jokers (2)',
        condition: 'NM',
        category: 'Playing',
        subcategory: '',
        posted: DateTime.fromISO('2024-01-28T17:30:000').toFormat('ff')
    },
    {
        id: '6',
        name: 'Matthew Tkachuk',
        condition: 'NM (PSA 9.5)',
        category: 'Sports',
        subcategory: 'NHL',
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
        item.name = newItem.name;
        item.details = newItem.details;
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