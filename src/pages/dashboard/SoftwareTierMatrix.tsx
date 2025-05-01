import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import OperatingModelNav from "../../components/OperatingModelNav";

// Define types
type Range = {
  min: number;
  max: number;
};

interface ComponentProps {
  value?: any;
  onChange?: (value: any) => void;
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  title?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  color?: string;
}

interface CategoryTooltips {
  [key: string]: string;
}

interface MetricTooltips {
  [key: string]: string;
}

interface CutoffTooltips {
  [key: string]: string;
}

interface SampleData {
  categories: CategoryTooltips;
  metrics: MetricTooltips;
  cutoffTypes: CutoffTooltips;
}

interface Assignments {
  [key: string]: string[];
}

// Sample data for the matrix
const sampleData = {
  tiers: 3,
  categories: ["Revenue", "Market Share", "Customer Base"],
  metrics: ["Currency", "Percent", "Level"],
  cutoffModes: ["Range", "Range", "Range"],
  values: [
    ["5000", "50", "3"],
    ["1000", "30", "2"],
    ["100", "10", "1"]
  ],
  vendors: ["Microsoft", "Oracle", "SAP", "IBM", "Salesforce"],
  vendorValues: [
    ["7500", "60", "3"],
    ["4000", "45", "3"],
    ["2500", "35", "2"],
    ["1500", "25", "2"],
    ["800", "15", "1"]
  ]
};

const metricTypes = ["Currency", "Percent", "Level", "Yes/No"] as const;
const cutoffTypes = ["Exact", "Range"] as const;

const categoriesList = [
  "Annual Spend",
  "Audit Monetary Risk",
  "Audit Labour Risk",
  "Criticality",
  "Stakeholder Focus",
  "Requested SAM Support",
];

const SettingUpMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"setup" | "published">("setup");
  const [numTiers, setNumTiers] = useState<number>(3);
  const [numCategories, setNumCategories] = useState<number>(3);
  const [categories, setCategories] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<Array<typeof metricTypes[number]>>([]);
  const [cutoffModes, setCutoffModes] = useState<Array<typeof cutoffTypes[number]>>([]);
  const [values, setValues] = useState<string[][]>([]);
  const [vendors, setVendors] = useState<string[]>([]);
  const [vendorValues, setVendorValues] = useState<string[][]>([]);
  const [newVendor, setNewVendor] = useState<string>("");

  // Load sample data function
  const handleLoadSample = () => {
    setNumTiers(sampleData.tiers);
    setNumCategories(sampleData.categories.length);
    setCategories([...sampleData.categories]);
    setMetrics(sampleData.metrics as Array<typeof metricTypes[number]>);
    setCutoffModes(sampleData.cutoffModes as Array<typeof cutoffTypes[number]>);
    setValues(sampleData.values.map(row => [...row]));
    setVendors([...sampleData.vendors]);
    setVendorValues(sampleData.vendorValues.map(row => [...row]));
  };

  // Update category
  const updateCategory = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  // Update metric type
  const updateMetric = (index: number, value: typeof metricTypes[number]) => {
    const newMetrics = [...metrics];
    newMetrics[index] = value;
    setMetrics(newMetrics);
  };

  // Update cutoff mode
  const updateCutoffMode = (index: number, value: typeof cutoffTypes[number]) => {
    const newModes = [...cutoffModes];
    newModes[index] = value;
    setCutoffModes(newModes);
  };

  // Update value
  const updateValue = (t: number, c: number, raw: string) => {
    setValues((p) =>
      p.map((row, r) => {
        if (r !== t) return row;
        let val = raw;
        if (cutoffModes[c] === "Range") {
          const rng = parseRange(raw);
          if (rng) {
            p.forEach((other, or) => {
              if (or === t) return;
              const ex = parseRange(other[c]);
              if (ex && rng.min <= ex.max && rng.max >= ex.min) {
                if (rng.min < ex.min) rng.max = ex.min - 1;
                else rng.min = ex.max + 1;
                val = `${rng.min}-${rng.max}`;
              }
            });
          }
        }
        return row.map((x, i) => (i === c ? val : x));
      })
    );
  };

  // Update vendor value
  const updateVendorValue = (vi: number, c: number, raw: string) =>
    setVendorValues((p) =>
      p.map((r, i) => (i === vi ? r.map((x, j) => (j === c ? raw : x)) : r))
    );

  // Add vendor
  const handleAddVendor = () => {
    const nv = newVendor.trim();
    if (nv && !vendors.includes(nv)) {
      setVendors((p) => [...p, nv]);
      setVendorValues((p) => [...p, Array(numCategories).fill("")]);
    }
    setNewVendor("");
  };

  // Calculate assignments
  const assignments = useMemo<Record<string, string[]>>(() => {
    const m: Record<string, string[]> = {};
    if (numTiers < 1) return m;
    
    // Initialize tiers
    for (let i = 1; i <= numTiers; i++) {
      m[`Tier ${i}`] = [];
    }
    m.Unassigned = [];

    // Assign vendors to tiers
    vendors.forEach((vnd, vi) => {
      let placed = false;
      for (let i = 0; i < numTiers && !placed; i++) {
        const meets = values[i]?.map((cutoff, ci) => {
          const value = vendorValues[vi]?.[ci];
          if (!value || !cutoff) return false;
          if (cutoffModes[ci] === "Range") {
            const [min] = cutoff.split("-").map(Number);
            const num = Number(value);
            return !isNaN(num) && num >= min;
          }
          return Number(value) >= Number(cutoff);
        }) || [];

        if (meets.every(Boolean)) {
          m[`Tier ${i + 1}`].push(vnd);
          placed = true;
        }
      }

      if (!placed) {
        m.Unassigned.push(vnd);
      }
    });

    return m;
  }, [numTiers, values, cutoffModes, vendors, vendorValues]);

  // Helper function to parse range values
  function parseRange(str: string): Range | null {
    const m = str.match(/^(\d+)-(\d+)$/);
    if (!m) return null;
    const min = parseInt(m[1], 10),
          max = parseInt(m[2], 10);
    if (isNaN(min) || isNaN(max)) return null;
    return { min, max };
  }

  // Helper function to format metric values
  const formatMetricValue = (value: string, metricType: typeof metricTypes[number]) => {
    if (!value) return "-";
    switch (metricType) {
      case "Currency":
        return value.length >= 3 ? `${value.slice(0, -2)}B` : `$${value}M`;
      case "Level":
        if (value === "1") return "Low";
        if (value === "2") return "Medium";
        if (value === "3") return "High";
        return value;
      case "Percent":
        return `${value}%`;
      case "Yes/No":
        return value === "1" ? "Yes" : "No";
      default:
        return value;
    }
  };

  // Helper components for UI
  const Select: React.FC<ComponentProps> = ({ value, onChange, children, className, title }) => (
    <div className="relative">
      <select 
        value={value} 
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}
        className={`w-full px-3 py-2 text-[#003A5D] bg-white border border-[#007BBF] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ADEF] focus:border-transparent appearance-none ${className || ""}`}
        title={title}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-[#007BBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );

  const Option: React.FC<ComponentProps> = ({ value, children }) => (
    <option value={value} className="text-[#003A5D]">
      {children}
    </option>
  );

  const Button: React.FC<ComponentProps> = ({ onClick, children, variant = "primary", className = "" }) => (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md transition-colors duration-200 ${
        variant === "primary" 
          ? "bg-[#00ADEF] hover:bg-[#007BBF] text-white" 
          : "bg-[#E0F3FC] hover:bg-[#007BBF] hover:text-white text-[#003A5D]"
      } ${className}`}
    >
      {children}
    </button>
  );

  const Input: React.FC<ComponentProps> = ({ value, onChange, placeholder, className }) => (
    <input
      type="text"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-[#003A5D] bg-white border border-[#007BBF] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ADEF] focus:border-transparent ${className || ""}`}
    />
  );

  const Badge: React.FC<ComponentProps> = ({ children, color }) => {
    const getColorClass = (tier: string) => {
      if (tier.includes("tier 1")) return "bg-[#00ADEF] text-white";
      if (tier.includes("tier 2")) return "bg-[#007BBF] text-white";
      if (tier.includes("tier 3")) return "bg-[#E0F3FC] text-[#003A5D]";
      return "bg-gray-100 text-[#003A5D]";
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass(color || "")}`}>
        {children}
      </span>
    );
  };

  const Card: React.FC<ComponentProps> = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );

  const CardHeader: React.FC<ComponentProps> = ({ children, className = "" }) => (
    <div className={`p-4 border-b ${className}`}>
      {children}
    </div>
  );

  const CardContent: React.FC<ComponentProps> = ({ children }) => (
    <div className="p-4">
      {children}
    </div>
  );

  const CardTitle: React.FC<ComponentProps> = ({ children, className }) => (
    <h3 className={`text-lg font-medium ${className || ""}`}>{children}</h3>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <OperatingModelNav />
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Software Tier Matrix Configuration
          </h1>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mb-6">
            <Button 
              onClick={handleLoadSample}
              className="bg-[#00ADEF] hover:bg-[#007BBF] text-white transition-colors duration-200"
              title="Load example configuration"
            >
              Load Sample
            </Button>
            <Button 
              variant="secondary"
              onClick={() => {
                setNumTiers(3);
                setNumCategories(3);
                setCategories([]);
                setMetrics([]);
                setCutoffModes([]);
                setValues([]);
                setVendors([]);
                setVendorValues([]);
                setNewVendor("");
              }}
              className="border border-[#007BBF] hover:bg-[#E0F3FC] text-[#003A5D] transition-colors duration-200"
              title="Reset all configuration"
            >
              Reset
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex border-b border-[#007BBF]">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "setup"
                    ? "border-b-2 border-[#00ADEF] text-[#003A5D]"
                    : "text-gray-500 hover:text-[#007BBF]"
                }`}
                onClick={() => setActiveTab("setup")}
                title="Configure matrix settings, categories, and vendor assignments"
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
                title="View the published matrix with vendor tier assignments"
              >
                Published Matrix
              </button>
            </div>
          </div>

          {activeTab === "setup" ? (
            <div className="space-y-8">
              {/* Configuration Section */}
              <Card>
                <CardHeader className="border-b border-gray-200">
                  <CardTitle>Matrix Configuration</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#003A5D] mb-2">
                        Number of Tiers
                      </label>
                      <Select
                        value={numTiers}
                        onChange={(v: string) => setNumTiers(parseInt(v, 10))}
                        className="w-full"
                        title="Select the number of tiers"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Option key={n} value={n}>
                            {n} {n === 1 ? "Tier" : "Tiers"}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#003A5D] mb-2">
                        Number of Categories
                      </label>
                      <Select
                        value={numCategories}
                        onChange={(v: string) => setNumCategories(parseInt(v, 10))}
                        className="w-full"
                        title="Select the number of categories"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <Option key={n} value={n}>
                            {n} {n === 1 ? "Category" : "Categories"}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-[#003A5D] mb-2">
                        Tier Assignment Logic
                      </label>
                      <Select
                        value={"All Cutoffs to make the Tier"}
                        onChange={(v: string) => {}}
                        className="w-full"
                        title="Select how tiers are assigned"
                      >
                        <Option value={"All Cutoffs to make the Tier"}>
                          All Cutoffs to make the Tier
                        </Option>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Categories Setup */}
              {numCategories > 0 && (
                <Card>
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle>Category Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider w-16">#</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">Metric Type</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">Cutoff Mode</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {Array.from({ length: numCategories }).map((_, i) => (
                            <tr key={`cat-${i}`} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#003A5D]">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Select
                                  value={categories[i] || ""}
                                  onChange={(v: string) => updateCategory(i, v)}
                                  title={`Select category ${i + 1}`}
                                >
                                  <Option value="">Select a category</Option>
                                  {categoriesList.map((cat) => (
                                    <Option key={cat} value={cat}>
                                      {cat}
                                    </Option>
                                  ))}
                                </Select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Select
                                  value={metrics[i] || metricTypes[0]}
                                  onChange={(v) => updateMetric(i, v as typeof metricTypes[number])}
                                  title={`Select metric type for ${categories[i] || `category ${i + 1}`}`}
                                >
                                  {metricTypes.map((type) => (
                                    <Option key={type} value={type}>
                                      {type}
                                    </Option>
                                  ))}
                                </Select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Select
                                  value={cutoffModes[i] || cutoffTypes[0]}
                                  onChange={(v) => updateCutoffMode(i, v as typeof cutoffTypes[number])}
                                  title={`Select cutoff mode for ${categories[i] || `category ${i + 1}`}`}
                                >
                                  {cutoffTypes.map((type) => (
                                    <Option key={type} value={type}>
                                      {type}
                                    </Option>
                                  ))}
                                </Select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tier Cutoff Values */}
              {numTiers > 0 && numCategories > 0 && (
                <Card>
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle>Tier Cutoff Values</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider w-32">Tier</th>
                            {categories.map((cat, i) => (
                              <th key={`head-${i}`} className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">
                                <div>{cat || `Category ${i + 1}`}</div>
                                <div className="text-gray-500 font-normal lowercase italic">
                                  {metrics[i]}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {Array.from({ length: numTiers }).map((_, t) => (
                            <tr key={`tier-${t}`} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-[#003A5D]">Tier {t + 1}</span>
                              </td>
                              {Array.from({ length: numCategories }).map((_, c) => (
                                <td key={`val-${t}-${c}`} className="px-6 py-4 whitespace-nowrap">
                                  <Input
                                    value={values[t]?.[c] || ""}
                                    onChange={(v: string) => updateValue(t, c, v)}
                                    placeholder={cutoffModes[c] === "Range" ? "e.g. 1000-5000" : "e.g. 1000"}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Vendor Management */}
              <Card>
                <CardHeader className="border-b border-gray-200">
                  <CardTitle>Vendor Management</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1 max-w-xs">
                      <Input
                        placeholder="Enter vendor name"
                        value={newVendor}
                        onChange={(v: string) => setNewVendor(v)}
                      />
                    </div>
                    <Button 
                      onClick={handleAddVendor}
                      className="bg-[#00ADEF] hover:bg-[#007BBF] text-white transition-colors duration-200"
                    >
                      Add Vendor
                    </Button>
                  </div>

                  {vendors.length > 0 && numCategories > 0 && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider w-48">Vendor</th>
                            {categories.map((cat, i) => (
                              <th key={`vhead-${i}`} className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">
                                <div>{cat || `Category ${i + 1}`}</div>
                                <div className="text-gray-500 font-normal lowercase italic">
                                  {metrics[i]}
                                </div>
                              </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">Assigned Tier</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {vendors.map((vendor, vi) => {
                            const vendorTier = Object.entries(assignments).find(
                              ([_, vendors]) => vendors.includes(vendor)
                            )?.[0] || "Unassigned";

                            return (
                              <tr key={`vendor-${vi}`} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm font-medium text-[#003A5D]">{vendor}</span>
                                </td>
                                {Array.from({ length: numCategories }).map((_, ci) => (
                                  <td key={`vval-${vi}-${ci}`} className="px-6 py-4 whitespace-nowrap">
                                    <Input
                                      value={vendorValues[vi]?.[ci] || ""}
                                      onChange={(v: string) => updateVendorValue(vi, ci, v)}
                                      placeholder={metrics[ci] === "Currency" ? "e.g. 1000" : ""}
                                    />
                                  </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge color={vendorTier.toLowerCase()}>
                                    {vendorTier}
                                  </Badge>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setActiveTab("published")}
                  className="bg-[#00ADEF] hover:bg-[#007BBF] text-white px-6 py-2 rounded-md transition-colors duration-200"
                  title="Save and view the published matrix"
                >
                  Publish Matrix
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Published Matrix View */}
              <Card>
                <CardHeader className="border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <CardTitle>Setting up the Software Tier Matrix</CardTitle>
                    <Button 
                      variant="secondary" 
                      onClick={() => setActiveTab("setup")}
                      className="bg-black hover:bg-gray-800 text-white px-4 py-1 text-sm rounded transition-colors duration-200"
                    >
                      Back to Setup
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider w-32">Tier</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider w-48">Vendor</th>
                          {categories.map((cat, i) => (
                            <th key={`head-${i}`} className="px-6 py-3 text-left text-xs font-semibold text-[#003A5D] uppercase tracking-wider">
                              <div>{cat}</div>
                              <div className="text-gray-500 font-normal lowercase italic">
                                {metrics[i]}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {vendors.map((vendor, vi) => {
                          const vendorTier = Object.entries(assignments).find(
                            ([_, vendors]) => vendors.includes(vendor)
                          )?.[0] || "Unassigned";

                          return (
                            <tr key={`vendor-${vi}`} className="hover:bg-gray-50">
                              <td className="px-6 py-3 whitespace-nowrap">
                                <span className="text-sm text-gray-900">{vendorTier}</span>
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap">
                                <span className="text-sm font-medium text-[#003A5D]">{vendor}</span>
                              </td>
                              {Array.from({ length: numCategories }).map((_, ci) => (
                                <td key={`val-${vi}-${ci}`} className="px-6 py-3 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">
                                    {formatMetricValue(vendorValues[vi]?.[ci] || "", metrics[ci])}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingUpMatrix;