const StoryListSkeleton = () => {
  return (
    <div className="story-list">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="story-card skeleton-card" key={index}>
          <div className="skeleton-line title" />
          <div className="skeleton-line meta" />
        </div>
      ))}
    </div>
  );
};

export default StoryListSkeleton;