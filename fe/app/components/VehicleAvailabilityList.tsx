import React from "react";

export interface VehicleAvailability {
  availability: {
    reasons: string[];
    status: string;
  };
  distance_package: {
    distance_allowed: number;
    identifier: string;
    name: string;
    units: string;
  };
  extras: any[];
  insurance: {
    features: Record<string, any>;
    identifier: string;
    name: string;
  };
  price: {
    cleaning_fee: number;
    cost_per_day: number;
    currency: string;
    distance_package: number;
    dropoff_cost: number;
    extras: number;
    insurance: number;
    logistic_cost: number;
    one_way_cost: number;
    pickup_cost: number;
    total_cost: number;
  };
  vehicle: {
    bed_type: string;
    category: string;
    features: {
      automatic_gear: boolean;
      external_shower: boolean;
      internal_shower: boolean;
      kitchen_area: boolean;
      shower: boolean;
      toilet: boolean;
    };
    identifier: string;
    images: string[];
    max_capacity: number;
    name: string;
    total_beds: number;
    type: string;
    weight: number;
  };
}

interface VehicleAvailabilityListProps {
  data: VehicleAvailability[];
}

export function VehicleAvailabilityList({ data }: VehicleAvailabilityListProps) {
  if (!data.length) {
    return <div className="text-gray-600">No vehicles available for the selected route and dates.</div>;
  }
  return (
    <div className="space-y-6">
      {data.map((item, idx) => (
        <div key={item.vehicle.identifier + idx} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4 shadow-sm bg-white dark:bg-gray-900">
          <div className="flex-shrink-0 w-full md:w-56">
            {item.vehicle.images && item.vehicle.images.length > 0 ? (
              <img
                src={item.vehicle.images[0]}
                alt={item.vehicle.name}
                className="w-full h-36 object-cover rounded"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-36 bg-gray-200 flex items-center justify-center rounded text-gray-500">No image</div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{item.vehicle.name}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-200">{item.vehicle.category} &bull; {item.vehicle.type}</div>
            <div className="flex flex-wrap gap-2 text-xs mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Beds: {item.vehicle.total_beds}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Max Capacity: {item.vehicle.max_capacity}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Weight: {item.vehicle.weight}kg</span>
              {item.vehicle.features.automatic_gear && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Automatic</span>}
              {item.vehicle.features.kitchen_area && <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">Kitchen</span>}
              {item.vehicle.features.shower && <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded">Shower</span>}
              {item.vehicle.features.toilet && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Toilet</span>}
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium">Insurance:</span> {item.insurance.name}
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium">Distance Package:</span> {item.distance_package.name} ({item.distance_package.distance_allowed} {item.distance_package.units})
            </div>
            <div className="mt-2 text-lg font-bold">
              {item.price.currency} {item.price.total_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm font-normal text-gray-500"> total</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Status: {item.availability.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
