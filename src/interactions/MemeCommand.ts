import fetch from "node-fetch";
import * as Discord from "discord.js";
import {Client} from "discord.js";

export default class MemeCommand {

    public name: string = <string> "meme";
    public once: boolean = <boolean> false;
    public enabled = <boolean> true;
    public description: string = <string> "View a random meme from a subreddit.";
    public slashData: object = <object> {
        name: this.name,
        description: this.description,
        options: [
            {
                name: "subreddit",
                description: "The subreddit to send a meme from.",
                type: "STRING",
                required: false,
                choices: [
                    {
                        name: "r/wholesomememes",
                        value: "wholesomememes"
                    },
                    {
                        name: "r/TerribleFacebookMemes",
                        value: "facebookmemes"
                    },
                    {
                        name: "r/DankMemes",
                        value: "dankmemes"
                    },
                    {
                        name: "r/MemeEconomy",
                        value: "memeeconomy"
                    },
                    {
                        name: "r/Memes",
                        value: "memes"
                    }
                ]
            }
        ]
    };

    constructor(client: Client) {
        this.enabled = true;
    }

    public async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === "meme") {
            const subreddit: string = <string>interaction.options.getString("subreddit");
            await interaction.deferReply();
            if (!subreddit) {
                await fetch("https://meme-api.herokuapp.com/gimme")
                    .then(response => response.json())
                    .then(data => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(data.title)
                            .setColor("#00e1ff")
                            .setImage(data.url)
                            .setFooter("Upvotes: " + data.ups + " | Posted by: " + data.author)
                        return interaction.editReply({embeds: [embed]});
                    });
            }
            if (subreddit) {
                await fetch("https://meme-api.herokuapp.com/gimme/" + subreddit)
                    .then(response => response.json())
                    .then(data => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(data.title)
                            .setColor("#00e1ff")
                            .setImage(data.url)
                            .setFooter("Upvotes: " + data.ups + " | Posted by: " + data.author)
                        return interaction.editReply({embeds: [embed]});
                    });
            }
        }
    }
}