import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BookDetail from './BookDetail';
import BottomNav from './BottomNav';

function App() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    if (!isMobile) {
      alert("We are only operational on Mobiles, so please view this link on your phone");
    }
  }, []);

  return (
    <Router>
      <div className="app-container" style={{ maxWidth: '414px', margin: '0 auto', background: '#fff', minHeight: '100vh', position: 'relative', paddingBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;