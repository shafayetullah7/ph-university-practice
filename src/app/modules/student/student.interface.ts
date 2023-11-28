export type Tusername = {
  firstname: string;
  lastname: string;
};

export type Tguardian = {
  name: string;
  occupation: string;
  contact: string;
};

export type Tstudent = {
  username: Tusername;
  gender: "male" | "female";
  dob: string;
  email: string;
  contact: string;
  blood: "A+" | "A-" | "B+" | "B-" | "AB+" | "ab-" | "O+" | "O-";
  guardian: Tguardian;
};
