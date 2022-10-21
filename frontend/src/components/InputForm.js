import React from 'react'
import '../styles/InputForm.css'

export default function InputForm(props) {
  return (
    <input className='Input-container' placeholder={props.placeholder} name={props.name} type={props.type} ref={props.refe} onChange={props.fnc} min={props.min} max={props.max} minLength={props.min} maxLength={props.max} required />
  )
}
