var Chance = require('chance');

export const Orders = (user) => {
    var result = [];
    var threeWeeksInMilliseconds = 3 * 7 * 24 * 60 * 60 * 1000;
    var chance = new Chance(user);

    for(var i = 0; i < 100; i++){
        const order = {
            "id": i,
            "itemName": chance.country({full: true}) + " " + chance.word({syllables: 5}) + " " + chance.animal(),
            "numberOfItems": chance.integer({min: 1, max: 10}),
            "price": chance.integer({min: 0, max: 500}) + chance.floating({min: 0.97, max: 0.99, fixed: 2}),
            "date": new Date(Date.now() - chance.integer({min: 0, max: threeWeeksInMilliseconds})).toISOString().split("T")[0],
            "time": chance.hour({twentyfour: true}) + ":" + chance.minute() + ":" + chance.second(),
            "paid": chance.bool({likelihood: 70}),
            "sent": chance.bool({likelihood: 40}),
            "returned": chance.bool({likelihood: 10})
        }

        result.push(order);
    }

    return result;
}