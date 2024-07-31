import React from 'react';

function TestApp() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>APP</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button}>
          <span role="img" aria-label="stats">📊</span> Stats
        </button>
        <button style={styles.button}>
          <span role="img" aria-label="record game">📥</span> Record game
        </button>
        <button style={styles.button}>
          <span role="img" aria-label="recent games">✏️</span> Recent games
        </button>
        <button style={styles.button}>
          <span role="img" aria-label="player admin">👤</span> Player admin
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  button: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #000',
    borderRadius: '5px',
    backgroundColor: '#fff',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};

export default TestApp;
