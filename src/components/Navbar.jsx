import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [homeClick, setHomeClick] = useState(true);
  const [aboutClick, setAboutClick] = useState(false);
  return (
    <nav className='flex flex-col'>
      <div className='flex justify-center bg-blue-900'>
        <h1 className='text-3xl py-6 font-bold'>Service Worker Example</h1>
      </div>
      <div className='bg-blue-400'>
        <div className='ml-10 py-3 flex gap-5'>
          <NavLink to='/'>
            <p
              onClick={() => {
                setHomeClick(!homeClick);
                setAboutClick(false);
              }}
              className={`${homeClick ? 'text-yellow-300' : 'text-black'}`}
            >
              Home
            </p>
          </NavLink>
          <NavLink
            onClick={() => {
              setAboutClick(!aboutClick);
              setHomeClick(false);
            }}
            className={`${aboutClick ? 'text-yellow-300' : 'text-black'}`}
            to='/about'
          >
            <p>About</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
