require('dotenv').config();
const request = require('request');

function getVideo(apiKey, callback){


    setTimeout(() => {
    const streamOptions = {
        url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCfqAgoVQHLWrovN0MeZKdhA&maxResults=1&eventType=none&order=date&type=video&key=' + apiKey,
        method: 'GET',
    }
    if(!apiKey){
        console.log("No API Key");
    }else{
        //console.log(streamOptions);
    
    const streamRequest = request.get(streamOptions,(err,res,body) => {
        if(err){
            return console.log(err);
        }
        callback(JSON.parse(body).items[0])
    });
    
    };
    
    },2000)
    return;
}

module.exports = getVideo;
