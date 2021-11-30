import { Message } from "discord.js";
import { handleGetMemberCount } from "../helper/memberCount";
import { COMMANDS } from "../utils/constants";
import { serverLogger } from "../utils/logger";



export async function handleIncomingChannelCommand(incomingMessage: Message) {
    try {
      const messageCommand = incomingMessage.content.split(" ")[1];
  
      switch (messageCommand) {
        case COMMANDS.membercount: {
          handleGetMemberCount(incomingMessage);
          break;
        }
        default:
          serverLogger("user-error", incomingMessage.content, "Invalid Command");
          break;
      }
    } catch (err) {
      serverLogger("error", incomingMessage.content, err);
    }
  };