var bikesList = require('./bikes.json');

var availableCombinations = [{'combo':bikesList[0].bikes,count:1}];

function findMostPopularBikes() {
    //console.log(new Date().getTime());
    for(var i=1, len=bikesList.length; i<len; i++ ) {
        for(var j=0, totalCombo = availableCombinations.length; j<totalCombo; j++) {
            var isSame = compare(bikesList[i].bikes,availableCombinations[j].combo);
            if(isSame) {
                availableCombinations[j].count++;
                break;
            }          
        }
        if(j === totalCombo){
            availableCombinations.push({'combo':bikesList[i].bikes,count:1});
        }
    }
    var sortedBikeList = availableCombinations.sort((current,next) => next.count - current.count)
    //console.log(sortedBikeList);
    //console.log(new Date().getTime());
    return sortedBikeList.slice(0,20); 
}

function compare(a,b) {
    if(a.length !== b.length) {
        return false;
    }
    a.forEach(element => {
        if(b.indexOf(element) == -1) {
            return false;
        }
    });
    return true;
}

findMostPopularBikes();