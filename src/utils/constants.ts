import { GuildMember } from "discord.js";


export const INFO = {
    MEMBER_JOIN: (member: GuildMember) => {
      return {
        title: `A new member joined the server 🥳!`,
        message: `Welcome <@${member.id}> to the server!\nPlease check out ${member.guild.channels.cache.get('914591677551902740')} for more info.`,
      };
    },
};

export const CONSTANTS = {
    FOOTER: `Heiphen`,
};

export const COMMANDS = {
  prefix: "#bot",
  membercount: "membercount",
};