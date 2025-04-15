import { create } from 'zustand';

export interface FormField {
  value: string;
  isCustom: boolean;
  options?: string[];
}

export interface SamFormState {
  governance: {
    governingBodies: FormField;
    businessObjectives: FormField;
    executiveBuyIn: FormField;
  };
  itAssets: {
    assetsIncluded: FormField;
    softwareType: FormField;
    softwareMetrics: FormField;
  };
  computingEnvironment: {
    platformsIncluded: FormField;
    operatingSystems: FormField;
    systemsNotIncluded: FormField;
  };
  organizationsRegions: {
    organizationsIncluded: FormField;
    regionsIncluded: FormField;
    regionsNotIncluded: FormField;
  };
  contacts: {
    mainContacts: FormField;
    contactsNotIncluded: FormField;
    majorStakeholders: FormField;
  };
  tools: {
    samTools: FormField;
    itTools: FormField;
    itilIntegration: FormField;
  };
  inventoryCoverage: {
    serverCoverage: number;
    serversExcluded: FormField;
    clientCoverage: number;
  };
  softwareCategories: {
    softwareIncluded: FormField;
    softwareNotIncluded: FormField;
  };
  softwareTiers: {
    tier1Definition: FormField;
    tier2Definition: FormField;
    tier3Definition: FormField;
  };
  stakeholderManagement: {
    temporaryStakeholders: FormField;
    communications: FormField;
  };
  initiatives: {
    goals: FormField;
    initialInitiatives: FormField;
    longTermInitiatives: FormField;
  };
}

const defaultOptions = {
  yesNo: ['Yes', 'No', 'Partial'],
  priority: ['High', 'Medium', 'Low'],
  frequency: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'],
  impact: ['Critical', 'High', 'Medium', 'Low'],
};

