import { useState, useEffect } from 'react';

// Header Component
const Header = () => {
  return (
    <header style={{ 
      marginBottom: '30px',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#1e293b',
      borderRadius: '8px',
      color: 'white'
    }}>
      <h1 style={{ margin: '0', fontSize: '32px' }}>
        📰 Hacker News Reader
      </h1>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>
        Real-time stories from the Hacker News API
      </p>
    </header>
  );
};

// Reusable InputWithLabel Component
const InputWithLabel = ({ id, children, value, onInputChange, type = "text" }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
      <label htmlFor={id} style={{ marginRight: '10px', fontWeight: 'bold' }}>
        {children}
      </label>
      <input 
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d1d5db',
          width: '300px'
        }}
      />
    </div>
  );
};

// Item Component with Delete Button
const Item = ({ story, onRemoveItem }) => {
  return (
    <div 
      style={{
        border: '1px solid #e2e8f0',
        padding: '16px',
        margin: '12px 0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>
          <a 
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#3b82f6', 
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            {story.title}
          </a>
        </h3>
        <p style={{ margin: '8px 0', color: '#4b5563' }}>
          By: <strong>{story.author}</strong> | 
          ⭐ {story.points} points | 
          💬 {story.num_comments} comments
        </p>
      </div>
      
      <button
        onClick={() => onRemoveItem(story.objectID)}
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          marginLeft: '16px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#dc2626';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ef4444';
        }}
      >
        Delete ✗
      </button>
    </div>
  );
};

// List Component
const List = ({ stories, onRemoveItem }) => {
  if (stories.length === 0) {
    return <p style={{ textAlign: 'center', color: '#6b7280' }}>No stories found. Try searching for something!</p>;
  }
  
  return (
    <div>
      {stories.map((story) => (
        <Item 
          key={story.objectID} 
          story={story} 
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

// App Component with Explicit Submit Button
const App = () => {
  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
  
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react');
  
  // Step 13: Create URL state
  const [url, setUrl] = useState(`${API_ENDPOINT}react`);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsError(false);
  };
  
  // Step 14: Handle submit button click
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      console.log('Submitting search for:', searchTerm);
      setUrl(`${API_ENDPOINT}${searchTerm}`);
    }
  };
  
  const handleRemoveStory = (objectID) => {
    console.log('Removing story with ID:', objectID);
    const newStories = stories.filter((story) => story.objectID !== objectID);
    setStories(newStories);
  };
  
  // Step 15: Use url as dependency instead of searchTerm
  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      setIsError(false);
      console.log(`Fetching stories from URL: ${url}`);
      
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Received stories:', data.hits.length);
        setStories(data.hits);
      } catch (error) {
        console.error('Fetch error:', error);
        setIsError(true);
        setStories([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStories();
  }, [url]); // Only runs when url changes (on submit)
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      
      {/* Step 12 & 14: Form with submit button */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <InputWithLabel
              id="search"
              value={searchTerm}
              onInputChange={handleSearch}
              type="text"
            >
              <strong>🔍 Search Hacker News:</strong>
            </InputWithLabel>
          </div>
          <button
            type="submit"
            disabled={!searchTerm.trim()}
            style={{
              backgroundColor: searchTerm.trim() ? '#3b82f6' : '#9ca3af',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '4px',
              cursor: searchTerm.trim() ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 'bold',
              height: '42px'
            }}
            onMouseEnter={(e) => {
              if (searchTerm.trim()) {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }
            }}
            onMouseLeave={(e) => {
              if (searchTerm.trim()) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }
            }}
          >
            Search
          </button>
        </div>
      </form>
      
      {isError && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
          border: '1px solid #fecaca'
        }}>
          <strong>⚠️ Error:</strong> Failed to fetch stories. Please check your internet connection and try again.
        </div>
      )}
      
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading stories...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <List stories={stories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;