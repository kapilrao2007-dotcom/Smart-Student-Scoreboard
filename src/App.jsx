import { useState } from "react";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 78 },
    { id: 2, name: "Riya", score: 45 },
    { id: 3, name: "Karan", score: 90 },
    { id: 4, name: "Neha", score: 32 },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const addStudent = () => {
    if (!name || score === "") return;
    setStudents([...students, { id: Date.now(), name, score: +score }]);
    setName("");
    setScore("");
  };

  const updateScore = (id, value) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, score: +value } : s
      )
    );
  };

  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg =
    total === 0
      ? 0
      : Math.round(
          students.reduce((a, b) => a + b.score, 0) / total
        );

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <div className="line"></div>
        <p className="sub">ACADEMIC TERMINAL v2.0</p>

        <h1>
          STUDENT <span>SCOREBOARD</span>
        </h1>

        <div className="line"></div>
      </div>

      {/* FORM */}
      <div className="panel">
        <div className="form-header">
          ● REGISTER STUDENT
          <span className="new">NEW ENTRY</span>
        </div>

        <div className="form-row">
          <input
            placeholder="Student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Score (0-100)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <button onClick={addStudent}>+ ADD</button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="box">
          <p>TOTAL</p>
          <h2>{total}</h2>
        </div>

        <div className="box">
          <p>PASSED</p>
          <h2>{passed}</h2>
        </div>

        <div className="box">
          <p>AVG SCORE</p>
          <h2>{avg}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="panel">
        <div className="table-header">
          STUDENT RECORDS
          <span>{students.length} entries</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>SCORE</th>
              <th>STATUS</th>
              <th>UPDATE</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="name">{s.name}</td>

                <td className="score">{s.score}</td>

                <td>
                  {s.score >= 40 ? (
                    <span className="pass">PASS</span>
                  ) : (
                    <span className="fail">FAIL</span>
                  )}
                </td>

                <td>
                  <input
                    defaultValue={s.score}
                    onChange={(e) =>
                      updateScore(s.id, e.target.value)
                    }
                  />
                  <button>SAVE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}