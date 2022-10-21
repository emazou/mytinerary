import React, { useRef, useEffect } from 'react'
import * as jose from 'jose'
import { useSignInMutation } from '../features/usersAPI'
import { useDispatch } from 'react-redux';
import { setUser } from '../features/loggedSlice'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
export default function SignInGoogle() {
  const navigate = useNavigate()
  const [signIn] = useSignInMutation()
  const buttonDiv = useRef(null)
  const dispatch = useDispatch()
  async function handleCredentialResponse(response) {

    let userObject = jose.decodeJwt(response.credential)

    let data = {
      mail: userObject.email,
      password: userObject.sub,
      from: 'google'
    }
    signIn(data)
      .then(response => {
        if (response.data?.success) {
          localStorage.setItem("token", response.data.response.token);
          dispatch(setUser(response.data.response.user));
          toast(`Welcome ${response.data.response.user.name}`, {
            icon: "👏",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          });
          navigate("/", { replace: true })
        }else{
          toast.error(`${response.error.data.message}`, {
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }
      })
      .catch(error => {
        toast.error("Invalid credentials", {
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
      })
  }

  useEffect(() => {
    /*  global google */
    google.accounts.id.initialize({
      client_id: "600275339241-2tjiujma03q3ccphck6fns4fllcl2uad.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      context: 'signin'
    });
    google.accounts.id.renderButton(
      buttonDiv.current,
      { theme: "outline", size: "medium", text: 'signin_with', width: "150px" }
    )
  }, [])

  return (
    <div ref={buttonDiv}></div>
  )
}
