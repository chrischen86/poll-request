import * as yup from "yup";

export const schema = yup
  .object({
    option: yup.string().required().strict(),
    pollId: yup.string().required().strict(),
    userId: yup.string().required().strict(),
  })
  .required();

export const pollSchema = yup.object({
  question: yup.string().required().strict(),
  options: yup.array(),
});

export const voteSchema = yup.object({
  pollId: yup.string().required().strict(),
  userId: yup.string().required().strict(),
  option: yup.string().required().strict(),
});
