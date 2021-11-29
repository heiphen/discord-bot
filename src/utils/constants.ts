import { GuildMember } from "discord.js";


export const INFO = {
    MEMBER_JOIN: (member: GuildMember) => {
      return {
        title: `A new member joined the server 🥳!`,
        message: `<@${member.id}> joined the server! Welcome home!\nPlease check out ${member.guild.channels.cache.get('914591677551902740')} for more info.`,
      };
    },
};

export const CONSTANTS = {
    FOOTER: "Powered by HEIPHEN",
};

