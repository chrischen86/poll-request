
import { Navigate, useSearchParams } from "react-router-dom";
import QuestionPoll from "./QuestionPoll";

const VotePage = () => {
  const [searchParams] = useSearchParams();
  const pollId = searchParams.get("pollId");

  if (!pollId) {
    return <Navigate to="/" />;
  }

  return <QuestionPoll pollId={pollId} />;
};

export default VotePage;
