import React, { useState } from 'react';

interface PromptInputProps {
    onGenerate: (prompt: string) => void;
    loading: boolean;
}

const EXAMPLE_PROMPTS = [
    "Create a landing page for a coffee shop with online ordering",
    "Build a portfolio website for a photographer",
    "Design a SaaS product landing page for a project management tool",
];

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, loading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = () => {
        if (prompt.trim() && !loading) {
            onGenerate(prompt);
        }
    };

    return (
        <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
                Describe your website
            </h3>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Create a modern landing page for a fitness app with hero section, features, and pricing..."
                style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                }}
            />

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !prompt.trim()}
                    style={{
                        padding: '0.75rem 2rem',
                        background: loading || !prompt.trim() ? '#555' : 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
                        boxShadow: loading || !prompt.trim() ? 'none' : '0 0 20px var(--accent-glow)',
                        transition: 'var(--transition)'
                    }}
                >
                    {loading ? '⏳ Generating...' : '✨ Generate'}
                </button>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Examples:
                    {EXAMPLE_PROMPTS.map((example, i) => (
                        <button
                            key={i}
                            onClick={() => setPrompt(example)}
                            style={{
                                marginLeft: '0.5rem',
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '15px',
                                color: 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'var(--transition)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromptInput;
