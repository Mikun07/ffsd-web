export enum DocumentCategories {
  EDUCATION = "Education",
  PROFESSIONAL_CERTIFICATION = "Professional Certification",
  FINANCIAL_RECORD = "Financial Record",
}

export type DocumentCategoryMap = {
  [DocumentCategories.EDUCATION]: EducationFormContent;
  [DocumentCategories.PROFESSIONAL_CERTIFICATION]: ProfessionalCertificationFormContent;
  [DocumentCategories.FINANCIAL_RECORD]: FinancialRecordFormContent;
};

export interface FileSection {
  label: "Education" | "Professional Certification" | "Financial Record" | null;
  value: number | null;
}

export enum DocumentCategoryEnum {
  Education = "Education",
}

export type FormDataContent =
  | EducationFormContent
  | ProfessionalCertificationFormContent
  | FinancialRecordFormContent;

export type FilteredDocumentCategoryMap<TCategory extends DocumentCategories> =
  Pick<DocumentCategoryMap[TCategory], keyof DocumentCategoryMap[TCategory]>;

interface EducationFormContent {
  fileTypeEduc: string;
  matricNumber: string;
  schoolNameEduc: string;
  schoolCountryEduc: string;
  schoolCity: string;
  enrollmentYearEduc: string;
  graduationYearEduc: string;
  addInfo: string;
  courseOrSubject: string;
  examBoard: string;
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
  fileTypeFin: string;
  finName: string;
  finCountry: string;
  finInfo: string;
  fileDocFin: any;
}

export function getFormDataContent(documentCategory) {
  const values = {
    Education: {
      fileTypeEduc: null,
      matricNumber: null,
      schoolNameEduc: null,
      schoolCountryEduc: null,
      schoolCity: null,
      enrollmentYearEduc: null,
      graduationYearEduc: null,
      addInfo: null,
      courseOrSubject: null,
      examBoard: null,
      fileDocEduc: null,
    },
    "Professional Certification": {
      schoolNameProf: null,
      studentIdProf: null,
      qualificationProf: null,
      schoolCountryProf: null,
      enrolmentStatusProf: null,
      enrollmentYearProf: null,
      graduationYearProf: null,
      profCourse: null,
      addInfoProf: null,
      fileDocProf: null,
    },
    "Financial Record": {
      fileTypeFin: null,
      finName: null,
      finCountry: null,
      finInfo: null,
      fileDocFin: null,
    },
  };

  return values[documentCategory];
}

export function getFormDataLabels(documentCategory) {
  const values = {
    Education: {
      fileTypeEduc: "File Type",
      matricNumber: "School ID",
      schoolNameEduc: "School Name",
      schoolCountryEduc: "School country",
      schoolCity: "School city",
      graduationYearEduc: "Graduation Year",
      enrollmentYearEduc: "enrollment Year",
      addInfo: "Additional Information",
      courseOrSubject: "Course Studied",
      examBoard: "Exam Board",
      fileDocEduc: "uploaded files",
    },
    "Professional Certification": {
      schoolNameProf: "Professional Body",
      studentIdProf: "Exam ID",
      qualificationProf: "Qualification gotten",
      schoolCountryProf: "school country",
      enrolmentStatusProf: "current or past student",
      enrollmentYearProf: "Enrollment Year",
      graduationYearProf: "Graduation Year",
      profCourse: "Course Studied",
      addInfoProf: "Additional Information",
      fileDocProf: "File uploaded",
    },
    "Financial Record": {
      financialRecord: "financial record",
      finName: "Bank Name",
      finCountry: "Bank Country",
      finInfo: "Additional Information",
      fileDocFin: "File Uploaded",
    },
  };

  return values[documentCategory];
}
