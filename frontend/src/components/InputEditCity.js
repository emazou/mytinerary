import React from 'react'
import '../styles/InputForm.css'

export default function InputEditCity(props) {
    return (
        <input className='Input-container' value={`${props.value ? props.value : ''}`} name={props.name} type={props.type} ref={props.refe} onChange={props.fnc} min={props.min} max={props.max} minLength={props.min} maxLength={props.max} required />
    )
}