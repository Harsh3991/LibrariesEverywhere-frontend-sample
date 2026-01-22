import React from 'react';
import bookStack from './assets/book-stack.png';
import booksRead from './assets/books-read.png';
import meet from './assets/meet.png';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="nav-item active">
        <img src={bookStack} alt="Borrow" className="nav-icon" />
        <span>Borrow</span>
      </div>
      <div className="nav-divider"></div>
      <div className="nav-item">
        <img src={booksRead} alt="Read" className="nav-icon" />
        <span>Read</span>
      </div>
      <div className="nav-divider"></div>
      <div className="nav-item">
        <img src={meet} alt="Meet" className="nav-icon" style={{ width: '28px', height: '28px' }} />
        <span>Meet</span>
      </div>
    </div>
  );
};

export default BottomNav;