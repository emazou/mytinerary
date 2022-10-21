import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useGetCommentsMutation } from '../features/commentsAPI'
import { useSelector } from 'react-redux'
export default function Comments(props) {
    const [comments, setComments] = useState()
    const reload = useSelector((state)=> state.reload.reloadState)
    const [getComments] = useGetCommentsMutation()
    async function allComments(){
        try{
            let res = await getComments(props.itinerary)
            if(res.data?.success){
                setComments(res.data?.response)
            }else{
                console.log(res.error)
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        allComments()
    },[reload])
    return (
        <div className='Itinerary-container-comments'>
            {
                comments?.length > 0 ? comments?.map(comment => <Comment key={comment._id} comment={comment} />)
                    : <div className='Itinerary-notComment'><img src='/no-talking.png' /></div>
            }
        </div>
    )
}
