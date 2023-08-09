import { Navigate, useSearchParams } from "react-router-dom";
import PollResult from "./PollResult";

const ViewPage = () => {
  const [searchParams] = useSearchParams();
  const pollId = searchParams.get("pollId");

  if (!pollId) {
    return <Navigate to="/" />;
  }

  return <PollResult pollId={pollId} />;
};

export default ViewPage;
