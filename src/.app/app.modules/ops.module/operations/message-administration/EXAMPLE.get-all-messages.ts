// import fs from 'fs'
// import fetch from 'cross-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const TOKEN = process.env.TOKEN || ''
// const GUILD_URL = process.env.GUILD_URL || ''

// class IGuild {
//     id: string
//     name: string
//     constructor(guild: IGuild) {
//         this.id = guild.id
//         this.name = guild.name
//     }
// }

// let guildChannels = await fetch(
//     `${GUILD_URL}/channels`,
//     {
//         headers: {
//             'authorization': TOKEN
//         }
//     })
//     .then(res => res.json())
//     .then((res: IGuild[]) => {
//         return res.map(item => { return new IGuild(item) })
//             .filter(res => !['Text Channels', 'Voice Channels', 'General'].includes(res.name))
//     })

// let channelsMessages = await Promise.all(guildChannels.map(async item => {
//     const messageReq = await fetch(`https://discord.com/api/channels/${item.id}/messages`, {
//         headers: {
//             'authorization': TOKEN
//         }
//     }).then(res => res.json()).catch(err => console.log(JSON.stringify(err)))
//     return messageReq
// }
// ))

// let mergeChannelsAndMessages = guildChannels.map((item, index) => {
//     return {
//         //@ts-ignore
//         ...item, images: [...[].concat.apply([], channelsMessages[index].map(item => item.attachments)).map(item => item.url)]
//     }
// })

// let finalObject = [...mergeChannelsAndMessages]

// fs.writeFileSync('public/cache.json', JSON.stringify(finalObject), 'utf8')