'use strict';

const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const apiUrl = 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-EN&country%22%20\%20%22=EN&allowCountries=EN';
const defaultUrl = 'https://www.epicgames.com/store/ru/product/';

var processGames = (g, msg) => {
	var gameData = [];
	g.forEach(v => {
		if (v.price.totalPrice.discountPrice != v.price.totalPrice.originalPrice && v.price.totalPrice.originalPrice != 0) {
			let temp = {
				title: v.title,
				url: defaultUrl + v.productSlug
			};
			gameData.push(temp);
		}
	});
	
	if (msg.guild) {
		var color = msg.member.displayHexColor;
		var logo = msg.guild.iconURL();
	} else {
		var color = 10038562;
		var logo = msg.author.displayAvatarURL();
	}
	
	const embed = new MessageEmbed()
		.setTitle('Epic Games Store [ free games ]', 'https://www.epicgames.com/store')
		.setDescription(`Total free games: ${gameData.length}`)
		.setColor(color)
		.setTimestamp()
		.setFooter('Luna', logo)
		.setThumbnail('https://i.imgur.com/Y6h06UF.png');
	msg.reply(embed);
	gameData.forEach(v => {
		msg.channel.send(`${v.title}\n${v.url}`);
	});
};

var epicGames = (msg) => {
	fetch(apiUrl)
		.then(res => res.json())
		.then(json => {
			let games = json.data.Catalog.searchStore.elements;
			processGames(games, msg);
		});
};

module.exports = epicGames;

