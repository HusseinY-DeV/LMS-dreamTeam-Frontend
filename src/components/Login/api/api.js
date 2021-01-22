export const adminLoginApi = async (email, password) => {
  const response = await fetch('http://localhost:8000/api/admins/login', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  const data = response.json();
  return data;
}