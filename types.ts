export interface Address {
  name: string;
  street1: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
}

export interface LabelDimension {
  id: string;
  name: string;
  width: string; // CSS value for print @page
  height: string; // CSS value for print @page
}

export const LABEL_SIZES: LabelDimension[] = [
  { id: '4x6', name: 'Standard 4" x 6"', width: '4in', height: '6in' },
  { id: '4x4', name: 'Square 4" x 4"', width: '4in', height: '4in' },
  { id: 'custom', name: 'Custom Size', width: '4in', height: '6in' },
];

export const EMPTY_ADDRESS: Address = {
  name: "",
  street1: "",
  city: "",
  state: "",
  country: "Pakistan",
  phoneNumber: "",
};