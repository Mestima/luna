'use strict'
const fs = require('fs');
const chalk = require('chalk');

var availableModules = [];
var loadedModules = [];
var disablesModules = [];

const load = () => {
	fs.readdirSync('./modules/').forEach(file => {
		availableModules.push(file.slice(0, -3));
	});
};

const enable = (name, commands) => {
	process.stdout.write(`Loading module '${name}'...`);
	if (availableModules.includes(name)) {
		const module = require(`../modules/${name}`);
		Object.keys(module.commands).forEach((key) => {
			commands[key] = module.commands[key];
			module.init(commands);
		});
		process.stdout.write(chalk.hex("#00ff44").bold(" Done!\n"));
	} else {
		process.stdout.write(chalk.hex("#ff2200").bold(" Failed: module not found!\n"));
	}
};

const enableAll = (commands) => {
	availableModules.forEach((module) => {
		enable(module, commands);
	});
};

const disable = (name, commands) => {
	
};

const disableAll = (commands) => {
	
};

module.exports = {
	load: load,
	enable: enable,
	enableAll: enableAll,
	disable: disable,
	disableAll: disableAll
};