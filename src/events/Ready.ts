import SlashCommandUtil from "../utils/SlashCommandUtil";

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.clear();
        console.log(`✔ Logged in as ${client.user.tag}.`);
        client.user.setActivity({type: "WATCHING", name: "over all channels."});
        await SlashCommandUtil.setAllSlashCommands(client, true);
    },
};