const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');

module.exports = class RivenClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.utils = new Util(this);
		this.embed = require('./Embeds.js');
		this.functions = require('./Functions.js');

		this.once('ready', () => {
			console.log(`Logged in as ${this.user.username}!`);
		});

		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!?${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!?${this.user.id}> `);

			if (!message.guild || message.author.bot) return;

			if (message.content.match(mentionRegex)) {
				this.embed.generals('', message, `the prefix of **${message.guild.name}** is \`${this.PREFIX}\`.`);
			}

			const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.PREFIX;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.TOKEN = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.PREFIX = options.prefix;
	}

	async start(token = this.TOKEN) {
		this.utils.loadCommands();
		super.login(token);
	}

};