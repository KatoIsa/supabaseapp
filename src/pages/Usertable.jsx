/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "../App.css";
import { connection } from "../createClient";
import { useState } from "react";
import "../table.css";

function UserTable() {
  // fetch data from supaBase ....
  const [error, setError] = useState(false);
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(true);
  const [inputChange, setInputChange] = useState({
    name: "",
    age: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await connection.from("student").select("*");
    setStudents(data);
    setLoader(false);
  }

  async function createUser(e) {
    e.preventDefault();
    if (inputChange.name.length != 0 && inputChange.age != 0) {
      setLoader(true);
      await connection
        .from("student")
        .insert({ name: inputChange.name, age: inputChange.age });
      setLoader(false);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      setError(true);
    }
  }

  async function deleteUser(UserId) {
    setLoader(true);
    const { data, error } = await connection
      .from("student")
      .delete()
      .eq("id", UserId);
    setLoader(false);
    location.reload();
    if (error) console.log(error);
    if (data) console.log(data);
  }

  function handleInputChange(e) {
    setInputChange((formData) => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function makeAdmin(UserId) {
    // remove current admin ...
    setLoader(true);
    const currentAdmin = students.filter((item) => item.status === true)[0];
    await connection.from("student").update({ status: false }).eq("id", currentAdmin?.id);
    
      // add new admin ...
    await connection.from("student").update({ status: true }).eq("id", UserId);

    setLoader(false);
    location.reload();
  }

  function removeError() {
    setError(false);
  }

  return (
    <>
      {loader ? <div className="loader">Loading data ....</div> : null}

      <h2 style={{marginTop: -100, marginBottom: 100}}>Testing SupaBase</h2>
      <form onSubmit={createUser} className="createUser">
        <div>
          <input
            className={error ? "error" : ""}
            placeholder="name"
            name="name"
            type="text"
            onChange={handleInputChange}
            onClick={removeError}
          />
          <input
            className={error ? "error" : ""}
            placeholder="age"
            name="age"
            type="number"
            onChange={handleInputChange}
            onClick={removeError}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <div style={{ marginBottom: 10 }}></div>
      <table>
        <thead>
          <tr>
            <td>Key</td>
            <td>Name</td>
            <td>Age</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <div style={{ marginBottom: 2 }}></div>
        <tbody>
          {students?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                {item.status ? (
                  <button className="Admin">
                    Admin
                  </button>
                ) : (
                  <button className="status" onClick={() => makeAdmin(item.id)}>
                    Normal
                  </button>
                )}
              </td>
              <td>
                <button className="delete" onClick={() => deleteUser(item.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
