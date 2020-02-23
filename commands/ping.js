module.exports = {
	name: 'ping',
	description: 'Pings the bot to make sure that it is running smoothly.',
	execute(message, args)
	{
		message.channel.send('Pong!');
	},
};