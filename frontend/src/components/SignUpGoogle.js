import React, { useRef, useEffect } from 'react'
import * as jose from 'jose'
import { useSignUpMutation } from '../features/usersAPI'
import toast from "react-hot-toast"
export default function SignUpGoogle() {
  const [signUp] = useSignUpMutation()
  const buttonDiv = useRef(null)
  async function handleCredentialResponse(response) {

    let userObject = jose.decodeJwt(response.credential)
    console.log(userObject)

    let data = {
      name: userObject.given_name,
      lastName: userObject.family_name,
      photo: userObject.picture,
      country: "country",
      mail: userObject.email,
      password: userObject.sub,
      role: 'user',
      from: 'google'
    }
    signUp(data)
      .then(response => {
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
          toast.error(`Invalid credentials`, {style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },})
        }
      }) 
      .catch(error => console.log(error))

  }

  useEffect(() => {
    /*  global google */
      google.accounts.id.initialize({
        client_id: "600275339241-2tjiujma03q3ccphck6fns4fllcl2uad.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        context: 'signup'
      });
      google.accounts.id.renderButton(
        buttonDiv.current,
        { theme: "outline", size: "medium", text: 'signup_with' }
  )
  }, [])

  return (
    <div ref={buttonDiv}></div>
  )
}
