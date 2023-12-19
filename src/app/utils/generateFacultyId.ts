import Faculty from "../modules/faculty/faculty.model";

const generateFacultyId = async () => {
  const [lastFaculty] = await Faculty.find().sort({ createdAt: -1 }).limit(1);
  let newId = "";
  if (!lastFaculty) {
    newId = "f-0000";
  } else {
    newId = (Number(lastFaculty.id) + 1).toString();
    newId = "f-" + "0".repeat(4 - newId.length) + newId;
  }

  return newId;
};

export default generateFacultyId;
