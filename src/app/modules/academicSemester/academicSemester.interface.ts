export type Tmonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TsemesterName = "Spring" | "Summer" | "Fall";

export type TsemesterStatus = "active" | "not-active";

export type TsemesterCode = "01" | "02" | "03";

export type TacademicSemester = {
  name: TsemesterName;
  code: TsemesterCode;
  year: number;
  startMonth: Tmonth;
  endMonth: Tmonth;
  status: TsemesterStatus;
  isDeleted?: boolean;
};
