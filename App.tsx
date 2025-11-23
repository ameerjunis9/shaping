import React, { useState } from 'react';
import { Address, EMPTY_ADDRESS, LABEL_SIZES, LabelDimension } from './types';
import { AddressForm } from './components/AddressForm';
import { LabelPreview } from './components/LabelPreview';
import { Printer, ArrowRight, PackageOpen, Scale, Settings } from 'lucide-react';

export default function App() {
  const [sender, setSender] = useState<Address>(EMPTY_ADDRESS);
  const [receiver, setReceiver] = useState<Address>(EMPTY_ADDRESS);
  const [weight, setWeight] = useState<string>("1");
  const [labelSize, setLabelSize] = useState<LabelDimension>(LABEL_SIZES[0]); // Default 4x6

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 print:bg-white">
      {/* Dynamic Styles for Print */}
      <style>{`
        @media print {
          @page {
            size: ${labelSize.width} ${labelSize.height};
            margin: 0;
          }
          #printable-label-container {
             width: ${labelSize.width} !important;
             height: ${labelSize.height} !important;
          }
        }
      `}</style>

      {/* Header - Hidden on Print */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center print:hidden sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <PackageOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Smart Label Creator</h1>
            <p className="text-xs text-slate-500 font-medium">AI-Powered Shipping Tool</p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <Printer size={18} />
          <span>Print / Save Label</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 print:p-0 print:block">
        
        {/* Left Column: Forms (Hidden on Print) */}
        <div className="lg:col-span-7 flex flex-col gap-6 print:hidden">
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex flex-col gap-4">
             <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-1.5 rounded-full text-blue-600 mt-0.5">
                  <ArrowRight size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-900">Get Started</h3>
                  <p className="text-sm text-blue-700 leading-relaxed mt-1">
                    Enter addresses manually or paste a messy full address into the <strong>AI Quick Fill</strong> box to auto-populate the fields. 
                  </p>
                </div>
             </div>
             
             {/* Configuration Section: Weight & Size */}
             <div className="mt-2 pt-4 border-t border-blue-100 flex flex-wrap items-center gap-6">
               
               {/* Weight Input */}
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                   <Scale size={18} />
                   <span>Weight:</span>
                 </div>
                 <div className="relative">
                   <input 
                     type="text" 
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     className="w-20 pl-3 pr-8 py-2 border border-blue-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                   />
                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">LB</span>
                 </div>
               </div>

               {/* Label Size Selector */}
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                   <Settings size={18} />
                   <span>Size:</span>
                 </div>
                 <select
                    value={labelSize.id}
                    onChange={(e) => {
                      const selected = LABEL_SIZES.find(s => s.id === e.target.value);
                      if (selected) setLabelSize(selected);
                    }}
                    className="pl-3 pr-8 py-2 border border-blue-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-white"
                 >
                    {LABEL_SIZES.map(size => (
                      <option key={size.id} value={size.id}>{size.name}</option>
                    ))}
                 </select>
               </div>

               {/* Custom Dimensions Inputs - Only shown if Custom is selected */}
               {labelSize.id === 'custom' && (
                 <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Width (in)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={parseFloat(labelSize.width)} 
                            onChange={(e) => setLabelSize({...labelSize, width: `${e.target.value}in`})}
                            className="w-16 p-1 border border-slate-300 rounded text-sm focus:border-blue-500 outline-none"
                        />
                    </div>
                    <span className="mt-4 text-slate-400 font-bold">x</span>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Height (in)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={parseFloat(labelSize.height)} 
                            onChange={(e) => setLabelSize({...labelSize, height: `${e.target.value}in`})}
                            className="w-16 p-1 border border-slate-300 rounded text-sm focus:border-blue-500 outline-none"
                        />
                    </div>
                 </div>
               )}

             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <AddressForm 
              title="From (Sender)" 
              address={sender} 
              onChange={setSender} 
              colorTheme="blue"
            />
            <AddressForm 
              title="To (Receiver)" 
              address={receiver} 
              onChange={setReceiver} 
              colorTheme="purple"
            />
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-5 flex flex-col print:w-full print:h-screen print:col-span-12">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-4 print:hidden">
               <h2 className="text-lg font-bold text-slate-800">Live Preview ({labelSize.name})</h2>
               <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">Thermal Ready</span>
            </div>
            
            {/* The Label Preview Component */}
            <div className="flex justify-center bg-slate-200/50 p-8 rounded-2xl border border-slate-200 shadow-inner print:p-0 print:bg-transparent print:border-none print:shadow-none overflow-auto">
              <LabelPreview sender={sender} receiver={receiver} weight={weight} size={labelSize} />
            </div>

            <div className="mt-6 text-center text-sm text-slate-400 print:hidden">
              <p>Preview updates in real-time. Use the print button to save as PDF.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}