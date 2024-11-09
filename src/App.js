import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/students");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("데이터를 가져오는 중 오류 발생:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setName(student.name);
    setAge(student.age);
  };

  const handleUpdate = async () => {
    if (editStudent) {
      try {
        const response = await fetch(`http://localhost:3001/students/${editStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age: parseInt(age, 10) }),
        });

        if (response.ok) {
          setEditStudent(null);
          setName("");
          setAge("");
          fetchStudents(); // 수정 후 목록 새로고침
        } else {
          console.error("수정 중 오류 발생:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("수정 중 오류 발생:", error);
      }
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchStudents(); // 삭제 후 목록 새로고침
      } else {
        console.error("삭제 중 오류 발생:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>학생 데이터 관리</h1>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              ID {student.id} - {student.name} ({student.age}세)
              <button onClick={() => handleEditClick(student)}>수정</button>
              <button onClick={() => deleteStudent(student.id)}>삭제</button>
            </li>
          ))}
        </ul>

        {editStudent && (
          <div>
            <h2>학생 데이터 수정</h2>
            <label>이름:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>나이:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={handleUpdate}>저장</button>
            <button onClick={() => setEditStudent(null)}>취소</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
