import axios from "axios";
import React, { useEffect, useState } from "react";
import './user.css'
const User = () => {
  const [formData, setformData] = useState({
    name: "",
    age: "",
    address: "",
  });
  const [data, setData] = useState([]);
  

  const [isEdit, setIsEdit] = useState(false); 
  const [editId, setEditId] = useState(null);

 
const url= "https://curd-app-mern-08gp.onrender.com"
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };



 const handleEdit = (item) => {
    setformData({
      name: item.name,
      age: item.age,
      address: item.address,
    });
    setIsEdit(true);
    setEditId(item._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`${url}/user/update/${editId}`, formData);//3
        alert("User Updated Successfully");
        setIsEdit(false);
        setEditId(null);

      } else {
        await axios.post(`${url}/user/add`, formData);
        alert("Data Added Successfully");
      }

      setformData({ name: "", age: "", address: "" });
      getData(); 
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/user/get`);
      setData(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/user/delete/${id}`);
      alert("User Deleted Successfully");
      getData(); // refresh data
    } catch (err) {
      console.log(err);
    }
  };

 

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      
      <h1 style={{textAlign:"center"}}>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
        />
  
        <input
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
        />
 
        <button type="submit">{isEdit ? "Update" : "Submit"}</button>
      </form>

      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
