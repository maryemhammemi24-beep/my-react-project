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

// App Component
const App = () => {
  // Step 1: API endpoint constant
  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
  
  // State for stories from API
  const [stories, setStories] = useState([]);
  
  // Search term state
  const [searchTerm, setSearchTerm] = useState('react');
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Step 8: Remove handler (still works with API data)
  const handleRemoveStory = (objectID) => {
    console.log('Removing story with ID:', objectID);
    const newStories = stories.filter((story) => story.objectID !== objectID);
    setStories(newStories);
  };
  
  // Step 2, 3, 4, 5: Data fetching effect
  useEffect(() => {
    // Step 3: Guard condition - don't fetch if searchTerm is empty
    if (searchTerm.trim() === '') {
      console.log('Search term empty, skipping fetch');
      return;
    }
    
    // Step 2 & 3: Build URL and fetch
    const fetchStories = async () => {
      console.log(`Fetching stories for: ${searchTerm}`);
      
      try {
        // Step 3: Build request URL
        const url = `${API_ENDPOINT}${searchTerm}`;
        console.log('Fetching from URL:', url);
        
        // Step 4: Fetch data
        const response = await fetch(url);
        const data = await response.json();
        
        // Step 4: Extract hits and update state
        console.log('Received stories:', data.hits.length);
        setStories(data.hits);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
    fetchStories();
  }, [searchTerm]); // Runs when searchTerm changes
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
      >
        <strong>🔍 Search Hacker News:</strong>
      </InputWithLabel>
      
      <List stories={stories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;