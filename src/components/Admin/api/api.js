export const getAllAdminsApi = async page => {
  const response = await fetch(`http://localhost:8000/api/admins?page=${page}`);
  const data = await response.json();
  return data;
}

export const addAdminApi = async (name, email, password) => {
  const response = await fetch(`http://localhost:8000/api/admins/register`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      name,
      email,
      password,
    })
  })
  const data = await response.json();
  return data;
}

export const updateAdminApi = async (id, name, email, password) => {
  const response = await fetch(`http://localhost:8000/api/admins/${id}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      name,
      email,
      password,
    })
  })
  const data = await response.json();
  return data;
}

export const deleteAdminApi = async id => {
  await fetch(`http://localhost:8000/api/admins/${id}`, {
    method: "DELETE"
  })
}