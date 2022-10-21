import React from 'react'
import { useDispatch } from 'react-redux'
import { modalComment } from '../features/modalSlice'
import '../styles/CommentButtons.css'
export default function CommentEditButton() {
    const dispatch = useDispatch()
    const openModal = ()=>{
        dispatch(modalComment())
    }
    return (
        <button className='CommentEditButton' onClick={openModal}><img src="/edit.png" /></button>
    )
}
