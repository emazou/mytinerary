const User = require("../models/User");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const sendMail = require("./sendMail");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const validator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(12)
    .required()
    .messages({ errorType: "INVALID_NAME" }),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({ errorType: "INVALID_LASTNAME" }),
  mail: Joi.string().email().required().messages({ errorType: "INVALID_MAIL" }),
  password: Joi.string()
    .alphanum()
    .min(6)
    .required()
    .messages({ errorType: "INVALID_PASSWORD" }),
  photo: Joi.string().uri().required().messages({ errorType: "INVALID_URL" }),
  country: Joi.string()
    .min(4)
    .required()
    .messages({ errorType: "INVALID_COUNTRY" }),
  from: Joi.string().required().messages({ errorType: "INVALID_FROM" }),
  role: Joi.string().required().messages({ errorType: "INVALID_ROLE" }),
});
const editValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(12)
    .required()
    .messages({ errorType: "INVALID_NAME" }),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({ errorType: "INVALID_LASTNAME" }),
  photo: Joi.string().uri().required().messages({ errorType: "INVALID_URL" }),
  country: Joi.string()
    .min(4)
    .required()
    .messages({ errorType: "INVALID_COUNTRY" }),
})
const userController = {
  editProfile: async (req, res) => {
    let body = req.body; // nuevos datos del usuario a modificaar
    let { id } = req.user //id usuario
    try {
      let result = await editValidator.validateAsync(req.body);
      let user = await User.findOneAndUpdate({ _id: id }, body, { new: true })
      if (user) {
        res.status(200).json({
          message: "Modified profile",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "User not found",
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
  signUp: async (req, res) => {
    let { name, lastName, photo, country, mail, password, role, from } =
      req.body;
    try {
      let result = await validator.validateAsync(req.body);

      let user = await User.findOne({ mail });
      if (!user) {
        let logged = false;
        let verified = false;
        let code = crypto.randomBytes(15).toString("hex");
        if (from === "form") {
          password = bcryptjs.hashSync(password, 10);
          user = await new User({
            name,
            lastName,
            photo,
            country,
            mail,
            password: [password],
            role,
            from: [from],
            logged,
            verified,
            code,
          }).save();

          sendMail(mail, code);
          res.status(201).json({
            message: "User signed up from form",
            success: true,
          });
        } else {
          password = bcryptjs.hashSync(password, 10);
          verified = true;
          user = await new User({
            name,
            lastName,
            photo,
            country,
            mail,
            password: [password],
            role,
            from: [from],
            logged,
            verified,
            code,
          }).save();

          res.status(201).json({
            message: "User signed up form " + from,
            success: true,
          });
        }
      } else {
        if (user.from.includes(from)) {
          res.status(200).json({
            message: "User already exist",
            success: false,
          });
        } else {
          user.from.push(from);

          user.verified = true;

          user.password.push(bcryptjs.hashSync(password, 10));
          await user.save();
          res.status(201).json({
            message: "User signed up form " + from,
            success: true,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  },
  signIn: async (req, res) => {
    const { mail, password, from } = req.body;
    try {
      const user = await User.findOne({ mail });
      if (!user) {
        res.status(404).json({
          message: "User doesn't exists, please sign up",
          success: false,
        });
      } else if (user.verified) {
        const checkPassword = user.password.filter((passwordElement) =>
          bcryptjs.compareSync(password, passwordElement)
        );
        if (from === "form") {
          if (checkPassword.length > 0) {
            const loginUser = {
              id: user._id,
              name: user.name,
              lastName: user.lastName,
              mail: user.mail,
              role: user.role,
              from: user.from,
              photo: user.photo,
              country: user.country
            };
            user.logged = true;
            await user.save();
            const token = jwt.sign(
              {
                id: user._id,
              },
              process.env.KEY_JWT,
              { expiresIn: 60 * 60 * 24 }
            );
            res.status(200).json({
              message: "Welcome " + user.name,
              response: { token: token, user: loginUser },
              success: true,
            });
          } else {
            res.status(400).json({
              message: "Password incorrect",
              success: false,
            });
          }
        } else {
          if (checkPassword.length > 0) {
            const loginUser = {
              id: user._id,
              name: user.name,
              lastName: user.lastName,
              mail: user.mail,
              role: user.role,
              from: user.from,
              photo: user.photo,
            };
            user.logged = true;
            await user.save();
            const token = jwt.sign(
              {
                id: user._id,
              },
              process.env.KEY_JWT,
              { expiresIn: 60 * 60 * 24 }
            );
            res.status(200).json({
              message: "Welcome " + user.name,
              response: { token: token, user: loginUser },
              success: true,
            });
          } else {
            res.status(400).json({
              message: "Invalid credentials",
              success: false,
            });
          }
        }
      } else {
        res.status(401).json({
          message: "Please, verify your email account and try again",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Sign In error, try again later",
        success: false,
      });
    }
  },
  verifyMail: async (req, res) => {
    const { code } = req.params;
    try {
      let user = await User.findOne({ code });
      if (user) {
        user.verified = true;
        await user.save();
        res.redirect("https://my-tinerary-devthrone-front.herokuapp.com/");
      } else {
        res.status(404).json({
          message: "Email has no account yet",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Could't verify account",
        success: false,
      });
    }
  },
  signOut: async (req, res) => {
    let { mail } = req.body;
    try {
      let user = await User.findOne({ mail });
      if (user) {
        user.logged = false;
        await user.save();
        res.status(200).json({
          message: "Sign Out successfully",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Email has no account yet",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Could't close log out",
        success: false,
      });
    }
  },
  verifyToken: (req, res) => {
    if (!req.err) {
      const token = jwt.sign({ id: req.user.id }, process.env.KEY_JWT, { expiresIn: 60 * 60 * 24 });
      res.status(200).json({
        success: true,
        response: {
          user: req.user,
          token: token,
        },
        message: "Welcome " + req.user.name,
      });
    } else {
      res.json({
        success: false,
        message: "sign in please!",
      });
    }
  },
};

module.exports = userController;
