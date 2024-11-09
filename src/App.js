import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const fetchedStudents = [];
      for (let i = 0; i < 10; i++) {
        try {
          const response = await fetch(`http://localhost:3001/${i}`);
          const student = await response.json();
          fetchedStudents.push(student);
        } catch (error) {
          console.error(`학생 데이터 가져오기 오류 (${i}):`, error);
        }
      }
      setStudents(fetchedStudents);
    };
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a hrdf = "http://localhost:3001">AJAX 실습(데이터 관리)</a>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              ID {student.id} - {student.name} ({student.age}세)
            </li>
          ))}
        </ul>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
