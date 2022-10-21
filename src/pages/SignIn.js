import React, { useRef } from "react";
import "../styles/SignComponent.css";
import InputForm from "../components/InputForm";
import SignInGoogle from "../components/SignInGoogle";
import { useSignInMutation } from "../features/usersAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import toast from "react-hot-toast";
import { setUser } from '../features/loggedSlice'
export default function SingIn() {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const formRef = useRef();
  const formData = [
    {
      name: "mail",
      type: "mail",
      placeholder: "mail@gmail.com",
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
    },
  ];

  const showForm = (obj) => (
    <fieldset className="NewCitiesPage-fieldset" key={obj.name}>
      <legend>{obj.name[0].toUpperCase() + obj.name.substring(1)}</legend>
      <InputForm
        type={obj.type}
        placeholder={obj.placeholder}
        name={obj.name}
      />
    </fieldset>
  );
  const dispatch = useDispatch();
  const sendSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const data = Object.fromEntries(form);
    signIn({
      ...data,
      from: "form",
    })
      .then((response) => {
        localStorage.setItem( "token", response.data.response.token);
        dispatch(setUser(response.data.response.user));
        toast(`Welcome ${response.data.response.user.name}!`, {
          icon: "👏",
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        });
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Email or password invalid", {
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
      });
  };

  return (
    <div className="Sign-container">
      <div className="Sign-container-form">
        <img src="https://i.ibb.co/dDTtRKP/6345959.jpg" />
        <div className="form">
          <form className="Sign-form" ref={formRef} onSubmit={sendSignIn}>
            <h3>Sign In</h3>
            {formData.map(showForm)}
            <button className="NewCitiesPage-btn" type="submit">
              Sign In
            </button>
          </form>
          <SignInGoogle />
        </div>
      </div>
      <Alert />
    </div>
  );
}
