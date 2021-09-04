'use strict';

const parser = require('luaparse');

var lua = (msg, text) => {
	var code = text[1];
	if (!code)
		return msg.reply('Not enough arguments.');
	
	var ast = parser.parse(code);
	msg.reply(JSON.stringify(ast));
};

module.exports = lua;