import React from 'react';

const Features: React.FC = () => {
    const features = [
        {
            title: 'Neon Workflow',
            description: 'Immersive dark mode environment that reduces eye strain and looks incredible.'
        },
        {
            title: 'Lightning Fast',
            description: 'Optimized for speed. Your local development has never felt this responsive.'
        },
        {
            title: 'Zone State',
            description: 'Tools designed to keep you in the flow, minimizing distractions and maximizing creativity.'
        }
    ];

    return (
        <section style={{ padding: '5rem 0', background: '#080815' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '3rem',
                    marginBottom: '4rem',
                    textAlign: 'center',
                    fontWeight: 700
                }}>
                    Why <span className="gradient-text">Vibe?</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((feature, index) => (
                        <div key={index} style={{
                            background: 'var(--card-bg)',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'var(--transition)',
                            cursor: 'default'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'var(--card-bg)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
