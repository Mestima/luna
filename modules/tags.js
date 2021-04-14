'use strict';

//const { MessageAttachment } = require('discord.js'); // check out comments below

const err = 'You have to specify tag name from the tags list!';
const tags = {
	shrug: 'https://i.imgur.com/h1NFcIJ.jpg',
	tias: 'https://i.imgur.com/ywRmffA.png',
	tias2: 'https://i.imgur.com/di5gfLF.png',
	gtfo: 'https://i.imgur.com/cnIPzpy.png',
	gtfo2: 'https://i.imgur.com/AYERMXq.jpg',
	gtfo3: 'https://i.imgur.com/WIm7fOA.jpg',
	gtfo4: 'https://i.imgur.com/mE7Pgpf.jpg',
	foxemo: 'https://i.imgur.com/zO1sExJ.png',
	gentlepony: 'https://i.imgur.com/UH5n0Iq.png',
	respect: 'https://i.imgur.com/MG1xOxM.png',
};

var tagsInfo;

var tagSetup = () => {
	let content = '```';
	content += 'shrug\n'; // don't know why it doesn't want to add the first element of the list
	for (let k in tags)
		content += k + '\n';
	tagsInfo = content + '```';
};

var tag = (msg, text) => {
	if (!text[1])
		return msg.reply(err);

	var tgName = text[1].toLowerCase();
	if (tgName == 'list')
		return msg.reply(tagsInfo);
	if (!tags[tgName])
		return msg.reply(err);
	//msg.delete(); // delete user's tag command message
	//const attachment = new MessageAttachment(tags[tgName]); // commented cuz too slow to load it
	//msg.channel.send(attachment); // it's so much faster to drop the link
	msg.channel.send(tags[tgName]);
};

module.exports = {
	tag: tag,
	tagSetup: tagSetup
};

