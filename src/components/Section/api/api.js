export const getAllSectionsNoPaginateApi = async () => {
  const response = await fetch(`http://localhost:8000/api/sections?_ALL=1`);
  const data = await response.json();
  return data;
}

export const getAllSectionsPagApi = async (page) => {
  const response = await fetch(`http://localhost:8000/api/sections?page=${page}`);
  const data = await response.json();
  return data;
}

export const searchSectionsApi = async (search) => {
  const response = await fetch(`http://localhost:8000/api/sections?sectionname=${search}`);
  const data = await response.json();
  return data;
}

export const getSectionApi = async (id) => {
  const response = await fetch(`http://localhost:8000/api/sections/${id}`);
  const data = await response.json();
  return data;
}


export const addSectionApi = async (name,number_of_students,class_id) => {
  const response = await fetch(`http://localhost:8000/api/sections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      name,
      number_of_students,
      class_id
    })
  });
  const data = await response.json();
  return data;
}   

export const updateSectionApi = async (id, name,number_of_students,class_id) => {
  
  const response = await fetch(`http://localhost:8000/api/sections/${id}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      name,
      number_of_students,
      class_id
    })
  });
  const data = await response.json();
  return data;
}

export const deleteSectionApi = async id => {

 const response =  await fetch(`http://localhost:8000/api/sections/${id}`, {
    method: "DELETE"
 })
  const data = response.json();
  return data;
}