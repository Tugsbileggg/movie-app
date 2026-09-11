const SkeletonDemo = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="w-[190px] animate-pulse">
          <div className="w-[190px] h-[372px] rounded-md bg-gray-300" />
          <div className="mt-2 h-4 w-[170px] rounded bg-gray-300" />
          <div className="mt-2 h-4 w-[80px] rounded bg-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonDemo;