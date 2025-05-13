import React, { useState } from "react";
import { LocationSelect } from "../components/LocationSelect";

interface BookingFormProps {}

// Request body for /indie-campers-booking
// See mapping below
interface BookingRequestBody {
  origin_location_id: string;
  destination_location_id: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  // Add more fields as needed
}

// Example response body (success)
// {
//   booking_id: string;
//   status: string;
//   ...
// }

export function BookingForm({}: BookingFormProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  function validate() {
    const newErrors: { [k: string]: string } = {};
    if (!origin) newErrors.origin = "Origin is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (origin && destination && origin === destination) {
      newErrors.destination = "Origin and destination must be different";
    }
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = "Invalid email";
    if (!phone) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setApiError(null);
    if (!validate()) return;
    setSubmitting(true);
    const body: BookingRequestBody = {
      origin_location_id: origin,
      destination_location_id: destination,
      start_date: startDate,
      end_date: endDate,
      customer: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      },
    };
    try {
      const res = await fetch("/indie-campers-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data?.error || res.statusText);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setApiError(err.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
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
        error={errors.origin}
      />
      <LocationSelect
        label="Destination"
        name="destination"
        value={destination}
        onChange={setDestination}
        required
        error={errors.destination}
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="startDate">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
          {errors.startDate && (
            <div className="text-red-600 text-sm mt-1">{errors.startDate}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="endDate">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
          {errors.endDate && (
            <div className="text-red-600 text-sm mt-1">{errors.endDate}</div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          {errors.lastName && (
            <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>
          )}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <div className="text-red-600 text-sm mt-1">{errors.email}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="phone">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        {errors.phone && (
          <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Book Now"}
      </button>
      {apiError && (
        <div className="text-red-600 text-sm mt-2 text-center">{apiError}</div>
      )}
      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-2 text-center">
          Booking successful! Booking ID: <b>{result.booking_id || JSON.stringify(result)}</b>
        </div>
      )}
    </form>
  );
}
