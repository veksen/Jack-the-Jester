module.exports = {
	name: 'ban',
	description: 'Bans a user for optional time and reason.',
	usage: '<@mention> [time] [reason]',
	execute(message, args) {
		if(!message.member.hasPermission('BAN_MEMBERS', false, true, true)) {
			message.reply('you don\'t have permission to ban members!');
			return;
		}

		const guild = message.guild;
		const member = message.mentions.members.first();
		if(!member) {
			return message.reply('please mention a valid user.');
		}

		const time = args[1];
		if(time.length == 2 && !isNaN(Number(time.charAt(0)))) {
			const length = Number(time.charAt(0));
			switch(time.charAt(1)) {
			case 's':
				setTimeout(() => {guild.unban(member, 'Ban timeout expired, auto unban.');}, length * 1000);
				break;

			case 'm':
				setTimeout(() => {guild.unban(member, 'Ban timeout expired, auto unban.');}, length * 60000);
				break;

			case 'h':
				setTimeout(() => {guild.unban(member, 'Ban timeout expired, auto unban.');}, length * 3600000);
				break;

			case 'd':
				setTimeout(() => {guild.unban(member, 'Ban timeout expired, auto unban.');}, length * 86400000);
				break;

			default:
				return message.reply `\`time\` argument not formatteed correctly!`;
			}

			const reason = args.slice(2).join(' ');
		}
		else {
			const reason = args.slice(1).join(' ');
		}
		member.ban();
	},
};
