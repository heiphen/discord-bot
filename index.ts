require('dotenv').config();
const Discord = require("discord.js");

const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents });

client.on("ready", () => console.log("Bot is online!"));

const channelId = '914587730153984080' // welcome channel
const targetChannelId = '914591677551902740' // rulesband info channel

client.on("guildMemberAdd", (member: any) => {
    console.log(member);

    const message = `Please welcome <@${member.id}> to the Heiphen server! Please check out ${member.guild.channels.cache.get(targetChannelId)} for mor info.`

    const msgEmbed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`A new member joined the server 🥳!`)
    .setDescription(`<@${member.id}> joined the server!Welcome home!\nPlease check out ${member.guild.channels.cache.get(targetChannelId)} for mor info.`)
    .setTimestamp()
    .setFooter(`Powered by Heiphen.`);

    const channel = member.guild.channels.cache.get(channelId);
    channel.send({ content: `${member}`, embeds: [msgEmbed] });
    member.send(message);
})

client.login(process.env.TOKEN);
