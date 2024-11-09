import React, { useState, useEffect } from 'react';
import './App.css';

const apiBaseURL = "https://67281923270bd0b9755456e8.mockapi.io/api/v1/users";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [home, setHome] = useState(""); // 거주지 추가

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(apiBaseURL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setName(student.name);
    setAge(student.age);
    setHome(student.home); // 거주지 설정
  };

  const handleUpdate = async () => {
    if (editStudent) {
      try {
        const response = await fetch(`${apiBaseURL}/${editStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            age: parseInt(age, 10),
            home,
          }),
        });

        if (response.ok) {
          fetchStudents();
          setEditStudent(null);
          setName("");
          setAge("");
          setHome("");
        }
      } catch (error) {
        console.error("수정 중 오류 발생:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseURL}/${id}`, { method: "DELETE" });
      if (response.ok) fetchStudents();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  const handleAdd = async () => {
    if (name && age && home) {
      try {
        const response = await fetch(apiBaseURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            age: parseInt(age, 10),
            home,
          }),
        });

        if (response.ok) fetchStudents();
        setName("");
        setAge("");
        setHome("");
      } catch (error) {
        console.error("추가 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>학생 데이터 관리</h1>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              ID {student.id} - {student.name} ({student.age}세) - 거주지: {student.home}
              <button onClick={() => handleEditClick(student)}>수정</button>
              <button onClick={() => handleDelete(student.id)}>삭제</button>
            </li>
          ))}
        </ul>

        <div>
          <h2>학생 데이터 추가</h2>
          <label>이름:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>나이:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <label>거주지:</label>
          <input value={home} onChange={(e) => setHome(e.target.value)} />
          <button onClick={handleAdd}>추가</button>
        </div>

        {editStudent && (
          <div>
            <h2>학생 데이터 수정</h2>
            <label>이름:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>나이:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <label>거주지:</label>
            <input value={home} onChange={(e) => setHome(e.target.value)} />
            <button onClick={handleUpdate}>저장</button>
            <button onClick={() => setEditStudent(null)}>취소</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
