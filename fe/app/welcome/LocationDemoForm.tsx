import React, { useState } from "react";
import { LocationSelect } from "../components/LocationSelect";

export function LocationDemoForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [errors, setErrors] = useState<{ origin?: string; destination?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors: { origin?: string; destination?: string } = {};
    if (!origin) newErrors.origin = "Origin is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (origin && destination && origin === destination) {
      newErrors.destination = "Origin and destination must be different";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      // For demo, just show alert. In real use, pass values to search, etc.
      alert(`Origin: ${origin}\nDestination: ${destination}`);
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
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={false}
      >
        Submit
      </button>
    </form>
  );
}
