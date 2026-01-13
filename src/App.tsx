import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import './index.css'; // Ensure styles are applied

function App() {
  return (
    <div className="App">
      <Hero />
      <Features />

      <footer style={{
        padding: '2rem 0',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.3)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '5rem'
      }}>
        <div className="container">
          <p>© 2026 Vibe Coding. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
