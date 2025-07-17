// components/PatientChart.js

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function PatientChart({ patients }) {
  if (!patients || patients.length === 0) return null;

  const ageGroups = {
    "20-39": 0,
    "40-59": 0,
    "60+": 0,
  };

  patients.forEach((p) => {
    if (p.age >= 60) ageGroups["60+"]++;
    else if (p.age >= 40) ageGroups["40-59"]++;
    else ageGroups["20-39"]++;
  });

  const data = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "Number of Patients",
        data: Object.values(ageGroups),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Age Distribution</h3>
      <Bar data={data} />
    </div>
  );
}
