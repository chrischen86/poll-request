import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import PollOption from "./PollOption";
import { useCreatePoll } from "../../api/poll-api";
import { useNavigate } from "react-router-dom";

const CreatePollPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: callCreatePoll } = useCreatePoll();

  const methods = useForm({
    defaultValues: {
      question: "",
      options: [{ value: "" }],
    },
  });

  const { register, control, handleSubmit } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: "options",
  });

  const addOptionHandler = () => {
    append({ value: "" });
  };

  const onSubmit = async (data) => {
    const formData = {
      question: data.question,
      options: data.options.map((o) => o.value),
    };

    const response = await callCreatePoll(formData);
    if (response.ok) {
      const json = await response.json();
      const { id } = json;
      navigate(`/view?pollId=${id}`);
    }
  };

  return (
    <div className="m-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6">
            <div>
              <label
                htmlFor="question"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                The Question
              </label>
              <input
                type="text"
                id="question"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What question do you want answered?"
                required
                {...register("question")}
              />
            </div>
          </div>
          {fields.map((item, index) => {
            return (
              <div key={`polloption-${index}`}>
                <PollOption optionNumber={index} />
              </div>
            );
          })}
          <div className="mt-4">
            <button
              className="bg-emerald-600 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2 focus:ring-offset-emerald-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-emerald-500 dark:highlight-white/20 dark:hover:bg-emerald-400"
              onClick={addOptionHandler}
            >
              Add Option
            </button>
          </div>

          <div className="border-t border-slate-300 mt-4 md:hidden" />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePollPage;
