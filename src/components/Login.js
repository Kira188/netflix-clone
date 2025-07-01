import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/netflix-bg.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            alert("Login failed: " + err.message);
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
                        style={{ width: '150px', marginLeft: '10px', cursor: 'pointer' }}
                        onClick={() => navigate('/')} // 👈 navigate to landing page
                    />
                </header>

                {/* Centered Form */}
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <div className="bg-dark p-4 rounded shadow" style={{ width: '90%', maxWidth: '400px' }}>
                        <h2 className="text-center mb-4">Sign In</h2>
                        <form onSubmit={handleLogin}>
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
                            <button type="submit" className="btn btn-danger w-100">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
