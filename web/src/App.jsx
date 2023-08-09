import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Root from "./pages/Root";
import CreatePollPage from "./pages/create/CreatePollPage";
import VotePage from "./pages/vote/VotePage";
import JoinPage from "./pages/join/JoinPage";
import ViewPage from "./pages/view/ViewPage";
import queryClient from "./api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./components/UserContext";
import ThanksPage from "./pages/thanks/ThanksPage";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePollPage />,
      },
      {
        path: "/join",
        element: <JoinPage />,
      },
      {
        path: "/vote",
        element: <VotePage />,
      },
      {
        path: "/view",
        element: <ViewPage />,
      },
      {
        path: "/thanks",
        element: <ThanksPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
