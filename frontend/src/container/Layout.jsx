import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='home-wrapper'>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
