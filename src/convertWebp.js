const https = require('https');
const fs = require('fs');
const webp = require('webp-converter');

function convertWebp(url, path){

  return new Promise(resolve => {

    const file = fs.createWriteStream(`${path}.webp`);

    https.get(url, response => {
       response.pipe(file);
     
       file.on('finish', async () => {
         file.close();
         await webp.dwebp(`${path}.webp`, `${path}.png`, '-o');
        
         fs.unlinkSync(`${path}.webp`);
         console.log(`Image downloaded and converted`);

         resolve();
       });
     }).on('error', err => {
       fs.unlink(`${path}.webp`);
       console.error(`Error downloading image: ${err.message}`);
       resolve();
     });
  })

}

module.exports = convertWebp;