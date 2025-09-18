// Roll a D-sided dice, resulting in a number from 1 to D.
export function rollD(sides) {
    return Math.round(Math.random() * (sides-1)) + 1;
}

// random gender
export function randgen() {
    var gen;
    (rollD(6)<4) ? gen ="M" : gen="F";
    return gen;
}

// flip gender (for the spouse) if one is given
export function getOppositeGender(gender) {
    var newgen = "";
    switch(gender) {			 // otherwise randomize it
    case "M": newgen = "F";break;
    case "F": newgen = "M";break;
    default:newgen = randgen();
    }
    return newgen;
}
