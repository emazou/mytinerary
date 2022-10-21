import React, { useRef } from 'react'
import { useCreateCommentMutation } from '../features/commentsAPI'
import { useDispatch, useSelector } from "react-redux";
import { reload } from "../features/reloadSlice";
import '../styles/NewComment.css'
export default function NewComment(props) {
    let user = useSelector((state) => state.logged.user)
    const form = useRef()
    const input = useRef()
    const dispatch = useDispatch()
    const [createComment] = useCreateCommentMutation()
    async function comment(e){
        e.preventDefault()
        let formValues = new FormData(form.current)
        let newComment = Object.fromEntries(formValues)
        try{
            let res = await createComment({comment: newComment.comment, itinerary: props.itinerary})
            if(res.data?.success){
                dispatch(reload())
            }else{
                console.log(res.error)
            }
        }catch(error){
            console.log(error)
        }
        input.current.value = ''  
    }
    return (
        <form onSubmit={comment} ref={form} className="NewComment-container">
            <img src={user.photo} alt='Avatar'/>
            <input placeholder='Add a comment' name='comment' minlength='1' maxlength='300' ref={input} />
            <button className='NewComment-btn' type="submit"><img src='/send.png' /></button>
        </form>

    )
}
