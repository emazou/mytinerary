import React, { useState } from 'react'
import '../styles/Comment.css'
import { useSelector, useDispatch } from 'react-redux'
import CommentDeleteButton from './CommentDeleteButton'
import CommentEditButton from './CommentEditButton'
import { modalComment } from '../features/modalSlice'
import { reload } from '../features/reloadSlice'
import { useEditCommentMutation } from '../features/commentsAPI'
import Modal from './Modal'
export default function Comment(props) {
  const user = useSelector((state) => state.logged.user)
  const comment = props.comment
  const openModal = useSelector((state) => state.modal.modalCommentState)
  const [valueComment, setValueComment] = useState(comment.comment)
  const dispatch = useDispatch()
  const [editComment] = useEditCommentMutation()
  async function editOneComment() {
    try {
      let res = await editComment({ id: comment._id, comment: valueComment })
      if (res.data?.success) {
        dispatch(reload())
        dispatch(modalComment())
      } else {
        console.log(res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const modal = () => {
    dispatch(modalComment())
  }

  return (
    <div className='Comment-container'>
      <img src={comment.user.photo} />
      <div className='Comment-information'>
        <p className='Comment-information-user'>{comment.user.name} {comment.user.lastName}</p>
        <p>{comment.comment}</p>
      </div>

      {
        ((user && user.role === "admin") || (user && user?.id === comment.user._id)) &&
        <div className='Comment-buttons-container'>
          <CommentEditButton id={comment._id} />
          <CommentDeleteButton id={comment._id} />
        </div>
      }
      {openModal &&
        <Modal>
          <form className='Modal-form'>
            <textarea value={valueComment} onChange={e => setValueComment(e.target.value)} rows='5' maxlength='300' />
            <div className='modal-btns-container'>
              <button className='cancel-btn' onClick={modal}>Cancel</button>
              <button className='edit-btn' onClick={editOneComment} type="button">Edit</button>
            </div>
          </form>
        </Modal>}
    </div>
  )
}
