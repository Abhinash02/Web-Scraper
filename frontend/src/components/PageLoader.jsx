const PageLoader = ({ text = "Working on it..." }) => {
  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-bg/80 backdrop-blur-xl top-20">
      <div className="rounded-[2.5rem] bg-white border border-border p-12 text-center shadow-2xl shadow-accent/5 transition-all">
        <div className="relative mb-10 mx-auto h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-accent/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin shadow-[0_0_15px_rgba(170,59,255,0.2)]"></div>
        </div>
        <h3 className="text-xl font-extrabold tracking-tight text-text-h mb-2">
          {text}
        </h3>
        <p className="text-text font-medium opacity-70 max-w-[200px] mx-auto text-sm leading-relaxed">
          Please wait while we sync the latest tech news.
        </p>
      </div>
    </div>
  );
};

export default PageLoader;