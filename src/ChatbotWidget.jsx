import React, { useState } from "react";

// ================= STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#242424",
    fontFamily: "Arial, sans-serif"
  },
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#1e40af",
    color: "#fff",
    fontSize: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    zIndex: 1001
  },
  chatWindow: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "340px",
    height: "480px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1002
  },
  header: {
    backgroundColor: "#1e40af",
    color: "#fff",
    padding: "12px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    fontWeight: "bold"
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    color: "#000"
  },
  bot: {
    backgroundColor: "#e0e7ff",
    color: "#000",
    padding: "8px 10px",
    borderRadius: "10px",
    marginBottom: "8px",
    maxWidth: "85%"
  },
  user: {
    backgroundColor: "#fed7aa",
    color: "#000",
    padding: "8px 10px",
    borderRadius: "10px",
    marginBottom: "8px",
    marginLeft: "auto",
    maxWidth: "85%"
  },
  quickReplies: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "8px"
  },
  quickBtn: {
    backgroundColor: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "12px"
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #ddd",
    background: "#ffffff"
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    background: "#ffffff",
    color: "#000"
  },
  sendBtn: {
    backgroundColor: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "0 16px",
    cursor: "pointer"
  },
  bubble: {
  position: "fixed",
  bottom: "95px",
  right: "20px",
  backgroundColor: "#facc15", // yellow
  padding: "10px 14px",
  borderRadius: "20px",
  fontWeight: "bold",
  color: "#000",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  zIndex: 1000
}
};

export default function ChatbotWidget() {
  const initialMessage = [{ from: "bot", text: "Hi! I’m Anita 👋 How can I help you today?" }];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessage);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState("menu");
  const [showBubble, setShowBubble] = useState(true);


  const mainOptions = ["Admission Enquiry", "Fees & Payment", "Timetable", "Marks", "Careers With Us"];

  const resetChat = () => {
    setMessages(initialMessage);
    setStage("menu");
  };

  const addBot = (text) => setMessages((m) => [...m, { from: "bot", text }]);
  const addUser = (text) => setMessages((m) => [...m, { from: "user", text }]);

  const askOtherQueries = () => {
    addBot("Do you have any other queries?");
    setStage("followup");
  };

  const handleOption = (opt) => {
    addUser(opt);

    if (opt === "Admission Enquiry") {
      addBot("Please type the following details: Parent Name, Phone Number, and Class for Admission.");
      setStage("admission");
    }

    if (opt === "Fees & Payment") {
      addBot("Please enter the class for which you want to check the fee structure.");
      setStage("fees");
    }

    if (opt === "Timetable") {
      addBot("You can view the timetable here: https://school-portal.com/timetable");
      askOtherQueries();
    }

    if (opt === "Marks") {
      addBot("Please enter the class.");
      setStage("marks");
    }

    if (opt === "Careers With Us") {
      addBot("Please share your Name and Email ID.");
      setStage("career");
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addUser(input);

    if (stage === "marks") {
      if (input.includes("10") || input.includes("12")) {
        addBot("Results for board classes (10th/12th) will be out in July.");
      } else {
        addBot("You can check marks on the student portal: https://student-portal.com");
      }
      askOtherQueries();
    }

    if (stage === "fees") {
      const cls = input.trim();
      if (["9", "10", "11", "12"].some(c => cls.includes(c))) {
        addBot("Fee structure for classes 9–12 is available here: https://school-portal.com/fees/senior");
      } else {
        addBot("Fee structure for classes up to 8 is available here: https://school-portal.com/fees/junior");
      }
      askOtherQueries();
    }

    if (stage === "career") {
      addBot("Thank you! For detailed career opportunities, please visit: https://school-portal.com/careers");
      askOtherQueries();
    }

    if (stage === "admission") {
      addBot("Thank you for sharing the details 😊 Our admissions team will contact you shortly.");
      askOtherQueries();
    }

    setInput("");
  };

  const handleFollowup = (answer) => {
    addUser(answer);

    if (answer === "Yes") {
      addBot("How else can I help you?");
      setStage("menu");
    } else {
      addBot("Thank you and have a nice day! 😊");
      setTimeout(() => {
        setOpen(false);
        resetChat();
      }, 1200);
    }
  };

  return (
    <div style={styles.page}>
      {showBubble && !open && (
      <div style={styles.bubble}>
    💬 Got a question? Ask Anita!
      </div>
    )}

      <div style={styles.chatButton} 
      onClick={() => 
      {setOpen(!open);
      setShowBubble(false);}}>💬</div>

      {open && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>Ask Anita</div>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} style={m.from === "bot" ? styles.bot : styles.user}>{m.text}</div>
            ))}

            {stage === "menu" && (
              <div style={styles.quickReplies}>
                {mainOptions.map((o) => (
                  <button key={o} style={styles.quickBtn} onClick={() => handleOption(o)}>{o}</button>
                ))}
              </div>
            )}

            {stage === "followup" && (
              <div style={styles.quickReplies}>
                <button style={styles.quickBtn} onClick={() => handleFollowup("Yes")}>Yes</button>
                <button style={styles.quickBtn} onClick={() => handleFollowup("No, I want to exit")}>No, I want to exit</button>
              </div>
            )}
          </div>

          <div style={styles.inputBox}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button style={styles.sendBtn} onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
