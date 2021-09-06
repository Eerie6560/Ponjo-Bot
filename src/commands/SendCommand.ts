import config from "../resources/Config";
import * as Discord from "discord.js";
import {Client} from "discord.js";

export default class SendCommand {

    public name: string = <string> "send";
    public once: boolean = <boolean> false;
    public enabled = <boolean> true;
    public description: string = <string> "Send a component to a channel.";

    constructor(client: Client) {
        this.enabled = true;
    }

    public async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            const component = interaction.options.getString("component");
            const channel = interaction.options.getChannel("channel");
            switch (component) {
                case "verification-message":
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Welcome to the Ponjo Development server!")
                        .setColor("#00e1ff")
                        .setDescription("In order to join the server fully and gain access to all channels, please react to the message below. By reacting, you are agreeing to the server rules and to abide by Discord's Terms of Service. We hope you enjoy your stay!")
                        .setFooter("Ponjo Team", client.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
                    const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId("verify")
                                .setLabel("Verify yourself!")
                                .setStyle("SECONDARY")
                                .setEmoji(config.emojis.success)
                        );
                    await interaction.reply({content: "The component has been sent successfully."});
                    await channel.send({embeds: [embed], components: [row]});
                    break;
            }
        }
    }

    public slashData: object = <object> {
        name: this.name,
        description: this.description,
        options: [
            {
                name: "component",
                description: "The component to send.",
                type: "STRING",
                required: true,
                choices: [
                    {
                        name: "Verification Message",
                        value: "verification-message"
                    }
                ]
            },
            {
                name: "channel",
                description: "The channel to send the component to.",
                type: "CHANNEL",
                required: true
            }
        ]
    };

}