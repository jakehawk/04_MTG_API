var express = require('express'),
		router 	= express.Router();
		

var {
			create, 
			index,
			me
		} = require('../controllers/users'),
		{
			createToken,
			authenticate
		} = require('./token_auth'),
		{
			getAll,
			createDeck,
			getDeck,
			updateDeck,
			deleteDeck
		}	= require('../controllers/decks'),
		{
			allStandard,
			showSpell
		} = require('../controllers/standardSpells')

router.route('/api/users')

	// GET all users
	.get(index)

	// POST a new user
	.post(create);

router.route('/api/token')

	// POST new auth token for sure
	.post(createToken);

router.route('/api/me')

	// GET user info while logged in
	.get(authenticate, me);

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

router.route('/api/standard/:id')

	// GET show a single standard spell
	.get(showSpell);

module.exports = router;