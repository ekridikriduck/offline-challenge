export const Loader = ({ loaderText = "Loading", style }) => (
  <div style={style} className={"loader"}>
    {loaderText}
    <span className={"dotOne"}>.</span>
    <span className={"dotTwo"}>.</span>
    <span className={"dotThree"}>.</span>
  </div>
);

export const BasicLoader = ({ style }) => {
  return (
    <div style={style} className="loader">
      <span className={"dotOne"}>-</span>
      <span className={"dotTwo"}>-</span>
      <span className={"dotThree"}>-</span>
    </div>
  );
};
