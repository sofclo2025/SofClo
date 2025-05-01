import { useState } from 'react';
import { ChangeEvent } from 'react';

// Configuration interfaces
interface SpokeConfig {
  label: string;
  stakeholder?: string;
  organization?: string;
}

interface HubSpokeConfig {
  hubLabel: string;
  spokes: SpokeConfig[];
}

interface EditPageProps {
  initialConfig: HubSpokeConfig;
  onPublish: (config: HubSpokeConfig) => void;
}

interface PublishedPageProps {
  config: HubSpokeConfig;
  onEdit: () => void;
  onReset: () => void;
  onLoadSample: () => void;
}

interface GraphPreviewProps {
  hubLabel: string;
  spokes: SpokeConfig[];
  large?: boolean;
}

// Example dropdown options
const stakeholderOptions = [
  '-- None --',
  'IT Operations',
  'Software Asset Manager',
  'Procurement',
  'Finance',
  'Legal',
  'Security'
];

const organizationOptions = [
  '-- None --',
  'IT Department',
  'Finance Department',
  'Legal Department',
  'Security Team',
  'Procurement Team'
];

// Sample configuration for preview
const sampleConfig: HubSpokeConfig = {
  hubLabel: 'ServiceNow SAM Pro',
  spokes: [
    {
      label: 'Software Discovery',
      stakeholder: 'IT Operations',
      organization: 'IT Department'
    },
    {
      label: 'License Management',
      stakeholder: 'Software Asset Manager',
      organization: 'IT Department'
    },
    {
      label: 'Contract Database',
      stakeholder: 'Legal',
      organization: 'Legal Department'
    },
    {
      label: 'Cost Analysis',
      stakeholder: 'Finance',
      organization: 'Finance Department'
    },
    {
      label: 'Security Compliance',
      stakeholder: 'Security',
      organization: 'Security Team'
    },
    {
      label: 'Vendor Management',
      stakeholder: 'Procurement',
      organization: 'Procurement Team'
    }
  ]
};

// Default empty configuration
const defaultConfig: HubSpokeConfig = {
  hubLabel: 'SAM Tool',
  spokes: Array.from({ length: 6 }, () => ({ 
    label: '', 
    stakeholder: '-- None --', 
    organization: '-- None --' 
  }))
};

