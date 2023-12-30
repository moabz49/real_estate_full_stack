import React,{ useRef, useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton';
import Logo from '../images/logo.png'
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../hooks/useAuthCheck.jsx";
import ProfileMenu from '../components/ProfileMenu';
import AddPropertyModal from '../components/AddPropertyModal.jsx';


const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const menuRef = useRef(null);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  // This hook check if user is Authenticated before they perform an action
  const { validateLogin } = useAuthCheck();

  useEffect(() => {
    // Check if window object is defined (browser environment)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        // Check window.scrollY only if window is defined
        setIsActive(window.scrollY > 48);
      });
    }
  }, []);
   
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleAddPropertyClick = ( ) => {
    if (validateLogin) {
      setModalOpen(true);
    }
  }
  
  //  function checks if the click event's target is CONTAINED within menuRef. If it's not, that means the click was outside the menu, and setIsOpenMenu(false) is called to close the menu.
  const handleClickOutside = (e) => {
    // If the menu is open true && the click is outside of the menu, close the menu
    if(menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpenMenu(false);
    }
  }

  return (
    <header className={`${isActive? 'bg-neutral-800 shadow-lg' : 'bg-gradient-to-r from-black from-4% via-10%  via-stone-600 via to-50% to-black'} py-4 fixed items-center justify-center flex w-full transition-all z-40 `}>
      <div className='flex items-center h-full justify-between w-[95%] relative max-w-[1340px]'>
        <a href="/"> 
            <img src={Logo} alt="logo" className='h-10 ' />
        </a>
        <ul className='hidden lg:flex space-x-6 items-center text-neutral-300 '>
            <li className='cursor-pointer hover:scale-[105%] hover:underline ease-out duration-300 hover:text-neutral-200 transition-transform '>
              <Link to="/properties">Properties </Link> 
            </li>
            <li className='cursor-pointer hover:scale-[105%] hover:underline ease-out duration-300 hover:text-neutral-200 transition-transform '>
              <a href="mailto:moraabz49@yahoo.com?subject=Email%20Subject&body=Email%20Body">Contact </a>
            </li>
            <div onClick={handleAddPropertyClick} className='cursor-pointer hover:scale-[105%] hover:underline ease-out duration-300 hover:text-neutral-200 transition-transform '>
              Add Property
            </div>
            <AddPropertyModal opened={modalOpen} setOpened={setModalOpen}/>
          {!isAuthenticated ? (
            <CustomButton actionType="login" loginWithRedirect={loginWithRedirect} >Login</CustomButton>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )
          }
          </ul>
        <HiMenuAlt3 onClick={() => setIsOpenMenu(prev => !prev)} className='lg:hidden text-neutral-300  text-[28px] hover:scale-[105%] hover:text-neutral-200 focus:text-neutral-200 duration-200 ease-out transition-transform cursor-pointer' />
        {isOpenMenu ? (
        <div ref={menuRef} className='absolute top-12 right-10 text-neutral-300'>
          <ul className='lg:hidden bg-white text-black font-medium space-y-8 p-10 rounded-lg flex-col justify-center text-center items-center shadow-md'>
            <li className='cursor-pointer hover:scale-[105%] hover:opacity-75 ease-out duration-300 transition-transform '>
              <Link to="/properties">Properties </Link> 
            </li>
            <li className='cursor-pointer hover:scale-[105%] hover:opacity-75 ease-out duration-300 transition-transform '>
              <a href="/mailto:moraabz49@yahoo.com">Contact </a> 
            </li>
            <div onClick={handleAddPropertyClick} className='cursor-pointer hover:scale-[105%] hover:opacity-75 ease-out duration-300 transition-transform '>
              Add Property
            </div>
            <AddPropertyModal opened={modalOpen} setOpened={setModalOpen}/>
            {!isAuthenticated ? (
            <CustomButton actionType="login" loginWithRedirect={loginWithRedirect} >Login</CustomButton>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )
          }
          </ul>
        </div>
        ): null}
      </div>      
    </header>
  )
}

export default Header;