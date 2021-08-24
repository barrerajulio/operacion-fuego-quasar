import Joi from "joi";

/** TODO: Requerir los satelites kenobi, skywalker, sato */
const satelliteShape = Joi.object({
  name: Joi.string().required(),
  distance: Joi.number().required(),
  message: Joi.array().items(Joi.string().allow("")),
});

const receiveMessageSchema = Joi.object({
  satellites: Joi.array().items(satelliteShape).required(),
});

export default receiveMessageSchema;
