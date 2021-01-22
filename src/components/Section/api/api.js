export const getAllSectionsNoPaginateApi = async () => {
  const response = await fetch(`http://localhost:8000/api/sections?_ALL=1`);
  const data = await response.json();
  return data;
}

export const getAllStudentsFromSection = async (id) => {
  const response = await fetch(`http://localhost:8000/api/sections/${id}/students`);
  const data = await response.json();
  return data;
}