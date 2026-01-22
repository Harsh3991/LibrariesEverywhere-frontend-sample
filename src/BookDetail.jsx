import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronLeft, Share, ThumbsUp } from 'lucide-react';
import { FaUser } from 'react-icons/fa6';
import booksData from './data.json';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find book by ISBN-13
  const book = booksData.find(b => b['ISBN-13'] === id) || booksData[0];

  // Calculate approval percentage from Amazon rating
  const approvalPercent = book.Amazon ? `${(parseFloat(book.Amazon) * 20).toFixed(1)}%` : '90%';
  
  // Calculate review count from Goodreads rating (simulated)
  const reviewCount = book.Goodreads ? Math.floor(parseFloat(book.Goodreads) * 100000).toLocaleString() : '100,000';

  // Parse genres into array
  const genres = book.Genres ? book.Genres.split(',').map(g => g.trim()) : ['Fiction'];

  return (
    <div className="detail-container">
      {/* Top Header */}
      <div className="detail-header">
        <div className="header-left">
          <h1>Free Books</h1>
          <span>Gurgaon</span>
        </div>
        <div className="header-icons">
          <Search size={24} />
          <Plus size={24} />
          <div style={{width:'30px', height:'30px', background:'#CCE4ED', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <FaUser size={16} style={{color: 'white'}} />
          </div>
        </div>
      </div>

      {/* Hero Section (Teal Background) */}
      <div className="hero-section">
        {/* Navigation Overlays */}
        <div className="hero-nav">
          <button className="circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} strokeWidth={4} />
          </button>
          <button className="circle-btn">
            <Share size={20} strokeWidth={4} />
          </button>
        </div>

        {/* Content Flex */}
        <div className="book-display">
          <img src={book['Front Cover']} alt={book.Title} className="hero-cover" style={{backgroundColor: '#222'}} />
          
          <div className="info-pills">
            {genres.map((genre, index) => (
               <div key={index} className="info-pill">{genre}</div>
            ))}
            <div className="info-pill">{book.Binding}</div>
            <div className="info-pill">{book.Pages} pages</div>
            <div className="info-pill" style={{display:'flex', alignItems:'center', gap:'5px'}}>
              {approvalPercent} <ThumbsUp size={14} fill="#FFC107" strokeWidth={0} />
            </div>
            <div className="info-pill review-pill">
              <span className="review-count">{reviewCount}</span>
              <span className="review-label">reviewers</span>
            </div>
          </div>
        </div>

        {/* Bottom Sheet Overlay */}
        <div className="bottom-sheet">
            <div className="drag-handle"></div>
            <h2 className="sheet-title">{book.Title}</h2>
            <div className="sheet-author">by {book.Author}</div>
        </div>

      </div>
    </div>
  );
};

export default BookDetail;