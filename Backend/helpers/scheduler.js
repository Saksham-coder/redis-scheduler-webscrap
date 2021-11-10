const Webscrap = require("./../models/WebscrapModel");
const schedule = require("node-schedule");
const redis = require("redis");
const client = redis.createClient();
const logger = require("./../helpers/loggers");
var tcpPortUsed = require("tcp-port-used");
const net = require("net");

const options = {
  port: "9000",
};

// "* * * * * *"  SET IT TO YOUR ACCORDING AT YOUR INTERVALS
const scheduler = schedule.scheduleJob("* * * * * *", async () => {
  client.zrevrange("data", 0, -1, async function (err, reply) {
    if (reply.length) {
      try {
        const lastIndex = reply[0];
        const latestData = await Webscrap.findById(JSON.parse(lastIndex));
        console.log("LATEST DATA", latestData);
        const documnet = latestData;
        if (documnet && documnet.halted <= 2) {
          // EXECUTE FUNCTION ANY ASYNC FUNCTION
          // LIKE SENDING MAIL, PERFORMING TASK, ... etc.
          // IF THERE IS TCP ERROR THEN IT WILL ADD TO QUEUE AND ON EXCEDDING TWICE IT WILL NOT ADD IN QUEUE
          tcpPortUsed.check(9000, "127.0.0.1").then(
            async function (inUse) {
              console.log("ENTERED TCP");
              if (inUse && latestData.url) {
                // CHANGING STATUS TO RUNNING
                const updateDocumentToRunning = await Webscrap.findByIdAndUpdate(
                  latestData._id,
                  {
                    $set: {
                      status: "running",
                    },
                  }
                );
                // REMOVING IT FROM SORTED LIST REDIS
                client.zrem("data", lastIndex, async function (err, reply) {
                  console.log("ERR", err);
                  console.log("reply", reply);
                });
                // CREATING CONNECTION
                const tcpclient = net.createConnection(options, () => {
                  tcpclient.write(JSON.stringify({ url: latestData.url }));
                });
                tcpclient.on("data", async (data) => {
                  // MARKED COLLECTION SUCCESS ON DB WHEN IT COMPLETED
                  const updateDocumentToSuccess = await Webscrap.findByIdAndUpdate(
                    latestData._id,
                    {
                      $set: {
                        status: "success",
                        data: data.toString().split(","),
                      },
                    },
                    { new: true }
                  );
                  // CLOSING TCP CONNECTION
                  tcpclient.end();
                });
              }
            },
            async function (err) {
              if (latestData) {
                const updatedToHalt = await Webscrap.findByIdAndUpdate(
                  latestData._id,
                  {
                    $set: { status: "halt" },
                    $inc: { halted: 1 },
                  },
                  { new: true }
                );
              }
            }
          );
        } else {
          // WILL REMOVE IT FROM REDIS SORTED LIST IF ITS EXCEED LIMITATION (LIKE DELETED OR HALTED>2)
          client.zrem("data", lastIndex, async function (err, reply) {
            if (err) {logger.info(`Error when data is removed from queue of ID ${lastIndex} at ${Date.now()}`)}
            if (reply) {logger.info(`Data is removed from queue of ID ${lastIndex} at ${Date.now()}`)}
          });
        }
      } catch (error) {
        if (latestData) {
          const updatedToHalt = await Webscrap.findByIdAndUpdate(
            latestData._id,
            {
              $set: { status: "halt" },
              $inc: { halted: 1 },
            },
            { new: true }
          );
          // ADD AGAIN IN QUEUE IF ITS LESS THAN OR EQUAL TO 2
          if (updatedToHalt?.halted <= 2) {
            // ADDING IN SORTED SET (REDIS)
            const queueDocument = client.zadd(
              "data",
              updatedToHalt.priority,
              JSON.stringify(updatedToHalt._id),
              // JSON.stringify(newDocument),
              async function (err, reply) {
                if (err) {logger.info(`Error when data is added to queue of ID ${updatedToHalt._id} at ${Date.now()}`)}
              if (reply) {logger.info(`Data is added to queue of ID ${updatedToHalt._id} at ${Date.now()}`)}
                if (reply) {
                  const updatedDocument = await Webscrap.findByIdAndUpdate(
                    updatedToHalt._id,
                    {
                      status: "queue",
                    },
                    {
                      new: true,
                    }
                  );
                }
              }
            );
          }
        }
      }
    }
  });
});

module.exports = scheduler;
