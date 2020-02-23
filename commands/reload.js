module.exports = {
	name: 'reload',
	description: 'Reloads a command (for testing and debugging purposes).',
	execute(message, args)
	{
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName);
		
		if(!command) return message.channel.send(`There is no command with name \`${commandName}\`.`);
		
		delete require.cache[require.resolve(`./${commandName}.js`)];
		
		try
		{
			const newCommand = require(`./${commandName}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		}
		catch(error)
		{
			console.log(error);
			message.channel.send(`Error while reloading command \`${commandName}\`:\n\`${error.message}\``);
		}
		
		message.channel.send(`Command \`${commandName}\` reloaded successfully.`)
	}
}