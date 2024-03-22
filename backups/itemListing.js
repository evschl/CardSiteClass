//mongodb+srv://eschlee:<password>@cluster0.bk7hkvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        active: true,
        name: 'Mind Goblin',
        image: 'mindgoblin.jpg',
        condition: 'LP',
        category: 'TCG',
        subcategory: 'Magical Meeting',
        price: '3.25',
        details: "Details go here",
        totalOffers: 0,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: '2',
        active: true,
        name: 'Gisele, Heiress of Winds',
        image: 'gisele.jpg',
        condition: 'MP',
        category: 'TCG',
        subcategory: 'Magical Meeting',
        price: '1.50',
        details: "Details go here",
        totalOffers: 0,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: '3',
        active: true,
        name: 'Bazooka Cannon',
        image: 'bazookacannon.jpg',
        condition: 'NM',
        category: 'TCG',
        subcategory: 'CardBattle',
        price: '11.25',
        details: "Details go here",
        totalOffers: 0,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: '4',
        active: true,
        name: 'Tarot Themed (54pcs)',
        image: 'tarot.jpg',
        condition: 'NM',
        category: 'Playing',
        subcategory: 'Themed',
        price: '18.65',
        details: "Details go here",
        totalOffers: 0,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: '5',
        active: true,
        name: 'Replacement Jokers (2)',
        image: 'jokers.jpg',
        condition: 'NM',
        category: 'Playing',
        subcategory: '',
        price: '0.17',
        details: "Details go here",
        totalOffers: 0,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
    {
        id: '6',
        active: true,
        name: 'Matthew Tkachuk',
        image: 'matthewtkachuk.jpg',
        condition: 'NM (PSA 9.5)',
        category: 'Sports',
        subcategory: 'NHL',
        price: '550.00',
        details: "Details go here",
        totalOffers: 0,
        posted: DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    },
];

//Initializes array for use in webpages
exports.find = () => items;
exports.findById = id => items.find(item => item.id === id);
exports.findByName = name => items.find(item => item.id === items.find(item => item.name.search(name) != -1).id);

//Prints the id of an item that contains a given substring
//console.log(items.find(item => item.name.search("Tka") != -1).id);

//Creates new ID for item and saves it to array
exports.save = function(item) {
    item.id = uuidv4();
    item.active = true;
    item.image = "#";
    item.totalOffers = 0;
    item.posted = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
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