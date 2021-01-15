export const getAllStudentsApi = async page => {
  const response = await fetch(`http://localhost:8000/api/students?page=${page}`);
  const data = await response.json();
  return data;
}

export const getStudentApi = async id => {
  const response = await fetch(`http://localhost:8000/api/students/${id}`);
  const data = await response.json();
  return data;
}

export const searchStudentsApi = async search => {
  const response = await fetch(`http://localhost:8000/api/students?student=${search}`);
  const data = await response.json();
  return data;
}

export const addStudentApi = async (first_name, last_name, email, phone, section_id, file) => {
  const formData = new FormData();
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("section_id", section_id);
  if (file) {
    formData.append("file", file);
  }
  const response = await fetch(`http://localhost:8000/api/students`, {
    method: "POST",
    headers: {
      // 'content-type': 'multipart/form-data',
      // 'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  })
  const data = await response.json();
  return data;
}

export const updateStudentApi = async (id, first_name, last_name, email, phone, section_id, file) => {
  const formData = new FormData();
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("section_id", section_id);
  if (file) {
    formData.append("file", file);
  }
  const response = await fetch(`http://localhost:8000/api/students/${id}`, {
    method: "POST",
    headers: {
      // 'content-type': 'multipart/form-data',
      // 'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  })
  const data = await response.json();
  return data;
}

export const deleteStudentApi = async id => {
  await fetch(`http://localhost:8000/api/students/${id}`, {
    method: "DELETE"
  })
}