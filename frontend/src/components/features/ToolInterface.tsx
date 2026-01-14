import React, { useState } from 'react';
import PromptInput from './PromptInput';
import AgentPanel from './AgentPanel';
import CodePreview from './CodePreview';

interface ToolInterfaceProps {
    onBack: () => void;
}

interface GenerationResult {
    plan: string;
    copywriting: string;
    code: string;
    final_code: string;
    improvements: string[];
    summary: string;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ onBack }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (prompt: string) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Generation failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                        Vibe Coding Tool
                    </h1>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                        }}
                    >
                        ← Back to Home
                    </button>
                </div>

                <PromptInput onGenerate={handleGenerate} loading={loading} />

                {error && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255,0,0,0.1)',
                        border: '1px solid rgba(255,0,0,0.3)',
                        borderRadius: '10px',
                        color: '#ff6b6b',
                        marginTop: '2rem'
                    }}>
                        Error: {error}
                    </div>
                )}

                {loading && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <div className="gradient-text" style={{ fontSize: '1.5rem' }}>
                            🤖 Agents working in parallel...
                        </div>
                    </div>
                )}

                {result && (
                    <>
                        <div style={{ marginTop: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Agent Outputs</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                <AgentPanel title="🧠 Planner" content={result.plan} />
                                <AgentPanel title="✍️ Copywriter" content={result.copywriting} />
                                <AgentPanel title="⚡ Code Generator" content={result.code} />
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Final Result</h2>
                            <CodePreview code={result.final_code} summary={result.summary} improvements={result.improvements} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ToolInterface;
