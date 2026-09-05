const mineflayer = require('mineflayer');

const botOptions = {
    host: 'LECTERNSMP.aternos.me',
    port: 37171,
    username: 'LecternBot' // आप चाहें तो यहाँ बोट का नाम बदल सकते हैं
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log("बोट सर्वर से सफलतापूर्वक जुड़ गया है!");

        // हर 20 सेकंड में कूदने का लूप
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => {
                    bot.setControlState('jump', false);
                }, 500);
            }
        }, 20000); 
    });

    // डिस्कनेक्ट होने पर हर 10 सेकंड में दोबारा जुड़ने की कोशिश
    bot.on('end', () => {
        console.log("बोट डिस्कनेक्ट हो गया है। 10 सेकंड बाद दोबारा कोशिश कर रहा है...");
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log("एरर आया:", err);
    });
}

createBot();
