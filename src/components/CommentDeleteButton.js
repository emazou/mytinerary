import React from 'react'
import { useDeleteCommentMutation } from '../features/commentsAPI'
import { reload } from '../features/reloadSlice'
import { useDispatch } from 'react-redux'
import '../styles/CommentButtons.css'
export default function CommentDeleteButton(props) {
    const [deleteComment] = useDeleteCommentMutation()
    const dispatch = useDispatch()
    async function deleteOneComment() {
        try {
            let res = await deleteComment(props.id)
            if (res.data?.success) {
                dispatch(reload())
            }else{
                console.log(res.error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button className='CommentDeleteButton' onClick={deleteOneComment}><img src='/trash.png' /></button>
    )
}
