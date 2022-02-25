import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import ListTodo from "./ListTodo";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoInfo, setTodoInfo] = useState({});

  useEffect(() => {
    getTodos();
  }, []);

  
  const getTodos = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("/api/todos", {headers: {'x-auth-token': token}})
      .then((res) => {
        if (res.data) {
          setTodos(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const editTodo = async (action) => {
    const token = localStorage.getItem("token");
    await axios
      .put(`/api/todos/${todoInfo.id}`, { action }, {headers: {'x-auth-token': token}})
      .then((res) => {
        if (res.data) {
          getTodos();
          setTodoInfo({});
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/todos/${id}`, {headers: {'x-auth-token': token}})
      .then((res) => {
        if (res.data) {
          getTodos();
        }
      })
      .catch((err) => console.log(err));
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>My Todo(s)</h1>
      <Input getTodos={getTodos} todoInfo={todoInfo} editTodo={editTodo} />
      <ListTodo
        todos={todos}
        deleteTodo={deleteTodo}
        setTodoInfo={setTodoInfo}
      />
    </div>
  );
};

export default Todo;