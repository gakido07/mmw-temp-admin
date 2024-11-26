'use client'

import { SimpleAnalyticCardInterface } from "../../../typings";

const SimpleAnalyticCard = ({card}:{card: SimpleAnalyticCardInterface}) => {
  return ( 
    <div className="col-span-1 rounded-2xl px-12 py-10 myFlex gap-x-6 relative bg-white">
      <div className={`${card.bg} myFlex w-12 h-12 rounded-full`}>
        {card.icon}
      </div>

      <div className="flex items-start justify-start flex-col">
        <p className="font-semibold text-[#212121]">{card.number}</p>
        <p className="text-[12px] text-[#696868]">{card.name}</p>
      </div>
    </div>
   );
}
 
export default SimpleAnalyticCard;