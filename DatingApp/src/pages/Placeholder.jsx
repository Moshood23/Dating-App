import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// REGISTER PAGE
export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    register(formData);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Join DatingApp 💕</h1>
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login" style={styles.linkColor}>Login here</Link></p>
      </div>
    </div>
  );
};

// PROFILE PAGE
export const Profile = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Your Profile</h1>
        <p style={styles.text}>Profile page - coming soon with photo upload and bio editing</p>
      </div>
    </div>
  );
};

// MATCHES PAGE
export const Matches = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Find Your Match</h1>
        <p style={styles.text}>Matches page - coming soon with swipe cards</p>
      </div>
    </div>
  );
};

// CHAT PAGE
export const Chat = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Messages</h1>
        <p style={styles.text}>Chat page - coming soon with messaging interface</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
  },
  text: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6b9d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  linkColor: {
    color: '#ff6b9d',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};