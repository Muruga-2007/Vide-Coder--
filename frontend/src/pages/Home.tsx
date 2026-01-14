import React, { useState } from 'react';
import Hero from '../components/features/Hero';
import Features from '../components/features/Features';
import Layout from '../components/features/ide/Layout';

function Home() {
  const [showTool, setShowTool] = useState(false);

  return (
    <div className="App">
      {!showTool ? (
        <>
          <Hero onTryTool={() => setShowTool(true)} />
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
        </>
      ) : (
        <Layout onBack={() => setShowTool(false)} />
      )}
    </div>
  );
}

export default Home;
