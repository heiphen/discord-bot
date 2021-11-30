import { Message } from "discord.js";
import { serverLogger } from "../utils/logger";
import { membersCountMessage } from "../utils/messages";


export async function handleGetMemberCount(incomingMessage: Message) {
    try {
      const members = await incomingMessage.guild?.members.fetch({
        force: true,
      });
      const membersCount = members?.filter((m) => {
        return !m.user.bot;
      }).size;
      const botsCount = members?.filter((m) => {
        return m.user.bot;
      }).size;
      incomingMessage.channel.send(
        { embeds: [membersCountMessage(membersCount + '' || '0', botsCount + '' || '0')] }
      );
      serverLogger(
        "success",
        incomingMessage.content,
        `Members count ${botsCount}`
      );
    } catch (err) {
      serverLogger("error", incomingMessage.content, err);  
    }
  };