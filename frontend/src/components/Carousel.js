import React, { useEffect, useState } from 'react'
import '../styles/Carousel.css'
import Arrow from './Carousel/Arrow'
import { Link as Linkrouter } from 'react-router-dom'
import { useGetAllCitiesQuery } from '../features/citiesAPI';

export default function Carousel(props) {
    const range = props.range
    const limit = (props.slides * range)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(start + range)
    const interval = props.interval * 1000
    const [intervalId, setIntervalId] = useState()

    const { data } = useGetAllCitiesQuery('')

    const citiesView = (city) => (
        <Linkrouter className='Carousel-router' key={city._id} to={`/cities/${city._id}`}>
            <div className='Carousel-city' key={city.city}>
                <h3>{city.city}</h3>
                <img src={city.photo} />
            </div>
        </Linkrouter>
    )

    useEffect(() => {
        let id = setInterval(function () {
            next()
        }, interval)
        setIntervalId(id)
        return () => clearInterval(intervalId);
    }, [start])

    function prev() {
        if (start >= range) {
            setStart(start - range)
            setEnd(end - range)
        } else {
            setStart(limit - range)
            setEnd(limit)
        }
        clearInterval(intervalId)
    }
    function next() {
        if (end < limit) {
            setStart(start + range)
            setEnd(end + range)
        } else {
            setStart(0)
            setEnd(range)
        }
        clearInterval(intervalId)
    }
    return (
        <div className='Carousel'>
            <h2>Popular MyTineraries</h2>
            <div className='Carousel-container'>
                <Arrow icon={'<'} click={prev} />
                <div className='Carousel-slider'>
                    {data?.response?.slice(start, end).map(citiesView)}
                </div>
                <Arrow icon={'>'} click={next} />
            </div>
        </div>
    )
}
