export const allSectionsReportApi = async () => {
  const response = await fetch('http://localhost:8000/api/reports/sections');
  const data = await response.json();
  return data
}

export const oneSectionsReportApi = async (id, from, to) => {
  const response = await fetch(`http://localhost:8000/api/reports/sections/${id}?from=${from}&to=${to}`);
  const data = await response.json();
  return data
}

export const oneStudentReportApi = async (id, from, to) => {
  const response = await fetch(`http://localhost:8000/api/reports/students/${id}?from=${from}&to=${to}`);
  const data = await response.json();
  return data
}