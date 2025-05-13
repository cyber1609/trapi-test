import React, { useState } from "react";
import { LocationSelect } from "../components/LocationSelect";
import { VehicleAvailabilityList } from "../components/VehicleAvailabilityList";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function LocationDemoForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [checkinDate, setCheckinDate] = useState(todayPlus(1));
  const [checkoutDate, setCheckoutDate] = useState(todayPlus(3));
  const [errors, setErrors] = useState<{ origin?: string; destination?: string; checkinDate?: string; checkoutDate?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  function validate() {
    const newErrors: typeof errors = {};
    if (!origin) newErrors.origin = "Origin is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (origin && destination && origin === destination) {
      newErrors.destination = "Origin and destination must be different";
    }
    if (!checkinDate) newErrors.checkinDate = "Check-in date is required";
    if (!checkoutDate) newErrors.checkoutDate = "Check-out date is required";
    if (checkinDate && checkoutDate && checkinDate > checkoutDate) {
      newErrors.checkoutDate = "Check-out date must be after check-in date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setApiError(null);
    setAvailabilities([]);
    if (!validate()) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        from_location: origin.toLowerCase(),
        to_location: destination.toLowerCase(),
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
      });
      const res = await fetch(`/indie-campers-list-availabilities?${params.toString()}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || res.statusText);
      }
      const data = await res.json();
      if (Array.isArray(data?.data)) {
        setAvailabilities(data.data);
      } else {
        setApiError("Invalid response from server");
      }
    } catch (err: any) {
      setApiError(err.message || "Failed to fetch availabilities");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <LocationSelect
        label="Origin"
        name="origin"
        value={origin}
        onChange={setOrigin}
        required
        error={submitted ? errors.origin : undefined}
      />
      <LocationSelect
        label="Destination"
        name="destination"
        value={destination}
        onChange={setDestination}
        required
        error={submitted ? errors.destination : undefined}
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="checkin_date">
            Check-in Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="checkin_date"
            name="checkin_date"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.checkinDate ? "border-red-500" : "border-gray-300"
            }`}
            value={checkinDate}
            onChange={e => setCheckinDate(e.target.value)}
            required
            min={todayPlus(0)}
          />
          {submitted && errors.checkinDate && (
            <div className="text-red-600 text-sm mt-1">{errors.checkinDate}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="checkout_date">
            Check-out Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="checkout_date"
            name="checkout_date"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.checkoutDate ? "border-red-500" : "border-gray-300"
            }`}
            value={checkoutDate}
            onChange={e => setCheckoutDate(e.target.value)}
            required
            min={checkinDate || todayPlus(0)}
          />
          {submitted && errors.checkoutDate && (
            <div className="text-red-600 text-sm mt-1">{errors.checkoutDate}</div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search Availabilities"}
      </button>
      {apiError && <div className="text-red-600 text-sm mt-2">{apiError}</div>}
      {availabilities.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Available Vehicles</h2>
          <VehicleAvailabilityList data={availabilities} />
        </div>
      )}
    </form>
  );
}
