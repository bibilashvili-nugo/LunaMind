import ContentWillBeAdd from "./ContentWillBeAdd";

const SpinContent = () => {
  return (
    <div className="hidden lg:flex lg:w-[35%] h-screen overflow-hidden relative xl:w-1/2 xl:gap-6 marquee-wrapper">
      <div className="marquee xl:w-1/2 lg:w-full">
        <div className="marquee-inner">
          {[...Array(10)].map((_, i) => (
            <ContentWillBeAdd key={i} />
          ))}
          {[...Array(10)].map((_, i) => (
            <ContentWillBeAdd key={`dup-left-${i}`} />
          ))}
        </div>
      </div>
      <div className="w-1/2 hidden xl:block xl:w-1/2">
        <div className="marquee-inner-scrollDown">
          {[...Array(10)].map((_, i) => (
            <ContentWillBeAdd key={i} />
          ))}
          {[...Array(10)].map((_, i) => (
            <ContentWillBeAdd key={`dup-left-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinContent;
