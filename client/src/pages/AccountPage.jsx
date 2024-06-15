import { useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from 'axios';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(false);
  const {user,setUser, ready} = useContext(UserContext);
  let {subpage} = useParams();
  if(subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post('/logout');
    alert("Logged Out!!");
    setRedirect(true);
    setUser(null);
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }

  if(!ready) {
    return 'Loading...';
  }
  
  if(ready && !user && !redirect) {
    return <Navigate to={'/login'}/> 
  }

  const linkClasses = (type=null) => {
    if(type === subpage) {
      return "py-2 px-6 bg-primary text-white rounded-full"
    } else {
      return 'py-2 px-6';
    }
  };

  
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My Accommodations</Link>
      </nav>

      {
        subpage === 'profile' && (
          <div className="text-center max-w-lg mx-auto border">
            Logged in as {user.name} <br />
            <button onClick={logout} className="bg-gray-400 text-white max-w-sm mt-2 rounded-full py-2 px-6">
                Log out
            </button>
          </div>
        )
      }
    </div> 
  )
  
}

export default AccountPage;