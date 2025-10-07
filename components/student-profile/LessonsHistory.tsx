const LessonsHistoryBox = () => {
  return (
    <div className="bg-[#EBECF0] rounded-2xl p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="flex flex-col">
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            თარიღი
          </span>
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-regular">
            22 სექტემბერი, 19:00
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            ხანგრძლივობა
          </span>
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-regular">
            2 საათი
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-3">
          <div className="w-[44px] h-[44px] bg-[#080808]"></div>
          <div className="flex flex-col">
            <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
              ნუგზარ ბიბილაშვილი
            </span>
            <span className="text-sm leading-5 text-[#080808] font-helveticaneue-regular">
              ინგლისური ენა
            </span>
          </div>
        </div>
        <button className="text-sm leading-5 text-[#080808] font-helveticaneue-regular py-3 bg-[#F0C514] w-full rounded-[50px] cursor-pointer sm:w-fit sm:px-4">
          შეფასების დაწერა
        </button>
      </div>
    </div>
  );
};

const LessonsHistory = () => {
  return (
    <div className="mt-4 flex flex-col gap-3 max-h-[948px] overflow-y-scroll sm:max-h-[532px]">
      <LessonsHistoryBox />
      <LessonsHistoryBox />
      <LessonsHistoryBox />
      <LessonsHistoryBox />
      <LessonsHistoryBox />
    </div>
  );
};

export default LessonsHistory;
