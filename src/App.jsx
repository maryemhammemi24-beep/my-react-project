function App() {
  // STEP 2: Define a variable inside the component
  const studentName = "Mariem"; // Replace with your name
  
  // STEP 6: Create the student object
  const student = {
    name: "Mariem",  // Replace with your name
    age: 25,         // Replace with your age
    track: "Web Development"
  };
  
  // STEP 7: Create the sayHello function
  function sayHello() {
    return `Hello, I'm ${studentName}!`;
  }
  
  return (
    <div>
      <h1>My First React App</h1>
      <p>Welcome to Advanced Web Development, {studentName}!</p>
      <label htmlFor="studentEmail">Student Email:</label>
      <input type="text" id="studentEmail" />
      <h2>Student Details:</h2>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Track: {student.track}</p>
      <p>{sayHello()}</p>
    </div>
  );
}

export default App;