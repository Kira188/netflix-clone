import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/netflix-bg.jpg';

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialEmail = location.state?.email || '';

    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
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
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 1,
            }} />

            <div className="position-relative" style={{ zIndex: 2 }}>
                <header className="d-flex justify-content-between align-items-center px-5 py-3">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix Logo"
                        style={{ width: '150px', marginLeft: '10px', cursor: 'pointer' }}
                        onClick={() => navigate('/')} // 👈 navigate to landing page
                    />
                </header>

                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <div className="bg-dark p-4 rounded shadow" style={{ width: '90%', maxWidth: '400px' }}>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
