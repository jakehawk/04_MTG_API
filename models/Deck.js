const mongoose 			= require('mongoose'),
			StandardSpell = require('./StandardSpell');

var DeckSchema = new mongoose.Schema({
	name 			: String,
	format 		: String,
	colors 		: [String],
	spells 		: [
		{
			info 	: {type: mongoose.Schema.Types.ObjectId, ref: 'StandardSpell'},
			name  : String,
			qty 	: Number,
			side  : {type: Boolean, default: false, required: true}
		}
	]
});

var Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;