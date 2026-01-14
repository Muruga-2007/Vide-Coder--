import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Plus, MoreHorizontal, Globe, Image, Mic, AtSign } from 'lucide-react';

interface ChatPanelProps {
    onGenerate: (prompt: string) => void;
    loading: boolean;
    error: string | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onGenerate, loading, error }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<{ role: 'user' | 'agent', text: string }[]>([]);

    const handleSubmit = () => {
        if (!input.trim() || loading) return;

        // Add user message
        const newHistory = [...history, { role: 'user' as const, text: input }];
        setHistory(newHistory);

        // Trigger generation
        onGenerate(input);
        setInput('');
    };

    // Add agent response when loading starts/stops (simulated)
    useEffect(() => {
        if (loading) {
            setHistory(prev => [...prev, { role: 'agent', text: 'Working on it...' }]);
        }
    }, [loading]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#181818' }}>
            {/* Header matches 'New Chat' style */}
            <div style={{
                height: '45px',
                padding: '0 1rem',
                borderBottom: '1px solid #2b2b2b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#cccccc'
            }}>
                <span>New Chat</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Plus size={16} color="#cccccc" style={{ cursor: 'pointer' }} />
                    <MoreHorizontal size={16} color="#cccccc" style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Chat History */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {history.length === 0 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#858585', opacity: 0.7 }}>
                        <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem', color: '#4d4d4d' }}>Vibe Coder</div>
                        <p style={{ fontSize: '0.9rem' }}>Generate. Refine. Deploy.</p>
                    </div>
                )}

                {history.map((msg, i) => (
                    <div key={i} style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.role === 'user' ? '#2b2b2b' : 'transparent',
                        padding: msg.role === 'user' ? '8px 12px' : '0',
                        borderRadius: '6px',
                        maxWidth: '90%',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        color: '#cccccc'
                    }}>
                        {msg.role === 'agent' && <div style={{ fontSize: '0.8rem', color: '#858585', marginBottom: '4px' }}>AI Agent</div>}
                        {msg.text}
                    </div>
                ))}

                {error && (
                    <div style={{ color: '#f48771', padding: '0.5rem', fontSize: '0.9rem', background: 'rgba(255,0,0,0.1)', borderRadius: '4px' }}>
                        Error: {error}
                    </div>
                )}
            </div>

            {/* Input Area matches reference */}
            <div style={{ padding: '1rem' }}>
                <div style={{
                    backgroundColor: '#2b2b2b',
                    borderRadius: '8px',
                    border: '1px solid #3c3c3c',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder="Plan, @ for context, / for commands"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#e0e0e0',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            fontFamily: 'inherit',
                            fontSize: '0.9rem',
                            minHeight: '60px',
                            width: '100%'
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                background: '#3c3c3c', borderRadius: '4px', padding: '2px 6px', fontSize: '0.75rem', color: '#ccc',
                                border: '1px solid #4d4d4d'
                            }}>
                                <Sparkles size={12} /> Agent
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                background: 'transparent', borderRadius: '4px', padding: '2px 6px', fontSize: '0.75rem', color: '#858585',
                                border: '1px solid transparent' // Placeholder for structure
                            }}>
                                Auto
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <AtSign size={14} color="#858585" style={{ cursor: 'pointer' }} />
                            <Globe size={14} color="#858585" style={{ cursor: 'pointer' }} />
                            <Image size={14} color="#858585" style={{ cursor: 'pointer' }} />
                            <Mic size={14} color="#858585" style={{ cursor: 'pointer' }} />

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{
                                    background: loading ? '#333' : '#4d4d4d',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: 'white',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                    marginLeft: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
