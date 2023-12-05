import { TacademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TacademicFaculty) => {
  const academicFaculty = await AcademicFaculty.create(payload);
  return academicFaculty;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  let academicFaculty = await AcademicFaculty.findById(id);
  if (academicFaculty) {
    academicFaculty = academicFaculty.toObject();
    delete academicFaculty.isDeleted;
  }
  return academicFaculty;
};

const getAllAcademicFacultiesFromDB = async () => {
  const academicFaculties = await AcademicFaculty.find();
  return academicFaculties;
};

const updateAcademicFacultyInDB = async(id:string,payload:Partial<TacademicFaculty>) =>{
    const updatedAcademicFaculty = await AcademicFaculty.findByIdAndUpdate(id,payload,{new:true})
    return updatedAcademicFaculty;
}

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getSingleAcademicFacultyFromDB,
  getAllAcademicFacultiesFromDB,
  updateAcademicFacultyInDB
};
