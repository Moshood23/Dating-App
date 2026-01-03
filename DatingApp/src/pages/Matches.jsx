import React from 'react';

const Matches = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Find Your Match</h1>
        <p style={styles.text}>Matches page - coming soon with swipe cards</p>
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
};

export default Matches;