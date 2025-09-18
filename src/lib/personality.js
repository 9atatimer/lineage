import { rollD } from './utils.js';

function typeEI() { // these are the 4 axis of the Myers-Briggs personality types
    var EI="";
    var roll=""; // their distribution should approximate the frequency they
    roll = rollD(4);	// occur in real life.
    (roll>1) ? EI="E" :	EI="I";
    return EI;
}
function typeSN() {
    var SN="";
    var roll="";
    roll = rollD(4);
    (roll>1) ? SN="S" : SN="N";
    return SN;
}
function typeTF() {
    var TF="";
    var roll="";
    roll = rollD(2);
    (roll==2) ?	TF="T" : TF="F";
    return TF;
}

function typeJP() {
    var JP="";
    var roll="";
    roll = rollD(2);
    (roll==2) ? JP="J":	JP="P";
    return JP;
}

export function goGetPType() {
    var EI=typeEI();
    var SN=typeSN();
    var TF=typeTF();
    var JP=typeJP();
    var pType=EI+SN+TF+JP;
    return pType;
}

export function getPTypeName(pType) { //apply label to personality type
    var typeName = "";
    switch (pType) {
    case "ISFP": typeName="(Artisan/Composer)"; break;
    case "ISTP": typeName="(Artisan/Crafter)"; break;
    case "ESFP": typeName="(Artisan/Performer)"; break;
    case "ESTP": typeName="(Artisan/Promoter)"; break;
    case "ISFJ": typeName="(Guardian/Protector)"; break;
    case "ISTJ": typeName="(Guardian/Inspector)"; break;
    case "ESFJ": typeName="(Guardian/Provider)"; break;
    case "ESTJ": typeName="(Guardian/Supervisor)"; break;
    case "INFP": typeName="(Idealist/Healer)"; break;
    case "INFJ": typeName="(Idealist/Counselor)"; break;
    case "ENFP": typeName="(Idealist/Champion)"; break;
    case "ENFJ": typeName="(Idealist/Teacher)"; break;
    case "INTP": typeName="(Rational/Architect)"; break;
    case "INTJ": typeName="(Rational/Mastermind)"; break;
    case "ENTP": typeName="(Rational/Inventor)"; break;
    case "ENTJ": typeName="(Rational/Field Marshal)"; break;
    default: typeName=" --Oops! I didn't get the type";
    }
    return typeName;
}
