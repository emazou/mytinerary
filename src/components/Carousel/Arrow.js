import React from 'react'
import '../../styles/Arrow.css'
export default function Arrow(props) {
  return (
    <>
        <button
        className='Arrow-button'
        onClick={props.click}
        >
            {props.icon}
        </button>
    </>
  )
}
