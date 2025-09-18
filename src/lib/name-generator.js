import { rollD } from './utils.js';

function getJalname() {
    var syl = rollD(2) + rollD(2) + rollD(2) - 2;
    var count = 0;
    var jname = "";
    while (count < syl) {
	jname = jname + getSyl();
	count++;
    }
    return jname;
}

function getSyl() {
    var roll = rollD(75)-1;
    var sylabs=["ka", "ki", "ku", "ke", "ko",
		"a", "i", "u", "e", "o",
		"ta", "chi", "tsu", "te", "to",
		"ra", "ri", "ru", "re", "ro",
		"sa", "shi", "su", "se", "so",
		"ma", "mi", "mu", "me", "mo",
		"ya", "ya", "yu", "yo", "yo",
		"na", "ni", "nu", "ne", "no",
		"ha", "hi", "hu", "he", "ho",
		"ta", "chi", "tsu", "te", "to",
		"ra", "ri", "ru", "re", "ro",
		"sa", "shi", "su", "se", "so",
		"ma", "mi", "mu", "me", "mo",
		"wa", "wi", "wu", "we", "wo",
		"n", "n", "n", "n", "n" ];
    return sylabs[roll];
}

function getEffname() {
    var ccount = 0;
    var vcount = 0;
    var vanna = "";
    var roll=0;
    roll=rollD(6);
    if (roll<4) {
	vanna=get1vowel(); //does the name start with a vowel or a consonant?
	vcount++;
    }
    else {
	vanna=get1con();
	ccount++;
    }
    var count = 0;
    var letLength=rollD(6)+1; //sets length of name from 3 to 8 letters.
    while (count < letLength)
    {
	if (ccount>1) {
	    vanna=vanna+getvowels();	 //no more than 2 vowels or consonants together
	    ccount=0;vcount++;
	}
	else if (vcount>1) {
	    vanna=vanna+getcons();
	    vcount=0;ccount++;
	}
	else {
	    roll=0;
	    roll=rollD(6);
	    if (roll<4) {
		vanna=vanna+getvowels();
		vcount++;
	    }
	    else {
		vanna=vanna+getcons();
		ccount++;
	    }
	}
	count++;
    }
    return(vanna);
}

function get1vowel() { // The frequency of letters should roughly approximate their
    var roll=0;				 // occurance in the English language.
    roll=rollD(10)-1;
    var firstvowel=["A","A","A","E","E","I","I","O","U","Y"];
    return firstvowel[roll];
}
function get1con() {
    var roll=0;
    roll=rollD(30)-1;
    var firstcon=["B","C","D","F","G","H","J","K","L","L","L","L","M","N","P","Q","R","R","R","R","S","S","S","T","V","W","X","Y","Y","Z"];
    return firstcon[roll];
}
function getvowels() {
    var roll=0;
    roll=rollD(10)-1;
    var vowels=["a","a","a","e","e","i","i","o","u","y"];
    return vowels[roll];
}
function getcons() {
    var roll=0;
    roll=rollD(30)-1;
    var cons=["b","c","d","f","g","h","j","k","l","l","l","l","m","n","p","q","r","r","r","r","s","s","s","t","v","w","x","y","y","z"];
    return cons[roll];
}

export function getname(person) {
    if (person.gender == "M") {
	return getEffname();
    }
    return getJalname();
}
