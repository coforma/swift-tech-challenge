export const Spinner = () => {
  return (
    <div className="spinner-container">
      <div
        title="spinner"
        className="spinner"
        role="progressbar"
        aria-valuetext="loading"
      ></div>
      <div className="spinner-text">Loading content</div>
    </div>
  );
};
