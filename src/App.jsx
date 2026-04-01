import { useState } from 'react';

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

// Search Component
const Search = ({ onSearch }) => {
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
        onChange={onSearch}
      />
    </div>
  );
};

// Item Component
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

// List Component
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
  
  // Step 1: Stories data now inside App (state ownership)
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
  
  // Step 4: State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // Step 5: Handler to update search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Step 8: Filter stories based on search term (case-insensitive)
  const filteredStories = stories.filter((story) => {
    const title = story.title.toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search);
  });
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      <Search onSearch={handleSearch} />
      <List stories={filteredStories} />
    </div>
  );
};

export default App;

/*
REFLECTION QUESTIONS (Step 10):
================================

1. What is the difference between props and state?
   PROPS:
   - Passed from parent to child
   - Read-only (cannot be modified by child)
   - External data
   
   STATE:
   - Managed inside a component
   - Can be updated (using setState)
   - Internal data
   - When state changes, component re-renders

2. Why do we lift state up?
   - To share data between sibling components
   - To have a single source of truth
   - Makes data flow predictable
   - Easier to debug (state changes in one place)
   - In our app: Search and List both need the search term

3. Where should filtering logic live?
   Filtering logic should live in the component that:
   - Owns the data (stories array)
   - Has access to the search term (state)
   - Is responsible for what gets passed to children
   In our app: App component handles filtering
*/