var Standard = require('../models/StandardSpell');

// GET - INDEX of all spells in standard
module.exports.allStandard = (req, res)=> {
	Standard.find((err, spells)=> {
		if (err) res.json({ message: `Could not find spells b/c: ${err}`});

		res.json({ spells: spells });
	}).select('-__v');
};

module.exports.showSpell = (req, res)=> {
	var id = req.params.id;
	console.log(id);

	Standard.find({_id: id}, (err, spell)=> {
		if (err) res.json({ message: `Could not find spell b/c: ${err}`});

		res.json({spell: spell});
	}).select('-__v');

	// Standard.findById
};