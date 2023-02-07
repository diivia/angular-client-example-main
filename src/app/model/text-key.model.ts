export interface TextKey {
  position: number;
  id: number | null;
  code: string | null;
  textKeyMapping: string | null;
  description: string | null;
  additionalInfo: string | null;
  documentTypes: string | null;
  businessFunctions: string | null;
  networkTypes: string | null;
  availableForPrinting: boolean;
  imported: boolean;
  companyCode: string | null;
}
