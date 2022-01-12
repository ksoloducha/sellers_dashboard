var Chance = require('chance');

export const Orders = (user) => {
    var result = [];

    var chance = new Chance(user);

    for(var i = 0; i < 25; i++){
        const order = {
            "id": i,
            "itemName": chance.country({full: true}) + " " + chance.word({syllables: 5}) + " " + chance.animal(),
            "numberOfItems": chance.integer({min: 1, max: 10}),
            "price": chance.integer({min: 0, max: 500}) + chance.floating({min: 0.97, max: 0.99, fixed: 2}),
            "date": chance.date({string: true, year: 2021}),
            "paid": chance.bool({likelihood: 70}),
            "sent": chance.bool({likelihood: 40}),
            "returned": chance.bool({likelihood: 10})
        }

        result.push(order);
    }

    return result;
}