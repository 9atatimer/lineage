(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/lib/seedrandom.js
  (function(global, pool, math, width, chunks, digits, module2, define2, rngname) {
    var startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto;
    var impl = math["seed" + rngname] = function(seed, options, callback) {
      var key = [];
      options = options == true ? { entropy: true } : options || {};
      var shortseed = mixkey(flatten(
        options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed,
        3
      ), key);
      var arc4 = new ARC4(key);
      mixkey(tostring(arc4.S), pool);
      return (options.pass || callback || // If called as a method of Math (Math.seedrandom()), mutate Math.random
      // because that is how seedrandom.js has worked since v1.0.  Otherwise,
      // it is a newer calling convention, so return the prng directly.
      function(prng, seed2, is_math_call) {
        if (is_math_call) {
          math[rngname] = prng;
          return seed2;
        } else return prng;
      })(
        // This function returns a random double in [0, 1) that contains
        // randomness in every bit of the mantissa of the IEEE 754 value.
        function() {
          var n = arc4.g(chunks), d = startdenom, x = 0;
          while (n < significance) {
            n = (n + x) * width;
            d *= width;
            x = arc4.g(1);
          }
          while (n >= overflow) {
            n /= 2;
            d /= 2;
            x >>>= 1;
          }
          return (n + x) / d;
        },
        shortseed,
        "global" in options ? options.global : this == math
      );
    };
    function ARC4(key) {
      var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
      if (!keylen) {
        key = [keylen++];
      }
      while (i < width) {
        s[i] = i++;
      }
      for (i = 0; i < width; i++) {
        s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
        s[j] = t;
      }
      (me.g = function(count) {
        var t2, r = 0, i2 = me.i, j2 = me.j, s2 = me.S;
        while (count--) {
          t2 = s2[i2 = mask & i2 + 1];
          r = r * width + s2[mask & (s2[i2] = s2[j2 = mask & j2 + t2]) + (s2[j2] = t2)];
        }
        me.i = i2;
        me.j = j2;
        return r;
      })(width);
    }
    function flatten(obj, depth) {
      var result = [], typ = typeof obj, prop;
      if (depth && typ == "object") {
        for (prop in obj) {
          try {
            result.push(flatten(obj[prop], depth - 1));
          } catch (e) {
          }
        }
      }
      return result.length ? result : typ == "string" ? obj : obj + "\0";
    }
    function mixkey(seed, key) {
      var stringseed = seed + "", smear, j = 0;
      while (j < stringseed.length) {
        key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
      }
      return tostring(key);
    }
    function autoseed(seed) {
      try {
        if (nodecrypto) return tostring(nodecrypto.randomBytes(width));
        global.crypto.getRandomValues(seed = new Uint8Array(width));
        return tostring(seed);
      } catch (e) {
        return [
          +/* @__PURE__ */ new Date(),
          global,
          (seed = global.navigator) && seed.plugins,
          global.screen,
          tostring(pool)
        ];
      }
    }
    function tostring(a) {
      return String.fromCharCode.apply(0, a);
    }
    mixkey(math[rngname](), pool);
    if (module2 && module2.exports) {
      module2.exports = impl;
      try {
        nodecrypto = __require("crypto");
      } catch (ex) {
      }
    } else if (define2 && define2.amd) {
      define2(function() {
        return impl;
      });
    }
  })(
    void 0,
    // global window object
    [],
    // pool: entropy pool starts empty
    Math,
    // math: package containing random, pow, and seedrandom
    256,
    // width: each RC4 output is 0 <= x < 256
    6,
    // chunks: at least six RC4 outputs for each double
    52,
    // digits: there are 52 significant digits in a double
    typeof module == "object" && module,
    // present in node.js
    typeof define == "function" && define,
    // present with an AMD loader
    "random"
    // rngname: name for Math.random and Math.seedrandom
  );

  // src/lib/config.js
  var RATE_married = 97;
  var RATE_remarry_barren = 15;
  var RATE_remarry_single = 5;
  var RATE_remarry_heirs = 3;
  var RATE_bachelor = 4;

  // src/lib/utils.js
  function rollD(sides) {
    return Math.round(Math.random() * (sides - 1)) + 1;
  }
  function randgen() {
    var gen;
    rollD(6) < 4 ? gen = "M" : gen = "F";
    return gen;
  }
  function getOppositeGender(gender) {
    var newgen = "";
    switch (gender) {
      // otherwise randomize it
      case "M":
        newgen = "F";
        break;
      case "F":
        newgen = "M";
        break;
      default:
        newgen = randgen();
    }
    return newgen;
  }

  // src/lib/personality.js
  function typeEI() {
    var EI = "";
    var roll = "";
    roll = rollD(4);
    roll > 1 ? EI = "E" : EI = "I";
    return EI;
  }
  function typeSN() {
    var SN = "";
    var roll = "";
    roll = rollD(4);
    roll > 1 ? SN = "S" : SN = "N";
    return SN;
  }
  function typeTF() {
    var TF = "";
    var roll = "";
    roll = rollD(2);
    roll == 2 ? TF = "T" : TF = "F";
    return TF;
  }
  function typeJP() {
    var JP = "";
    var roll = "";
    roll = rollD(2);
    roll == 2 ? JP = "J" : JP = "P";
    return JP;
  }
  function goGetPType() {
    var EI = typeEI();
    var SN = typeSN();
    var TF = typeTF();
    var JP = typeJP();
    var pType = EI + SN + TF + JP;
    return pType;
  }
  function getPTypeName(pType) {
    var typeName = "";
    switch (pType) {
      case "ISFP":
        typeName = "(Artisan/Composer)";
        break;
      case "ISTP":
        typeName = "(Artisan/Crafter)";
        break;
      case "ESFP":
        typeName = "(Artisan/Performer)";
        break;
      case "ESTP":
        typeName = "(Artisan/Promoter)";
        break;
      case "ISFJ":
        typeName = "(Guardian/Protector)";
        break;
      case "ISTJ":
        typeName = "(Guardian/Inspector)";
        break;
      case "ESFJ":
        typeName = "(Guardian/Provider)";
        break;
      case "ESTJ":
        typeName = "(Guardian/Supervisor)";
        break;
      case "INFP":
        typeName = "(Idealist/Healer)";
        break;
      case "INFJ":
        typeName = "(Idealist/Counselor)";
        break;
      case "ENFP":
        typeName = "(Idealist/Champion)";
        break;
      case "ENFJ":
        typeName = "(Idealist/Teacher)";
        break;
      case "INTP":
        typeName = "(Rational/Architect)";
        break;
      case "INTJ":
        typeName = "(Rational/Mastermind)";
        break;
      case "ENTP":
        typeName = "(Rational/Inventor)";
        break;
      case "ENTJ":
        typeName = "(Rational/Field Marshal)";
        break;
      default:
        typeName = " --Oops! I didn't get the type";
    }
    return typeName;
  }

  // src/lib/name-generator.js
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
    var roll = rollD(75) - 1;
    var sylabs = [
      "ka",
      "ki",
      "ku",
      "ke",
      "ko",
      "a",
      "i",
      "u",
      "e",
      "o",
      "ta",
      "chi",
      "tsu",
      "te",
      "to",
      "ra",
      "ri",
      "ru",
      "re",
      "ro",
      "sa",
      "shi",
      "su",
      "se",
      "so",
      "ma",
      "mi",
      "mu",
      "me",
      "mo",
      "ya",
      "ya",
      "yu",
      "yo",
      "yo",
      "na",
      "ni",
      "nu",
      "ne",
      "no",
      "ha",
      "hi",
      "hu",
      "he",
      "ho",
      "ta",
      "chi",
      "tsu",
      "te",
      "to",
      "ra",
      "ri",
      "ru",
      "re",
      "ro",
      "sa",
      "shi",
      "su",
      "se",
      "so",
      "ma",
      "mi",
      "mu",
      "me",
      "mo",
      "wa",
      "wi",
      "wu",
      "we",
      "wo",
      "n",
      "n",
      "n",
      "n",
      "n"
    ];
    return sylabs[roll];
  }
  function getEffname() {
    var ccount = 0;
    var vcount = 0;
    var vanna = "";
    var roll = 0;
    roll = rollD(6);
    if (roll < 4) {
      vanna = get1vowel();
      vcount++;
    } else {
      vanna = get1con();
      ccount++;
    }
    var count = 0;
    var letLength = rollD(6) + 1;
    while (count < letLength) {
      if (ccount > 1) {
        vanna = vanna + getvowels();
        ccount = 0;
        vcount++;
      } else if (vcount > 1) {
        vanna = vanna + getcons();
        vcount = 0;
        ccount++;
      } else {
        roll = 0;
        roll = rollD(6);
        if (roll < 4) {
          vanna = vanna + getvowels();
          vcount++;
        } else {
          vanna = vanna + getcons();
          ccount++;
        }
      }
      count++;
    }
    return vanna;
  }
  function get1vowel() {
    var roll = 0;
    roll = rollD(10) - 1;
    var firstvowel = ["A", "A", "A", "E", "E", "I", "I", "O", "U", "Y"];
    return firstvowel[roll];
  }
  function get1con() {
    var roll = 0;
    roll = rollD(30) - 1;
    var firstcon = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "L", "L", "L", "M", "N", "P", "Q", "R", "R", "R", "R", "S", "S", "S", "T", "V", "W", "X", "Y", "Y", "Z"];
    return firstcon[roll];
  }
  function getvowels() {
    var roll = 0;
    roll = rollD(10) - 1;
    var vowels = ["a", "a", "a", "e", "e", "i", "i", "o", "u", "y"];
    return vowels[roll];
  }
  function getcons() {
    var roll = 0;
    roll = rollD(30) - 1;
    var cons = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "l", "l", "l", "m", "n", "p", "q", "r", "r", "r", "r", "s", "s", "s", "t", "v", "w", "x", "y", "y", "z"];
    return cons[roll];
  }
  function getname(person) {
    if (person.gender == "M") {
      return getEffname();
    }
    return getJalname();
  }

  // src/lib/lifecycle.js
  function getbyear(married, gender) {
    var mage;
    mage = rollD(9) + 12;
    if (gender == "M") {
      for (var i = 0; i < 5; i++) {
        mage += rollD(4) - 1;
      }
    }
    var birth = married - mage;
    return birth;
  }
  function getmage(gender) {
    return Math.abs(getbyear(0, gender));
  }
  function getdage(myear, mage) {
    var temp1a = rollD(20);
    var temp1b = rollD(20);
    var temp1;
    temp1a < temp1b ? temp1 = temp1a : temp1 = temp1b;
    var temp2 = rollD(8);
    var dage;
    if (temp2 < 5) {
      dage = temp1;
    } else if (temp2 < 7) {
      dage = temp1a + 20;
    } else if (temp2 == 7) {
      dage = temp1a + 40;
    } else if (temp2 == 8) {
      dage = temp1a + 60;
    }
    if (dage && mage) {
      while (dage < mage) {
        dage = mage;
      }
    }
    var death = dage;
    return death;
  }
  function getfert(fertyear) {
    var chance = 0;
    if (fertyear < 14) {
      chance = 10;
    }
    if (fertyear == 14) {
      chance = 20;
    }
    if (fertyear == 15) {
      chance = 40;
    }
    if (fertyear == 16) {
      chance = 60;
    }
    if (fertyear == 17) {
      chance = 80;
    }
    if (fertyear > 17 && fertyear < 30) {
      chance = 98;
    }
    if (fertyear > 30 && fertyear < 35) {
      chance = 80;
    }
    if (fertyear > 35 && fertyear < 40) {
      chance = 40;
    }
    if (fertyear > 40 && fertyear < 45) {
      chance = 20;
    }
    if (fertyear > 44) {
      chance = 3;
    }
    if (fertyear > 52) {
      chance = 1;
    }
    return chance;
  }

  // src/client.js
  function getRequestParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
      return "";
    else
      return results[1];
  }
  var pid = 0;
  function getNewName(pid2) {
    var node = getNodeFromPid(pid2);
    var person = getPersonFromNode(node);
    node.firstChild.firstChild.value = getname(person);
  }
  function getKids(person, spouse) {
    var mend;
    person.dyear < spouse.dyear ? mend = person.dyear : mend = spouse.dyear;
    var mspan;
    mspan = mend - spouse.myear;
    var fertstart;
    person.gender == "F" ? fertstart = person.mage : fertstart = spouse.mage;
    var newcolor = parseInt(spouse.gencolor) + 1;
    if (newcolor == 14) {
      newcolor = 1;
    }
    var yom = 0;
    while (yom <= mspan) {
      if (rollD(100) <= getfert(fertstart + yom)) {
        var kid = new Object();
        kid.parentId = formNodeId(spouse.pid);
        pid++;
        kid.pid = pid;
        kid.gender = randgen();
        kid.name = getname(kid);
        kid.byear = spouse.myear + yom;
        kid.dage = getdage();
        kid.dyear = kid.byear + kid.dage;
        kid.mage = getmage(kid.gender);
        kid.myear = kid.byear + kid.mage;
        kid.family = true;
        if (kid.myear > kid.dyear || rollD(100) <= RATE_bachelor) {
          kid.mage = null;
          kid.myear = null;
          kid.family = null;
        }
        kid.ptype = goGetPType();
        kid.gencolor = newcolor;
        debug("kid.pid:" + kid.pid);
        displayPerson(kid);
        yom += rollD(2) + rollD(2) + rollD(2) - 2;
      }
      yom++;
    }
  }
  function getNodeFromPid(pid2) {
    return document.getElementById(formNodeId(pid2));
  }
  function getPersonFromPid(pid2) {
    var personnode = getNodeFromPid(pid2);
    return getPersonFromNode(personnode, pid2);
  }
  function getPidFromNode(node) {
    return node.id.slice(formNodeId("").length);
  }
  function getPersonFromNode(personnode, pid2) {
    if (personnode.nodeName != "UL") {
      debug("person built from node that wasn't UL ..." + personnode.nodeName);
    }
    if (!pid2) {
      pid2 = getPidFromNode(personnode);
    }
    debug("gPFN:" + pid2);
    var newperson = new Object();
    newperson.pid = pid2;
    newperson.gencolor = personnode.className.substring(
      personnode.className.indexOf("r") + 1,
      personnode.className.length
    );
    var node = personnode.firstChild;
    newperson.name = node.firstChild.value;
    node = node.nextSibling;
    newperson.gender = node.firstChild.nextSibling.nodeValue;
    node = node.nextSibling;
    newperson.byear = parseInt(node.firstChild.nextSibling.nodeValue);
    node = node.nextSibling;
    newperson.dyear = parseInt(node.firstChild.nextSibling.nodeValue);
    node = node.nextSibling;
    newperson.myear = parseInt(node.firstChild.nextSibling.nodeValue);
    node = node.nextSibling;
    newperson.mage = parseInt(node.firstChild.nextSibling.nodeValue);
    node = node.nextSibling;
    newperson.dage = parseInt(node.firstChild.nextSibling.nodeValue);
    node = node.nextSibling;
    newperson.ptype = node.firstChild.nextSibling.nodeValue;
    return newperson;
  }
  function getSpouse(person) {
    var spouse = new Object();
    spouse.parentId = formNodeId(person.pid);
    pid++;
    spouse.pid = pid;
    spouse.gender = getOppositeGender(person.gender);
    spouse.name = getname(spouse);
    spouse.myear = person.myear;
    spouse.byear = getbyear(spouse.myear, spouse.gender);
    spouse.mage = spouse.myear - spouse.byear;
    spouse.dage = getdage(spouse.myear, spouse.mage);
    spouse.dyear = spouse.byear + spouse.dage;
    spouse.ptype = goGetPType();
    spouse.gencolor = person.gencolor;
    return spouse;
  }
  function countKids(pid2) {
    var node = document.getElementById(formNodeId(pid2));
    return node.childNodes.length - 5;
  }
  function getFamily(pid2) {
    debug("getFamily:" + pid2);
    document.getElementById("family" + pid2).style.display = "none";
    var newparent = getPersonFromPid(pid2);
    debug("newparent:" + newparent);
    if (rollD(100) > 100 - RATE_married) {
      var spouse = getSpouse(newparent);
      debug("new spouse");
      debug("spouse.pid:" + spouse.pid);
      displayPerson(spouse);
      getKids(newparent, spouse);
      var grief = spouse.dyear;
      while (newparent.dyear >= grief) {
        grief += rollD(2) + rollD(2) + rollD(2) - 2;
        newparent.myear = grief;
        if (newparent.myear <= newparent.dyear) {
          var offspring = countKids(pid2);
          debug("offspring:" + offspring);
          var newchance;
          switch (offspring) {
            case "0":
              newchance = (newparent.dyear - grief) * RATE_remarry_barren;
              break;
            case "1":
              newchance = (newparent.dyear - grief) * RATE_remarry_single;
              break;
            default:
              newchance = (newparent.dyear - grief) * RATE_remarry_heirs;
              break;
          }
          if (rollD(100) < newchance) {
            debug("Remarried!");
            spouse = getSpouse(newparent);
            debug("spouse.pid:" + spouse.pid);
            displayPerson(spouse);
            getKids(newparent, spouse);
            grief = spouse.dyear;
          }
        }
      }
    }
  }
  function toggleDebugTxt() {
    var debugtxt = document.getElementById("debugtxt");
    var style = debugtxt.style.display;
    if (style == "block") {
      debugtxt.style.display = "none";
    } else {
      debugtxt.style.display = "block";
    }
  }
  var do_DEBUG = getRequestParameter("debug");
  var do_BFS = getRequestParameter("bfs");
  function debug(output) {
    if (do_DEBUG) {
      var debugtxt = document.getElementById("debugtxt");
      var line = document.createTextNode(output + "\n");
      debugtxt.appendChild(line);
      debugtxt.appendChild(document.createElement("br"));
    }
  }
  function enableDebugUi() {
    if (do_DEBUG) {
      document.getElementById("debuglog").style.display = "block";
    }
  }
  function enableLineageUi() {
    enableDebugUi();
    debug("enableLineageUI()");
    disableSeedUi();
    disableCsvUi();
    document.getElementById("lineageUi").style.display = "block";
  }
  function enableSeedUi() {
    debug("enableSeedUi()");
    disableLineageUi();
    disableCsvUi();
    document.getElementById("seedUi").style.display = "block";
  }
  function enableCsvUi() {
    enableDebugUi();
    debug("enableCsvUi()");
    disableLineageUi();
    disableSeedUi();
    document.getElementById("csvUi").style.display = "block";
  }
  function disableCsvUi() {
    document.getElementById("csvUi").style.display = "none";
  }
  function disableLineageUi() {
    document.getElementById("lineageUi").style.display = "none";
  }
  function disableSeedUi() {
    document.getElementById("seedUi").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("footer").style.display = "none";
  }
  function populateLineage() {
    Math.seedrandom(document.getElementById("seed").value);
    pid = 0;
    var oldLineage = getNodeFromPid(pid);
    var newLineage = document.createElement("div");
    newLineage.id = formNodeId(pid);
    oldLineage.parentNode.replaceChild(newLineage, oldLineage);
    var person = new Object();
    person.parentId = formNodeId(pid);
    pid++;
    person.pid = pid;
    document.startform.gender1.value != "x" ? person.gender = document.startform.gender1.value : person.gender = randgen();
    document.startform.name1.value ? person.name = document.startform.name1.value : person.name = getname(person);
    document.startform.married1.value ? person.myear = parseInt(document.startform.married1.value) : person.myear = 0;
    document.startform.born1.value ? person.byear = parseInt(document.startform.born1.value) : person.byear = getbyear(
      person.myear,
      person.gender
    );
    person.mage = person.myear - person.byear;
    if (document.startform.died1.value) {
      person.dyear = parseInt(document.startform.died1.value);
      person.dage = person.dyear - person.byear;
    } else {
      person.dage = getdage(person.myear, person.mage);
      person.dyear = person.byear + person.dage;
    }
    person.ptype = goGetPType();
    person.gencolor = 1;
    displayPerson(person);
    var spouse = new Object();
    spouse.parentId = formNodeId(pid);
    pid++;
    spouse.pid = pid;
    spouse.gender = getOppositeGender(person.gender);
    document.startform.name2.value ? spouse.name = document.startform.name2.value : spouse.name = getname(spouse);
    spouse.myear = person.myear;
    document.startform.born2.value ? spouse.byear = parseInt(document.startform.born2.value) : spouse.byear = getbyear(
      spouse.myear,
      spouse.gender
    );
    spouse.mage = spouse.myear - spouse.byear;
    if (document.startform.died2.value) {
      spouse.dyear = parseInt(document.startform.died2.value);
      spouse.dage = spouse.dyear - spouse.byear;
    } else {
      spouse.dage = getdage(spouse.myear, spouse.mage);
      spouse.dyear = spouse.byear + spouse.dage;
    }
    spouse.ptype = goGetPType();
    spouse.gencolor = 1;
    displayPerson(spouse);
    getKids(person, spouse);
  }
  function appendColumn(colclass, colname, colvalue) {
    var moniker = document.createElement("span");
    moniker.appendChild(document.createTextNode(colname));
    moniker.className = "moniker";
    var value = document.createTextNode(colvalue);
    var item = document.createElement("li");
    item.appendChild(moniker);
    item.appendChild(value);
    if (colvalue == null) {
      item.style.display = "none";
    }
    item.className = colclass;
    return item;
  }
  function displayPerson(person) {
    var goeshere = document.getElementById(person.parentId);
    var personHtml = document.createElement("ul");
    personHtml.setAttribute("id", formNodeId(person.pid));
    personHtml.className = "color" + person.gencolor;
    var namebox = document.createElement("input");
    namebox.setAttribute("type", "text");
    namebox.setAttribute("size", "8");
    namebox.value = person.name;
    var rename = document.createElement("a");
    rename.setAttribute("href", 'javascript:getNewName("' + person.pid + '");');
    var atext = document.createTextNode(" Rename ");
    rename.appendChild(atext);
    var colName = document.createElement("li");
    colName.appendChild(namebox);
    colName.appendChild(rename);
    personHtml.appendChild(colName);
    var colGender = appendColumn("gender", "", person.gender);
    var colBorn = appendColumn("byear", "(lived ", person.byear);
    var colDied = appendColumn("dyear", "- ", person.dyear);
    var colWed = appendColumn("myear", "), married in year ", person.myear);
    var colPop = appendColumn("mage", "at age of ", person.mage);
    var colRip = appendColumn("dage", ", passed at the age of ", person.dage);
    var colPType = appendColumn("ptype", ". Personality:", person.ptype);
    var colGoals = appendColumn("goals", " ", getPTypeName(person.ptype));
    personHtml.appendChild(colGender);
    personHtml.appendChild(colBorn);
    personHtml.appendChild(colDied);
    personHtml.appendChild(colWed);
    personHtml.appendChild(colPop);
    personHtml.appendChild(colRip);
    personHtml.appendChild(colPType);
    personHtml.appendChild(colGoals);
    if (person.family) {
      var getfam = document.createElement("a");
      getfam.setAttribute("href", 'javascript:getFamily("' + person.pid + '");');
      getfam.setAttribute("id", "family" + person.pid);
      var getfamtext = document.createTextNode(" Get Family ");
      getfam.appendChild(getfamtext);
      personHtml.appendChild(getfam);
    }
    goeshere.appendChild(personHtml);
  }
  function formNodeId(pid2) {
    return "person" + pid2;
  }
  function populateCsv() {
    resetCsvTxt();
    if (do_BFS) {
      debug("Bredth First");
      var queue = Array();
      crawlTreeBf(queue, 1);
    } else {
      debug("Depth First");
      crawlTreeDf(1);
    }
  }
  function crawlTreeDf(pid2, bloodline, spouse) {
    debug("crawlTreeDf(" + pid2 + ")");
    var node = getNodeFromPid(pid2);
    var person = getPersonFromNode(node, pid2);
    addCsvRow(person, bloodline, spouse);
    debug("node.childNodes = " + node.childNodes);
    debug("node.childNodes.length = " + node.childNodes.length);
    var nextKin;
    for (var kin = node.firstChild; kin != null; kin = nextKin) {
      nextKin = kin.nextSibling;
      if (kin.nodeName == "UL") {
        debug("kin:" + kin);
        var kith = getPersonFromNode(kin, getPidFromNode(kin));
        if (bloodline != null && spouse == null) {
          crawlTreeDf(kith.pid, bloodline, pid2);
        } else if (bloodline != null && spouse != null) {
          crawlTreeDf(kith.pid, pid2);
        } else if (bloodline == null && spouse == null) {
          crawlTreeDf(kith.pid, pid2);
        } else {
          debug("Whoa! Orphan in the bloodline!");
        }
      }
    }
  }
  function crawlTreeBf(queue, pid2, bloodline, spouse) {
    debug("crawlTreeBf(" + queue + "," + pid2 + bloodline + "," + spouse + ")");
    var node = getNodeFromPid(pid2);
    var person = getPersonFromNode(node, pid2);
    addCsvRow(person, bloodline, spouse);
    debug("BF.person.childNodes = " + node.childNodes);
    debug("BF.person.childNodes.length = " + node.childNodes.length);
    if (node.childNodes && node.childNodes.length > 0) {
      var nextKith;
      for (var kith = node.firstChild; kith != null; kith = nextKith) {
        debug("kith:" + kith);
        nextKith = kith.nextSibling;
        debug("kith.nodeName:" + kith.nodeName);
        if (kith.nodeName == "UL") {
          var lineage = new Object();
          lineage.pid = getPidFromNode(kith);
          if (spouse == null) {
            lineage.bloodline = bloodline;
            lineage.spouse = pid2;
          } else if (bloodline != null && spouse != null) {
            lineage.bloodline = pid2;
            lineage.spouse = null;
          } else if (bloodline == null && spouse == null) {
            lineage.bloodline = pid2;
            lineage.spouse = null;
          } else {
            debug("Whoa! Orphan in the bloodline!");
          }
          debug("queue:" + lineage);
          queue.push(lineage);
        }
      }
    }
    debug("queue.length:" + queue.length);
    if (queue.length > 0) {
      debug("pop!");
      var relative = queue.shift();
      debug("relative: " + relative);
      crawlTreeBf(queue, relative.pid, relative.bloodline, relative.spouse);
    }
  }
  var families = 1;
  function resetCsvTxt() {
    var csvtxt = document.getElementById("csvtxt");
    csvtxt.value = "";
    families = 1;
  }
  function buildCsvRow(person, peer, parent) {
    debug("buildCsvRow(" + person + ")");
    var pid2 = person.pid;
    var name = person.name;
    var gender = person.gender;
    var byear = person.byear;
    var dyear = person.dyear;
    var myear = person.myear;
    var mage = person.mage;
    var dage = person.dage;
    var ptype = person.ptype;
    var family = 1;
    if (parent == null) {
      family = families++;
    }
    var row = [
      pid2,
      name,
      gender,
      byear,
      dyear,
      myear,
      mage,
      dage,
      ptype,
      peer,
      parent,
      family
    ].join(",");
    return row;
  }
  function addCsvRow(person, bloodline, spouse) {
    debug("addCsvRow(" + person + ")");
    var csvtxt = document.getElementById("csvtxt");
    if (csvtxt.value.length == 0) {
      csvtxt.value = "# pid, name, gender, byear, myear, mage, dage, ptype, peer, parent, family\n";
    } else {
      csvtxt.value += "\n";
    }
    var rowtxt = buildCsvRow(person, bloodline, spouse);
    csvtxt.value += rowtxt;
  }
  window.enableLineageUi = enableLineageUi;
  window.populateLineage = populateLineage;
  window.enableSeedUi = enableSeedUi;
  window.enableCsvUi = enableCsvUi;
  window.populateCsv = populateCsv;
  window.toggleDebugTxt = toggleDebugTxt;
  window.getNewName = getNewName;
  window.getFamily = getFamily;
})();
