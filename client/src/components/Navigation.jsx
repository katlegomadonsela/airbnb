import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';


const Navigation = () => {
  const {user} = useContext(UserContext);

  return (
    <>
      <header className="border-b px-8 py-4 flex justify-between">
        <div className="flex items-center gap-2"> 
          <Link to={'/'} className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-6 h-6 -rotate-90 text-primary" rotate={180}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <span className="text-primary text-xl font-semibold">airbnb</span>
          </Link> 
        </div>

        <div className="flex items-center gap-2 border rounded-full py-2 px-4 shadow-md ml-40">
          <div>Anywhere</div>
          <div className="border-l h-full"></div>
          <div>Any week</div>
          <div className="border-l h-full"></div>
          <div>Add guests</div>
          <button className="bg-primary rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <Link to={user? '/account' : '/login'} className="flex border rounded-full py-2 px-4 gap-3 items-center hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 p-[1px] overflow-hidden" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative top-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            {
              user ? <span>{user.name}</span> : ""
            }
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navigation;