const PollSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"100%"}
    height={"100%"}
    fill="transparent"
    viewBox="0 -0.5 25 25"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.192 6H9.808A4.321 4.321 0 0 0 5.5 10.333v4.334A4.321 4.321 0 0 0 9.808 19h5.384a4.321 4.321 0 0 0 4.308-4.333v-4.334A4.32 4.32 0 0 0 15.192 6Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M8.25 15.5a.75.75 0 0 0 1.5 0h-1.5Zm1.5-4a.75.75 0 0 0-1.5 0h1.5Zm2 4a.75.75 0 0 0 1.5 0h-1.5Zm1.5-6a.75.75 0 0 0-1.5 0h1.5Zm2 6a.75.75 0 0 0 1.5 0h-1.5Zm1.5-4a.75.75 0 0 0-1.5 0h1.5Zm-7 4v-4h-1.5v4h1.5Zm3.5 0v-6h-1.5v6h1.5Zm3.5 0v-4h-1.5v4h1.5Z"
    />
  </svg>
);
export default PollSvg;
