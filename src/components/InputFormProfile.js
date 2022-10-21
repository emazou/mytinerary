import React from 'react'

export default function InputFormProfile(props) {
  return (
    <input className='Input-container' value={props.value} name={props.name} type={props.type} ref={props.refe} onChange={props.fnc} minLength={props.min} maxLength={props.max} required />
  )
}
