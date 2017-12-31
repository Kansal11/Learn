var priceList = require('./prices.json');


function compare(current,next) {
    return next.price - current.price; 
}

function findTop3Prices () {
    priceList.sort(compare);
    //console.log(priceList.slice(0,3));
    return priceList.slice(0,3);
}

findTop3Prices();
  
  

