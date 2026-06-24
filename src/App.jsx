import React, { useState, useEffect } from 'react';


const DICTIONARY_DATA = [
  { id: 'rh1', category: 'React Hooks', title: 'Persistent localStorage State Hook', syntax: 'const [state, setState] = useState(() => {\n  const saved = localStorage.getItem("key");\n  return saved ? JSON.parse(saved) : initialValue;\n});', context: 'Safely initializes state directly from browser memory without re-triggering calculation cycles on component re-renders.' },
  { id: 'git1', category: 'Git Operations', title: 'Rebase and Sync Diverged Upstream Branch', syntax: 'git fetch origin\ngit pull origin main --rebase\ngit push origin main', context: 'Forcefully synchronizes your local commit graph directly with the remote tracking repository while keeping history completely linear.' },
  { id: 'js1', category: 'JS Arrays', title: 'Deep Clone Object Matrix via StructuredClone', syntax: 'const deepCopy = structuredClone(originalObject);', context: 'Native JavaScript engine tool to perform absolute deep copy mutations on complex arrays or objects without destroying data references.' },
  { id: 'rh2', category: 'React Hooks', title: 'Background Audio Anchor Component Hook', syntax: 'const audioRef = useRef(new Audio(url));\nuseEffect(() => {\n  audioRef.current.loop = true;\n}, []);', context: 'Locks external assets or background audio playback trackers safely inside component memory maps without triggering visual redraw cycles.' }
];

function App() {
 
  const [snippets, setSnippets] = useState(DICTIONARY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  
  const [quickRef, setQuickRef] = useState(() => {
    const saved = localStorage.getItem('docusearch_quickref');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('docusearch_quickref', JSON.stringify(quickRef));
  }, [quickRef]);

  
  const toggleQuickRef = (snippet) => {
    if (quickRef.some(item => item.id === snippet.id)) {
      setQuickRef(quickRef.filter(item => item.id !== snippet.id));
    } else {
      setQuickRef([...quickRef, snippet]);
    }
  };

  
  const handleCopyCode = (id, syntaxText) => {
    navigator.clipboard.writeText(syntaxText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  
  const filteredSnippets = snippets.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const searchString = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchString) || 
                          item.syntax.toLowerCase().includes(searchString) || 
                          item.context.toLowerCase().includes(searchString);
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1150px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '90vh', borderRadius: '24px', border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
      
      {/* APP TITLE HUD MONITOR */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '25px', marginBottom: '35px', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '26px', fontWeight: '800', color: '#38bdf8', letterSpacing: '-0.5px' }}> DocuSearch Command Deck</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Real-time full-text indexing syntax sandbox and technical code micro-utility registry.</p>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '10px 20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Quick Ref Vault</span>
          <h3 style={{ margin: '0', fontSize: '20px', color: '#38bdf8' }}>{quickRef.length} Saved Keys</h3>
        </div>
      </header>

      {/*  */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        {/* Category Pill Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'React Hooks', 'Git Operations', 'JS Arrays'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: activeCategory === category ? '#38bdf8' : '#1e293b', color: activeCategory === category ? '#090d16' : '#94a3b8', transition: '0.15s' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/*  */}
        <input 
          type="text" 
          placeholder="🔍 Search titles, syntax, or concepts..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', fontSize: '14px', width: '100%', maxWidth: '320px', boxSizing: 'border-box' }}
        />
      </div>

      {/*  */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '35px' }}>
        
        {/* LEFT COLUMN: LIVE SEARCH ENGINE RESULT STREAM */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '16px', margin: '0', color: '#94a3b8', fontWeight: '700', uppercase: 'true' }}>Indexed Database Records ({filteredSnippets.length})</h2>
          
          {filteredSnippets.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed #1e293b', borderRadius: '16px', color: '#64748b', backgroundColor: '#0f172a' }}>
              No syntax documentation signatures located within active search matching parameters.
            </div>
          ) : (
            filteredSnippets.map(snippet => {
              const isPinned = quickRef.some(item => item.id === snippet.id);
              return (
                <div key={snippet.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', uppercase: 'true', backgroundColor: '#1e293b', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px' }}>{snippet.category}</span>
                    <button onClick={() => toggleQuickRef(snippet)} style={{ background: 'none', border: 'none', color: isPinned ? '#38bdf8' : '#64748b', cursor: 'pointer', fontSize: '18px' }}>
                      {isPinned ? '★' : '☆'}
                    </button>
                  </div>
                  
                  <h3 style={{ margin: '0', fontSize: '18px', color: '#f8fafc', fontWeight: '700' }}>{snippet.title}</h3>
                  
                  {/* Code Editor Code Snippet Sandbox Wrapper */}
                  <pre style={{ margin: '0', backgroundColor: '#090d16', padding: '16px', borderRadius: '10px', overflowX: 'auto', border: '1px solid #1e293b', fontFamily: 'monospace', fontSize: '13px', color: '#a7f3d0', lineHeight: '1.5', position: 'relative' }}>
                    <code>{snippet.syntax}</code>
                  </pre>
                  
                  <p style={{ margin: '0', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{snippet.context}</p>
                  
                  <button 
                    onClick={() => handleCopyCode(snippet.id, snippet.syntax)}
                    style={{ alignSelf: 'flex-end', padding: '8px 16px', backgroundColor: copiedId === snippet.id ? '#10b981' : 'transparent', border: copiedId === snippet.id ? '1px solid #10b981' : '1px solid #38bdf8', color: copiedId === snippet.id ? '#090d16' : '#38bdf8', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: '0.15s' }}
                  >
                    {copiedId === snippet.id ? 'Copied Snippet! ✓' : '📋 Copy Production Code'}
                  </button>
                </div>
              );
            })
          )}
        </section>

        {/*  */}
        <section style={{ height: 'fit-content' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '16px', margin: '0 0 20px 0', color: '#f8fafc', fontWeight: '700', uppercase: 'true' }}>📌 Quick Reference Desk</h2>
            
            {quickRef.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5', margin: '0', textAlign: 'center', padding: '20px 0' }}>
                Your index reference deck is empty. Select the star icon on any data configuration card above to populate shortcuts.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quickRef.map(item => (
                  <div key={item.id} style={{ padding: '12px 16px', backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', color: '#f8fafc', fontWeight: '600' }}>{item.title}</h4>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{item.category}</span>
                    </div>
                    <button onClick={() => toggleQuickRef(item)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;