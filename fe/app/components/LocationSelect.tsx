import React, { useEffect, useState } from "react";

export interface Location {
  address: string;
  identifier: string;
  name: string;
  country_code: string;
}

interface LocationSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  name?: string;
  error?: string;
}

export function LocationSelect({
  label,
  value,
  onChange,
  required = false,
  name,
  error,
}: LocationSelectProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    fetch("/indie-campers-list-locations")
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setLocations(data.data);
        } else {
          setFetchError("Invalid response from server");
        }
      })
      .catch((err) => {
        setFetchError(err.message || "Failed to fetch locations");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium" htmlFor={name || label}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name || label}
        name={name || label}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error || fetchError ? "border-red-500" : "border-gray-300"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={loading || !!fetchError}
      >
        <option value="">{loading ? "Loading..." : "Select a location"}</option>
        {locations.map((loc) => (
          <option key={loc.identifier} value={loc.identifier}>
            {loc.name} ({loc.country_code})
          </option>
        ))}
      </select>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      {fetchError && <div className="text-red-600 text-sm mt-1">{fetchError}</div>}
    </div>
  );
}
