// WEEK 5 LAB: Arrow Functions & Event Handlers
// ======================================

// Global stories array
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

// Header Component - Arrow Function
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

// Search Component with Event Handler
const Search = () => {
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    console.log("Searching for:", searchTerm);
    console.log(`You typed: "${searchTerm}" (${searchTerm.length} characters)`);
  };
  
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
        onChange={handleSearchChange}
      />
    </div>
  );
};

// List Component with Concise Body Arrow Function in map
const List = () => {
  return (
    <div>
      {stories.map((story) => (
        <div 
          key={story.objectID}
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
      ))}
    </div>
  );
};

// App Component - Arrow Function
const App = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      <Search />
      <List />
    </div>
  );
};

export default App;

/*
REFLECTION QUESTIONS (Step 8):
================================

1. When do we use concise body arrow functions?
   Use concise body when the function only returns a single expression/value.
   Examples: simple JSX rendering, mapping arrays, simple calculations.
   Syntax: (param) => expression (no return keyword needed)

2. When do we use block body arrow functions?
   Use block body when the function needs to:
   - Execute multiple statements
   - Include logic (if statements, loops, variable declarations)
   - Handle events
   - Do more than just return a value
   Syntax: (param) => { statements; return value; }

3. What does an event object contain?
   The event object contains:
   - target: the DOM element that triggered the event
   - target.value: the current value of the input
   - type: the type of event (e.g., "change")
   - key: the key pressed (for keyboard events)
   - Many other properties about the event
*/