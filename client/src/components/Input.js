import React, { useEffect, useState } from "react";
import axios from "axios";

const Input = ({ getTodos, todoInfo, editTodo }) => {
  const [action, setAction] = useState("");

  useEffect(() => {
    if (todoInfo.action) {
      setAction(todoInfo.action);
    } else {
      setAction("");
    }
  }, [todoInfo]);

  const addTodo = () => {
    const task = { action };
    
    if (task.action && task.action.length > 0) {
      const token = localStorage.getItem("token");
      axios
        .post("/api/todos", task, {headers: {'x-auth-token': token}})
        .then((res) => {
          if (res.data) {
            getTodos();
            setAction("");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("input field required");
    }
  };

  const handleChange = (e) => {
    setAction(e.target.value);
  };

  return (
    <div>
      <textarea
        type="text"
        onChange={handleChange}
        value={action}
        rows={50}
        cols={50}
      ></textarea>
      {todoInfo.id ? (
        <button onClick={() => editTodo(action)}>Edit</button>
      ) : (
        <button onClick={addTodo}>Add</button>
      )}
       <button
        onClick={() => {
          localStorage.removeItem("token");
          window.open('/', '_self');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Input;