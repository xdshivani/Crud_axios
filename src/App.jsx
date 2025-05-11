import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [update, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);

    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setfirstName(dt[0].firstName);
      setlastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e) => {
    let error = '';

    if (firstName === '')
      error += "First Name is required, ";
    if (lastName === '')
      error += "Last Name is required, ";
    if (age <=  0)
      error += "Age is required."

    if(error === ''){

    e.preventDefault();
    const dt = [...data];
    const newObj = {
      id: EmployeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age
    }
    dt.push(newObj);
    setData(dt);
  }
  else 
  {
    alert(error)
  }
  };

  const handleUpdate = () => {
    const index = data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName=firstName;
    dt[index].lastName=lastName;
    dt[index].age=age;

    setData(dt);
    handleClear();
  };

  const handleClear = (id) => {
    {
      setId(0);
      setfirstName("");
      setlastName("");
      setAge("");
      setIsUpdate(false)
    }
  };
  return (
    <div className="app">
      <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
          fontSize:'40px',
          
        }}>
          CRUD Operations
        </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
          
        }}
      >
        

        <div>
          <label>First Name: </label>
          <input
            type="text"
            placeholder="Enter first name"
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="Enter Last name"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="text"
            placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
        <div>
          {!update ? (
            (
              <button className="btn btn-primary" onClick={(e) => handleSave(e)} 
              style={{
                marginRight:'5px',
                marginLeft:'10px',
              }}>
                Save
              </button>
            )
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}
            style={{
              marginRight:'5px',
              marginLeft:'10px',
            }}>
              Update
            </button>
          )}

          <button className="btn btn-danger" onClick={() => handleClear()}
            style={{
              marginRight:'5px',
              marginLeft:'10px',
            }}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover"
      style={{
        margin:'30px',
      
      }}
      >
        <thead>
          <tr>
            <td>Sr. no</td>
            <td>Id</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)} 
                    style={{
                      margin:'5px',
                    
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
