const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () =>
{
	console.log('Ready!');
});

client.login(token);

client.on('message', message =>
{
	// Check that the command is formatted properly and that the sender is a human
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	if(!client.commands.has(commandName))
	{
		message.reply('No command ' + command + ' found.');
		return;
	}
	else // Included for clarity
	{
		const command = client.commands.get(commandName);
		if(command.args && !args.length)
		{
			let reply = `You didn't provide any arguments, ${message.author}!`;
			if(command.usage)
			{
				reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
			}
			
			return message.channel.send(reply);
		}
		
		try
		{
			command.execute(message, args);
		}
		catch(error)
		{
			console.error(error);
			message.reply('There was an error executing that command.')
		}
	}
});
