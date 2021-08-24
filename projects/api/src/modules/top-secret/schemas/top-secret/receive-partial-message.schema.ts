import Joi from "joi";

const receivePartialMessageSchema = Joi.object({
  distance: Joi.number().required(),
  message: Joi.array().items(Joi.string().allow("")),
});

export default receivePartialMessageSchema;
