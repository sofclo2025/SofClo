import React, { useState, useEffect } from "react";
import OperatingModelNav from "../components/OperatingModelNav";

// Color constants from SofClo color scheme
const COLORS = {
  brightAccent: "#00ADEF",  // Key interactive elements
  deepAccent: "#007BBF",    // Hover states and strokes
  neutralText: "#003A5D",   // Text color
  pureWhite: "#FFFFFF",     // Card surfaces
  paleBlue: "#E0F3FC",      // Secondary backgrounds
};

// Sample data for quick loading
const sampleData = {
  orgLayer: "Org Layer 3",
  commLayer: "Communicational Layer 2",
  stakeholderCount: 6,
  teamCount: 4,
  orgLabels: [
    "Executive Leadership",
    "Business Unit Leaders",
    "Department Managers"
  ],
  commLabels: [
    "Strategic Planning",
    "Operational Coordination"
  ],
  selectedStakeholders: [
    "CTO Office",
    "IT Operations",
    "Finance Team",
    "Security Team",
    "Procurement Team",
    "Legal & Compliance"
  ],
  teamMembers: [
    { role: "Automation & Forms", name: "Alice Smith" },
    { role: "Server / Cloud & FinOps", name: "Bob Johnson" },
    { role: "SAP & Process Mapping", name: "Carol Williams" },
    { role: "Software License Management", name: "David Brown" }
  ]
};

// Text variables
const headerTitle = "Software Asset Management";

// Dropdown options
const orgLayers = Array.from({ length: 5 }, (_, i) => `Org Layer ${i + 1}`);
const commLayers = Array.from({ length: 3 }, (_, i) => `Communicational Layer ${i + 1}`);
const stakeholdersList = [
  "CTO Office",
  "IT Operations",
  "Finance Team",
  "Security Team",
  "Development Team",
  "Quality Assurance",
  "Product Management",
  "Infrastructure Team",
  "Cloud Operations",
  "Compliance Team"
];

// Team member roles & names
const initialRoles = [
  "Automation & Forms",
  "End-user Software & Software Lifecycle",
  "Data Integrity & Asset Data/Intel.",
  "Server / Cloud & FinOps",
  "SAP & Process Mapping",
];
const fakeNames = [
  "Alice Smith","Bob Johnson","Carol Williams","David Brown","Eva Davis",
  "Frank Miller","Grace Wilson","Henry Moore","Ivy Taylor","Jack Anderson",
  "Kara Thomas","Liam Jackson","Mia White","Noah Harris","Olivia Martin"
];

