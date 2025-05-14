import React from "react";
import { DuffelFlightForm } from "../components/DuffelFlightForm";

export default function DuffelDemo() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <h1 className="text-2xl font-bold mb-4">Duffel Flights Demo</h1>
        <div className="max-w-xl w-full space-y-6 px-4">
          <DuffelFlightForm />
        </div>
      </div>
    </main>
  );
}
