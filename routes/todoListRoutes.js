'use strict';

module.exports = function (app) {
	const tokenHandlers = require('../controllers/tokenController.js')
	const tokenPriceHandlers = require('../controllers/tokenPriceController.js')
	const tokenTradedPairHandlers = require('../controllers/tokenTradePairController')
	const tradeHistoryHandlers = require('../controllers/tradeHistoryController')


	// Token
	app.route('/token/addNew')
		.post(tokenHandlers.addNew);
	app.route('/token/findAll')
		.get(tokenHandlers.findAll);
	app.route('/token/findByTokenName/:symbol')
		.get(tokenHandlers.findByTokenName);

	// Token Price
	app.route('/tokenPrice/addNew')
		.post(tokenPriceHandlers.addNew);
	app.route('/tokenPrice/findBySymbol/:symbol')
		.get(tokenPriceHandlers.findBySymbol);

	// Token Trade Pair
	app.route('/tokenTradedPair/addNew')
		.post(tokenTradedPairHandlers.addNew);
	app.route('/tokenTradedPair/findByOwner/:owner')
		.get(tokenTradedPairHandlers.findByTokenTradePairOwner);

	app.route('/tradeHistory/time')
		.post(tradeHistoryHandlers.findByTime);
	app.route('/tradeHistory/findByTimeAndLimit')
		.post(tradeHistoryHandlers.findByTimeAndLimit);
};
