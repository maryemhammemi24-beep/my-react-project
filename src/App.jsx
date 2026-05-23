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

// Search Component - Controlled component with destructuring
const Search = ({ onSearch, searchTerm }) => {
  console.log('🔵 Search rendered');
  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
      <label htmlFor="search" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        🔍 Search stories:
      </label>
      <input 
        type="text" 
        id="search"
        placeholder="Search by title..."
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d1d5db',
          width: '300px'
        }}
        value={searchTerm}  // Controlled component
        onChange={onSearch}
      />
    </div>
  );
};

// Item Component with destructuring
const Item = ({ story }) => {
  console.log('🟣 Item rendered for:', story.title);
  return (
    <div 
      style={{
        border: '1px solid #e2e8f0',
        padding: '16px',
        margin: '12px 0',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}
    >
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
  );
};

// List Component with destructuring
const List = ({ stories }) => {
  console.log('🟡 List rendered, showing:', stories.length, 'stories');
  return (
    <div>
      {stories.map((story) => (
        <Item key={story.objectID} story={story} />
      ))}
    </div>
  );
};

// App Component
const App = () => {
  console.log('🟢 App rendered');
  
  const stories = [
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
  
  // Initialize state from localStorage
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearch = localStorage.getItem('search');
    console.log('Loading saved search term:', savedSearch);
    return savedSearch || '';
  });
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // useEffect to save to localStorage when searchTerm changes
  useEffect(() => {
    console.log('useEffect: Saving searchTerm to localStorage:', searchTerm);
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]); // Dependency array - runs when searchTerm changes
  
  // Filter stories based on search term
  const filteredStories = stories.filter((story) => {
    const title = story.title.toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search);
  });
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <List stories={filteredStories} />
    </div>
  );
};

export default App;

/*
REFLECTION QUESTIONS (Step 7):
================================

1. What is a controlled component?
   A controlled component is an input whose value is controlled by React state.
   - Value comes from state, not from DOM
   - Changes are handled by React (onChange event)
   - Single source of truth in React
   - Example: <input value={searchTerm} onChange={handleSearch} />

2. What is a side effect in React?
   A side effect is anything that affects something outside the component:
   - Updating localStorage
   - Fetching data from an API
   - Setting up subscriptions
   - Manually changing the DOM
   - Timers (setTimeout, setInterval)
   
   React components should primarily render UI. Side effects go in useEffect.

3. Why do we use useEffect instead of calling code directly?
   - Avoids infinite loops (if we update state in render)
   - Prevents performance issues
   - Separates rendering from side effects
   - Allows us to control WHEN effects run (dependency array)
   - Cleaner code organization
   - React can optimize re-renders better
   - Example: Without useEffect, localStorage would save on every render
*/




