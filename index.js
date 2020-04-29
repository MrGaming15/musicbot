const Discord = require('discord.js')
const bot = new Discord.Client()
const yt = require('ytdl-core')
let prefix = '!'
const yts = require('yt-search')
var arg
bot.on('ready', function (){
	//console.log("Je suis prêt !")
})
  
bot.on('message', function(message){
	if(message.content.startsWith('!play')){
		let args = message.content.split(" ")
		let m = 1
		let x = ""
		while (m !== args.length){
			x+=args[m]+" "
			m+=1

		}
 		console.log(message.guild.channels.cache.filter(function (channel){return channel.type === 'voice'}))
		

		let voiceChannel = message.guild.channels.cache
			.filter(function(channel){return channel.type === 'voice'})
			.first()
		yts( x, function ( err, r ) {
				  if ( err ) throw err
				 
				  
				  
				  arg = r.videos[0].url
				  
				} )
 		voiceChannel
			.join()
			.then(function (connection){
				let stream = yt(arg)
				stream.on('error', function(error){
					message.reply("Je ne peux pas lire la vidéo")
					connection.disconnect()
					console.log(error)
				})
				connection
					.play(stream)
					.on('end', function(){
					connection.disconnect()
					message.channel.send("Palying ! :notes:")
				})
				
				

			})

	}
 })
 bot.login(process.env.TOKEN)

