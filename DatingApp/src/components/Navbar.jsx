import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>💕 DatingApp</Link>
        <ul style={styles.menu}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/matches" style={styles.link}>Matches</Link></li>
          <li><Link to="/chat" style={styles.link}>Chat</Link></li>
          <li><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li><button onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#ff6b9d',
    padding: '1rem 0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  menu: {
    display: 'flex',
    listStyle: 'none',
    gap: '30px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#ff6b9d',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  },
};

export default Navbar;