import React from "react";
import "../styles/Likes.css";
import { useLikeDislikeMutation } from "../features/itinerariesAPI";
import { useDispatch, useSelector } from "react-redux";
import { reload } from "../features/reloadSlice";

export default function Likes(props) {
    const [likeDislike] = useLikeDislikeMutation()
    const itinerary = props.itinerary
    const user = useSelector((state) => state.logged.user)
    const dispatch = useDispatch()
    async function likes() {
        if (localStorage.getItem('token')) {
            try {
                let res = await likeDislike(itinerary._id)
                if (res.data?.success) {
                    dispatch(reload())
                } else {
                    console.log(res.error)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className="Itinerary-interactions-likes">
            <button className={((user && itinerary.likes.includes(user.id)) || !user) ? 'Itinerary-like-btn' : 'Itinerary-dislike-btn'} onClick={likes}></button>
            <p>{itinerary.likes.length}</p>
        </div>
    );
}
