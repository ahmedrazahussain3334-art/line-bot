const line = require('@line/bot-sdk');
const express = require('express');

const config = {
  channelAccessToken: 'P12IJ2ApPdwSBrzRPN8x7Kl8b5Gk16sDxbhhfmZwtXuS/0qbzUiAMuhml6fIA7uOW+AD+TW98h4mOZwqrtjNH87JsJ1j31U/NEdqXjm/FvmcSWJZZSndKZE89HCb7EP591cOG2CMphxnLMH2UDv+kgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '4d4238a8e5296e72929b743f316ea895',
  };

  const client = new line.Client(config);
  const app = express();

  app.post('/webhook', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
      .then(result => res.json(result))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  });

  function handleEvent(event) {
    if (event.type === 'memberJoined') {
      const joinedUsers = event.joined.members;
      const welcomeTexts = joinedUsers.map(user => ({
        type: 'text',
        text: `ʜᴇʏ ᴀɴᴅ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ ʜᴀʟᴀʟ ɢᴄ! 👋
  ᴛʜɪꜱ ɢᴄ ɪꜱ ᴀʟʟ ᴀʙᴏᴜᴛ ᴏᴘᴇɴ ᴛʀᴀᴅɪɴɢ.ᴀɴʏ ᴋɪɴᴅ ᴏꜰ ɪɴ ɢᴀᴍᴇ ɪᴛᴇᴍ ᴛʀᴀᴅᴇ ɪꜱ ᴀʟʟᴏᴡᴇᴅ. ɴᴏ ʟɪᴍɪᴛꜱ, ᴊᴜꜱᴛ ᴅᴇᴀʟꜱ! 💸

  📌 ǫᴜɪᴄᴋ ɢᴄ ɴᴀᴠɪɢᴀᴛɪᴏɴ

  📝 ɴᴏᴛᴇꜱ ꜱᴇᴄᴛɪᴏɴ
  ɢᴜɪᴅᴇʟɪɴᴇꜱ- ʀᴜʟᴇꜱ & ɢᴄ ᴜᴘᴅᴀᴛᴇꜱ
  ᴘᴄ ꜱʜᴇᴇᴛꜱ- ꜰᴜʀɴɪ & ᴍɪꜱᴄ ᴠᴀʟᴜᴇꜱ
  ɪɢɴ ᴇɴᴛʀʏ- ᴍᴀɴᴅᴀᴛᴏʀʏ
  ʙʙʙ/ꜰʟᴀꜱʜᴇꜱ/ʀᴇᴄʀᴜɪᴛᴍᴇɴᴛ- ᴅᴇᴅɪᴄᴀᴛᴇᴅ ꜱᴘᴀᴄᴇ

  📚 ᴀʟʙᴜᴍꜱ
  ᴘɪᴍᴅ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛꜱ- ᴏꜰꜰɪᴄɪᴀʟ ɴᴇᴡꜱ & ʟᴇᴀᴋꜱ
  ᴘɪᴍᴅ ɢᴜɪᴅᴇꜱ- ɪɴ ɢᴀᴍᴇ ᴛɪᴘꜱ & ʜᴇʟᴘ
  ᴄʀᴀᴛᴇ ᴘʀɪᴄᴇꜱ- ᴍᴏᴅ/ᴘɪᴍᴅ ᴄʀᴀᴛᴇꜱ
  ʀꜱ ꜱᴇᴀʀᴄʜ- ᴘᴏꜱᴛ ʏᴏᴜʀ ʀꜱ ʀᴇǫᴜɪʀᴇᴍᴇɴᴛꜱ

  ʟᴇᴛ’ꜱ ᴛʀᴀᴅᴇ ꜱᴍᴀʀᴛ, ꜱᴛᴀʏ ꜱᴀꜰᴇ, ᴀɴᴅ ʜᴀᴠᴇ ꜰᴜɴ!🛒✨`
      }));
      return client.replyMessage(event.replyToken, welcomeTexts);
    }
    // Ignore all other events
    return Promise.resolve(null);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
