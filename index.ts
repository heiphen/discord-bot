require('dotenv').config();
import { Intents, Client, Message } from 'discord.js';
import { handleIncomingChannelCommand } from './src/controllers/incomingMessageHandler';
import { assignRoleByCode } from './src/helper/assignRolebyCode';
import { assignRoleOnIntroduction } from './src/helper/assignRolebyIntro';
import { handleMemberJoin } from './src/helper/memberLogs';
import { COMMANDS, CONSTANTS } from './src/utils/constants';
import { initDbClient } from './src/utils/database';

(async () => {
  initDbClient();
  const client = new Client({ intents: new Intents(32767) });

  client.login(process.env.TOKEN);

  client.on('ready', () => console.log('Bot is online!'));

  client.on('messageCreate', async (message: Message) => {
    if (!message.author.bot) {
      if (message.content.split(/\s+/)[0] == COMMANDS.prefix) {
        switch (message.channel.type) {
          case 'GUILD_TEXT': {
            handleIncomingChannelCommand(message);
            break;
          }
          default: {
            console.log(`Channel not supported`);
          }
        }
        return;
      }
      if (message.channelId === CONSTANTS.CODE_CHANNEL_ID) {
        assignRoleByCode(message);
        return;
      }
      if (message.channelId === CONSTANTS.INTRODUCE_CHANNEL_ID) {
        assignRoleOnIntroduction(message);
        return;
      }
    }
  });

  client.on('guildMemberAdd', (member: any) => {
    handleMemberJoin(member);
  });
})();
