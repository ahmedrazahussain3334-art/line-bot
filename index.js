1  const line = require('@line/bot-sdk');
2  const express = require('express');
3  
4  const config = {
5    channelAccessToken: 'P12IJ2ApPdwSBrzRPN8x7Kl8b5Gk16sDxbhhfmZwtXuS/0qbzUiAMuhml6fIA7uOW+AD+TW98h4mOZwqrtjNH87JsJ1j31U/NEdqXjm/FvmcSWJZZSndKZE89HCb7EP591cOG2CMphxnLMH2UDv+kgdB04t89/1O/w1cDnyilFU=',
6    channelSecret: '4d4238a8e5296e72929b743f316ea895',
7  };
8  
9  const client = new line.Client(config);
10 const app = express();
11 
12 app.use(express.json());
13 
14 app.post('/webhook', line.middleware(config), (req, res) => {
15   Promise.all(req.body.events.map(handleEvent))
16     .then(result => res.json(result))
17     .catch(err => {
18       console.error(err);
19       res.status(500).end();
20     });
21 });
22 
23 function handleEvent(event) {
24   if (event.type === 'memberJoined') {
25     const joinedUsers = event.joined.members;
26     const welcomeTexts = joinedUsers.map(user => ({
27       type: 'text',
28       text: `ʜᴇʏ ᴀɴᴅ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ ʜᴀʟᴀʟ ɢᴄ! 👋
29 ᴛʜɪꜱ ɢᴄ ɪꜱ ᴀʟʟ ᴀʙᴏᴜᴛ ᴏᴘᴇɴ ᴛʀᴀᴅɪɴɢ. ᴀɴʏ ᴋɪɴᴅ ᴏꜰ ɪɴ ɢᴀᴍᴇ ɪᴛᴇᴍ ᴛʀᴀᴅᴇ ɪꜱ ᴀʟʟᴏᴡᴇᴅ. ɴᴏ ʟɪᴍɪᴛꜱ, ᴊᴜꜱᴛ ᴅᴇᴀʟꜱ! 💸
30 
31 📌 ǫᴜɪᴄᴋ ɢᴄ ɴᴀᴠɪɢᴀᴛɪᴏɴ
32 
33 📝 ɴᴏᴛᴇꜱ ꜱᴇᴄᴛɪᴏɴ
34 ɢᴜɪᴅᴇʟɪɴᴇꜱ- ʀᴜʟᴇꜱ & ɢᴄ ᴜᴘᴅᴀᴛᴇꜱ
35 ᴘᴄ ꜱʜᴇᴇᴛꜱ- ꜰᴜʀɴɪ & ᴍɪꜱᴄ ᴠᴀʟᴜᴇꜱ
36 ɪɢɴ ᴇɴᴛʀʏ- ᴍᴀɴᴅᴀᴛᴏʀʏ
37 ʙʙʙ/ꜰʟᴀꜱʜᴇꜱ/ʀᴇᴄʀᴜɪᴛᴍᴇɴᴛ- ᴅᴇᴅɪᴄᴀᴛᴇᴅ ꜱᴘᴀᴄᴇ
38 
39 📚 ᴀʟʙᴜᴍꜱ
40 ᴘɪᴍᴅ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛꜱ- ᴏꜰꜰɪᴄɪᴀʟ ɴᴇᴡꜱ & ʟᴇᴀᴋꜱ
41 ᴘɪᴍᴅ ɢᴜɪᴅᴇꜱ- ɪɴ ɢᴀᴍᴇ ᴛɪᴘꜱ & ʜᴇʟᴘ
42 ᴄʀᴀᴛᴇ ᴘʀɪᴄᴇꜱ- ᴍᴏᴅ/ᴘɪᴍᴅ ᴄʀᴀᴛᴇꜱ
43 ʀꜱ ꜱᴇᴀʀᴄʜ- ᴘᴏꜱᴛ ʏᴏᴜʀ ʀꜱ ʀᴇǫᴜɪʀᴇᴍᴇɴᴛꜱ
44 
45 ʟᴇᴛ’ꜱ ᴛʀᴀᴅᴇ ꜱᴍᴀʀᴛ, ꜱᴛᴀʏ ꜱᴀꜰᴇ, ᴀɴᴅ ʜᴀᴠᴇ ꜰᴜɴ!🛒✨`
46     }));
47     return client.replyMessage(event.replyToken, welcomeTexts);
48   }
49   // ignore other events
50   return Promise.resolve(null);
51 }
52 
53 const port = process.env.PORT || 3000;
54 app.listen(port, () => {
55   console.log(`Server running on ${port}`);
56 });
