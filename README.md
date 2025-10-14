# 🤖 Angular AI Chat App

An elegant **AI-powered chat interface** built with **Angular**, featuring smooth animations, dark mode, voice replies, and real-time chat simulation using **MockAPI**.
Perfect for learning how to integrate AI-like behavior into a modern Angular UI.

🔗 **Live Demo:** [https://angular-chat-ai.netlify.app](https://angular-chat-ai.netlify.app)
💻 **GitHub Repository:** [https://github.com/raflymaulana28/angular-ai-chat](https://github.com/raflymaulana28/angular-ai-chat)

---

## ✨ Features

* 🎨 **Modern UI** — Clean chat bubble design with dark & light mode support
* 🌙 **Dark Mode Toggle** — Seamlessly switch between light and dark themes
* 🗣️ **AI Voice Replies** — Uses the **Web Speech API** for text-to-speech
* 💬 **MockAPI Integration** — Simulated real-time AI responses
* ⌨️ **Subtitle Typing Animation** — Realistic "AI typing" effect
* 📜 **Custom Scrollbar** — Smooth and stylish scroll experience
* 🧠 **Modular Architecture** — Easy to maintain and extend

---

## 🧩 Tech Stack

* **Angular 14+**
* **TypeScript**
* **Angular Material**
* **MockAPI** (for fake AI backend)
* **Web Speech API**
* **SCSS** (for modern styling & animations)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/raflymaulana28/angular-ai-chat.git
cd angular-ai-chat
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the App

```bash
ng serve
```

Then open your browser at
👉 **[http://localhost:4200](http://localhost:4200)**

---

## ⚙️ Project Structure

```
src/
 ├─ app/
 │   ├─ features/
 │   │   └─ chat/
 │   │       ├─ chat.component.ts       # Main chat logic
 │   │       ├─ chat.component.html     # Chat UI
 │   │       ├─ chat.component.scss     # Styling and animations
 │   │       └─ chat.service.ts         # Optional local service
 │   └─ core/
 │       ├─ services/
 │       │   ├─ ai.service.ts           # Integrates with MockAPI
 │       │   └─ storage.service.ts      # Saves chat history
 │       └─ theme.service.ts            # Handles dark mode logic
 ├─ assets/
 │   └─ ai-avatar.png
 └─ styles.scss                         # Global styling
```

---

## 🔗 MockAPI Integration

The app uses [MockAPI.io](https://mockapi.io) for simulating AI answers.

Example endpoint:

```
https://68ee8211df2025af7803f236.mockapi.io/api/v1/ai/ask
```

Sample data:

```json
[
  {
    "id": "1",
    "question": "What is Angular?",
    "answer": "Angular is a TypeScript-based framework for building web applications."
  },
  {
    "id": "2",
    "question": "What is TypeScript?",
    "answer": "TypeScript is a superset of JavaScript that adds static typing."
  }
]
```

**Service Example (`ai.service.ts`):**

```typescript
ask(question: string) {
  return this.http.get<any[]>(this.API_URL).pipe(
    map((data) => {
      const found = data.find((item) =>
        item.question.toLowerCase().includes(question.toLowerCase())
      );
      return found
        ? { answer: found.answer }
        : { answer: "I'm not sure, but I can learn more about that!" };
    })
  );
}
```

---

## 🔊 AI Voice Replies

This app uses the **Web Speech API** for text-to-speech responses.

```typescript
speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}
```

✅ Works offline in most browsers
⚠️ Recommended: Chrome or Edge

---

## 💡 Future Enhancements

* 🔁 Real-time streaming AI replies
* 🧠 Integration with OpenAI / Gemini APIs
* 📱 Full PWA support for mobile
* 🌐 Multi-language voice support
* 💾 Backend logging for analytics

---

## 📸 Screenshots

| Light Mode                                 | Dark Mode                                |
| ------------------------------------------ | ---------------------------------------- |
| ![Light Chat](assets/screenshot-light.png) | ![Dark Chat](assets/screenshot-dark.png) |

---

## 👨‍💻 Author

**Rafly Maulana**
Frontend Developer — React | Angular | Next.js | TypeScript
🌍 Bandung, Indonesia

🔗 [LinkedIn](https://www.linkedin.com/in/raflymaulana28) • [GitHub](https://github.com/raflymaulana28) • [Portfolio](https://raflymaulana-site.vercel.app)

---

## 📝 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it for personal or commercial purposes.

---