const mongoose 			= require('mongoose'),
			StandardSpell = require('./StandardSpell');

var DeckSchema = new mongoose.Schema({
	name 			: String,
	format 		: String,
	colors 		: [String],
	spells 		: [
		{
			info 		: {type: mongoose.Schema.Types.ObjectId, ref: 'StandardSpell'},
			name  	: String,
			cmc 		: Number,
			power 	: String,
			tough 	: String,
			colors  : [String],
			supers 	: [String],
			types 	: [String],
			subs 		: [String],
			wCount	: Number,
			uCount 	: Number,
			bCount 	: Number,
			rCount	: Number,
			gCount	: Number,
			cCount 	: Number,
			img_url : String,
			qty 		: Number,
			side  	: {type: Boolean, default: false, required: true}
		}
	]
});

var Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;