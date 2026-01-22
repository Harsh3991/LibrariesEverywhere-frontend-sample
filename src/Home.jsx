import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, SlidersHorizontal, Star, Construction, Navigation } from 'lucide-react';
import { FaUser } from 'react-icons/fa6';
import booksData from './data.json';
import './Home.css';
import bannerImage from './assets/banner-image.png';
import starImage from './assets/image_8.png';
import heartImage from './assets/lilac_heart_fav_1.png';
import footerIcon from './assets/image_101.png';
import BottomNav from './BottomNav';

const Home = () => {
  const navigate = useNavigate();
  
  // Filter states
  const [activeSort, setActiveSort] = useState('rating'); // 'rating', 'title', 'pages', 'author'
  const [activeFicNonfic, setActiveFicNonfic] = useState('all'); // 'all', 'Fiction', 'Non-Fiction'
  const [activeGenres, setActiveGenres] = useState([]); // array of selected genres
  const [minRating, setMinRating] = useState(0); // 0, 4, 4.5
  const [maxPages, setMaxPages] = useState(Infinity); // Infinity, 350
  
  // Dropdown states
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const sortRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSortDropdown]);

  // Calculate dropdown position when opening
  const toggleSortDropdown = () => {
    if (!showSortDropdown && sortRef.current) {
      const rect = sortRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setShowSortDropdown(!showSortDropdown);
  };

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = [...booksData];

    // Filter by Fiction/Non-Fiction
    if (activeFicNonfic !== 'all') {
      filtered = filtered.filter(book => book.Type === activeFicNonfic);
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(book => parseFloat(book.Goodreads) >= minRating);
    }

    // Filter by pages
    if (maxPages !== Infinity) {
      filtered = filtered.filter(book => parseInt(book.Pages) <= maxPages);
    }

    // Sort books
    if (activeSort === 'rating') {
      filtered.sort((a, b) => parseFloat(b.Goodreads) - parseFloat(a.Goodreads));
    } else if (activeSort === 'title') {
      filtered.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (activeSort === 'pages') {
      filtered.sort((a, b) => parseInt(a.Pages) - parseInt(b.Pages));
    } else if (activeSort === 'author') {
      filtered.sort((a, b) => a.Author.localeCompare(b.Author));
    }

    return filtered;
  }, [activeFicNonfic, minRating, maxPages, activeSort]);

  const handleSortSelect = (sortType) => {
    console.log('Selected sort type:', sortType);
    setActiveSort(sortType);
    setTimeout(() => {
      setShowSortDropdown(false);
    }, 100);
  };

  const toggleFicNonfic = () => {
    const options = ['all', 'Fiction', 'Non-Fiction'];
    const currentIndex = options.indexOf(activeFicNonfic);
    setActiveFicNonfic(options[(currentIndex + 1) % options.length]);
  };

  const toggleRating = () => {
    if (minRating === 0) setMinRating(4);
    else if (minRating === 4) setMinRating(4.5);
    else setMinRating(0);
  };

  const togglePages = () => {
    setMaxPages(maxPages === Infinity ? 350 : Infinity);
  };

  const getSortLabel = () => {
    const labels = {
      'rating': 'Rating',
      'title': 'Title',
      'pages': 'Pages',
      'author': 'Author'
    };
    return labels[activeSort];
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="location">
          <Navigation size={14} style={{fill: '#FF4D4D', stroke: 'none', marginRight: '4px', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'}} />
          Gurgaon <ChevronDown size={14} />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search Books or Book Clubs" className="search-input" />
        </div>
        <div className="user-avatar">
          <FaUser size={16} style={{color: 'white'}} />
        </div>
      </header>

      {/* Banner */}
      <div className="promo-banner" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* <div className="banner-text">
          LIBRARIES<br/>EVERYWHERE
        </div> */}
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-title">Borrow, read, return!</div>
        <div className="chips-row">
          <div className="chip-wrapper" ref={sortRef}>
            <div 
              className={`chip ${showSortDropdown ? 'active' : ''}`} 
              onClick={toggleSortDropdown}
            >
              <SlidersHorizontal size={12} /> 
              sort: {getSortLabel()} 
              <ChevronDown size={12} />
            </div>
          </div>
          <div className={`chip ${activeFicNonfic !== 'all' ? 'active' : ''}`} onClick={toggleFicNonfic}>
            {activeFicNonfic === 'all' ? 'fic/nonfic' : activeFicNonfic}
          </div>
          <div className="chip">genres</div>
          <div className={`chip ${minRating > 0 ? 'active' : ''}`} onClick={toggleRating}>
            rating: {minRating > 0 ? `${minRating}+` : 'all'}
          </div>
          <div className={`chip ${maxPages !== Infinity ? 'active' : ''}`} onClick={togglePages}>
            {maxPages === Infinity ? 'all pages' : '<350 pages'}
          </div>
          <div className="chip">tall books</div>
          <div className="chip">author identity</div>
          <div className="chip">character identity</div>
        </div>
      </div>

      {/* Dropdown Portal - Rendered outside the filters section */}
      {showSortDropdown && (
        <div 
          className="dropdown-menu" 
          style={{ 
            top: `${dropdownPosition.top}px`, 
            left: `${dropdownPosition.left}px` 
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div 
            className={`dropdown-item ${activeSort === 'rating' ? 'selected' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSortSelect('rating');
            }}
          >
            By Rating
          </div>
          <div 
            className={`dropdown-item ${activeSort === 'title' ? 'selected' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSortSelect('title');
            }}
          >
            By Title
          </div>
          <div 
            className={`dropdown-item ${activeSort === 'pages' ? 'selected' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSortSelect('pages');
            }}
          >
            By Pages
          </div>
          <div 
            className={`dropdown-item ${activeSort === 'author' ? 'selected' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSortSelect('author');
            }}
          >
            By Author
          </div>
        </div>
      )}

      {/* Grid */}
      <h2 className="section-title">All Books ({filteredBooks.length})</h2>
      <div className="book-grid">
        {filteredBooks.map((book) => {
          // Calculate approval percentage from Amazon rating
          const approvalPercent = book.Amazon ? `${(parseFloat(book.Amazon) * 20).toFixed(1)}%` : '90%';
          
          return (
            <div key={book['ISBN-13']} className="book-card" onClick={() => navigate(`/book/${book['ISBN-13']}`)}>
              <div className="cover-wrapper">
                <img src={book['Front Cover']} alt={book.Title} className="cover-img" style={{backgroundColor: '#ddd'}} />
              </div>
              <div className="book-title">{book.Title}</div>
              <div className="book-author">{book.Author}</div>
              <div className="rating-row">
                <img src={starImage} alt="Star" style={{ width: '11px', height: '11px', marginRight: '3px', display: 'inline-block', flexShrink: 0 }} />
                {book.Goodreads} <span className="rating-percent"> <img src={heartImage} alt="Heart" style={{ width: '11px', height: '11px', marginLeft: '4px', marginRight: '2px', display: 'inline-block', flexShrink: 0 }} /> {approvalPercent}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* List Footer */}
      <div className="list-footer">
        <img src={footerIcon} alt="Footer Icon" className="footer-icon" style={{ width: '48px', height: '48px' }} />
        <div className="footer-text">THAT'S ALL THE BOOK</div>
        <div className="footer-link">REQUEST A BOOK</div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;