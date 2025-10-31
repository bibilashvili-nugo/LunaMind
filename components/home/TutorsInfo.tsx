import React from "react";

const TutorsInfo = ({ id }: { id: string }) => {
  return (
    <div id={id} className="mt-6 md:mt-8 3xl:mt-[84px] flex flex-col">
      <div className="hidden">title</div>
      <div>content</div>
      <div className="hidden">button</div>
    </div>
  );
};

export default TutorsInfo;
