import { create } from 'zustand';

export interface FormField {
  value: string;
  isCustom: boolean;
}

export interface OperatingModelFormState {
  strategy: {
    vision: FormField;
    mission: FormField;
    objectives: FormField;
  };
  structure: {
    organizationalDesign: FormField;
    roles: FormField;
    responsibilities: FormField;
  };
  processes: {
    coreBusiness: FormField;
    support: FormField;
    governance: FormField;
  };
  technology: {
    systems: FormField;
    infrastructure: FormField;
    tools: FormField;
  };
}

interface OperatingModelStore {
  formData: OperatingModelFormState;
  setField: <T extends keyof OperatingModelFormState>(
    section: T,
    field: keyof OperatingModelFormState[T],
    value: string
  ) => void;
  setCustomMode: <T extends keyof OperatingModelFormState>(
    section: T,
    field: keyof OperatingModelFormState[T],
    isCustom: boolean
  ) => void;
  resetForm: () => void;
}

const initialFormState: OperatingModelFormState = {
  strategy: {
    vision: { value: '', isCustom: false },
    mission: { value: '', isCustom: false },
    objectives: { value: '', isCustom: false },
  },
  structure: {
    organizationalDesign: { value: '', isCustom: false },
    roles: { value: '', isCustom: false },
    responsibilities: { value: '', isCustom: false },
  },
  processes: {
    coreBusiness: { value: '', isCustom: false },
    support: { value: '', isCustom: false },
    governance: { value: '', isCustom: false },
  },
  technology: {
    systems: { value: '', isCustom: false },
    infrastructure: { value: '', isCustom: false },
    tools: { value: '', isCustom: false },
  },
};

export const useOperatingModelStore = create<OperatingModelStore>((set) => ({
  formData: initialFormState,
  setField: (section, field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [field]: {
            ...state.formData[section][field],
            value,
          },
        },
      },
    })),
  setCustomMode: (section, field, isCustom) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [field]: {
            ...state.formData[section][field],
            isCustom,
          },
        },
      },
    })),
  resetForm: () => set({ formData: initialFormState }),
}));
