var fs = require('fs');
const request = require("request");
require('dotenv').config();
async function refreshToken(callbackWithNewToken) {
    fs.readFile('./program_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }

        const jsonData = JSON.parse(data);

        const refreshOptions = {
            url: 'https://id.twitch.tv/oauth2/token',
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`grant_type=refresh_token&refresh_token=${jsonData.REFRESHTOKEN.trim()}&client_id=${process.env.CHATCLIENTID}&client_secret=${process.env.CHATCLIENTSECRET}`,
        }

        console.log('MAKING POST REQUEST FOR NEW ACCESS TOKEN')
        request.post(refreshOptions, (err, res, body) => {

            const bodyJSON = JSON.parse(body);

            console.log('TOKEN AQUIRED... WRITING TO FILE');

            jsonData.OAUTHTOKEN = bodyJSON.access_token
            jsonData.REFRESHTOKEN = bodyJSON.refresh_token

            const newData = JSON.stringify(jsonData)

            fs.writeFileSync('./program_data.json', newData);
            console.log('TOKEN WRITTEN TO FILE SUCCESSFULLY');
            callbackWithNewToken();

        })
        
    });

}
module.exports = refreshToken;