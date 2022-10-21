import React from 'react'
import Comments from './Comments'
import NewComment from './NewComment'
import { useSelector } from 'react-redux'
import '../styles/DisplayComments.css'
export default function DisplayComments(props) {
    let user = useSelector((state) => state.logged.user)
    return (
        <div className='DisplayComments-container'>
            <Comments itinerary={props.itinerary._id} />
            {
                user && <NewComment itinerary={props.itinerary._id} />
            }
        </div>
    )
}
