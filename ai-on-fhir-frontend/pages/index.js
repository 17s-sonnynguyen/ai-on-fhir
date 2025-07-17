// pages/index.js

import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PatientTable from "../components/PatientTable";
import PatientChart from "../components/PatientChart";
import ClientOnly from "../components/ClientOnly";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ageFilter, setAgeFilter] = useState("any");
  const [genderFilter, setGenderFilter] = useState("any");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://ai-on-fhir-backend-b7c5.onrender.com/query", { query });
      setResults(response.data);
    } catch (err) {
      console.error("Error querying backend:", err);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  const filteredPatients = results?.results?.filter((patient) => {
    const ageCheck =
      ageFilter === "any" || (patient.age && patient.age > parseInt(ageFilter));
    const genderCheck =
      genderFilter === "any" || patient.gender?.toLowerCase() === genderFilter;
    return ageCheck && genderCheck;
  });

  return (
    <div className="container">
      <h1>{t("title")}</h1>

      <ClientOnly>
        <button onClick={toggleLanguage} style={{ marginBottom: "1rem" }}>
          {i18n.language === "en" ? "Español" : "English"}
        </button>
      </ClientOnly>

      <div>
        <input
          type="text"
          placeholder={t("placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: "0.5rem" }}>
          {t("search")}
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
          {t("age")}:
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="any">{t("any")}</option>
            <option value="40">Over 40</option>
            <option value="50">Over 50</option>
            <option value="60">Over 60</option>
          </select>
        </label>

        <label>
          {t("gender")}:
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="any">{t("any")}</option>
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>
        </label>
      </div>

      {loading && <p>{t("loading")}</p>}

      {results && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{t("extracted")}</h3>
          <p>
            <strong>{t("condition")}:</strong>{" "}
            {results.extracted.condition || "N/A"}
          </p>
          <p>
            <strong>{t("age")}:</strong> {results.extracted.age || "N/A"}
          </p>

          {filteredPatients.length === 0 ? (
            <p style={{ marginTop: "1rem", color: "gray" }}>{t("no_results")}</p>
          ) : (
            <>
              <PatientTable patients={filteredPatients} />
              <PatientChart patients={filteredPatients} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
