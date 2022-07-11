'use strict';

const { MessageEmbed } = require('discord.js');

var clear = (msg, text) => {
	if (!msg.guild)
		return msg.reply('You can\'t use this command in direct messages!');
	
	if (!msg.member.permissions.has("ADMINISTRATOR"))
		return msg.reply('You have to be a server admin to use this command!');
	
	let amount = text[1];
	if (!amount)
		return msg.reply('You haven\'t given an amount of messages which should be deleted!');
	if (isNaN(amount))
		return msg.reply('The amount parameter isn`t a number!');
	
	if (amount > 100)
		return msg.reply('You can`t delete more than 100 messages at once!');
	if (amount < 1)
		return msg.reply('You have to delete at least 1 message!');
	
	msg.channel.messages.fetch({ limit: amount })
		.then(messages => {
			msg.channel.bulkDelete(messages);
		});
	
	var embed = new MessageEmbed()
		.setTitle(`Deleted ${amount} messages in total`)
		.setColor(msg.member.displayHexColor)
//		.setFooter('Luna')
//		.setTimestamp()
		
	msg.channel.send({ embeds: [embed] });
};

module.exports = {
	clear: clear,
	init: (commands) => {},
	commands: {
		clear: {func: (cl, msg, text) => {clear(msg, text);}, descExt: [
			{cmd: 'clear `amount`', desc: 'deletes some messages'}
		], category: 'Server Admin'}
	}
};

