require('dotenv').config();
const request = require("request");

function streamRequest(accessToken, clientId, callback){


    setTimeout(() => {
    const streamOptions = {
        url: 'https://api.twitch.tv/helix/streams?user_login=shyjinn',
        method: 'GET',
        headers:{
            'Client-ID': clientId,
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    if(!accessToken){
        console.log("No Token");
    }else{
        //console.log(streamOptions);
    
    const streamRequest = request.get(streamOptions,(err,res,body) => {
        if(err){
            return console.log(err);
        }
        
        //console.log('Status: ${res.statusCode}');
        console.log('Stream Data: [' + JSON.parse(body).data + ']');
        console.log(JSON.parse(body));
        callback(JSON.parse(body).data)
    });
    
    };
    
    },2000)
    return;
}

module.exports = streamRequest;