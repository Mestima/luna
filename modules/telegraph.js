/*
'use strict';

const Post = require('telegraph-api');

var tgPost = (msg, text) => {
	if (text.length < 4) {
		msg.reply("not enought arguments use this command.\nTry to use 'help' command.");
		return;
	}
	
	let header = text[1];
	let author = text[2];
	let content = text.slice(3).join(' ');
	
	const newPost = new Post({
		header: header,
		author: author,
		paragraphs: [content]
	});
	
	newPost.publishPost((err, link) => {
		if (err) {
			console.log(err);
		}
		msg.reply(`link to your post: ${link}`);
	});
}

module.exports = tgPost;
*/