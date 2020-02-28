module.exports = {
	name: 'mute',
	description: 'Mutes a user for optional time and reason.',
	usage: '<@mention> [time] [reason]',
	execute(message, args) {
		if(!(message.member.hasPermission('KICK_MEMBERS', false, true, true) || message.member.hasPermission('BAN_MEMBERS', false, true, true))) {
			return message.reply('you don\'t have permission to mute members!');
		}

		const guild = message.guild;
		const member = message.members.mentions.first();
		if(!member) {
			return message.reply('please mention a valid user.');
		}

		const time = args[1];
		if(time.length == 2 && !isNaN(Number(time.charAt(0)))) {
			const length = Number(time.charAt(0));
			switch(time.charAt(1)) {
			case 's':
				setTimeout(() => {command.execute(unmute, 'Mute timeout expired, auto unmute.');}, length * 1000);
				break;

			case 'm':
				setTimeout(() => {command.execute(unmute, 'Mute timeout expired, auto unmute.');}, length * 60000);
				break;

			case 'h':
				setTimeout(() => {command.execute(unmute, 'Mute timeout expired, auto unmute.');}, length * 3600000);
				break;

			case 'd':
				setTimeout(() => {command.execute(unmute, 'Mute timeout expired, auto unmute.');}, length * 86400000);
				break;

			default:
				return message.reply `\`time\` argument not formatteed correctly!`;
			}

			var reason = args.slice(2).join(' ');
		}
		else {
			var reason = args.slice(1).join(' ');
		}

		var memberRoles = [];
		for(const role of member.roles) {
			memberRoles.push(role);
			member.removeRole(role);
		}

		member.addRole()
	}
}