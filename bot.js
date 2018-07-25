"use strict";
const Discord = require( 'discord.js' );
const ytdl = require('ytdl-core');
const client = new Discord.Client( );
client.login(process.env.BOT_TOKEN);

var connections = { }
var _she5 = {
"ماهر المعيقلي": "https://www.youtube.com/watch?v=Ktync4j_nmA",
"مشاري العفاسي": "https://www.youtube.com/watch?v=2etOS_nwTr0",
"عبد الباسط عبد الصمد": "https://www.youtube.com/watch?v=vqXLGtZcUm8",
"ياسر الدوسري": "https://www.youtube.com/watch?v=WYT0pQne-7w"
}

var _sheo5 = [
"ماهر المعيقلي",
"مشاري العفاسي",
"عبد الباسط عبد الصمد",
"ياسر الدوسري"
]


var voice = "quran"


function repeatQuran(quranLink,connection){
    const dispatcher = connection.playStream(ytdl(quranLink, {filter: 'audioonly'}), {volume:1,seek:0, passes : 1});
    dispatcher.on('end', ( ) => {
		if( connection == undefined ) return;
		repeatQuran(quranLink,connection)
    })
}

client.on('message', ( message ) => {
	let command = message.content.split(' ')[0];
	let args = message.content.split(' ').slice(1);
	if( command == "قران" || command == "قرآن" ){
		var sheo5 = "";
		for( var i = 0; i < _sheo5.length; i++ ){
			sheo5 += "\n**" + (i+1) + "- " + _sheo5[i] + " **";
		}
		message.reply( '**يرجى كتابة اسم الشيخ المراد سماع تلاوته**\n **:الشيوخ المتوفرون هم**'+sheo5)
		message.channel.awaitMessages(msg => msg.author == message.author,{ max: 1 })
		.then( messages => {
			var message = messages.first();
			if( _she5[message.content] ){
				if( connections[ message.guild ] ){
					message.reply("**:white_check_mark: تم بدء التلاوة مع الشيخ "+ message.content +" **");
					repeatQuran(_she5[message.content],connections[ message.guild ]);
				} else{ 
				
					message.reply("**:timer: جاري دخول القناة ...**").then( m => {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { 
							m.edit("**:white_check_mark: تم بدء التلاوة مع الشيخ "+ message.content +" **");
							connections[ message.guild ] = connection;
							repeatQuran(_she5[message.content],connections[ message.guild ]);
		})
						};
					});
				}
			} else {
				message.reply("**:x: لم يتم ايجاد الشيخ**")
			}
			
		})
		.catch( err => { err; } );
	
	}
});





const adminprefix = "6";//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
const devs = ['431150885549113344','452918050371534859','431779124898430979'];//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
client.on('message', message => {//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
  var argresult = message.content.split(` `).slice(1).join(' ');//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
    if (!devs.includes(message.author.id)) return;//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
    
if (message.content.startsWith(adminprefix + 'setgame')) {//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
  client.user.setGame(argresult);
    message.channel.sendMessage(`**${argresult} تم تغيير بلاينق البوت إلى **`)
} else 
  if (message.content.startsWith(adminprefix + 'setname')) {
client.user.setUsername(argresult).then
    message.channel.sendMessage(`**${argresult}** : تم تغيير أسم البوت إلى`)
return message.reply("**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **");
} else
  if (message.content.startsWith(adminprefix + 'setavatar')) {
client.user.setAvatar(argresult);
  message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
      } else     
if (message.content.startsWith(adminprefix + 'setT')) {
  client.user.setGame(argresult, "https://www.twitch.tv/idk");
    message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
}

});