// EditPage component
const EditPage = ({ initialConfig, onPublish }: EditPageProps) => {
  const [hubLabel, setHubLabel] = useState(initialConfig.hubLabel);
  const [spokeCount, setSpokeCount] = useState(initialConfig.spokes.length);
  const [spokes, setSpokes] = useState<SpokeConfig[]>([...initialConfig.spokes]);

  const handleHubChange = (e: ChangeEvent<HTMLInputElement>) => setHubLabel(e.target.value);
  
  const handleCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const cnt = Number(e.target.value);
    setSpokeCount(cnt);
    setSpokes(prev => {
      const arr = prev.slice(0, cnt);
      while (arr.length < cnt) arr.push({ label: '', stakeholder: '-- None --', organization: '-- None --' });
      return arr;
    });
  };
  
  const handleLabelChange = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const arr = [...spokes]; 
    arr[i].label = e.target.value; 
    setSpokes(arr);
  };
  
  const handleStakeholderChange = (i: number) => (e: ChangeEvent<HTMLSelectElement>) => {
    const arr = [...spokes]; 
    arr[i].stakeholder = e.target.value; 
    setSpokes(arr);
  };
  
  const handleOrganizationChange = (i: number) => (e: ChangeEvent<HTMLSelectElement>) => {
    const arr = [...spokes]; 
    arr[i].organization = e.target.value; 
    setSpokes(arr);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 font-sans">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-[#003A5D] mb-4">Configure Tool Integration</h2>
        
        {/* Hub Label */}
        <div className="mb-4">
          <label className="block text-[#003A5D] mb-1">Hub System:</label>
          <input
            type="text"
            value={hubLabel}
            onChange={handleHubChange}
            className="w-full p-2 border border-[#007BBF] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADEF]"
            placeholder="e.g., SAM Tool"
          />
        </div>
        
        {/* Spoke Count */}
        <div className="mb-4">
          <label className="block text-[#003A5D] mb-1">Number of Integrations:</label>
          <select
            value={spokeCount}
            onChange={handleCountChange}
            className="w-24 p-2 border border-[#007BBF] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADEF]"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        
        {/* Spoke Configs */}
        <div className="space-y-4">
          {spokes.map((sp, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-lg shadow-md border border-[#007BBF]/20"
            >
              <label className="block text-[#003A5D] mb-1">Integration Name:</label>
              <input
                type="text"
                value={sp.label}
                onChange={handleLabelChange(i)}
                className="w-full p-2 border border-[#007BBF] rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#00ADEF]"
                placeholder="e.g., Discovery Tool"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-[#003A5D] mb-1">Stakeholder:</label>
                  <select
                    value={sp.stakeholder || '-- None --'}
                    onChange={handleStakeholderChange(i)}
                    className="w-full p-2 border border-[#007BBF] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADEF]"
                  >
                    {stakeholderOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[#003A5D] mb-1">Organization:</label>
                  <select
                    value={sp.organization || '-- None --'}
                    onChange={handleOrganizationChange(i)}
                    className="w-full p-2 border border-[#007BBF] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADEF]"
                  >
                    {organizationOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => onPublish({ hubLabel, spokes })}
          className="mt-6 px-6 py-3 bg-[#00ADEF] text-white font-bold rounded-lg hover:bg-[#007BBF] transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Save & Visualize
        </button>
      </div>
      
      {/* Live Preview */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-[#003A5D] mb-4">Integration Preview</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#007BBF]/20">
          <GraphPreview hubLabel={hubLabel} spokes={spokes} />
        </div>
      </div>
    </div>
  );
};

// PublishedPage component
const PublishedPage = ({ config, onEdit, onReset, onLoadSample }: PublishedPageProps) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const Tooltip = ({ id, text }: { id: string; text: string }) => (
    activeTooltip === id ? (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#003A5D] text-white text-sm rounded shadow-lg whitespace-nowrap">
        {text}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#003A5D]"></div>
      </div>
    ) : null
  );

  return (
    <div className="p-4 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#003A5D]">{config.hubLabel} Integration Map</h1>
        <div className="space-x-4 flex items-center">
          <div className="relative">
            <button
              onClick={onLoadSample}
              onMouseEnter={() => setActiveTooltip('sample')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="px-4 py-2 bg-[#00ADEF] text-white rounded hover:bg-[#007BBF] transition-colors duration-200"
            >
              Load Sample
            </button>
            <Tooltip 
              id="sample" 
              text="Load a pre-configured ServiceNow SAM Pro integration example" 
            />
          </div>
          <div className="relative">
            <button
              onClick={onReset}
              onMouseEnter={() => setActiveTooltip('reset')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="px-4 py-2 text-[#003A5D] border border-[#003A5D] rounded hover:bg-[#E0F3FC] transition-colors duration-200"
            >
              Reset
            </button>
            <Tooltip 
              id="reset" 
              text="Clear all integrations and start fresh" 
            />
          </div>
          <div className="relative">
            <button
              onClick={onEdit}
              onMouseEnter={() => setActiveTooltip('configure')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="px-4 py-2 bg-[#00ADEF] text-white rounded hover:bg-[#007BBF] transition-colors duration-200"
            >
              Configure Tool Integration
            </button>
            <Tooltip 
              id="configure" 
              text="Modify the current integration setup" 
            />
          </div>
        </div>
      </header>
      <div className="flex justify-center">
        <GraphPreview hubLabel={config.hubLabel} spokes={config.spokes} large />
      </div>
    </div>
  );
};

// GraphPreview component
interface Coordinate {
  xHub: number;
  yHub: number;
  xSpoke: number;
  ySpoke: number;
}

const GraphPreview = ({ hubLabel, spokes, large = false }: GraphPreviewProps) => {
  const count = spokes.length;
  const size = large ? 800 : 500;
  const center = size / 2;
  
  // Adjusted sizes for better text fit
  const rHub = large ? 80 : 50;
  const rSpoke = large ? 65 : 40;
  const radius = size * 0.38; // Slightly reduced to prevent overlap
  const fontSize = large ? 14 : 11;
  const hubFontSize = large ? 16 : 14;
  const detailsFontSize = large ? 12 : 9;

  // Function to split long text into multiple lines
  const splitText = (text: string, maxLength: number = 12): string[] => {
    if (text.length <= maxLength) return [text];
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      if ((currentLine + ' ' + words[i]).length <= maxLength) {
        currentLine += ' ' + words[i];
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const coords = spokes.map((_, i: number): Coordinate => {
    const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    return { 
      xHub: center + rHub * dx, 
      yHub: center + rHub * dy, 
      xSpoke: center + radius * dx, 
      ySpoke: center + radius * dy 
    };
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} style={{ maxHeight: large ? '80vh' : '50vh' }}>
      <defs>
        <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#007BBF" />
          <stop offset="100%" stopColor="#007BBF" />
        </radialGradient>
        <radialGradient id="spokeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0F3FC" />
          <stop offset="100%" stopColor="#E0F3FC" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#007BBF" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Connection lines */}
      {coords.map((pt, i: number) => (
        <line 
          key={`line-${i}`} 
          x1={center} 
          y1={center} 
          x2={pt.xSpoke} 
          y2={pt.ySpoke} 
          stroke="#007BBF" 
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={0.6}
        />
      ))}

      {/* Spokes */}
      {coords.map((pt, i: number) => {
        const sp = spokes[i];
        const stakeholderText = sp.stakeholder && sp.stakeholder !== '-- None --' ? sp.stakeholder : '';
        const orgText = sp.organization && sp.organization !== '-- None --' ? sp.organization : '';
        const labelLines = splitText(sp.label);
        
        return (
          <g key={`spoke-${i}`} filter="url(#shadow)">
            <circle 
              cx={pt.xSpoke} 
              cy={pt.ySpoke} 
              r={rSpoke} 
              fill="url(#spokeGrad)" 
              stroke="#007BBF" 
              strokeWidth={1.5} 
            />

            {stakeholderText && (
              <text
                x={pt.xSpoke}
                y={pt.ySpoke - rSpoke - 10}
                textAnchor="middle"
                fill="#003A5D"
                fontSize={detailsFontSize}
                className="bg-white p-1 rounded"
              >
                {stakeholderText}
              </text>
            )}

            {labelLines.map((line, lineIndex) => (
              <text
                key={`line-${lineIndex}`}
                x={pt.xSpoke}
                y={pt.ySpoke + (lineIndex - (labelLines.length - 1) / 2) * (fontSize + 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#003A5D"
                fontSize={fontSize}
                fontWeight="bold"
              >
                {line}
              </text>
            ))}

            {orgText && (
              <text
                x={pt.xSpoke}
                y={pt.ySpoke + rSpoke + 15}
                textAnchor="middle"
                fill="#003A5D"
                fontSize={detailsFontSize}
              >
                {orgText}
              </text>
            )}
          </g>
        );
      })}

      {/* Hub in center */}
      <g filter="url(#shadow)">
        <circle 
          cx={center} 
          cy={center} 
          r={rHub} 
          fill="url(#hubGrad)" 
          stroke="#007BBF" 
          strokeWidth={2} 
        />
        {splitText(hubLabel, 15).map((line, i, arr) => (
          <text
            key={`hub-${i}`}
            x={center}
            y={center + (i - (arr.length - 1) / 2) * (hubFontSize + 2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#003A5D"
            fontSize={hubFontSize}
            fontWeight="bold"
          >
            {line}
          </text>
        ))}
      </g>
    </svg>
  );
};

// Root component
const ToolingDiagram = () => {
  const [config, setConfig] = useState<HubSpokeConfig>(sampleConfig);
  const [isPublished, setIsPublished] = useState(true);

  const handleReset = () => {
    setConfig(defaultConfig);
    setIsPublished(false);
  };

  const handleLoadSample = () => {
    setConfig(sampleConfig);
    setIsPublished(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isPublished ? (
        <PublishedPage 
          config={config} 
          onEdit={() => setIsPublished(false)} 
          onReset={handleReset}
          onLoadSample={handleLoadSample}
        />
      ) : (
        <EditPage 
          initialConfig={config} 
          onPublish={(cfg: HubSpokeConfig) => { 
            setConfig(cfg); 
            setIsPublished(true); 
          }} 
        />
      )}
    </div>
  );
};

export default ToolingDiagram;
