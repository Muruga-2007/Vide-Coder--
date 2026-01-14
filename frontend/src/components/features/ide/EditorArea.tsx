import React, { useState } from 'react';
import { GenerationResult } from '../../../types';
import CodePreview from '../CodePreview';
import { Box } from 'lucide-react';

interface EditorAreaProps {
    result: GenerationResult | null;
    loading: boolean;
}

type Tab = 'final' | 'code' | 'plan' | 'copy';

const EditorArea: React.FC<EditorAreaProps> = ({ result, loading }) => {
    const [activeTab, setActiveTab] = useState<Tab>('final');

    if (loading) {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#858585', backgroundColor: '#1e1e1e' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ marginBottom: '1rem', borderTopColor: '#007acc' }}></div>
                    <div style={{ fontSize: '0.9rem' }}>Building...</div>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e1e1e' }}>
                <div style={{ textAlign: 'center', opacity: 0.1 }}>
                    {/* Cube Logo Placeholder */}
                    <Box size={120} strokeWidth={1} color="#fff" />
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#fff', letterSpacing: '2px', marginBottom: '3rem' }}>VIBE</div>
                </div>

                {/* Shortcuts List matching reference */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '300px', margin: '0 auto' }}>
                    {[
                        { label: 'New Agent', keys: ['Ctrl', 'Shift', 'I'] },
                        { label: 'Hide Terminal', keys: ['Ctrl', 'J'] },
                        { label: 'Hide Files', keys: ['Ctrl', 'B'] },
                        { label: 'Search Files', keys: ['Ctrl', 'P'] },
                        { label: 'Open Browser', keys: ['Ctrl', 'Shift', 'B'] },
                        { label: 'Maximize Chat', keys: ['Ctrl', 'Alt', 'E'] },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', fontSize: '0.9rem' }}>
                            <span>{item.label}</span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {item.keys.map((key, i) => (
                                    <React.Fragment key={key}>
                                        <span style={{ backgroundColor: '#2b2b2b', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', color: '#ccc' }}>{key}</span>
                                        {i < item.keys.length - 1 && <span style={{ color: '#444' }}>+</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', backgroundColor: '#252526', height: '35px', alignItems: 'center' }}>
                {[
                    { id: 'final', label: 'Preview' },
                    { id: 'code', label: 'Source Code' },
                    { id: 'plan', label: 'Implementation Plan.md' },
                    { id: 'copy', label: 'Copywriting.txt' }
                ].map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        style={{
                            padding: '0 15px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            backgroundColor: activeTab === tab.id ? '#1e1e1e' : 'transparent',
                            color: activeTab === tab.id ? '#fff' : '#969696',
                            borderTop: activeTab === tab.id ? '2px solid #007acc' : '2px solid transparent',
                            borderRight: '1px solid #252526' // blended border
                        }}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                {activeTab === 'final' && (
                    <CodePreview code={result.final_code} summary={result.summary} improvements={result.improvements} />
                )}

                {activeTab === 'code' && (
                    <pre style={{ margin: 0, padding: '1rem', overflow: 'auto', fontSize: '0.9rem', fontFamily: 'Consolas, monospace', color: '#d4d4d4' }}>
                        {result.code}
                    </pre>
                )}

                {activeTab === 'plan' && (
                    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontSize: '0.9rem', lineHeight: '1.6', color: '#d4d4d4' }}>
                        <h3 style={{ color: '#569cd6' }}>Planner Output</h3>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result.plan}</pre>
                    </div>
                )}

                {activeTab === 'copy' && (
                    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontSize: '0.9rem', lineHeight: '1.6', color: '#d4d4d4' }}>
                        <h3 style={{ color: '#ce9178' }}>Copywriter Output</h3>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result.copywriting}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorArea;
