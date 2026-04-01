// WEEK 4 LAB: Multiple Components
// ======================================

// Global stories array (remains outside all components)
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

// Step 3: Search Component
function Search() {
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
      />
    </div>
  );
}

// Step 1: List Component
function List() {
  return (
    <div>
      {stories.map(function(story) {
        return (
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
        );
      })}
    </div>
  );
}

// App Component (now much cleaner!)
function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#1e293b', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
        📰 Hacker News Style Stories
      </h1>
      
      <Search />
      <List />
    </div>
  );
}

export default App;

/*
REFLECTION QUESTIONS (Step 4):
================================

What does App do now?
- App is now the main container component
- It organizes the layout and renders the child components (Search and List)
- It's like the "manager" that coordinates everything

What does List do?
- List is responsible ONLY for rendering the stories
- It maps through the stories array and displays each story's details
- It has ONE job: show the list of stories

What does Search do?
- Search handles ONLY the search input UI
- Currently just displays the input field
- Later it will handle filtering logic

Why is this structure cleaner than before?
- Each component has a single responsibility (Single Responsibility Principle)
- Easier to debug (if search has issues, you know where to look)
- Easier to test (can test components individually)
- Easier to read and understand
- Easier to modify (change search UI without touching list rendering)
- More maintainable as the app grows
*/