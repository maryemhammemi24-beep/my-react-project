// WEEK 3 LAB: Hacker News Style Stories
// ======================================

// Step 1: Understanding the Data Structure
// Each news story will contain:
// - title: The article title (string)
// - url: Link to the article (string)
// - author: Who posted it (string)
// - objectID: Unique identifier (string or number) -> This will be our React KEY
// - points: Popularity score (number)
// - num_comments: Number of comments (number)

// Step 2: Fake data - stories array defined outside the component
const stories = [
  {
    objectID: "1",
    title: "React Hooks Explained: A Comprehensive Guide",
    url: "https://react.dev/learn",
    author: "Jane Smith",
    points: 345,
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
  },
  {
    objectID: "4",
    title: "Getting Started with React Server Components",
    url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
    author: "Sarah Johnson",
    points: 567,
    num_comments: 123
  }
];

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#1e293b', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
        📰 Hacker News Style Stories
      </h1>
      
      {stories.map(function(story) {
        return (
          <div 
            key={story.objectID}
            style={{
              border: '1px solid #e2e8f0',
              padding: '16px',
              margin: '12px 0',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              >
                {story.title}
              </a>
            </h3>
            <p style={{ margin: '8px 0', color: '#4b5563', fontSize: '14px' }}>
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

export default App;

/*
REFLECTION QUESTIONS (Step 7):
================================

1. Why is map() essential for rendering lists in React?
   map() transforms data arrays into JSX element arrays.
   It's essential because it returns a new array that React can render,
   while forEach() returns undefined and can't be used directly in JSX.
   This functional approach is clean, declarative, and matches React's
   component-based philosophy.

2. Why is objectID the correct key?
   objectID is the perfect key because:
   - It's unique (no two stories share the same ID)
   - It's stable (doesn't change if we reorder items)
   - It's data-driven (comes from the actual data, not the UI)
   Using index as key would cause problems when items are added,
   removed, or sorted, leading to bugs and performance issues.

3. What will change when we replace fake data with the Hacker News API?
   The rendering code (map) will stay EXACTLY the same!
   Changes we'll make:
   - Add useState for stories array
   - Add useEffect to fetch data when component mounts
   - Replace static 'stories' array with fetched data
   - Add loading state
   - Add error handling
   The JSX inside map() won't change at all!
*/
