import { Link } from "react-router-dom";
import { usePollResultsById } from "../../api/results-api";
import ErrorBlock from "../../components/ErrorBlock";
import ResultGraph from "./ResultGraph";
import { QRCodeSVG } from "qrcode.react";

const PollResult = ({ pollId }) => {
  const { data, isLoading, error } = usePollResultsById(pollId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    let message = "An error occured";
    try {
      const { error: errorMessage } = JSON.parse(error.message);
      message = errorMessage;
    } catch (e) {
      console.log(e);
    }
    return <ErrorBlock message={message} />;
  }

  const { votes, question } = data;
  const optionLabels = Object.keys(votes);
  const values = Object.values(votes);

  const url = `${window.location.hostname}/vote?pollId=${pollId}`;
  return (
    <div className="flex mx-2 lg:mx-8 mt-2 flex-wrap">
      <div className="flex-col hidden xl:block">
        <QRCodeSVG
          value={url}
          size={256}
          style={{ height: "auto" }}
          className="p-2 rounded-lg shadow w-full lg:w-80"
        />
        <p className="mt-6 text-lg text-slate-600 text-center mx-auto dark:text-slate-400">
          Poll Id
        </p>
        <Link to={`/vote?pollId=${pollId}`}>
          <p className="font-mono font-bold text-sky-500 dark:text-sky-400 text-5xl lg:text-6xl text-center">
            {pollId}
          </p>
        </Link>
      </div>
      <div className="xl:hidden w-full">
        <p className="mt-6 text-lg text-slate-600 text-center mx-auto dark:text-slate-400">
          Poll Id
        </p>
        <Link to={`/vote?pollId=${pollId}`}>
          <p className="font-mono font-bold text-sky-500 dark:text-sky-400 text-5xl lg:text-6xl text-center">
            {pollId}
          </p>
        </Link>
      </div>
      <div className="mx-auto w-full lg:w-[80%]">
        <ResultGraph
          optionLabels={optionLabels}
          values={values}
          title={question}
        />
      </div>
    </div>
  );
};

export default PollResult;
