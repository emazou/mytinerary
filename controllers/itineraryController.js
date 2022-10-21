const Itinerary = require("../models/Itinerary");
const Joi = require("joi");

const validator = Joi.object({
  _id: Joi.string(),
  name: Joi.string()
    .min(4)
    .max(50)
    .required()
    .messages({ errorType: "INVALID_NAME" }),
  user: Joi.string().required().messages({ errorType: "INVALID_USER" }),
  city: Joi.string().required().messages({ errorType: "INVALID_CITY" }),
  price: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({ errorType: "INVALID_PRICE" }),
  likes: Joi.array().required().messages({ errorType: "INVALID_LIKES" }),
  tags: Joi.array()
    .items(Joi.string())
    .required()
    .messages({ errorType: "INVALID_TAGS" }),
  duration: Joi.number()
    .integer()
    .min(1)
    .max(6)
    .required()
    .messages({ errorType: "INVALID_DURATION" }),
});

const editValidator = Joi.object({
  id: Joi.string(),
  name: Joi.string()
    .min(4)
    .max(50)
    .required()
    .messages({ errorType: "INVALID_NAME" }),
  price: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({ errorType: "INVALID_PRICE" }),
  duration: Joi.number()
    .integer()
    .min(1)
    .max(6)
    .required()
    .messages({ errorType: "INVALID_DURATION" }),
})

const itineraryController = {
  allItineraries: async (req, res) => {
    let itineraries;
    let query = {};
    if (req.query.city) {
      query.city = req.query.city;
    }
    if (req.query.user) {
      query.user = req.query.user;
    }
    try {
      itineraries = await Itinerary.find(query)
        .populate("user", { name: 1, lastName: 1, photo: 1, country: 1 })
        .populate("city");
      if (itineraries) {
        res.status(200).json({
          message: "You get itineraries",
          response: itineraries,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Could't find itineraries",
          success: false,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  createItinerary: async (req, res) => {
    const { name, user, city, price, likes, tags, duration } = req.body;
    try {
      let result = await validator.validateAsync(req.body);

      let itinerary = await new Itinerary({
        name,
        user,
        city,
        price,
        likes,
        tags,
        duration,
      }).save();
      res.status(201).json({
        id: itinerary._id,
        message: "Itinerary created",
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: "Could't create itinerary",
        success: false,
      });
    }
  },
  editItinerary: async (req, res) => {
    const itinerary = req.body;
    const { id } = req.params;
    try {
      let result = await editValidator.validateAsync(req.body);
      let itinerarydb = await Itinerary.findOneAndUpdate(
        { _id: id },
        itinerary,
        { new: true }
      );
      if (itinerarydb) {
        res.status(200).json({
          message: "Modified itinerary",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Intinerary not found",
          success: false,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  deleteItinerary: async (req, res) => {
    const { id } = req.params;
    try {
      let itinerarydb = await Itinerary.findOneAndDelete({ _id: id });
      if (itinerarydb) {
        res.status(200).json({
          message: "Itinerary deleted",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Intinerary not found",
          success: false,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  getItinerary: async (req, res) => {
    const { id } = req.params;
    try {
      let intinerary = await Itinerary.findOne({ _id: id });
      if (intinerary) {
        res.status(200).json({
          message: "You get one intinerary",
          response: intinerary,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Could't find intinerary",
          success: false,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  likeDislike: async (req, res) => {
    const {idItinerary} = req.params
    const {id} = req.user
    try{
      let itinerary = await Itinerary.findOne({_id:idItinerary})
      if (itinerary && itinerary.likes.includes(id)){
        await Itinerary.findOneAndUpdate({_id:idItinerary}, {$pull:{likes:id}}, {new:true})
        res.status(200).json({
          message: "Disliked",
          success: true,
        });

      } else if (itinerary && !itinerary.likes.includes(id)){
        await Itinerary.findOneAndUpdate({_id:idItinerary}, {$push:{likes:id}}, {new:true})
        res.status(200).json({
          message: "Liked",
          success: true,
        });

      }else {
        res.status(404).json({
          message: "Itinerary not found",
          success: false, 
        });
      }
      
    } catch (error){
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  }
};
module.exports = itineraryController;
