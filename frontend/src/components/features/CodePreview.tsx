import React, { useState } from 'react';

interface CodePreviewProps {
    code: string;
    summary: string;
    improvements: string[];
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, summary, improvements }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-code.tsx';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {/* Summary */}
            <div style={{
                padding: '1.5rem',
                background: 'rgba(138, 43, 226, 0.1)',
                borderRadius: '15px',
                marginBottom: '1.5rem',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.8
            }}>
                {summary}
            </div>

            {/* Improvements */}
            {improvements.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Extra Improvements</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                        {improvements.map((improvement, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem' }}>{improvement}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Code */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h4 style={{ fontSize: '1.1rem' }}>Generated Code</h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={handleCopy}
                            style={{
                                padding: '0.5rem 1rem',
                                background: copied ? '#4caf50' : 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'var(--transition)'
                            }}
                        >
                            {copied ? '✓ Copied!' : '📋 Copy'}
                        </button>
                        <button
                            onClick={handleDownload}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--accent-primary)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'var(--transition)'
                            }}
                        >
                            ⬇ Download
                        </button>
                    </div>
                </div>

                <pre style={{
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '10px',
                    overflow: 'auto',
                    maxHeight: '500px',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <code style={{ color: '#e0e0e0' }}>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default CodePreview;
