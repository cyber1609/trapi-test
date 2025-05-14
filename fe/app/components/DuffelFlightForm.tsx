import React, { useState } from "react";
import { DuffelOfferList } from "./DuffelOfferList";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const cabinClassOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

export function DuffelFlightForm() {
  // Form state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(todayPlus(7));
  const [departureTimeFrom, setDepartureTimeFrom] = useState("");
  const [departureTimeTo, setDepartureTimeTo] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");
  const [maxConnections, setMaxConnections] = useState(1);
  const [passengerType, setPassengerType] = useState("adult");
  const [passengerAge, setPassengerAge] = useState(18);
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  function validate() {
    const newErrors: any = {};
    if (!origin) newErrors.origin = "Origin is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (origin && destination && origin === destination) {
      newErrors.destination = "Origin and destination must be different";
    }
    if (!departureDate) newErrors.departureDate = "Departure date is required";
    if (departureTimeFrom && !/^\d{2}:\d{2}$/.test(departureTimeFrom)) {
      newErrors.departureTimeFrom = "Time must be in HH:MM format";
    }
    if (departureTimeTo && !/^\d{2}:\d{2}$/.test(departureTimeTo)) {
      newErrors.departureTimeTo = "Time must be in HH:MM format";
    }
    if (departureTimeFrom && departureTimeTo && departureTimeFrom > departureTimeTo) {
      newErrors.departureTimeTo = "To time must be after From time";
    }
    if (!cabinClass) newErrors.cabinClass = "Cabin class is required";
    if (!passengerType) newErrors.passengerType = "Passenger type is required";
    if (passengerType === "child" && (!passengerAge || passengerAge < 2 || passengerAge > 17)) {
      newErrors.passengerAge = "Child age must be between 2 and 17";
    }
    if (passengerType === "adult" && passengerAge < 18) {
      newErrors.passengerAge = "Adult age must be 18 or above";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildRequestBody() {
    return {
      data: {
        slices: [
          {
            origin: origin.toUpperCase(),
            destination: destination.toUpperCase(),
            departure_time: {
              from: departureTimeFrom || undefined,
              to: departureTimeTo || undefined,
            },
            departure_date: departureDate,
            arrival_time: {},
          },
        ],
        private_fares: {},
        passengers: [
          {
            family_name: "Test",
            given_name: "User",
            loyalty_programme_accounts: [],
            type: passengerType,
            age: passengerAge,
            fare_type: "",
          },
        ],
        max_connections: maxConnections,
        cabin_class: cabinClass,
      },
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setApiError(null);
    setOffers([]);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/duffel-flights-list-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildRequestBody()),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || res.statusText);
      }
      const data = await res.json();
      if (Array.isArray(data?.data?.offers)) {
        setOffers(data.data.offers);
      } else {
        setApiError("Invalid response from server");
      }
    } catch (err: any) {
      setApiError(err.message || "Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="origin">
            Origin (IATA code) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.origin ? "border-red-500" : "border-gray-300"
            }`}
            value={origin}
            onChange={e => setOrigin(e.target.value.toUpperCase())}
            required
            maxLength={3}
            minLength={3}
            placeholder="e.g. LHR"
          />
          {submitted && errors.origin && (
            <div className="text-red-600 text-sm mt-1">{errors.origin}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="destination">
            Destination (IATA code) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.destination ? "border-red-500" : "border-gray-300"
            }`}
            value={destination}
            onChange={e => setDestination(e.target.value.toUpperCase())}
            required
            maxLength={3}
            minLength={3}
            placeholder="e.g. JFK"
          />
          {submitted && errors.destination && (
            <div className="text-red-600 text-sm mt-1">{errors.destination}</div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="departure_date">
            Departure Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="departure_date"
            name="departure_date"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.departureDate ? "border-red-500" : "border-gray-300"
            }`}
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
            required
            min={todayPlus(0)}
          />
          {submitted && errors.departureDate && (
            <div className="text-red-600 text-sm mt-1">{errors.departureDate}</div>
          )}
        </div>
        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="departure_time_from">
              Departure Time From
            </label>
            <input
              type="time"
              id="departure_time_from"
              name="departure_time_from"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.departureTimeFrom ? "border-red-500" : "border-gray-300"
              }`}
              value={departureTimeFrom}
              onChange={e => setDepartureTimeFrom(e.target.value)}
              placeholder="HH:MM"
            />
            {submitted && errors.departureTimeFrom && (
              <div className="text-red-600 text-sm mt-1">{errors.departureTimeFrom}</div>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="departure_time_to">
              Departure Time To
            </label>
            <input
              type="time"
              id="departure_time_to"
              name="departure_time_to"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.departureTimeTo ? "border-red-500" : "border-gray-300"
              }`}
              value={departureTimeTo}
              onChange={e => setDepartureTimeTo(e.target.value)}
              placeholder="HH:MM"
            />
            {submitted && errors.departureTimeTo && (
              <div className="text-red-600 text-sm mt-1">{errors.departureTimeTo}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="cabin_class">
            Cabin Class <span className="text-red-500">*</span>
          </label>
          <select
            id="cabin_class"
            name="cabin_class"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cabinClass ? "border-red-500" : "border-gray-300"
            }`}
            value={cabinClass}
            onChange={e => setCabinClass(e.target.value)}
            required
          >
            {cabinClassOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {submitted && errors.cabinClass && (
            <div className="text-red-600 text-sm mt-1">{errors.cabinClass}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="max_connections">
            Max Connections
          </label>
          <input
            type="number"
            id="max_connections"
            name="max_connections"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            value={maxConnections}
            onChange={e => setMaxConnections(Number(e.target.value))}
            min={0}
            max={3}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="passenger_type">
            Passenger Type <span className="text-red-500">*</span>
          </label>
          <select
            id="passenger_type"
            name="passenger_type"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.passengerType ? "border-red-500" : "border-gray-300"
            }`}
            value={passengerType}
            onChange={e => setPassengerType(e.target.value)}
            required
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
          </select>
          {submitted && errors.passengerType && (
            <div className="text-red-600 text-sm mt-1">{errors.passengerType}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="passenger_age">
            Passenger Age
          </label>
          <input
            type="number"
            id="passenger_age"
            name="passenger_age"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.passengerAge ? "border-red-500" : "border-gray-300"
            }`}
            value={passengerAge}
            onChange={e => setPassengerAge(Number(e.target.value))}
            min={0}
            max={120}
          />
          {submitted && errors.passengerAge && (
            <div className="text-red-600 text-sm mt-1">{errors.passengerAge}</div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search Flights"}
      </button>
      {apiError && <div className="text-red-600 text-sm mt-2">{apiError}</div>}
      {offers.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Available Flight Offers</h2>
          <DuffelOfferList offers={offers} />
        </div>
      )}
    </form>
  );
}
