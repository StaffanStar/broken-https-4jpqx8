import { useState } from "react";

export default function ChatbotPrototype() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);

  const documents = {
    "SAM - Utbildningsmaterial": {
      summary:
        "Material för utbildning om systematiskt arbetsmiljöarbete (SAM).",
      keywords: ["utbildning", "kurs", "SAM", "arbetsmiljö"],
    },
    "Checklista för arbetsmiljö vid hemarbete och distansarbete": {
      summary:
        "Checklist för att säkerställa en god arbetsmiljö vid distansarbete.",
      keywords: [
        "hemarbete",
        "distansarbete",
        "remote",
        "arbetsmiljö",
        "checklista",
        "hybridarbete",
      ],
    },
    "Riskhantering och säkerhetskultur": {
      summary:
        "Genomgång av hur organisationer kan bygga en stark säkerhetskultur och hantera risker.",
      keywords: [
        "riskhantering",
        "säkerhetskultur",
        "arbetsmiljö",
        "riskbedömning",
        "säkerhet",
      ],
    },
    "Rutiner för rehabilitering och arbetsanpassning": {
      summary:
        "Riktlinjer för hur rehabilitering och anpassning av arbetsmiljön bör genomföras.",
      keywords: ["rehabilitering", "arbetsanpassning", "sjukfrånvaro", "rehab"],
    },
    "Diskriminerande särbehandling policy.docx": {
      summary:
        "Policy för att förhindra diskriminerande särbehandling och trakasserier på arbetsplatsen.",
      keywords: [
        "diskriminering",
        "särbehandling",
        "trakasserier",
        "inkludering",
        "mångfald",
      ],
    },
    "OSA-handbok.pdf": {
      summary: "Handbok för organisatorisk och social arbetsmiljö (OSA).",
      keywords: [
        "OSA",
        "organisatorisk arbetsmiljö",
        "social arbetsmiljö",
        "psykosocial arbetsmiljö",
      ],
    },
    "SAM - Checklistor": {
      summary: "Checklistor för implementering och uppföljning av SAM.",
      keywords: ["SAM", "arbetsmiljö", "checklista", "uppföljning"],
    },
  };

  const handleQuery = () => {
    const lowerInput = userInput.toLowerCase();
    let matchingDocs = [];

    for (const [docName, docInfo] of Object.entries(documents)) {
      if (
        docName.toLowerCase().includes(lowerInput) ||
        docInfo.summary.toLowerCase().includes(lowerInput) ||
        docInfo.keywords.some((keyword) => lowerInput.includes(keyword))
      ) {
        matchingDocs.push({ name: docName, summary: docInfo.summary });
      }
    }

    if (matchingDocs.length === 0) {
      setResponse({
        summary:
          "Jag kunde inte hitta något relevant just nu. Kan du specificera din fråga ytterligare?",
      });
    } else {
      setResponse({
        summary: "Jag hittade relevanta dokument:",
        files: matchingDocs,
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        AI HR-Rådgivare
      </h2>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ställ en fråga om SAM och arbetsmiljö..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleQuery}
        style={{
          width: "100%",
          padding: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Fråga AI
      </button>
      {response && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            background: "#f9f9f9",
          }}
        >
          <p style={{ fontWeight: "bold" }}>{response.summary}</p>
          {response.files &&
            response.files.map((file, index) => (
              <div key={index} style={{ marginTop: "5px" }}>
                <p style={{ fontWeight: "bold" }}>{file.name}</p>
                <p>{file.summary}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
