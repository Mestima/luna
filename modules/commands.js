'use strict';

const giveaway = require('./giveaway');
const { help } = require('./help');
const pbGet = require('./pastebin');
const clear = require('./clear');
const { tag } = require('./tags');
const play = require('./music');
// const tgPost = require('./telegraph');

const commands = {
	help: {func: (cl, msg, text) => {help(msg);}, desc: 'show help information', category: 'General commands'},
	ping: {func: (cl, msg, text) => {msg.reply('pong!');}, desc: 'ping-pong!', category: 'General commands'},
	play: {func: (cl, msg, text) => {play(msg, text);}, desc: 'play music by youtube url', category: 'Music'},
	egsfree: {func: (cl, msg, text) => {giveaway.epicGames(msg);}, desc: 'show free games at Epic Games Store', category: 'Free games giveaways'},
	pastebin: {func: (cl, msg, text) => {pbGet(msg, text);}, descExt: [
		{cmd: 'pastebin get `id`', desc: 'show paste from pastebin by id'},
		{cmd: 'pastebin post `name` `your text`', desc: 'used to post your text to pastebin. (If you want to make a space in the paste name, use the symbol "-" instead of the space)'}
	], category: 'PasteBin'},
	clear: {func: (cl, msg, text) => {clear(msg, text);}, descExt: [
		{cmd: 'clear `amount`', desc: 'deletes some messages'}
	], category: 'Server Admin'},
	tag: {func: (cl, msg, text) => {tag(msg, text);}, descExt: [
		{cmd: 'tag list', desc: 'show tags list'},
		{cmd: 'tag `name`', desc: 'send tag'}
	], category: 'Tags'}
//	tgpost: {func: (cl, msg, text) => {tgPost(msg, text);}, desc: 'post an article to telegra.ph', category: 'APIs'}
};
module.exports.commands = commands;

