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
        The latest tech news from the developer community
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

// STEP 11: Item Component with Delete Button
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
      
      {/* Delete button */}
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

// STEP 9 & 10: List Component receives and passes onRemoveItem
const List = ({ stories, onRemoveItem }) => {
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
  const initialStories = [
    {
      objectID: "1",
      title: "React Hooks Explained: A Comprehensive Guide",
      url: "https://react.dev/learn",
      author: "Jane Smith",
      points: 245,
      num_comments: 67
    },
    {
      objectID: "2",
      title: "Understanding JavaScript Closures",
      url: "https://javascript.info/closure",
      author: "John Doe",
      points: 189,
      num_comments: 43
    },
    {
      objectID: "3",
      title: "CSS Grid vs Flexbox: When to Use Each",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      author: "Maria Garcia",
      points: 312,
      num_comments: 89
    }
  ];
  
  const [stories, setStories] = useState(initialStories);
  
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearch = localStorage.getItem('search');
    return savedSearch || '';
  });
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // STEP 8: Remove handler using filter
  const handleRemoveStory = (objectID) => {
    console.log('Removing story with ID:', objectID);
    const newStories = stories.filter((story) => story.objectID !== objectID);
    setStories(newStories);
  };
  
  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);
  
  const filteredStories = stories.filter((story) => {
    const title = story.title.toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search);
  });
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
      >
        <strong>🔍 Search stories:</strong>
      </InputWithLabel>
      
      {/* STEP 9: Pass remove handler to List */}
      <List stories={filteredStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;