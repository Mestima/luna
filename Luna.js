'use strict';

const { Client, Intents, Permissions } = require('discord.js');
const chalk = require('chalk');
const gradient = require('gradient-string');
const pjson	= require("./package.json");
const { token, prefix } = require('./config.json');
const { commands } = require('./modules/commands');
const { helpSetup } = require('./modules/help');
const { tagSetup } = require('./modules/tags');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let prefLen = prefix.length;

var ASCIIHeader = [
	"    ___       ___       ___       ___    ",
	"   /\\__\\     /\\__\\     /\\__\\     /\\  \\   ",
	"  /:/  /    /:/ _/_   /:| _|_   /::\\  \\  ",
	" /:/__/    /:/_/\\__\\ /::|/\\__\\ /::\\:\\__\\ ",
	" \\:\\  \\    \\:\\/:/  / \\/|::/  / \\/\\::/  / ",
	"  \\:\\__\\    \\::/  /    |:/  /    /:/  /  ",
	"   \\/__/     \\/__/     \\/__/     \\/__/   "
].join("\n");

bot.on('ready', () => {
	console.clear();
    console.log([
        chalk.bold(gradient("#8EA6DB", "#6A54C9")(ASCIIHeader)),
		chalk.hex("#6A54C9").bold.italic("Luna bot is ready\n\n"),
		`– Bot uses ${chalk.hex("#6A54C9").bold(Object.keys(pjson.dependencies).length)} packages\n`
    ].join("\n\n"));
	const link = bot.generateInvite({
		permissions: [ Permissions.FLAGS.ADMINISTRATOR ],
		scopes: [ 'bot' ]
	});
	console.log([
		chalk.blue.bold.underline('Bot invite link:'),
		chalk.blue.bold(link)
	].join("\n"));
	bot.user.setActivity('your bullshit', { type: 'LISTENING' });
//	bot.user.setStatus('dnd');
	helpSetup(commands);
	tagSetup();
	
//	askForFir(bot);
});

bot.on('messageCreate', async msg => {
	var author = msg.author;
	
	if (
		author.bot
	) return;
	
	let text = msg.content.split(' ');
	let isPrefix = text[0].substring(0, prefLen) === prefix;
	let cmdObj = commands[text[0].slice(prefLen).toLowerCase()];
	if (cmdObj && isPrefix) {
		cmdObj.func(bot, msg, text);
		/*
		if (msg.guild)
			msg.delete();
		*/
	}
});

bot.login(token);