import { FormProvider, useForm } from "react-hook-form";
import { usePollById } from "../../api/poll-api";
import ErrorBlock from "../../components/ErrorBlock";
import { useUser } from "../../components/hooks/useUser";
import { useVoteOnPoll } from "../../api/vote-api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const QuestionPoll = ({ pollId }) => {
  const { data, isLoading, isError, error } = usePollById(pollId);
  const { mutateAsync: callSubmitVote } = useVoteOnPoll();
  const userId = useUser();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      option: "",
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const { message: errorMessage } = JSON.parse(error.message);
    return <ErrorBlock message={errorMessage} />;
  }

  const { register, handleSubmit, watch, setValue } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    const formData = {
      pollId,
      userId,
      option: data.option,
    };

    const response = await callSubmitVote(formData);
    if (response.ok) {
      navigate("/thanks");
    }
  };

  const handleOptionClick = (e, option) => {
    e.preventDefault();

    setValue("option", option, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const { question, options } = data;

  const isSubmitDisabled = watch("option") === "";

  return (
    <div className="m-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6">
            <div>
              <h3
                htmlFor="question"
                className="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
              >
                {question}
              </h3>
            </div>
          </div>
          {options.map((o, index) => {
            return (
              <div
                className="mb-4 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
                key={`option-${index}`}
              >
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value={o}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  {...register("option")}
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                  onClick={(e) => {
                    handleOptionClick(e, o);
                  }}
                >
                  {o}
                </label>
              </div>
            );
          })}

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className={classNames(
                "bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400",
                {
                  "cursor-not-allowed opacity-50": isSubmitDisabled,
                }
              )}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionPoll;
