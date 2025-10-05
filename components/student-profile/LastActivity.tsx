const LastActivityBox = () => {
  return (
    <div className="flex flex-col w-full border border-[#F1F1F1] rounded-xl py-3 px-4 gap-2 sm:flex-row sm:justify-between sm:items-center ">
      <div className="flex items-start gap-2 sm:items-center">
        <div className="bg-[#7D3FFF] w-6 h-6 rounded-full"></div>
        <div className="flex flex-col gap-1">
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium block">
            ისტორიის საფუძვლები
          </span>
          <div className="flex gap-1">
            <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular block">
              მანანა კახიძე
            </span>
            <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular block">
              2 საათის წინ
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[28px] flex items-center justify-center bg-[#080808] rounded-[40px] sm:w-fit sm:px-3">
        <span className="text-white text-[10px] leading-3 font-helveticaneue-regular">
          დასრულებული
        </span>
      </div>
    </div>
  );
};

const LastActivity = () => {
  return (
    <div className="mt-4 bg-white rounded-2xl px-5 py-6 w-full sm:pt-6 sm:pb-3">
      <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
        ბოლო აქტივობა
      </span>
      <div className="mt-4 flex flex-col gap-4 w-full max-h-[448px] overflow-y-scroll sm:gap-2">
        <LastActivityBox />
        <LastActivityBox />
        <LastActivityBox />
        <LastActivityBox />
        <LastActivityBox />
        <LastActivityBox />
        <LastActivityBox />
      </div>
    </div>
  );
};

export default LastActivity;
