export const getAllClassesPagApi = async page => {
  const response = await fetch(`http://localhost:8000/api/classes?page=${page}`);
  const data = await response.json();
  return data;
}

export const getAllClassesApi = async () => {
  const response = await fetch(`http://localhost:8000/api/classes?_ALL=1`);
  const data = await response.json();
  return data;
}

export const searchClassesApi = async (search) => {
  const response = await fetch(`http://localhost:8000/api/classes?classname=${search}`);
  const data = await response.json();
  return data;
}

export const addClassApi = async (name) => {
  const response = await fetch(`http://localhost:8000/api/classes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      name
    })
  });
  const data = await response.json();
  return data;
}   

export const updateClassApi = async (id, name) => {
  
  const response = await fetch(`http://localhost:8000/api/classes/${id}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      name: name,
    })
  });
  const data = await response.json();
  return data;
}

export const deleteClassApi = async id => {

 const response =  await fetch(`http://localhost:8000/api/classes/${id}`, {
    method: "DELETE"
 })
  const data = response.json();
  return data;
}

