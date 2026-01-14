import React, { useState, useEffect } from 'react';
import { GenerationResult } from '../../../types';

interface TerminalProps {
    result: GenerationResult | null;
    loading: boolean;
    error: string | null;
}

const Terminal: React.FC<TerminalProps> = ({ result, loading, error }) => {
    const [logs, setLogs] = useState<string[]>(['System ready.']);

    useEffect(() => {
        if (loading) {
            setLogs(prev => [...prev, '> Starting workflow...', '> Planner initialized...', '> Copywriter initialized...']);
        }
    }, [loading]);

    useEffect(() => {
        if (result) {
            setLogs(prev => [...prev,
                '> Planner finished.',
                '> Copywriter finished.',
                '> Coder finished.',
                '> Build successful.'
            ]);
        }
    }, [result]);

    useEffect(() => {
        if (error) {
            setLogs(prev => [...prev, `> Error: ${error}`]);
        }
    }, [error]);

    return (
        <div style={{ height: '100%', backgroundColor: '#181818', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                height: '35px',
                borderBottom: '1px solid #2b2b2b',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1.5rem',
                gap: '2rem',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                color: '#666',
                fontWeight: 600,
                letterSpacing: '0.5px'
            }}>
                <span style={{ cursor: 'pointer' }}>Problems</span>
                <span style={{ cursor: 'pointer' }}>Output</span>
                <span style={{ cursor: 'pointer' }}>Debug Console</span>
                <span style={{
                    color: '#fff',
                    borderBottom: '1px solid #fff',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}>Terminal</span>
                <span style={{ cursor: 'pointer' }}>Ports</span>
            </div>

            <div style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                fontFamily: "'Consolas', 'Courier New', monospace",
                fontSize: '0.9rem',
                color: '#d4d4d4',
                lineHeight: '1.5'
            }}>
                <div style={{ color: '#aaa', marginBottom: '0.5rem' }}>Microsoft Windows [Version 10.0.26200.7462]</div>
                <div style={{ color: '#aaa', marginBottom: '1rem' }}>(c) Microsoft Corporation. All rights reserved.</div>

                <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: '#4ec9b0' }}>D:\Project-Free-api\Vibe-coder</span>
                    <span style={{ color: '#d4d4d4' }}>&gt;</span>
                </div>

                {logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '2px', paddingLeft: '0' }}>
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Terminal;
