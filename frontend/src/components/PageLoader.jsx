const PageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="page-loader-wrap">
      <div className="page-loader-card">
        <div className="spinner-ring" />
        <h3>{text}</h3>
        <p>Please wait a moment.</p>
      </div>
    </div>
  );
};

export default PageLoader;