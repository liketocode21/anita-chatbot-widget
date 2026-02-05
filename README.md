# Anita – School Enquiry Chatbot Widget

A floating chatbot widget designed for school websites to handle common parent and student queries.  
The chatbot appears at the bottom-right of the screen and helps users with admissions, fees, timetable, marks, and career-related queries through a clean and interactive UI.

---

## ✨ Features

- Floating chatbot widget (bottom-right corner)
- Friendly chatbot persona **Anita**
- Clean UI with dark background and blue/orange/yellow theme
- Predefined quick-reply buttons
- Context-aware conversation flow
- Automatic reset on exit

---

## 🧠 Supported Queries

### 1. Admission Enquiry
- Collects:
  - Parent Name
  - Phone Number
  - Class for admission
- Displays confirmation message
- Asks if the user has any other queries

---

### 2. Fees & Payment
- Asks for the class
- Redirects based on class:
  - **Classes 1–8** → Junior fee structure page
  - **Classes 9–12** → Senior fee structure page
- Follow-up: *Any other queries?*

---

### 3. Timetable
- Provides a direct link to the timetable/parent portal
- Follow-up prompt included

---

### 4. Marks
- Asks for the class
- Logic:
  - **10th / 12th** → Results will be out in July
  - **Other classes** → Student portal link
- Follow-up prompt included

---

### 5. Careers With Us
- Asks for:
  - Name
  - Email ID
- Redirects users to the school’s careers page for detailed opportunities
- Follow-up prompt included

---

## 🔁 Conversation Flow

- After **every query**, the chatbot asks:
  > *Do you have any other queries?*
- Options:
  - **Yes** → Displays all main options again
  - **No, I want to exit** →  
    - Displays exit message  
    - Closes chatbot  
    - Resets state  
    - Starts fresh on next open

---

## 🛠️ Tech Stack

- **Frontend:** React (Functional Components + Hooks)
- **Styling:** Inline CSS (JS objects)
- **Backend:** Not required (logic handled on frontend)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

```bash
npm install
npm run dev
```

- The app will start running on http://localhost:3000

