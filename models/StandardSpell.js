const mongoose = require('mongoose');

var StandardSpellSchema = mongoose.Schema({
	name 		: String,
	cmc 		: Number,
	power 	: String,
	tough 	: String,
	colors  : [String], 
	wCount	: { type: Number, required: true, default: 0},
	uCount 	: { type: Number, required: true, default: 0},
	bCount 	: { type: Number, required: true, default: 0},
	rCount	: { type: Number, required: true, default: 0},
	gCount	: { type: Number, required: true, default: 0},
	cCount 	: { type: Number, required: true, default: 0},
	img_url : String
});

var StandardSpell = mongoose.model('StandardSpell', StandardSpellSchema);

module.exports = StandardSpell;