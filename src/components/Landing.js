import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/netflix-bg.jpg';

function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // ✅ ADD THIS

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate('/signup', { state: { email } }); // ✅ pass email to signup page
  };

  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      ></div>

      {/* Page Content */}
      <div className="position-relative" style={{ zIndex: 2 }}>
        {/* Navbar */}
        <header className="d-flex justify-content-between align-items-center px-5 py-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
            style={{ width: '150px', marginLeft: '10px' }}
          />
          <div className="d-flex align-items-center" style={{ gap: '1rem' }}>
            <select
              className="form-select bg-dark text-white border border-light"
              style={{
                width: 'auto',
                minWidth: '120px',
                fontWeight: '500',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <option>English</option>
              <option>हिन्दी</option>
            </select>
            <button className="btn btn-danger px-4" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </header>

        {/* Centered Text Content */}
        <div className="text-center mt-5 pt-5 px-3">
          <h1 className="display-4 fw-bold">Unlimited movies, TV shows and more</h1>
          <h3 className="fw-normal mt-3">Starts at ₹149. Cancel at any time.</h3>
          <p className="mt-3">Ready to watch? Enter your email to create or restart your membership.</p>

          <form onSubmit={handleGetStarted} className="d-flex justify-content-center mt-4 flex-wrap gap-2 px-3">
            <input
              type="email"
              className="form-control w-auto"
              placeholder="Email address"
              style={{ minWidth: '300px', maxWidth: '400px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-danger px-4" type="submit">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;
