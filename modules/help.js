'use strict';

const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config/config.json');

var helpInfo;

var helpSetup = (cmds) => {
	var data = {};
	for (let k in cmds) {
		let v = cmds[k];
		if (!data[v.category])
			data[v.category] = [];
		if (v.descExt) // if has extended description
			v.descExt.forEach(subCmd => {
				data[v.category].push([subCmd.cmd, subCmd.desc]);
			});
		else
			data[v.category].push([k, v.desc]); // command name and description
	}
	var embed = new MessageEmbed()
		.setTitle('Help')
		.setDescription('List and description of all bot commands')
		.setColor(16711680)
		.setFooter({ text: 'Luna' })
		.setTimestamp()
		.setThumbnail('https://i.imgur.com/UH5n0Iq.png');
	
	let fields = [];
	for (let k in data) {
		let content = '';
		data[k].forEach(v => {
			content += prefix + v[0] + ' - ' + v[1] + '\n';
		});
		fields.push({ name: k, value: content, inline: false });
	}
	embed.addFields(fields);
	helpInfo = embed;
};

var help = (msg) => {
	msg.reply({ embeds: [helpInfo] });
};

const init = (commands) => {
	setTimeout(() => {
		helpSetup(commands);
	}, 500);
};

module.exports = {
	helpSetup: helpSetup,
	help: help,
	init: init,
	commands: {
		help: {func: (cl, msg, text) => {help(msg);}, desc: 'show help information', category: 'General commands'}
	}
};