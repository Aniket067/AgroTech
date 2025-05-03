'use client';

import CropPredictionForm from '@/components/CropPredictionForm';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Main content container */}
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Form section */}
          <div className="w-full max-w-md">
            <CropPredictionForm />
          </div>
        </div>

      </div>
    </div>
  );
}
