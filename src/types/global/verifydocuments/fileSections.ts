export enum DocumentCategories {
  EDUCATION = "Education",
  PROFESSIONAL_CERTIFICATION = "Professional Certification",
  FINANCIAL_RECORD = "Financial Record",
}

export interface FileSection {
  documentCategory: DocumentCategories | null;
  formDataContent: DocumentCategoryMap | null;
}

export type DocumentCategoryMap = {
  [DocumentCategories.EDUCATION]: EducationFormContent;
  [DocumentCategories.PROFESSIONAL_CERTIFICATION]: ProfessionalCertificationFormContent;
  [DocumentCategories.FINANCIAL_RECORD]: FinancialRecordFormContent;
};

export enum DocumentCategoryEnum {
  Education = "Education",
}

export type FormDataContent =
  | EducationFormContent
  | ProfessionalCertificationFormContent
  | FinancialRecordFormContent;

interface EducationFormContent {
  fileType: string;
  matricNumber: string;
  schoolNameEduc: string;
  schoolCountryEduc: string;
  schoolCity: string;
  enrollmentYearEduc: string;
  graduationYearEduc: string;
  addInfo: string;
  courseOrSubject: string;
  fileDocEduc: any;
}

interface ProfessionalCertificationFormContent {
  schoolNameProf: string;
  studentIdProf: string;
  qualificationProf: string;
  schoolCountryProf: string;
  enrolmentStatusProf: string;
  enrollmentYearProf: string;
  graduationYearProf: string;
  profCourse: string;
  addInfoProf: string;
  fileDocProf: any;
}

interface FinancialRecordFormContent {
  financialRecord: string;
  finName: string;
  finCountry: string;
  finInfo: string;
  finDocFile: any;
}
