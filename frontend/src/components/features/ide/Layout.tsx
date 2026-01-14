import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EditorArea from './EditorArea';
import Terminal from './Terminal';
import ChatPanel from './ChatPanel';
import { GenerationResult } from '../../../types';
import { generateWebsite } from '../../../api/endpoints';

interface LayoutProps {
    onBack: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onBack }) => {
    // State
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeFile, setActiveFile] = useState<string>('App.tsx');

    // Handler for generation
    const handleGenerate = async (prompt: string) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await generateWebsite(prompt);
            setResult(data);
        } catch (err: any) {
            setError(err?.detail || err?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#181818', // Main dark background
            color: '#ccccc7',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
            {/* Left Sidebar (Activity Bar + Explorer) */}
            <Sidebar activeFile={activeFile} onFileSelect={setActiveFile} onBack={onBack} />

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* Editor & Preview */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    <EditorArea result={result} loading={loading} />

                    {/* Right Panel: Chat/Agents */}
                    <div style={{ width: '350px', borderLeft: '1px solid #2b2b2b', display: 'flex', flexDirection: 'column' }}>
                        <ChatPanel onGenerate={handleGenerate} loading={loading} error={error} />
                    </div>
                </div>

                {/* Bottom Panel: Terminal */}
                <div style={{ height: '220px', borderTop: '1px solid #2b2b2b' }}>
                    <Terminal result={result} loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default Layout;
