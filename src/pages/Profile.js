import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputFormProfile from '../components/InputFormProfile'
import { useEditProfileMutation } from '../features/usersAPI'
import { setUser } from '../features/loggedSlice'
import toast from "react-hot-toast";

export default function Profile() {
    const [openModal, setOpenModal] = useState(false)
    const user = useSelector((state) => state.logged.user)
    const [name, setName] = useState(user.name)
    const [lastName, setLastName] = useState(user.lastName)
    const [country, setCountry] = useState(user.country)
    const [photo, setPhoto] = useState(user.photo)
    const [editProfile] = useEditProfileMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formRef = useRef()
    const formData = [
        {
            nameForm: "Name",
            name: "name",
            type: "text",
            value: name,
            min: 3,
            max: 12
        },
        {
            nameForm: "Last Name",
            name: "lastName",
            type: "text",
            value: lastName,
            min: 2,
            max: 30
        },
        {
            nameForm: "Country",
            name: "country",
            type: "text",
            value: country,
            min: 4,
            max: 30
        },
        {
            nameForm: "Photo",
            name: "photo",
            type: "text",
            value: photo,
            min: 2,
            max: 30
        }
    ]
    const showForm = (obj, i) => (
        <fieldset className='NewCitiesPage-fieldset' key={i}>
            <legend >{obj.nameForm}</legend>
            <InputFormProfile type={obj.type} fnc={e => {
                if (obj.name === "name") {
                    return setName(e.target.value)
                } else if (obj.name === "country") {
                    return setCountry(e.target.value)
                } else if (obj.name === "photo") {
                    return setPhoto(e.target.value)
                } else {
                    return setLastName(e.target.value)
                }
            }}
                name={obj.name} value={obj.value} min={obj.min} max={obj.max} />
        </fieldset>
    )
    async function editMyProfile(e) {
        e.preventDefault()
        const form = new FormData(formRef.current)
        const body = Object.fromEntries(form)
        try {
            let res = await editProfile(body)
            if (res.data?.success) {
                dispatch(setUser({
                    ...body,
                    id: user.id,
                    role: user.role,
                    mail: user.mail,
                    from: user.from
                }))
                toast(`Profile modified`, {
                    icon: "👍",
                    style: {
                      borderRadius: ".5rem",
                      background: "#3f3d56",
                      color: "aliceblue",
                    },
                  });
                setOpenModal(!openModal)
            } else {
                console.log(res.error)
                toast.error(`Profile not modified`, {
                    icon: "👍",
                    style: {
                      borderRadius: ".5rem",
                      background: "#3f3d56",
                      color: "aliceblue",
                    },
                  });
            }
        } catch (error) {
            console.log(error)
            toast.error(`Profile not modified`, {
                icon: "👍",
                style: {
                  borderRadius: ".5rem",
                  background: "#3f3d56",
                  color: "aliceblue",
                },
              });
        }
    }
    return (
        <div className='Profile-container'>
            <div className='Profile-container-info'>
                <img src={user.photo} alt="Profile" />
                <h3>{user.name} {user.lastName}</h3>
                <h4><img src='/ubicacion.png' alt='icon' />{user.country}</h4>
                <div className='buttons-container'>
                    <button onClick={() => setOpenModal(!openModal)}>Edit profile</button>
                    <button onClick={() => navigate("/mytineraries", { replace: true })}>MyTineraries</button>
                </div>
            </div>
            {openModal &&
                <Modal>
                    <form className='form-container' ref={formRef} onSubmit={editMyProfile} >
                        {formData.map(showForm)}
                        <div className='buttons-form'>
                            <button className='cancel-btn' onClick={() => setOpenModal(!openModal)}>Cancel</button>
                            <button className='edit-btn' type="submit">Edit</button>
                        </div>
                    </form>
                </Modal>}
        </div>
    )
}
