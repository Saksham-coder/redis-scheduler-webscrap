const Webscrap = require("./../models/WebscrapModel");
const redis = require("redis");
const client = redis.createClient();
const logger = require("./../helpers/loggers");

exports.postWebscrap = async (req, res) => {
  try {
    const { url, priority, status, title } = req.body;

    // VALIDATION
    if (!url && !priority && !status && !title) {
      const response = {
        message: "Field is missing",
      };
      logger.warn(response);
      res.status(404).json(response);
    }

    // SAVING IN DATABASE
    const newDocument = await Webscrap.create({ url, priority, status, title });
    
    const id = newDocument._id

    // ADDING IN SORTED SET (REDIS)
    const queueDocument = client.zadd(
      "data",
      priority,
      JSON.stringify(newDocument._id),
      // JSON.stringify(newDocument),
      async function (err, reply) {
        if (reply) {
          const updatedDocument = await Webscrap.findByIdAndUpdate(
            newDocument._id,
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

    logger.info(`Webscrap is created at ${Date.now()}`);
    res.status(200).json({
      message: "Webscrap is created!",
    });
  } catch (error) {
    logger.warn(`Webscrap is failed to create at ${Date.now()} ${error}`);
    res.status(404).json({
      message: "Webscrap is not created!",
    });
  }
};

exports.getAllWebscrap = async (req, res) => {
  try {
    const documents = await Webscrap.find();
    logger.info(`Data is fetched at ${Date.now()}`);
    res.status(200).json({
      message: "Webscrap is fetched",
      data: documents,
    });
  } catch (error) {
    logger.warn(`Webscrap is failed to create at ${Date.now()} ${error}`);
    res.status(404).json({
      message: "Webscrap is not fetched!",
    });
  }
};

exports.abortWebscrap = async (req, res) => {
  try {
    const { id } = req.body;
    const document = await Webscrap.findByIdAndUpdate(id, {
      $set: { status: "abort" },
      $inc: { halted: 1 },
    });
    // MAKE HELPERS TO UTILS
    logger.info(`Data is aborted of Id ${id} at ${Date.now()}`);
    res.status(200).json({
      message: "Webscrap is aborted!",
    });
  } catch (error) {
    logger.warn(`${error} at ${Date.now()}`);
  }
};


exports.deleteWebscrap = async (req, res) => {
  try {
    const {
      id
    } = req.body
    const document = await Webscrap.findById(id);
    if (document && document.status !== 'abort') {
      logger.info(`Cant delete other than status abort}`);
      return res.status(204).json({
        message: "Cant delete other than status abort",
      });
    }
    const deleteDocument = await Webscrap.findByIdAndDelete(id);
    logger.info(`Data is deleted of Id ${id} at ${Date.now()}`);
    res.status(200).json({
      message: "Webscrap is deleted",
    });
  } catch (error) {
    logger.warn(`Webscrap is failed to create at ${Date.now()} ${error}`);
    res.status(404).json({
      message: "Webscrap is not fetched!",
    });
  }
};