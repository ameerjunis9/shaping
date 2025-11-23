import React from 'react';
import { Address, LabelDimension } from '../types';
import { Package, Truck, Box } from 'lucide-react';

interface LabelPreviewProps {
  sender: Address;
  receiver: Address;
  weight: string;
  size: LabelDimension;
}

export const LabelPreview: React.FC<LabelPreviewProps> = ({ sender, receiver, weight, size }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Mock tracking number
  const trackingNumber = "1Z 999 AA1 01 2345 6784";

  return (
    <div id="printable-label-container">
      <div 
        id="printable-label-content"
        className="bg-white text-black border-2 border-black relative flex flex-col font-sans overflow-hidden mx-auto shadow-2xl transition-all duration-300 ease-in-out"
        style={{
            width: size.width,
            height: size.height
        }}
      >
        {/* Header / Service Level */}
        <div className="border-b-4 border-black p-4 flex justify-between items-start shrink-0">
          <div className="flex flex-col">
            <span className="font-bold text-4xl tracking-tighter">P</span>
            <span className="text-xs font-bold uppercase mt-1">Priority Ship</span>
          </div>
          <div className="text-right">
             <div className="font-bold text-5xl font-mono">{weight}</div>
             <div className="text-xs uppercase font-bold">Lbs</div>
          </div>
        </div>

        {/* Sender Info (Small) */}
        <div className="p-3 text-xs border-b border-black uppercase shrink-0">
          <div className="font-bold text-slate-600 mb-1">From:</div>
          <div className="font-bold">{sender.name || "SENDER NAME"}</div>
          <div>{sender.street1 || "123 SENDER ST"}</div>
          <div className="flex gap-2">
            <span>{sender.city || "CITY"},</span>
            <span>{sender.state || "ST"}</span>
          </div>
          <div className="mt-1 font-mono">{sender.phoneNumber}</div>
        </div>

        {/* Receiver Info (Large) - Flex grow to fill available space */}
        <div className="p-6 flex-grow flex flex-col justify-center border-b-4 border-black min-h-0">
          <div className="text-sm font-bold text-slate-600 uppercase mb-2">Ship To:</div>
          <div className="text-2xl font-bold uppercase leading-tight mb-1 truncate">{receiver.name || "RECEIVER NAME"}</div>
          <div className="text-xl leading-tight truncate">{receiver.street1 || "456 RECEIVER RD"}</div>
          <div className="text-xl mt-1 font-bold truncate">
            {receiver.city || "DESTINATION"}, {receiver.state || "ST"}
          </div>
          <div className="text-lg mt-2 font-mono">{receiver.phoneNumber}</div>
          <div className="text-lg mt-1 font-bold">{receiver.country}</div>
        </div>

        {/* Tracking & Barcode Section */}
        <div className="p-4 flex flex-col items-center justify-end bg-white shrink-0">
            
            {/* Pseudo-Barcode (Visual Only) */}
            <div className="w-full h-16 flex items-end justify-center gap-[2px] mb-2 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="bg-black" 
                        style={{
                            height: `${Math.random() * 60 + 40}%`,
                            width: `${Math.random() * 6 + 2}px`
                        }}
                    ></div>
                ))}
            </div>

            <div className="text-center font-mono font-bold text-lg tracking-widest">
                {trackingNumber}
            </div>
            
            <div className="w-full flex justify-between items-end mt-2 pt-2 border-t-2 border-black">
                 <div className="flex flex-col text-xs font-bold">
                     <span>BILLING: P/P</span>
                     <span>DATE: {currentDate}</span>
                 </div>
                 <div className="text-3xl font-bold">
                     PK
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};