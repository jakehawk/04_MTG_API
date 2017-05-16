var mongoose  = require('mongoose'),
    mtg       = require('mtgsdk'),
    axios     = require('axios'),
    Spell     = require('../models/StandardSpell');

const STANDARD_DB_URL = 'https://api.magicthegathering.io/v1/cards?set='

var db = process.env.MONGODB_URI || 'mongodb://localhost/mtg-stuff-1';
mongoose.connect(db);

var spells = [];

// var defaultSpell = {
//     name        : 'Testing',
//     colors      : [ 'C' ],
//     cmc         : 0,
//     superTypes  : '',
//     types       : 'Not a type',
//     subtypes    : '',
//     img_url     : 'https://goo.gl/LNhefX',
//     power       : '',
//     tough       : '',
//     wCount      : 0,
//     uCount      : 0,
//     bCount      : 0,
//     rCount      : 0,
//     gCount      : 0,
//     cCount      : 5
//   };
// spells.push(defaultSpell);

var bannedSpells = ['Smuggler\'s Copter', 'Reflector Mage', 'Emrakul, the Promised End'];

// function to parse relevant information from mtgapi call
function getSpellInfo(spell) {
  var  w=0, u=0, b=0, r=0, g=0, c=0;
  
  if (spell.manaCost) {
    console.log(spell.name, spell.type);
    var colors = spell.manaCost.split('');
    for (var i = 0, len = colors.length; i < len; i++) {
      switch (colors[i]) {
        case 'W':
          w++;
          break;
        case 'U':
          u++;
          break;
        case 'B':
          b++;
          break;
        case 'R':
          r++;
          break;
        case 'G':
          g++;
          break;
        case 'C':
          c++;
          break;
      }
    }
  }

  if (spell.supertypes)
    var sup = spell.supertypes;
  else
    var sup = [''];

  if (spell.subtypes)
    var sub = spell.subtypes;
  else
    var sub = [''];

  spells.push({
    name    : spell.name,
    colors  : spell.colorIdentity || [ 'C' ],
    cmc     : spell.cmc || 0,
    supers  : sup,
    types   : spell.types,
    subs    : sub,
    img_url : spell.imageUrl || 'https://goo.gl/LNhefX',
    power   : spell.power || '',
    tough   : spell.toughness || '',
    wCount  : w,
    uCount  : u,
    bCount  : b,
    rCount  : r,
    gCount  : g,
    cCount  : c
  });
}
// mtg.card.all({ set: 'AER' })
//   .on('data', card => {
//     console.log('will i ever get here?');
//     console.log(card);
//   })
console.log('start api call');

// query MTG API by:
// set name,
// which page the card is on(each page holds 100 cards) 
function getCards (set, page) {
  return axios.get(`${STANDARD_DB_URL}${set}&pageSize=100&page=${page}`);
}

function pushInfo (set) {
  var len = set.data.cards.length;

  for (var i = 0; i < len; i++){
    if (set.data.cards[i].name)
      getSpellInfo(set.data.cards[i])
  }
}

// MTG API only returns max 100 items per call
// 
axios.all([
    getCards('akh', 1),
    getCards('akh', 2),
    getCards('akh', 3),
    getCards('aer', 1),
    getCards('aer', 2),
    getCards('kld', 1),
    getCards('kld', 2),
    getCards('kld', 3),
    getCards('emn', 1),
    getCards('emn', 2),
    getCards('emn', 3),
    getCards('soi', 1),
    getCards('soi', 2),
    getCards('soi', 3),
    getCards('ogw', 1),
    getCards('ogw', 2),
    getCards('bfz', 1),
    getCards('bfz', 2),
    getCards('bfz', 3),
  ])
  .then(axios.spread((akh1, akh2, akh3, aer1, aer2, kld1, kld2, kld3, emn1, emn2, soi1, soi2, soi3, ogw1, ogw2, bfz1, bfz2, bfz3)=> {
    Spell.remove({}, (err)=> {
      if (err) throw err;

      console.log('Standard database is cleared.');
      pushInfo(akh1);
      pushInfo(akh2);
      pushInfo(akh3);
      pushInfo(aer1);
      pushInfo(aer2);
      pushInfo(kld1);
      pushInfo(kld2);
      pushInfo(kld3);
      pushInfo(emn1);
      pushInfo(emn2);
      pushInfo(soi1);
      pushInfo(soi2);
      pushInfo(soi3);
      pushInfo(ogw1);
      pushInfo(ogw2);
      pushInfo(bfz1);
      pushInfo(bfz2);
      pushInfo(bfz3);
      Spell.create(spells, (err, spells)=> {
        if (err) throw err
        console.log(`Database seeded with Standard Legal cards. Total of ${spells.length} cards.`)
        mongoose.connection.close()
        process.exit()
        });
    });
  console.log('end of api code');
}))
































  
  // mtg.card.all({ set: 'KLD '})
  //   .on('data', spell => {
  //     if (spell.name !== bannedSpells[0])
  //       getSpellInfo(spell);
  //   });
  // mtg.card.all({ set: 'EMN'})
  //   .on('data', spell => {
  //     if (spell.name !== bannedSpells[2])
  //       getSpellInfo(spell);
  //   });
  // mtg.card.all({ set: 'SOI'})
  //   .on('data', spell => {
  //     getSpellInfo(spell);
  //   });
  // mtg.card.all({ set: 'OGW'})
  //   .on('data', spell => {
  //     if (spell.name !== bannedSpells[1])
  //       getSpellInfo(spell);
  //   });
  // mtg.card.all({ set: 'BFZ'})
  //   .on('data', spell => {
  //     getSpellInfo(spell);
  //   });