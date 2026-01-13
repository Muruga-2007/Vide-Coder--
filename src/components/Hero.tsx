import React from 'react';

const Hero: React.FC = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: 'radial-gradient(circle at 50% 50%, rgba(20, 20, 40, 0.4) 0%, transparent 70%)'
    }}>
      <div className="container">
        <h1 className="gradient-text glow-effect" style={{ 
          fontSize: '5rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          letterSpacing: '-2px'
        }}>
          VIBE CODING
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: 1.4
        }}>
          Experience the flow. A premium local development environment tailored for your rhythm.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{
            padding: '1rem 2.5rem',
            background: 'var(--accent-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: 600,
            boxShadow: '0 0 20px var(--accent-glow)',
            transition: 'var(--transition)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Get Started
          </button>
          <button style={{
            padding: '1rem 2.5rem',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            transition: 'var(--transition)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
