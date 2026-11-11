export const BarProgress = () => {
  return (
    <div className="bg-surface h-2 w-full overflow-hidden rounded-full">
      <span className="bg-primary block h-full w-0 rounded-full transition-all duration-300"></span>
    </div>
  );
};
