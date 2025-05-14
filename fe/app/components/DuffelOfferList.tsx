import React from "react";

function formatMoney(amount: string, currency: string) {
  if (!amount || !currency) return "-";
  return `${currency} ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function DuffelOfferList({ offers }: { offers: any[] }) {
  if (!offers.length) return null;
  return (
    <div className="space-y-4">
      {offers.map((offer, idx) => (
        <div key={offer.id || idx} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <div className="font-bold text-lg">
                {offer.slices?.[0]?.origin?.iata_code} → {offer.slices?.[0]?.destination?.iata_code}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {offer.slices?.[0]?.segments?.[0]?.departing_at?.slice(0, 16).replace("T", " ")} → {offer.slices?.[0]?.segments?.[0]?.arriving_at?.slice(0, 16).replace("T", " ")}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Duration: {offer.slices?.[0]?.duration || "-"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                {formatMoney(offer.total_amount, offer.total_currency)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Base: {formatMoney(offer.base_amount, offer.base_currency)}<br />
                Taxes: {formatMoney(offer.tax_amount, offer.tax_currency)}
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
            Cabin: {offer.slices?.[0]?.segments?.[0]?.passengers?.[0]?.cabin_class_marketing_name || offer.slices?.[0]?.segments?.[0]?.passengers?.[0]?.cabin_class || "-"}
            {offer.slices?.[0]?.segments?.[0]?.operating_carrier?.name && (
              <>
                {" | "}Operated by {offer.slices?.[0]?.segments?.[0]?.operating_carrier?.name}
              </>
            )}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Offer ID: {offer.id}
          </div>
        </div>
      ))}
    </div>
  );
}
