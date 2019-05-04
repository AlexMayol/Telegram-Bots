const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const config = require("./midnight.config");

const bot = new TelegramBot(config.botToken, { polling: true });


bot.on('message', (msg) => {
	// bot.sendDocument(msg.chat.id, msg.document.thumb.file_id);
	// console.log(msg);
	// console.log(axios);
	getData(msg);
});

bot.onText(/\/start/i, (msg) => {

});

async function getData(msg) {
	console.log(msg)
	// let res = await axios.post('https://www.jsonstore.io/e22682a244f73b30a2b6dd33307a81bbb750f3c0935fb801e00df7af1cdfa95d/cli_1',
	// 	{
	// 		firstName: 'pepe',
	// 		lastName: 'pajares'
	// 	})
	let res = await axios.get('https://www.jsonstore.io/e22682a244f73b30a2b6dd33307a81bbb750f3c0935fb801e00df7af1cdfa95d/cli_2')
	
	console.log(res.data)
	// for (res of results) {
	// 	bot.sendMessage(msg.chat.id, `Su nombre es ${res.name.title} ${res.name.first} ${res.name.last}`)

	// }

}


function getType(msg) {
	if (msg.audio) {
		switch (msg.audio.mime_type) {
			case 'audio/mpeg':
				return 'music';
			case 'video/mp4':
				return 'video';
			default:
				return 'otro'

		}
	}
	if (msg.text) {
		return "text"
	}
	if (msg.photo) {
		return 'photo'
	}
	if (msg.document) {
		switch (msg.document.mime_type) {
			case 'application/pdf':
				return 'pdf';
				break;
			case 'video/mp4':
				return 'video';
				break;

		}

	}
	if (msg.sticker) {
		return "sticker"
	}
}

bot.on("polling_error", error => {
	console.log(error); // => 'EFATAL'
});
