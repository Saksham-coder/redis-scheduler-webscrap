const net = require('net')
const { getHTML, getNews } = require("./helpers/scraper");
const logger = require("./helpers/loggers");

const server = net.createServer(conn => {

    conn.on('data',async data => {
        try{
            if (!JSON.parse(data).url) {
                conn.write('not valid url' + '\r\n')
            }
            const html = await getHTML(JSON.parse(data).url);
            const news = await getNews(html);
            conn.write(news + '\r\n')
        } catch(error) {
            logger.warn(error);
        }
    })

    conn.on('end', ()=> {
        console.log("CONNECTION ENDED")
    })

})

const PORT = process.env.PORT || 9000

server.listen(PORT)