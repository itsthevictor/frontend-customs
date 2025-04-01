import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <main>
      <Header />
      <div className='page'>
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
