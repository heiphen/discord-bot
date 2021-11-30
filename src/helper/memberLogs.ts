require("dotenv").config()
import { Client, GuildMember, TextChannel } from "discord.js";
import { INFO } from "../utils/constants";
import { serverLogger } from "../utils/logger";
import { createBasicEmbed } from "../utils/messages";


export function handleMemberJoin(
    member: GuildMember,
    client: Client | undefined
  ) {
    try {
      const channel = member.guild.channels.cache.find(
        (ch: any) => ch.id === process.env.LOGGER_CHANNEL_ID
      ) as TextChannel;
      if (!channel) return;
      channel.send(
        { content: `${member}`, embeds: [createBasicEmbed(INFO.MEMBER_JOIN(member as GuildMember))] }
      );
      member.send(
        `Welcome <@${member.id}> to the Heiphen server! Please check out ${member.guild.channels.cache.get('914591677551902740')} for more info.`
      );
    } catch (err) {
      serverLogger("error", "InternalError", err);
    }
};