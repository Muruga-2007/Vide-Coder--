import React from 'react';
import { Files, Search, Settings, ArrowLeft } from 'lucide-react';

interface SidebarProps {
    activeFile: string;
    onFileSelect: (file: string) => void;
    onBack: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeFile, onFileSelect, onBack }) => {
    return (
        <div style={{ display: 'flex', height: '100%', backgroundColor: '#181818' }}>
            {/* Activity Bar */}
            <div style={{
                width: '48px',
                backgroundColor: '#181818',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '1rem',
                borderRight: '1px solid #2b2b2b',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ borderLeft: '2px solid #fff', paddingLeft: '12px', marginLeft: '-14px' }}>
                        <Files size={24} color="#fff" />
                    </div>
                    <Search size={24} color="#858585" style={{ opacity: 0.8 }} />
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                    <Settings size={24} color="#858585" />
                    <ArrowLeft
                        size={24}
                        color="#858585"
                        style={{ cursor: 'pointer' }}
                        onClick={onBack}
                        title="Back to Home"
                    />
                </div>
            </div>

            {/* Explorer Panel */}
            <div style={{ width: '250px', backgroundColor: '#181818', padding: '0' }}>
                <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '0.8rem 1rem',
                    color: '#bbb',
                    letterSpacing: '0.5px'
                }}>
                    EXPLORER
                </div>

                <div style={{ marginTop: '0' }}>
                    {/* Project Folder Header */}
                    <div style={{
                        padding: '4px 0.5rem',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                    }}>
                        <span style={{ fontSize: '0.7rem' }}>▼</span> VIBE-PROJECT
                    </div>

                    {/* File Tree */}
                    <div style={{ marginLeft: '0px', display: 'flex', flexDirection: 'column' }}>
                        {['src', 'src/components', 'src/utils'].map(folder => (
                            <div key={folder} style={{
                                padding: '3px 0.5rem 3px 1.5rem',
                                fontSize: '0.9rem',
                                color: '#aaa',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <span style={{ fontSize: '0.7rem' }}>▶</span> {folder.split('/').pop()}
                            </div>
                        ))}

                        {['App.tsx', 'main.tsx', 'index.css', 'vite.config.ts'].map(file => (
                            <div
                                key={file}
                                onClick={() => onFileSelect(file)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '4px 0.5rem 4px 2rem',
                                    fontSize: '0.9rem',
                                    color: activeFile === file ? '#fff' : '#969696',
                                    backgroundColor: activeFile === file ? '#37373d' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span style={{ color: file.endsWith('tsx') ? '#4d9bb0' : file.endsWith('ts') ? '#3178c6' : '#dcb67d' }}>
                                    {file.endsWith('css') ? '#' : '<>'}
                                </span>
                                {file}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
