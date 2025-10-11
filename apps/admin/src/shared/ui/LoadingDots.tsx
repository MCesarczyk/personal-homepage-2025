export const LoadingDots = () => {
  return (
    <div className="flex items-center justify-around w-6 h-4">
      <span className="block w-1 h-1 bg-white rounded-full shrink-0 animate-bounce-alt" />
      <span className="block w-1 h-1 bg-white rounded-full shrink-0 animate-bounce-alt animation-delay-100" />
      <span className="block w-1 h-1 bg-white rounded-full shrink-0 animate-bounce-alt animation-delay-200" />
    </div>
  );
};
