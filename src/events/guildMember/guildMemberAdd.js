const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    run = async (member) => {


        const guild = await Guild.findOne({ server: member.guild.id })

        if(!guild) return;
        if(!guild.botconfig) return;
        if(guild.botconfig) {
            if(guild.botconfig.welcome.status === true) {
                const channel = this.client.channels.cache.get(guild.botconfig.welcome.channel)
                if(!channel) return;
    
                //guild.botconfig.welcome.message
                const msgs = `<:pb_yay:1000174906031493271> {@user} | Seja bem vindo ao \`{guild.name}\`,\nVocê é o membro \`#{guild.memberCount}\`, espero que goste do nosso servidor!`
                const m = msgs
                .replace('{@user}', `${member}`)
                .replace('{guild.name}', `${member.guild.name}`)
                .replace('{guild.memberCount}', `${member.guild.memberCount}`)
    
                channel.send({ content: `${m}`}).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 30000)
                })
    
                //Message give as AutoRole
    
                /* 
    
                code
    
                */
            }
        }

        //this.client.channels.cache.get('968514495288868917').send('Welcome!\nhttps://discord.gg/hZ9ukmPPe5 \nhttps://discord.com/api/oauth2/authorize?client_id=970134090152034354&permissions=8&scope=bot%20applications.commands')
        /*const guildDB = await this.client.db.guilds.findById(member.guild.id)

        if (guildDB?.welcome) {
            const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel)

            welcomeChannel?.send(`${member.toString()}, seja bem vindo ao nosso servidor!`)
        }*/
    }
}