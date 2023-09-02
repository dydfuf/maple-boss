export default function SettlementDetailController() {
    return (
      <div className="flex items-center gap-x-20 text-14 font-semibold text-white">
        <button className="flex h-26 w-60 shrink-0 items-center justify-center rounded-4 bg-purple-100 px-16 py-6">
          확정
        </button>
        <button className="flex h-26 -mr-10 shrink-0 items-center justify-center rounded-4 py-6">
          삭제 
        </button>
      </div>
    );
  }
  