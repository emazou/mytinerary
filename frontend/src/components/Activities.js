import React from 'react'
import '../styles/Activities.css'
import { useGetActivitiesQuery } from '../features/activitiesAPI'
export default function Activities(props) {
  const { data } = useGetActivitiesQuery(props.id)
  const activities = data?.response
  const showActivity = (activity, index) => (
    <div className='activity-card' key={index}>
      <h3>{activity?.name}</h3>
      <img src={activity?.photo} />
    </div>
  )
  return (
    <div className='Activities-container'>
      {
        activities?.map(showActivity )
      }
    </div>
  )
}
