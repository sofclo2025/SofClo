import React, { useState, useEffect } from "react";
import OperatingModelNav from "../../components/OperatingModelNav";

// Define types
type Range = { min: number; max: number };

function parseRange(str: string): Range | null {
  const m = str.match(/^(\d+)-(\d+)$/);
  if (!m) return null;
  const min = parseInt(m[1], 10),
        max = parseInt(m[2], 10);
  if (isNaN(min) || isNaN(max)) return null;
  return { min, max };
}

const categoriesList = [
  "Annual Spend",
  "Audit Monetary Risk",
  "Audit Labour Risk",
  "Criticality",
  "Stakeholder Focus",
  "Requested SAM Support",
];

const metricTypes = ["Currency", "Percent", "Level", "Yes/No"] as const;
const cutoffTypes = ["Exact", "Range"] as const;
const tierCutoffSortingOptions = [
  "One Cutoff to make the Tier",
  "All Cutoffs to make the Tier",
] as const;

interface VendorData {
  name: string;
  values: string[];
}

const SoftwareTierMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"setup" | "published">("setup");
  const [numTiers, setNumTiers] = useState<number>(3);
  const [numCategories, setNumCategories] = useState<number>(3);
  const [categories, setCategories] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<typeof metricTypes[number][]>([]);
  const [cutoffModes, setCutoffModes] = useState<typeof cutoffTypes[number][]>([]);
  const [values, setValues] = useState<string[][]>([]);
  const [vendors, setVendors] = useState<string[]>(["Vendor A", "Vendor B", "Vendor C"]);
  const [vendorValues, setVendorValues] = useState<string[][]>([]);
  const [newVendor, setNewVendor] = useState("");

  // Initialize data when numTiers or numCategories change
  useEffect(() => {
    if (numTiers > 0 && numCategories > 0) {
      setCategories(prev => {
        const newCategories = [...prev];
        while (newCategories.length < numCategories) {
          newCategories.push(categoriesList[newCategories.length] || "");
        }
        return newCategories.slice(0, numCategories);
      });
      
      setMetrics(prev => {
        const newMetrics = [...prev];
        while (newMetrics.length < numCategories) {
          newMetrics.push(metricTypes[0]);
        }
        return newMetrics.slice(0, numCategories);
      });
      
      setCutoffModes(prev => {
        const newModes = [...prev];
        while (newModes.length < numCategories) {
          newModes.push(cutoffTypes[0]);
        }
        return newModes.slice(0, numCategories);
      });
      
      setValues(prev => {
        const newValues = Array(numTiers).fill(null).map((_, i) => 
          i < prev.length ? prev[i].slice(0, numCategories) : Array(numCategories).fill("")
        );
        return newValues;
      });
      
      setVendorValues(prev => {
        const newValues = Array(vendors.length).fill(null).map((_, i) => 
          i < prev.length ? prev[i].slice(0, numCategories) : Array(numCategories).fill("")
        );
        return newValues;
      });
    }
  }, [numTiers, numCategories, vendors.length]);

  // Handlers for updating values
  const updateCategory = (index: number, value: string) => {
    setCategories(prev => prev.map((c, i) => i === index ? value : c));
  };

  const updateMetric = (index: number, value: typeof metricTypes[number]) => {
    setMetrics(prev => prev.map((m, i) => i === index ? value : m));
  };

  const updateCutoffMode = (index: number, value: typeof cutoffTypes[number]) => {
    setCutoffModes(prev => prev.map((m, i) => i === index ? value : m));
  };

  const updateValue = (tierIndex: number, categoryIndex: number, value: string) => {
    setValues(prev => prev.map((row, i) => 
      i === tierIndex 
        ? row.map((v, j) => j === categoryIndex ? value : v)
        : row
    ));
  };

  const updateVendorValue = (vendorIndex: number, categoryIndex: number, value: string) => {
    setVendorValues(prev => prev.map((row, i) => 
      i === vendorIndex 
        ? row.map((v, j) => j === categoryIndex ? value : v)
        : row
    ));
  };

  const handleAddVendor = () => {
    if (newVendor.trim() && !vendors.includes(newVendor.trim())) {
      setVendors(prev => [...prev, newVendor.trim()]);
      setVendorValues(prev => [...prev, Array(numCategories).fill("")]);
      setNewVendor("");
    }
  };

  // Load sample data
  const handleLoadSample = () => {
    setNumTiers(3);
    setNumCategories(3);
    setCategories(["Annual Spend", "Criticality", "Requested SAM Support"]);
    setMetrics(["Currency", "Level", "Yes/No"]);
    setCutoffModes(["Range", "Exact", "Exact"]);
    setValues([
      ["50000-100000", "High", "Yes"],
      ["10000-49999", "Medium", "No"],
      ["0-9999", "Low", "No"]
    ]);
    setVendors(["Vendor A", "Vendor B", "Vendor C"]);
    setVendorValues([
      ["75000", "High", "Yes"],
      ["30000", "Medium", "No"],
      ["5000", "Low", "No"]
    ]);
  };

  const calculateTier = (vendorIndex: number) => {
    const vendorVals = vendorValues[vendorIndex];
    if (!vendorVals) return "Unassigned";

    for (let tierIndex = 0; tierIndex < numTiers; tierIndex++) {
      const tierCutoffs = values[tierIndex];
      if (!tierCutoffs) continue;

      const meetsAllCriteria = tierCutoffs.every((cutoff, categoryIndex) => {
        if (!cutoff) return true;
        const vendorValue = vendorVals[categoryIndex];
        if (!vendorValue) return false;

        const metricType = metrics[categoryIndex];
        const cutoffMode = cutoffModes[categoryIndex];

        if (cutoffMode === "Range") {
          const range = parseRange(cutoff);
          if (!range) return false;
          const value = parseFloat(vendorValue);
          return !isNaN(value) && value >= range.min && value <= range.max;
        } else {
          // Exact match
          if (metricType === "Currency" || metricType === "Percent") {
            const cutoffValue = parseFloat(cutoff);
            const value = parseFloat(vendorValue);
            return !isNaN(cutoffValue) && !isNaN(value) && value >= cutoffValue;
          } else if (metricType === "Level") {
            const levels = ["Low", "Medium", "High"];
            const cutoffLevel = levels.indexOf(cutoff);
            const valueLevel = levels.indexOf(vendorValue);
            return cutoffLevel >= 0 && valueLevel >= 0 && valueLevel >= cutoffLevel;
          } else if (metricType === "Yes/No") {
            return (cutoff === "Yes" && vendorValue === "Yes") || 
                   (cutoff === "No" && (vendorValue === "Yes" || vendorValue === "No"));
          }
        }
        return false;
      });

      if (meetsAllCriteria) {
        return `Tier ${tierIndex + 1}`;
      }
    }

    return "Unassigned";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-4xl mx-auto">
          <OperatingModelNav />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Software Tier Matrix Configuration</h1>
          
          <div className="mb-6">
            <div className="flex border-b border-[#007BBF]">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "setup"
                    ? "border-b-2 border-[#00ADEF] text-[#003A5D]"
                    : "text-gray-500 hover:text-[#007BBF]"
                }`}
                onClick={() => setActiveTab("setup")}
              >
                Matrix Setup
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "published"
                    ? "border-b-2 border-[#00ADEF] text-[#003A5D]"
                    : "text-gray-500 hover:text-[#007BBF]"
                }`}
                onClick={() => setActiveTab("published")}
              >
                Published Matrix
              </button>
            </div>
          </div>

          {activeTab === "setup" ? (
            <>
              <div className="flex justify-end space-x-4 mt-6 mb-6">
                <button
                  onClick={handleLoadSample}
                  className="px-6 py-2 rounded-md transition-colors duration-200 bg-[#00ADEF] hover:bg-[#007BBF] text-white"
                  title="Load sample data to see how the matrix works"
                >
                  Load Sample
                </button>
                <button 
                  onClick={() => {
                    setNumTiers(3);
                    setNumCategories(3);
                    setCategories([]);
                    setMetrics([]);
                    setCutoffModes([]);
                    setValues([]);
                    setVendors([]);
                    setVendorValues([]);
                  }}
                  className="px-6 py-2 rounded-md transition-colors duration-200 bg-[#E0F3FC] hover:bg-[#007BBF] hover:text-white text-[#003A5D] border border-[#007BBF]"
                  title="Reset all matrix settings to default values"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setActiveTab("published")}
                  className="px-6 py-2 rounded-md transition-colors duration-200 bg-[#00ADEF] hover:bg-[#007BBF] text-white"
                  title="View the published matrix with vendor tier assignments"
                >
                  Publish Matrix
                </button>
              </div>

              <div className="space-y-8">
                {/* Matrix Configuration */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Matrix Configuration</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="tiers" className="block text-sm font-semibold text-[#003A5D] mb-2">
                          Number of Tiers
                        </label>
                        <div className="relative">
                          <select
                            id="tiers"
                            value={numTiers}
                            onChange={(e) => setNumTiers(Number(e.target.value))}
                            className="w-full px-3 py-2 text-[#003A5D] bg-white border border-[#007BBF] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ADEF] focus:border-transparent appearance-none"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num} className="text-[#003A5D]">
                                {num} {num === 1 ? "Tier" : "Tiers"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="categories" className="block text-sm font-semibold text-[#003A5D] mb-2">
                          Number of Categories
                        </label>
                        <div className="relative">
                          <select
                            id="categories"
                            value={numCategories}
                            onChange={(e) => setNumCategories(Number(e.target.value))}
                            className="w-full px-3 py-2 text-[#003A5D] bg-white border border-[#007BBF] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ADEF] focus:border-transparent appearance-none"
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num} className="text-[#003A5D]">
                                {num} {num === 1 ? "Category" : "Categories"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Configuration */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Category Configuration</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {Array.from({ length: numCategories }).map((_, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor={`category-${index}`} className="block text-sm font-semibold text-[#003A5D] mb-2">
                              Category {index + 1}
                            </label>
                            <select
                              id={`category-${index}`}
                              value={categories[index] || ""}
                              onChange={(e) => updateCategory(index, e.target.value)}
                              className="w-full px-3 py-2 border border-[#007BBF] rounded-md"
                            >
                              <option value="">Select Category</option>
                              {categoriesList.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor={`metric-${index}`} className="block text-sm font-semibold text-[#003A5D] mb-2">
                              Metric Type
                            </label>
                            <select
                              id={`metric-${index}`}
                              value={metrics[index] || metricTypes[0]}
                              onChange={(e) => updateMetric(index, e.target.value as typeof metricTypes[number])}
                              className="w-full px-3 py-2 border border-[#007BBF] rounded-md"
                            >
                              {metricTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor={`cutoff-${index}`} className="block text-sm font-semibold text-[#003A5D] mb-2">
                              Cutoff Type
                            </label>
                            <select
                              id={`cutoff-${index}`}
                              value={cutoffModes[index] || cutoffTypes[0]}
                              onChange={(e) => updateCutoffMode(index, e.target.value as typeof cutoffTypes[number])}
                              className="w-full px-3 py-2 border border-[#007BBF] rounded-md"
                            >
                              {cutoffTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tier Cutoff Values */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Tier Cutoff Values</h3>
                  </div>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#003A5D] uppercase tracking-wider">
                              Tier
                            </th>
                            {categories.map((category, index) => (
                              <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-[#003A5D] uppercase tracking-wider"
                              >
                                {category || `Category ${index + 1}`}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Array.from({ length: numTiers }).map((_, tierIndex) => (
                            <tr key={tierIndex}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#003A5D]">
                                Tier {tierIndex + 1}
                              </td>
                              {Array.from({ length: numCategories }).map((_, categoryIndex) => (
                                <td key={categoryIndex} className="px-6 py-4 whitespace-nowrap">
                                  <input
                                    type="text"
                                    value={values[tierIndex]?.[categoryIndex] || ""}
                                    onChange={(e) => updateValue(tierIndex, categoryIndex, e.target.value)}
                                    className="w-full px-3 py-2 border border-[#007BBF] rounded-md"
                                    placeholder={cutoffModes[categoryIndex] === "Range" ? "e.g., 1-100" : "e.g., 50"}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Vendor Management */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Vendor Management</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-4 mb-4">
                      <input
                        type="text"
                        id="new-vendor"
                        placeholder="Enter vendor name"
                        value={newVendor}
                        onChange={(e) => setNewVendor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-[#007BBF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADEF]"
                      />
                      <button
                        onClick={handleAddVendor}
                        className="px-4 py-2 bg-[#00ADEF] text-white rounded-md hover:bg-[#007BBF] transition-colors"
                      >
                        Add Vendor
                      </button>
                    </div>
                    <div className="space-y-4">
                      {vendors.map((vendor, vendorIndex) => (
                        <div key={vendorIndex} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-medium text-[#003A5D]">{vendor}</h4>
                            <button
                              onClick={() => {
                                setVendors(vendors.filter((_, i) => i !== vendorIndex));
                                setVendorValues(vendorValues.filter((_, i) => i !== vendorIndex));
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {categories.map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <label
                                  htmlFor={`vendor-${vendorIndex}-category-${categoryIndex}`}
                                  className="block text-sm font-medium text-[#003A5D] mb-2"
                                >
                                  {category || `Category ${categoryIndex + 1}`}
                                </label>
                                <input
                                  type="text"
                                  id={`vendor-${vendorIndex}-category-${categoryIndex}`}
                                  value={vendorValues[vendorIndex]?.[categoryIndex] || ""}
                                  onChange={(e) => updateVendorValue(vendorIndex, categoryIndex, e.target.value)}
                                  className="w-full px-3 py-2 border border-[#007BBF] rounded-md"
                                  placeholder={metrics[categoryIndex] === "Currency" ? "e.g., 1000000" : "Enter value"}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium">Published Software Tier Matrix</h3>
                <button 
                  onClick={() => setActiveTab("setup")}
                  className="px-6 py-2 rounded-md transition-colors duration-200 bg-[#E0F3FC] hover:bg-[#007BBF] hover:text-white text-[#003A5D] border border-[#007BBF]"
                  title="Return to matrix setup to make changes"
                >
                  Back to Setup
                </button>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#003A5D] uppercase tracking-wider">
                          Vendor
                        </th>
                        {categories.map((category, index) => (
                          <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-[#003A5D] uppercase tracking-wider"
                          >
                            {category || `Category ${index + 1}`}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#003A5D] uppercase tracking-wider">
                          Assigned Tier
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vendors.map((vendor, vendorIndex) => (
                        <tr key={vendorIndex}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#003A5D]">
                            {vendor}
                          </td>
                          {Array.from({ length: numCategories }).map((_, categoryIndex) => (
                            <td key={categoryIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {vendorValues[vendorIndex]?.[categoryIndex] || "-"}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calculateTier(vendorIndex)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftwareTierMatrix;