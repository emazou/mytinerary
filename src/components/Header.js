import { useRef, useState } from 'react'
import '../styles/Header.css'
import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../features/loggedSlice'
import { useSignOutMutation } from '../features/usersAPI'
import { navBar } from '../features/modalSlice'
import Alert from "../components/Alert";
import toast from "react-hot-toast";
export default function Header() {
    const logged = useSelector((state) => state.logged.loggedState)
    const userState = useSelector((state) => state.logged.user)
    const dispatch = useDispatch()
    const navRef = useRef()
    const [signOut] = useSignOutMutation()
    const [user, setUser] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    let image = userState?.photo
    let name = userState?.name
    const role = userState?.role
    const showNavbar = () => {
        dispatch(navBar())
        navRef.current.classList.toggle("responsive-nav")
    }
    const showUser = () => {
        setUser(!user)
    }
    const signOutUser = () => {
        let mail = userState?.mail
        signOut({ mail })
            .then(response => {
                localStorage.removeItem('token')
                dispatch(deleteUser())
                toast(`Come back soon ${name}!`, {
                    icon: "😏",
                    style: {
                      borderRadius: ".5rem",
                      background: "#3f3d56",
                      color: "aliceblue",
                    },
                  });
                navigate("/", { replace: true })
            })
            .catch(error => console.log(error))
        setUser(!user)
    }
    return (logged ? (
        <div className='Header-container'>
            <div className='Header-nav-container'>
                <LinkRouter to='/'><img src="/logo.png" alt="Logo" /></LinkRouter>
                <nav ref={navRef}>
                    <LinkRouter className={`Header-link ${pathname === '/' && 'active'}`} to='/' onClick={showNavbar}>Home</LinkRouter>
                    <LinkRouter className={`Header-link ${pathname === '/cities' && 'active'}`} to='/cities' onClick={showNavbar}>Cities</LinkRouter>
                    {
                        role === "admin" && <LinkRouter className={`Header-link ${pathname === '/newCities' && 'active'}`} to='/newCities' onClick={showNavbar}>New Cities</LinkRouter>
                    }
                    {
                        role === "admin" && <LinkRouter className={`Header-link ${pathname === '/editCities' && 'active'}`} to='/editCities' onClick={showNavbar}>Edit Cities</LinkRouter>
                    }
                    <LinkRouter className={`Header-link ${pathname === '/mytineraries' && 'active'}`} to='/mytineraries' onClick={showNavbar}>My Tineraries</LinkRouter>
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>X</button>
                </nav>
                <button className='nav-btn nav-menu-btn' onClick={showNavbar}></button>
            </div>
            <div className='Header-container-user'>
                <button className='Header-user' onClick={showUser}> <img src={image} alt="user" /></button>
                {user &&
                    <div className='Header-container-sign'>
                        <LinkRouter onClick={showUser} to={`/profile`}>{name}</LinkRouter>
                        {
                            role === "admin" && <LinkRouter onClick={showUser} to='/auth/signup'>Sign Up</LinkRouter>
                        }
                        <LinkRouter className='signout' onClick={signOutUser} to='/'>Sign Out</LinkRouter>
                    </div>
                }
            </div>
            <Alert />
        </div>
    ) : (
        <div className='Header-container'>
            <div className='Header-nav-container'>
                <LinkRouter to='/'><img src="/logo.png" alt="Logo" /></LinkRouter>
                <nav ref={navRef}>
                    <LinkRouter className={`Header-link ${pathname === '/' && 'active'}`} to='/' onClick={showNavbar}>Home</LinkRouter>
                    <LinkRouter className={`Header-link ${pathname === '/cities' && 'active'}`} to='/cities' onClick={showNavbar}>Cities</LinkRouter>
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>X</button>
                </nav>
                <button className='nav-btn nav-menu-btn' onClick={showNavbar}></button>
            </div>
            <div className='Header-container-user'>
                <button className='Header-user' onClick={showUser}></button>
                {user &&
                    <div className='Header-container-sign'>
                        <LinkRouter onClick={showUser} to='/auth/signup'>Sign Up</LinkRouter>
                        <LinkRouter onClick={showUser} to='/auth/signin'>Sign In</LinkRouter>
                    </div>
                }
            </div>
            <Alert />
        </div>
    )
    )
}
