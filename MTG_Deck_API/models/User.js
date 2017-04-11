const mongoose = require('mongoose');

var Deck = require('./Deck');

var userSchema = new mongoose.Schema({
	email : { type: String, required: true, unique: true },
	name 	: { type: String, required: true },
	decks : [Deck.schema]
});

userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
	transform : (document, returnedObject, options)=> {
		delete returnedObject.password;
		return returnedObject;
	}
};

var User = mongoose.model('User', userSchema);

module.exports = User;