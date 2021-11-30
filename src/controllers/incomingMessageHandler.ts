import { Message } from "discord.js";
import { handleGetMemberCount } from "../helper/memberCount";
import { COMMANDS } from "../utils/constants";

export async function handleIncomingChannelCommand(incomingMessage: Message) {
    try {
      const messageCommand = incomingMessage.content.split(" ")[1];
  
      switch (messageCommand) {
        case COMMANDS.membercount: {
          handleGetMemberCount(incomingMessage);
          break;
        }
        default:
          console.log(`❌  ${new Date().toISOString()}    Invalid Command    ${incomingMessage.content}`);
          break;
      }
    } catch (err) {
        console.log(`❌  ${new Date().toISOString()}    ${err}    ${incomingMessage.content}`);
    }
  };