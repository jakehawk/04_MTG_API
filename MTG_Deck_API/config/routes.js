var express = require('express'),
		router 	= express.Router();
		token 	= require('./token_auth');

var {
			create, 
			me
		} = require('../controllers/users'),
		{
			getAll,
			createDeck,
			getDeck,
			updateDeck,
			deleteDeck
		}	= require('../controllers/decks'),
		{
			allStandard
		} = require('../controllers/standardSpells')

router.route('/api/users')

	// POST a new user
	.post(create);

router.route('/api/me')

	// GET user info while logged in
	.get(token.authenticate, me);

router.route('/api/decks')

	// GET index of all decks
	.get(getAll)

	//POST a new deck
	.post(createDeck);

router.route('/api/decks/:id')

	// GET show a deck
	.get(getDeck)

	// PATCH add or remove a card from a deck
	.patch(updateDeck);

router.route('/api/standard')

	// GET index of all standard spells
	.get(allStandard);

module.exports = router;