// Published (read-only) view component with enriched 3D flair
const PublishedPage: React.FC<{ 
  orgLabels: string[];
  commLabels: string[];
  stakeholderCount: number;
  teamCount: number;
  memberRoles: string[];
  memberNames: string[];
  selectedStakeholders: string[];
  onEdit: () => void;
  onPublish: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  isPublishClicked: boolean;
}> = ({ 
  orgLabels, 
  commLabels, 
  stakeholderCount, 
  teamCount,
  memberRoles,
  memberNames,
  selectedStakeholders,
  onEdit,
  onPublish,
  onLoadSample,
  onReset,
  isPublishClicked
}) => (
  <div className="max-w-7xl mx-auto p-8 space-y-8">
    <h1 className={`text-5xl font-extrabold tracking-tight text-center mb-12`} style={{ color: COLORS.brightAccent }}>
      {headerTitle}
    </h1>
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Stakeholder Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.neutralText }}>Stakeholders</h2>
        <div className="grid grid-cols-3 gap-4">
          {selectedStakeholders.map((stakeholder, i) => (
            <div
              key={i}
              className="p-4 rounded-lg text-center"
              style={{ 
                background: COLORS.paleBlue,
                color: COLORS.neutralText
              }}
            >
              {stakeholder}
            </div>
          ))}
        </div>
      </div>

      {/* Communication Layers */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.neutralText }}>Communication Layers</h2>
        <div className="space-y-3">
          {commLabels.map((label, i) => (
            <div
              key={i}
              className="p-3 rounded-lg text-white text-center"
              style={{ background: COLORS.brightAccent }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.neutralText }}>Team Members</h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: teamCount }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-lg"
              style={{ 
                background: COLORS.paleBlue,
                color: COLORS.neutralText
              }}
            >
              <div className="font-semibold">{memberNames[i]}</div>
              <div>{memberRoles[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Organization Layers */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.neutralText }}>Organization Layers</h2>
        <div className="space-y-3">
          {orgLabels.map((label, i) => (
            <div
              key={i}
              className="p-3 rounded-lg text-white text-center"
              style={{ 
                background: i % 2 === 0 ? COLORS.brightAccent : COLORS.deepAccent
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={onReset}
          className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
          style={{ background: COLORS.deepAccent }}
        >
          Reset
        </button>
        <button
          onClick={onLoadSample}
          className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
          style={{ background: COLORS.brightAccent }}
        >
          Load Sample
        </button>
        <button
          onClick={onEdit}
          className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
          style={{ 
            background: COLORS.deepAccent,
            opacity: !isPublishClicked ? 0.5 : 1,
            cursor: !isPublishClicked ? 'not-allowed' : 'pointer'
          }}
          disabled={!isPublishClicked}
        >
          Edit
        </button>
        <button
          onClick={onPublish}
          className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
          style={{ background: COLORS.brightAccent }}
        >
          Publish
        </button>
      </div>
    </div>
  </div>
);

// Main component with publish toggle
const OverviewPage: React.FC = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishClicked, setIsPublishClicked] = useState(false);
  const [orgLabels, setOrgLabels] = useState<string[]>([]);
  const [commLabels, setCommLabels] = useState<string[]>([]);
  const [stakeholderCount, setStakeholderCount] = useState(0);
  const [teamCount, setTeamCount] = useState(5);
  const [memberRoles, setMemberRoles] = useState<string[]>(initialRoles);
  const [memberNames, setMemberNames] = useState<string[]>(fakeNames.slice(0, 5));
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>(sampleData.selectedStakeholders);

  // Global dropdown state
  const [selectedOrgLayer, setSelectedOrgLayer] = useState(orgLayers[0]);
  const [selectedCommLayer, setSelectedCommLayer] = useState(commLayers[0]);
  const [selectedStakeholderCount, setSelectedStakeholderCount] = useState(6);
  const [selectedTeamCount, setSelectedTeamCount] = useState(4);

  // Computed values
  const orgCount = orgLayers.indexOf(selectedOrgLayer) + 1;
  const commCount = commLayers.indexOf(selectedCommLayer) + 1;

  useEffect(() => {
    setOrgLabels(Array.from({ length: orgCount }, (_, i) => `Organizational Level ${i + 1}`));
  }, [orgCount]);

  useEffect(() => {
    setCommLabels(Array.from({ length: commCount }, (_, i) => `Communication Level ${i + 1}`));
  }, [commCount]);

  const handlePublish = () => {
    setIsPublishClicked(true);
    setIsPublished(true);
  };

  const handleEdit = () => {
    setIsPublishClicked(false);
    setIsPublished(false);
  };

  const handleLoadSample = () => {
    setSelectedOrgLayer(sampleData.orgLayer);
    setSelectedCommLayer(sampleData.commLayer);
    setSelectedStakeholderCount(sampleData.stakeholderCount);
    setSelectedTeamCount(sampleData.teamCount);
    setOrgLabels(sampleData.orgLabels);
    setCommLabels(sampleData.commLabels);
    setMemberRoles(sampleData.teamMembers.map(tm => tm.role));
    setMemberNames(sampleData.teamMembers.map(tm => tm.name));
    setSelectedStakeholders(sampleData.selectedStakeholders);
  };

  const handleReset = () => {
    setSelectedOrgLayer(orgLayers[0]);
    setSelectedCommLayer(commLayers[0]);
    setSelectedStakeholderCount(1);
    setSelectedTeamCount(1);
    setOrgLabels([]);
    setCommLabels([]);
    setMemberRoles(initialRoles);
    setMemberNames(fakeNames.slice(0, 5));
    setSelectedStakeholders([]);
    setIsPublished(false);
    setIsPublishClicked(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OperatingModelNav />
      <div className="max-w-7xl mx-auto p-6">
        {isPublished ? (
          <div className="border-2 border-black rounded-lg p-6">
            <PublishedPage
              orgLabels={orgLabels}
              commLabels={commLabels}
              stakeholderCount={selectedStakeholderCount}
              teamCount={selectedTeamCount}
              memberRoles={memberRoles}
              memberNames={memberNames}
              selectedStakeholders={selectedStakeholders}
              onEdit={handleEdit}
              onPublish={handlePublish}
              onLoadSample={handleLoadSample}
              onReset={handleReset}
              isPublishClicked={isPublishClicked}
            />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-6xl">
                <h1 className="text-3xl font-bold text-center mb-8" style={{ color: COLORS.neutralText }}>
                  {headerTitle}
                </h1>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mb-6">
                  <button 
                    onClick={handleLoadSample}
                    className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
                    style={{ background: COLORS.brightAccent }}
                  >
                    Load Sample
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2 rounded-lg border transition-colors duration-200"
                    style={{ 
                      borderColor: COLORS.deepAccent,
                      color: COLORS.neutralText
                    }}
                  >
                    Reset
                  </button>
                </div>

                {/* Global Dropdown Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: COLORS.neutralText }}>
                      Organization Layer
                    </label>
                    <select 
                      className="w-full p-2 border rounded" 
                      value={selectedOrgLayer} 
                      onChange={(e) => setSelectedOrgLayer(e.target.value)}
                      style={{ borderColor: COLORS.deepAccent }}
                    >
                      {orgLayers.map(layer => <option key={layer}>{layer}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: COLORS.neutralText }}>
                      Communication Layer
                    </label>
                    <select 
                      className="w-full p-2 border rounded" 
                      value={selectedCommLayer} 
                      onChange={(e) => setSelectedCommLayer(e.target.value)}
                      style={{ borderColor: COLORS.deepAccent }}
                    >
                      {commLayers.map(layer => <option key={layer}>{layer}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: COLORS.neutralText }}>
                      Stakeholders
                    </label>
                    <select 
                      className="w-full p-2 border rounded" 
                      value={selectedStakeholderCount} 
                      onChange={(e) => setSelectedStakeholderCount(Number(e.target.value))}
                      style={{ borderColor: COLORS.deepAccent }}
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: COLORS.neutralText }}>
                      Team Members
                    </label>
                    <select 
                      className="w-full p-2 border rounded" 
                      value={selectedTeamCount} 
                      onChange={(e) => setSelectedTeamCount(Number(e.target.value))}
                      style={{ borderColor: COLORS.deepAccent }}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Visual Layout */}
              <div className="w-full max-w-6xl flex flex-col gap-4">
                {/* Stakeholder Boxes */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="grid gap-2 mx-auto" style={{ gridTemplateColumns: `repeat(${Math.ceil(selectedStakeholderCount/2)}, minmax(150px,1fr))` }}>
                    {Array.from({ length: selectedStakeholderCount }).map((_, i) => (
                      <select 
                        key={i} 
                        className="text-center py-2 rounded text-white"
                        style={{ background: COLORS.brightAccent }}
                      >
                        {stakeholdersList.map(s => <option key={s}>{s}</option>)}
                      </select>
                    ))}
                  </div>
                </div>

                {/* Communicational Bars */}
                <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                  {commLabels.map((lbl, idx) => (
                    <input
                      key={idx}
                      className="w-full text-center py-2 rounded text-white border"
                      value={lbl}
                      onChange={e => setCommLabels(prev => prev.map((v, i) => i === idx ? e.target.value : v))}
                      style={{ background: COLORS.brightAccent, borderColor: COLORS.deepAccent }}
                    />
                  ))}
                </div>

                {/* Core SAM Bars with Keep/Remove */}
                <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                  {[
                    { text: "Knowledge and experience sharing", bg: COLORS.paleBlue },
                    { text: "SAM Services", bg: COLORS.brightAccent },
                    { text: "SAM Plan", bg: COLORS.deepAccent },
                    { text: "SAM Program", bg: COLORS.deepAccent }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2 rounded" style={{ background: item.bg }}>
                      <span className="flex-1 text-center" style={{ color: item.bg === COLORS.paleBlue ? COLORS.neutralText : 'white' }}>
                        {item.text}
                      </span>
                      <button className="ml-2 px-3 py-1 rounded" style={{ background: COLORS.pureWhite, color: COLORS.neutralText }}>
                        Keep
                      </button>
                      <button className="ml-2 px-3 py-1 rounded text-white" style={{ background: COLORS.deepAccent }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Team Member Cards */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.ceil(selectedTeamCount/2)},minmax(150px,1fr))` }}>
                    {Array.from({ length: selectedTeamCount }).map((_, i) => (
                      <div key={i} className="p-4 rounded-lg text-white" style={{ background: COLORS.brightAccent }}>
                        <label className="block text-sm mb-1">Role</label>
                        <select 
                          className="w-full mb-2 text-black" 
                          value={memberRoles[i]} 
                          onChange={e => setMemberRoles(prev => prev.map((r, idx) => idx === i ? e.target.value : r))}
                        >
                          {initialRoles.map(r => <option key={r}>{r}</option>)}
                        </select>
                        <label className="block text-sm mb-1">Name</label>
                        <select 
                          className="w-full text-black" 
                          value={memberNames[i]} 
                          onChange={e => setMemberNames(prev => prev.map((n, idx) => idx === i ? e.target.value : n))}
                        >
                          {fakeNames.map(n => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Organizational Bars */}
                <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                  {orgLabels.map((lbl, i) => {
                    const bg = i % 2 === 0 ? COLORS.brightAccent : COLORS.deepAccent;
                    return (
                      <input
                        key={i}
                        className="w-full text-center py-2 rounded text-white border"
                        value={lbl}
                        onChange={e => setOrgLabels(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                        style={{ background: bg, borderColor: COLORS.deepAccent }}
                      />
                    );
                  })}
                </div>

                {/* Publish and Edit Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button 
                    onClick={handlePublish}
                    className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
                    style={{ 
                      background: COLORS.brightAccent,
                      opacity: isPublished ? 0.5 : 1,
                      cursor: isPublished ? 'not-allowed' : 'pointer'
                    }}
                    disabled={isPublished}
                  >
                    Publish
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="px-6 py-2 rounded-lg text-white transition-colors duration-200"
                    style={{ 
                      background: COLORS.deepAccent,
                      opacity: !isPublishClicked ? 0.5 : 1,
                      cursor: !isPublishClicked ? 'not-allowed' : 'pointer'
                    }}
                    disabled={!isPublishClicked}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;