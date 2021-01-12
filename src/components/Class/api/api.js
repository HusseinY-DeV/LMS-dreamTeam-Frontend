export const getAllClassesApi = async page => {
  const response = await fetch(`http://localhost:8000/api/classes?page=${page}`);
  const data = await response.json();
  return data;
}