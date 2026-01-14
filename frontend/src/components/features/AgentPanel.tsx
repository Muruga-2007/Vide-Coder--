import React from 'react';

interface AgentPanelProps {
    title: string;
    content: string;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ title, content }) => {
    return (
        <div style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.1)',
            height: '400px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                {title}
            </h3>
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                color: 'var(--text-secondary)'
            }}>
                {content}
            </div>
        </div>
    );
};

export default AgentPanel;
