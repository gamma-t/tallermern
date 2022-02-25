import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/api/auth", user)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Correo y contraseña correctas.",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          try {
            window.open("/todo", "_self");
            localStorage.setItem("token", res.data.token);
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectos",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <>
      <div class="container">
        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ textAlign: "left" }}>
            <label className="blue-label" style={{ marginLeft: "40px" }}>
              EMAIL
            </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend" style={{ marginRight: "10px" }}>
                <span class="input-group-text" id="basic-addon1">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="form-group mb-4" style={{ textAlign: "left" }}>
            <label className="blue-label" style={{ marginLeft: "40px" }}>
              PASSWORD
            </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend" style={{ marginRight: "10px" }}>
                <span class="input-group-text" id="basic-addon1">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div class="container">
            <button
              className="defaultButton2 mb-3"
              type="submit"
              onClick={onSubmit}
            >
              {" "}
              Log In
            </button>

            <Link to="/register" className="defaultButton2 mb-3" type="submit">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;