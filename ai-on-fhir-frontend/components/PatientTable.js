// components/PatientTable.js

export default function PatientTable({ patients }) {
  if (!patients || patients.length === 0) {
    return <p>No matching patients found.</p>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Patient Results</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
