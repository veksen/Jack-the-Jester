const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command and its options.',
	usage: '[command name]',
	execute(message, args)
	{
		const data = [];
		const { commands } = message.client;
		
		if(!args.length)
		{
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can run \`${prefix}help [command name]\` to get info on a specific command!`);
			
			return message.author.send(data, { split: true })
			.then(() => {
				if(message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with all my commands!');
			})
			.catch(error => {
				console.error(`Could not send help DM to ${message.authir.tag}.\n`, error);
				message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
			})
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name);
		
		if(!command)
		{
			return message.reply('that\'s not a valid command!');
		}
		else
		{
			data.push(`**Name:** ${command.name}`);
		if(command.description) data.push(`**Description:** ${command.description}`);
		if(command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
				
message.channel.send(data, { split: true });
		}
	},
};