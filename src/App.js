import React, { useState, useEffect } from "react";

const hedgeTypes = [
  {
    name: "Bay",
    latin: "Laurus nobilis",
    image: "/Bay.jfif",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 20 },
      { label: "Medium (60cm)", pricePerMeter: 30 },
      { label: "Large (1m+)", pricePerMeter: 45 },
    ],
  },
  {
    name: "Cherry Laurel",
    latin: "Prunus laurocerasus rotundifolia",
    image: "/Cherry Laurel.jpg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 18 },
      { label: "Medium (60cm)", pricePerMeter: 28 },
      { label: "Large (1m+)", pricePerMeter: 42 },
    ],
  },
  {
    name: "Gilt Edge Silverberry",
    latin: "Elaeagnus ebbingei 'Gilt Edge'",
    image: "/Gilt Edge Silverberry.jpg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 22 },
      { label: "Medium (60cm)", pricePerMeter: 32 },
      { label: "Large (1m+)", pricePerMeter: 48 },
    ],
  },
  {
    name: "Limelight Silverberry",
    latin: "Elaeagnus ebbingei 'Limelight'",
    image: "/Limelight Silverberry.jpg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 20 },
      { label: "Medium (60cm)", pricePerMeter: 30 },
      { label: "Large (1m+)", pricePerMeter: 45 },
    ],
  },
  {
    name: "Photina 'Red Robin'",
    latin: "Photinia fraseri",
    image: "/Photina Red Robin.jpg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 25 },
      { label: "Medium (60cm)", pricePerMeter: 35 },
      { label: "Large (1m+)", pricePerMeter: 50 },
    ],
  },
  {
    name: "Portuguese Laurel",
    latin: "Prunus lusitanica angustifolia",
    image: "/Portuguese.jpg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 23 },
      { label: "Medium (60cm)", pricePerMeter: 33 },
      { label: "Large (1m+)", pricePerMeter: 48 },
    ],
  },
  {
    name: "Silverberry",
    latin: "Elaeagnus ebbingei",
    image: "/Silverberry.jpg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 21 },
      { label: "Medium (60cm)", pricePerMeter: 31 },
      { label: "Large (1m+)", pricePerMeter: 46 },
    ],
  },
  {
    name: "Glossy Privet",
    latin: "Ligustrum lucidum 'Excelsum Superbum'",
    image: "/Wax Leaf Privet.jpeg",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 19 },
      { label: "Medium (60cm)", pricePerMeter: 29 },
      { label: "Large (1m+)", pricePerMeter: 44 },
    ],
  },
  {
    name: "Yew",
    latin: "Taxus baccata",
    image: "/Yew.jfif",
    sizes: [
      { label: "Small (30cm)", pricePerMeter: 26 },
      { label: "Medium (60cm)", pricePerMeter: 36 },
      { label: "Large (1m+)", pricePerMeter: 52 },
    ],
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedHedge, setSelectedHedge] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [length, setLength] = useState("");
  const [includeLabour, setIncludeLabour] = useState(false);
  const [loading, setLoading] = useState(false);

  const labourCostPerMeter = 10;

  const totalCost = () => {
    if (!selectedSize || !length) return 0;
    const plantCost = selectedSize.pricePerMeter * parseFloat(length);
    const labourCost = includeLabour
      ? labourCostPerMeter * parseFloat(length)
      : 0;
    return plantCost + labourCost;
  };

  const reset = () => {
    setStep(0);
    setSelectedHedge(null);
    setSelectedSize(null);
    setLength("");
    setIncludeLabour(false);
    setLoading(false);
  };

  useEffect(() => {
    if (step === 5) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <div className="font-[Montserrat] font-light min-h-screen bg-[#e4d8b4]">
      {step === 0 && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#74875b]">
          <img
            src="/HaloFree_Final_Logo.png"
            alt="InstaHedge Logo"
            className="w-48 mb-6"
            style={{ filter: "drop-shadow(0 0 1px #74875b)" }}
          />
          <button
            onClick={() => setStep(1)}
            className="bg-[#74875b] hover:bg-[#869868] text-[#f5f5f5] border-2 border-[#e4d8b4] rounded-full px-8 py-3 text-lg font-medium shadow-sm transition-all duration-200"
          >
            Start
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="p-6">
          <h2 className="text-xl mb-4 font-semibold">Select Hedge Type</h2>
          <div className="grid grid-cols-3 gap-4">
            {hedgeTypes.map((hedge, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedHedge(hedge);
                  setStep(2);
                }}
                className="cursor-pointer border rounded-2xl p-2 text-center hover:border-black"
              >
                <img
                  src={hedge.image}
                  alt={hedge.name}
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <div className="mt-2 text-sm font-semibold">{hedge.name}</div>
                <div className="text-xs italic font-serif text-gray-700">
                  {hedge.latin}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedHedge && (
        <div className="p-6">
          <h2 className="text-xl mb-4 font-semibold">Select Size</h2>
          <div className="grid gap-4">
            {selectedHedge.sizes.map((size, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedSize(size);
                  setStep(3);
                }}
                className="bg-white rounded-xl p-3 text-left shadow hover:bg-gray-100"
              >
                <div className="font-semibold">{size.label}</div>
                <div className="text-sm text-gray-600">
                  £{size.pricePerMeter} per meter
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="p-6">
          <h2 className="text-xl mb-4 font-semibold">
            Enter Hedge Length (meters)
          </h2>
          <input
            type="number"
            className="border p-2 rounded w-full mb-6"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={0}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setStep(4)}
            disabled={!length}
          >
            Continue
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="p-6">
          <h2 className="text-xl mb-4 font-semibold">
            Would you like planting included?
          </h2>
          <label className="inline-flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2"
              checked={includeLabour}
              onChange={() => setIncludeLabour(!includeLabour)}
            />
            Yes, include planting/labour
          </label>
          <br />
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setStep(5)}
          >
            Show Summary
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="p-6 flex flex-col items-center">
          {loading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4" />
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md text-left">
              <h2 className="text-xl font-semibold mb-4">Your Summary</h2>
              <img
                src={selectedHedge.image}
                alt={selectedHedge.name}
                className="w-full rounded-xl aspect-video object-cover mb-4"
              />
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Hedge Type:</strong> {selectedHedge.name}
                </li>
                <li>
                  <strong>Latin Name:</strong>{" "}
                  <em className="font-serif">{selectedHedge.latin}</em>
                </li>
                <li>
                  <strong>Size:</strong> {selectedSize.label}
                </li>
                <li>
                  <strong>Cost per Meter:</strong> £{selectedSize.pricePerMeter}
                </li>
                <li>
                  <strong>Length:</strong> {length} meters
                </li>
                <li>
                  <strong>Labour Cost:</strong> £
                  {includeLabour
                    ? (labourCostPerMeter * parseFloat(length)).toFixed(2)
                    : "0.00"}
                </li>
                <li>
                  <strong>Total Cost:</strong> £{totalCost().toFixed(2)}
                </li>
              </ul>
              <button
                className="mt-6 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm"
                onClick={reset}
              >
                Start Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
