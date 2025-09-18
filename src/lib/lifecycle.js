import { rollD } from './utils.js';

// Determine birth year based on year of marriage and person's gender
export function getbyear(married, gender) {
    var mage;

    mage = rollD(9)+12; // women (who are likely to produce progeny) marry from age 13-21

    if (gender=="M") {	 // if male, potentially add a few years
	for (var i=0; i < 5; i++) {
	    mage += rollD(4)-1;
	}
    }

    var birth = married - mage;

    return birth;
}

export function getmage(gender) {
    return Math.abs(getbyear(0,gender))
}

export function getdage(myear , mage) { // get age they die at
    var temp1a = rollD(20);
    var temp1b = rollD(20);
    var temp1;
    (temp1a < temp1b) ? temp1=temp1a : temp1=temp1b; // temp1 is the low of 2d20

    var temp2=rollD(8);

    var dage;
    if (temp2<5) {  // 50% dies as a child or teenager
	dage=temp1;
    } // this is to shape the prob curve of deaths
    else if (temp2<7) {
	dage=temp1a+20;  // 25% die in their 20-30's
    }
    else if (temp2==7) { // 12.5% die in their 40-50's
	dage=temp1a+40;
    }
    else if (temp2==8) { // 12.5% die in their 60-70's
	dage=temp1a+60;
    }

    if (dage && mage) {  // Generating spouse, so should be alive when married...
	while (dage < mage) {   // if died before married, set to marriage.
	    dage = mage;
	}
    }

    var death = dage;
    return death;
}

export function getfert(fertyear) { // return fertility based on age
    var chance = 0;
    if (fertyear<14) {chance=10;}
    if (fertyear==14) {chance=20;}
    if (fertyear==15) {chance=40;}
    if (fertyear==16) {chance=60;}
    if (fertyear==17) {chance=80;}
    if (fertyear>17 && fertyear<30) {chance=98;}
    if (fertyear>30 && fertyear<35) {chance=80;}
    if (fertyear>35 && fertyear<40) {chance=40;}
    if (fertyear>40 && fertyear<45) {chance=20;}
    if (fertyear>44) {chance=3;}
    if (fertyear>52) {chance=1;}  // Only non-zero because of magic.

    return chance;
}
