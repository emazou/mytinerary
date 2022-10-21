import React, { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SignUpGoogle from '../components/SignUpGoogle'
import InputForm from '../components/InputForm'
import '../styles/SignComponent.css'
import { useSignUpMutation } from '../features/usersAPI'
import Alert from "../components/Alert";
import toast from "react-hot-toast";
export default function SignUp(props) {
    const role = props.role
    const [signUp] = useSignUpMutation()
    const formRef = useRef()
    const formData = [
        {
            nameForm: "Name",
            name: "name",
            type: "text",
            placeholder: "Lionel",
            min: 3,
            max: 12
        },
        {
            nameForm: "Last Name",
            name: "lastName",
            type: "text",
            placeholder: "Messi",
            min: 2,
            max: 30
        },
        {
            nameForm: "Photo",
            name: "photo",
            type: "text",
            placeholder: "https://direction-image.jpg",
            min: 8,
            max: 500
        },
        {
            nameForm: "Country",
            name: "country",
            type: "text",
            placeholder: "Argentina",
            min: 4,
            max: 30
        },
        {
            nameForm: "Mail",
            name: "mail",
            type: "email",
            placeholder: "mail@gmail.com",
            min: 11,
            max: 50
        },
        {
            nameForm: "Password",
            name: "password",
            type: "password",
            placeholder: "Password",
            min: 6,
            max: 50
        },

    ]
    const showForm = (obj) => (
        <fieldset className='NewCitiesPage-fieldset' key={obj.name}>
            <legend>{obj.nameForm}</legend>
            <InputForm type={obj.type} placeholder={obj.placeholder} min={obj.min} max={obj.max} name={obj.name} />
        </fieldset>
    )
    const sendSignUp = (e) => {
        e.preventDefault()
        const form = new FormData(formRef.current)
        const data = Object.fromEntries(form)
        let body
        if( role=== "admin"){
            body = {
                ...data,
            role: "admin",
            from: "form"
            }
        }else{
            body = {
                ...data,
                role: "user",
                from: "form"
            }
        }
        signUp(body)
            .then(response => {console.log(response)
                if (response.data) {
                    toast(`${response.data.message}`, {
                      icon: "👍",
                      style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                      },
                    })
                  } else {
                    toast.error(`${response.error.data.message}`, {style: {
                      borderRadius: ".5rem",
                      background: "#3f3d56",
                      color: "aliceblue",
                    },})
                  }
            })
            .catch(error => {toast.error("Could not register", {style: {
                borderRadius: ".5rem",
                background: "#3f3d56",
                color: "aliceblue",
              },})})
    }
    return (
        <div className='Sign-container'>
            <div className='Sign-container-form column'>
                <form className='Sign-form' ref={formRef} onSubmit={sendSignUp}>
                    <h3>Register {role ==="admin" && "new admin"}</h3>
                    {
                        formData.map(showForm)
                    }
                    <button className='NewCitiesPage-btn' type='submit'>Sign Up</button>
                </form>
                {
                    !(role === "admin") && <SignUpGoogle />
                }
            </div>
            <Alert />
        </div>
    )
}