const initialState: SamFormState = {
  governance: {
    governingBodies: {
      value: '',
      isCustom: false,
      options: ['IT Governance Board', 'Software Asset Management Team', 'IT Leadership', 'Executive Board'],
    },
    businessObjectives: {
      value: '',
      isCustom: false,
      options: ['Cost Optimization', 'Risk Management', 'Compliance', 'Efficiency Improvement'],
    },
    executiveBuyIn: {
      value: '',
      isCustom: false,
      options: defaultOptions.yesNo,
    },
  },
  itAssets: {
    assetsIncluded: {
      value: '',
      isCustom: false,
      options: ['Servers', 'Workstations', 'Mobile Devices', 'Cloud Resources', 'All IT Assets'],
    },
    softwareType: {
      value: '',
      isCustom: false,
      options: ['Commercial', 'Open Source', 'Custom Developed', 'Cloud Services', 'All Types'],
    },
    softwareMetrics: {
      value: '',
      isCustom: false,
      options: ['User Based', 'Device Based', 'Processor Based', 'Core Based', 'Custom'],
    },
  },
  computingEnvironment: {
    platformsIncluded: {
      value: '',
      isCustom: false,
      options: ['Windows', 'Linux', 'MacOS', 'Cloud Platforms', 'All Platforms'],
    },
    operatingSystems: {
      value: '',
      isCustom: false,
      options: ['Windows Server', 'Windows Desktop', 'Linux Server', 'MacOS', 'All OS'],
    },
    systemsNotIncluded: {
      value: '',
      isCustom: false,
      options: ['Legacy Systems', 'Development Environments', 'Test Systems', 'Personal Devices'],
    },
  },
  organizationsRegions: {
    organizationsIncluded: {
      value: '',
      isCustom: false,
      options: ['IT Department', 'Development Teams', 'Business Units', 'All Departments'],
    },
    regionsIncluded: {
      value: '',
      isCustom: false,
      options: ['North America', 'Europe', 'Asia Pacific', 'Global'],
    },
    regionsNotIncluded: {
      value: '',
      isCustom: false,
      options: ['Remote Offices', 'Subsidiaries', 'Contract Locations', 'None'],
    },
  },
  contacts: {
    mainContacts: {
      value: '',
      isCustom: false,
      options: ['IT Manager', 'SAM Manager', 'License Manager', 'Department Heads'],
    },
    contactsNotIncluded: {
      value: '',
      isCustom: false,
      options: ['Contractors', 'Temporary Staff', 'External Consultants', 'None'],
    },
    majorStakeholders: {
      value: '',
      isCustom: false,
      options: ['CIO', 'IT Director', 'Finance Director', 'Department Managers'],
    },
  },
  tools: {
    samTools: {
      value: '',
      isCustom: false,
      options: ['ServiceNow', 'Snow Software', 'Flexera', 'Microsoft SCCM'],
    },
    itTools: {
      value: '',
      isCustom: false,
      options: ['Asset Management', 'Discovery Tools', 'Inventory Tools', 'License Management'],
    },
    itilIntegration: {
      value: '',
      isCustom: false,
      options: defaultOptions.yesNo,
    },
  },
  inventoryCoverage: {
    serverCoverage: 0,
    serversExcluded: {
      value: '',
      isCustom: false,
      options: ['Development Servers', 'Test Servers', 'Backup Servers', 'None'],
    },
    clientCoverage: 0,
  },
  softwareCategories: {
    softwareIncluded: {
      value: '',
      isCustom: false,
      options: ['Operating Systems', 'Applications', 'Databases', 'Development Tools'],
    },
    softwareNotIncluded: {
      value: '',
      isCustom: false,
      options: ['Personal Software', 'Trial Versions', 'Freeware', 'None'],
    },
  },
  softwareTiers: {
    tier1Definition: {
      value: '',
      isCustom: false,
      options: ['Mission Critical', 'High Business Impact', 'Enterprise Wide', 'Core Infrastructure'],
    },
    tier2Definition: {
      value: '',
      isCustom: false,
      options: ['Department Critical', 'Medium Impact', 'Limited Use', 'Support Systems'],
    },
    tier3Definition: {
      value: '',
      isCustom: false,
      options: ['Non-Critical', 'Low Impact', 'Individual Use', 'Optional Tools'],
    },
  },
  stakeholderManagement: {
    temporaryStakeholders: {
      value: '',
      isCustom: false,
      options: ['Project Managers', 'Consultants', 'Auditors', 'Temporary Staff'],
    },
    communications: {
      value: '',
      isCustom: false,
      options: defaultOptions.frequency,
    },
  },
  initiatives: {
    goals: {
      value: '',
      isCustom: false,
      options: ['Cost Reduction', 'Compliance', 'Efficiency', 'Risk Management'],
    },
    initialInitiatives: {
      value: '',
      isCustom: false,
      options: ['Inventory Baseline', 'Tool Implementation', 'Process Development', 'Training'],
    },
    longTermInitiatives: {
      value: '',
      isCustom: false,
      options: ['Optimization', 'Automation', 'Integration', 'Continuous Improvement'],
    },
  },
};

interface StoreState {
  formData: SamFormState;
  setField: <T extends keyof SamFormState, K extends keyof SamFormState[T]>(
    section: T,
    field: K,
    value: SamFormState[T][K]
  ) => void;
  setCustomMode: <T extends keyof SamFormState>(
    section: T,
    field: keyof SamFormState[T] & string,
    isCustom: boolean
  ) => void;
  resetForm: () => void;
}

const isFormField = (field: any): field is FormField => {
  return 'value' in field && 'isCustom' in field;
};

export const useSamProgramStore = create<StoreState>((set) => ({
  formData: initialState,
  setField: (section, field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [field]: value,
        },
      },
    })),
  setCustomMode: <T extends keyof SamFormState>(
    section: T,
    field: keyof SamFormState[T] & string,
    isCustom: boolean
  ) =>
    set((state) => {
      const currentField = state.formData[section][field];
      if (isFormField(currentField)) {
        return {
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              [field]: {
                ...currentField,
                isCustom,
                value: isCustom ? '' : currentField.value,
              },
            },
          },
        };
      }
      return state;
    }),
  resetForm: () => set({ formData: initialState }),
}));
