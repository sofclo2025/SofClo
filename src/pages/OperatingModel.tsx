import React, { useState, useEffect } from "react";

// Text variables
const headerTitle = "Software Asset Management";

// Dropdown options
const orgLayers = Array.from({ length: 5 }, (_, i) => `Org Layer ${i + 1}`);
const commLayers = Array.from({ length: 3 }, (_, i) => `Communicational Layer ${i + 1}`);
const stakeholdersList = Array.from({ length: 10 }, (_, i) => `Stakeholder ${i + 1}`);

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
  onEdit: () => void;
  onPublish: () => void;
  isPublishClicked: boolean;
}> = ({ 
  orgLabels, 
  commLabels, 
  stakeholderCount, 
  teamCount, 
  memberRoles, 
  memberNames,
  onEdit,
  onPublish,
  isPublishClicked
}) => (
  <div className="max-w-7xl mx-auto p-8 space-y-8">
    <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-xl tracking-tight text-center mb-12">
      {headerTitle}
    </h1>
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Stakeholder Read-Only */}
      <div className="grid gap-6 mx-auto" style={{ gridTemplateColumns: `repeat(${Math.ceil(stakeholderCount/2)},minmax(200px,1fr))` }}>
        {Array.from({ length: stakeholderCount }).map((_, i) => (
          <div
            key={i}
            className="bg-blue-500 text-white text-2xl font-semibold text-center py-4 rounded-2xl shadow-2xl transform-gpu hover:rotateX-6 hover:scale-105 transition"
          >
            {stakeholdersList[i]}
          </div>
        ))}
      </div>
      {/* Communicational Bars */}
      <div className="bg-gray-100 p-6 rounded-2xl space-y-4 shadow-xl">
        {commLabels.map((lbl, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${i===0?"from-blue-600 to-blue-400":"from-teal-600 to-teal-400"} text-white text-xl font-semibold text-center py-3 rounded-xl shadow-lg transform-gpu hover:rotateX-6 hover:scale-105 transition`}
          >
            {lbl}
          </div>
        ))}
      </div>
      {/* Core SAM Bars */}
      <div className="bg-gray-100 p-6 rounded-2xl space-y-4 shadow-xl">
        {[
          "Knowledge and experience sharing",
          "SAM Services",
          "SAM Plan",
          "SAM Program",
        ].map((text, i) => (
          <div
            key={i}
            className="bg-blue-900 text-white text-xl font-semibold text-center py-3 rounded-2xl shadow-lg transform-gpu hover:rotateX-6 hover:scale-105 transition"
          >
            {text}
          </div>
        ))}
      </div>
      {/* Team Members */}
      <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${Math.ceil(teamCount/2)},minmax(220px,1fr))` }}>
        {Array.from({ length: teamCount }).map((_, i) => (
          <div
            key={i}
            className="bg-blue-800 p-8 rounded-2xl text-white shadow-2xl transform-gpu hover:rotateX-6 hover:scale-105 transition"
          >
            <div className="text-xl font-semibold mb-3">Role: {memberRoles[i]}</div>
            <div className="text-xl font-semibold">Name: {memberNames[i]}</div>
          </div>
        ))}
      </div>
      {/* Organizational Bars */}
      <div className="bg-gray-100 p-6 rounded-2xl space-y-4 shadow-xl">
        {orgLabels.map((lbl, i) => (
          <div
            key={i}
            className="bg-blue-900 text-white text-xl font-semibold text-center py-3 rounded-2xl shadow-lg transform-gpu hover:rotateX-6 hover:scale-105 transition"
          >
            {lbl}
          </div>
        ))}
      </div>

      {/* Publish and Edit Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button 
          className={`px-6 py-2 ${
            isPublishClicked 
              ? 'bg-gray-400 cursor-not-allowed opacity-50' 
              : 'bg-gray-800 hover:bg-gray-700'
          } text-white rounded-lg shadow transition`}
          onClick={onPublish}
          disabled={isPublishClicked}
        >
          Publish
        </button>
        <button 
          className={`px-6 py-2 ${
            !isPublishClicked 
              ? 'bg-gray-400 cursor-not-allowed opacity-50' 
              : 'bg-blue-600 hover:bg-blue-500'
          } text-white rounded-lg shadow transition`}
          onClick={onEdit}
          disabled={!isPublishClicked}
        >
          Edit
        </button>
      </div>
    </div>
  </div>
);

// Main component with publish toggle
const OverviewPage: React.FC = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishClicked, setIsPublishClicked] = useState(false);

  // Global dropdown state
  const [selectedOrgLayer, setSelectedOrgLayer] = useState(orgLayers[0]);
  const [selectedCommLayer, setSelectedCommLayer] = useState(commLayers[0]);
  const [selectedStakeholderCount, setSelectedStakeholderCount] = useState(1);
  const [selectedTeamCount, setSelectedTeamCount] = useState(5);

  // Derived counts
  const orgCount = orgLayers.indexOf(selectedOrgLayer) + 1;
  const commCount = commLayers.indexOf(selectedCommLayer) + 1;

  // Editable labels
  const [orgLabels, setOrgLabels] = useState<string[]>([]);
  const [commLabels, setCommLabels] = useState<string[]>([]);

  useEffect(() => {
    setOrgLabels(Array.from({ length: orgCount }, (_, i) => `Organizational Level ${i + 1}`));
  }, [orgCount]);
  useEffect(() => {
    setCommLabels(Array.from({ length: commCount }, (_, i) => `Communicational Layer ${i + 1}`));
  }, [commCount]);

  // Team member state
  const [memberRoles, setMemberRoles] = useState(
    Array.from({ length: 15 }, (_, i) => initialRoles[i % initialRoles.length])
  );
  const [memberNames, setMemberNames] = useState(
    Array.from({ length: 15 }, (_, i) => fakeNames[i])
  );

  const handleRoleChange = (idx: number, role: string) => setMemberRoles(prev => prev.map((r, i) => (i === idx ? role : r)));
  const handleNameChange = (idx: number, name: string) => setMemberNames(prev => prev.map((n, i) => (i === idx ? name : n)));

  const handlePublish = () => {
    setIsPublishClicked(true);
    setIsPublished(true);
  };

  const handleEdit = () => {
    setIsPublished(false);
  };

  return isPublished ? (
    <PublishedPage
      orgLabels={orgLabels}
      commLabels={commLabels}
      stakeholderCount={selectedStakeholderCount}
      teamCount={selectedTeamCount}
      memberRoles={memberRoles}
      memberNames={memberNames}
      onEdit={handleEdit}
      onPublish={handlePublish}
      isPublishClicked={isPublishClicked}
    />
  ) : (
    <div className="max-w-7xl mx-auto p-8">
      {/* Main Content Container */}
      <div className="flex flex-col items-center">
        {/* Header and Dropdowns Container */}
        <div className="w-full max-w-6xl">
          {/* Header centered relative to the content width */}
          <h1 className="text-3xl font-bold text-center mb-8">{headerTitle}</h1>
          
          {/* Global Dropdown Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm mb-1">Organization Layer</label>
              <select 
                className="w-full p-2 border rounded" 
                value={selectedOrgLayer} 
                onChange={(e) => setSelectedOrgLayer(e.target.value)}
              >
                {orgLayers.map(layer => <option key={layer}>{layer}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Communication Layer</label>
              <select 
                className="w-full p-2 border rounded" 
                value={selectedCommLayer} 
                onChange={(e) => setSelectedCommLayer(e.target.value)}
              >
                {commLayers.map(layer => <option key={layer}>{layer}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Stakeholders</label>
              <select 
                className="w-full p-2 border rounded" 
                value={selectedStakeholderCount} 
                onChange={(e) => setSelectedStakeholderCount(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Team Members</label>
              <select 
                className="w-full p-2 border rounded" 
                value={selectedTeamCount} 
                onChange={(e) => setSelectedTeamCount(Number(e.target.value))}
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
          <div className="bg-gray-200 p-4 rounded">
            <div className="grid gap-2 mx-auto" style={{ gridTemplateColumns: `repeat(${Math.ceil(selectedStakeholderCount/2)}, minmax(150px,1fr))` }}>
              {Array.from({ length: selectedStakeholderCount }).map((_, i) => (
                <select key={i} className="bg-blue-500 text-white text-center py-2 rounded">
                  {stakeholdersList.map(s => <option key={s}>{s}</option>)}
                </select>
              ))}
            </div>
          </div>

          {/* Communicational Bars */}
          <div className="bg-gray-200 p-4 rounded space-y-2">
            {commLabels.map((lbl, idx) => (
              <input
                key={idx}
                className="w-full bg-blue-400 text-center py-2 rounded text-white border"
                value={lbl}
                onChange={e => setCommLabels(prev => prev.map((v, i) => i === idx ? e.target.value : v))}
              />
            ))}
          </div>

          {/* Core SAM Bars with Keep/Remove */}
          <div className="bg-gray-200 p-4 rounded space-y-2">
            {[
              { text: "Knowledge and experience sharing", bg: "bg-blue-300 text-black" },
              { text: "SAM Services", bg: "bg-blue-900 text-white" },
              { text: "SAM Plan", bg: "bg-blue-950 text-white" },
              { text: "SAM Program", bg: "bg-blue-950 text-white" }
            ].map((item, i) => (
              <div key={i} className={`${item.bg} flex items-center justify-between px-4 py-2 rounded`}>
                <span className="flex-1 text-center">{item.text}</span>
                <button className="ml-2 px-3 py-1 bg-gray-300 text-black rounded">Keep</button>
                <button className="ml-2 px-3 py-1 bg-gray-600 text-white rounded">Remove</button>
              </div>
            ))}
          </div>

          {/* Team Member Cards */}
          <div className="bg-gray-200 p-4 rounded">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.ceil(selectedTeamCount/2)},minmax(150px,1fr))` }}>
              {Array.from({ length: selectedTeamCount }).map((_, i) => (
                <div key={i} className="bg-blue-800 p-4 rounded text-white">
                  <label className="block text-sm mb-1">Role</label>
                  <select className="w-full mb-2 text-black" value={memberRoles[i]} onChange={e => handleRoleChange(i, e.target.value)}>
                    {initialRoles.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <label className="block text-sm mb-1">Name</label>
                  <select className="w-full text-black" value={memberNames[i]} onChange={e => handleNameChange(i, e.target.value)}>
                    {fakeNames.map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Organizational Bars (Editable) */}
          <div className="bg-gray-200 p-4 rounded space-y-2">
            {orgLabels.map((lbl, i) => {
              const colors = ["bg-blue-900", "bg-blue-700", "bg-green-500", "bg-green-700", "bg-green-900"];
              const bg = colors[i] || "bg-green-900";
              return (
                <input
                  key={i}
                  className={`${bg} text-white text-center py-2 rounded border w-full`} 
                  value={lbl}
                  onChange={e => setOrgLabels(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                />
              );
            })}
          </div>

          {/* Publish and Edit Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              className={`px-6 py-2 ${
                isPublished 
                  ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-gray-800 hover:bg-gray-700'
              } text-white rounded-lg shadow transition`}
              onClick={handlePublish}
              disabled={isPublished}
            >
              Publish
            </button>
            <button 
              className={`px-6 py-2 ${
                !isPublishClicked 
                  ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-blue-600 hover:bg-blue-500'
              } text-white rounded-lg shadow transition`}
              onClick={handleEdit}
              disabled={!isPublishClicked}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;