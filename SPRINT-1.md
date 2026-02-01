# Sprint 1: Setup Frontend - Promptly Photo AI

> 🎯 **Część Phase 1 MVP**: Transformacja terminal chatbota ([example.ts](./example.ts)) w pełnoprawną aplikację webową

**Timeframe**: 1-2 dni (6-8h pracy efektywnej)  
**Cel końcowy**: Działająca aplikacja React z mockowanym czatem (bez integracji z backendem)

---

## 📋 Przegląd Sprintu

Tworzymy **Frontend** aplikacji Photography AI Assistant. Bazujemy na koncepcji z `example.ts` (terminal chatbot z OpenAI), ale w wersji webowej z React.

**Na koniec Sprint 1 powinieneś mieć**:

- ✅ Aplikacja React + Vite działająca na `localhost:5173`
- ✅ TailwindCSS + Shadcn/ui zainstalowane i gotowe
- ✅ Zustand store skonfigurowany (zarządzanie stanem czatu)
- ✅ Komponenty UI (Message, MessageList, ChatInput, ChatWindow) z mockowanymi danymi
- ✅ Setup Vercel dla przyszłego deployu (gotowy do Push)

**Dlaczego mockujemy?**: W Sprint 1 skupiamy się tylko na UI. Backend proxy do OpenAI zrobimy w Sprint 2.

**Projekt portfolio**: Ten sprint pokazuje umiejętności React, TypeScript, state management, UI design

---

## 🎯 Task 1.1: Inicjalizacja Projektu (0.5h)

### Cel

Stworzenie struktury projektu: `promptly-photo-ai/` (główny folder) z podfolderem `frontend/` (React + Vite).

### Kroki

```bash
# 1. Stwórz folder główny projektu
mkdir promptly-photo-ai
cd promptly-photo-ai

# 2. Zainicjuj Git (opcjonalnie, ale zalecane)
git init
echo "node_modules/" > .gitignore

# 3. Stwórz podfolder frontend z React + Vite + TypeScript
npm create vite@latest frontend -- --template react-ts

# 4. Wejdź do folderu frontend
cd frontend

# 5. Zainstaluj zależności
npm install

# 6. Uruchom dev server
npm run dev
```

### Oczekiwana struktura po Task 1.1

```
promptly-photo-ai/              ← Główny folder projektu
├── .git/                       ← Git repository (opcjonalnie)
├── .gitignore
├── frontend/                   ← Aplikacja React (Vite)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── (backend/ dodamy w Sprint 2)
```

### Oczekiwane rezultaty

- [x] Dev server nasłuchuje na `http://localhost:5173`
- [x] Aplikacja wyświetla się w przeglądarce (domyślna strona Vite)
- [x] Terminal pokazuje `✓ Local: http://localhost:5173/`
- [x] Brak błędów TypeScript/ESLint
- [x] Struktura: `promptly-photo-ai/frontend/` ✅
- [x] Gotowa na dodanie `promptly-photo-ai/backend/` w Sprint 2 ✅

---

## 🎯 Task 1.2: Instalacja Zależności - TailwindCSS (0.5h)

### Cel

Skonfigurowanie TailwindCSS dla stylowania (instalacja w `frontend/`).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
# Jeśli jesteś w głównym folderze promptly-photo-ai:
cd frontend

# Zainstaluj TailwindCSS i narzędzia
npm install -D tailwindcss postcss autoprefixer

# Zainicjuj pliki konfiguracyjne
npx tailwindcss init -p
```

### Konfiguracja plików

1. **Edytuj `tailwind.config.js`** (w folderze `frontend/`):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

2. **Edytuj `src/index.css`** (dodaj na początku):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Upewnij się, że `src/main.tsx` importuje `index.css`**:

```tsx
import "./index.css";
```

### Sprawdzenie

- [x] Pliki `tailwind.config.js` i `postcss.config.js` zostały utworzone
- [x] Plik `src/index.css` ma dyrektywy Tailwind:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- [x] `src/main.tsx` importuje `index.css`

### Ćwiczenie testowe

Zmień App.tsx na:

```tsx
export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <h1 className="text-white text-3xl">TailwindCSS Działa! 🎨</h1>
    </div>
  );
}
```

- [x] Po refresh strony tło jest niebieskie, tekst biały i wyśrodkowany

---

## 🎯 Task 1.3: Instalacja Shadcn/ui (0.5h)

### Cel

Zainstalowanie biblioteki komponentów UI Shadcn (w `frontend/`).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
# Zainstaluj shadcn/ui CLI
npm install -D @shadcn/ui

# Zainicjuj konfigurację
npx shadcn-ui@latest init
```

### Podczas konfiguracji

Odpowiadaj na pytania:

- `Which style would you like to use?` → `Default`
- `Which color would you like as the base color?` → `Slate`
- `Would you like to use CSS variables for theming?` → `yes`

### Instalacja podstawowych komponentów

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add card
npx shadcn-ui@latest add scroll-area
```

### Sprawdzenie

- [ ] Folder `src/components/ui/` istnieje z komponentami
- [ ] Każdy komponent ma plik `.tsx`

---

## 🎯 Task 1.4: Struktura Folderów (0.5h)

### Cel

Organizacja projektu zgodnie z planem (w folderze `frontend/src/`).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
# Utwórz strukturę folderów w src/
mkdir -p src/components
mkdir -p src/store
mkdir -p src/types
mkdir -p src/services
```

### Oczekiwane drzewo (po Task 1.4)

```
promptly-photo-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx      (utworzysz w Task 1.10)
│   │   │   ├── ChatInput.tsx       (utworzysz w Task 1.9)
│   │   │   ├── MessageList.tsx     (utworzysz w Task 1.8)
│   │   │   ├── Message.tsx         (utworzysz w Task 1.7)
│   │   │   └── ui/                 (shadcn/ui komponenty)
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── card.tsx
│   │   │       └── scroll-area.tsx
│   │   ├── store/
│   │   │   └── chatStore.ts        (utworzysz w Task 1.6)
│   │   ├── types/
│   │   │   └── chat.ts             (utworzysz w Task 1.5)
│   │   ├── services/
│   │   │   └── chatService.ts      (utworzysz w Task 1.12)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── ...
└── backend/                        (Sprint 2)
```

- [ ] Wszystkie foldery utworzone
- [ ] Pliki `ui/` znajdują się w `components/ui/`

---

## 🎯 Task 1.5: Typy TypeScript (0.5h)

### Cel

Definicja typów dla czatu.

### Plik: `frontend/src/types/chat.ts`

```typescript
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

### Sprawdzenie

- [ ] Plik utworzony bez błędów TypeScript
- [ ] Interfejsy eksportują się prawidłowo

---

## 🎯 Task 1.6: Zustand Store (0.5h)

### Cel

Skonfigurowanie state managementu do zarządzania historią czatu (w `frontend/`).

### Instalacja

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
npm install zustand
```

### Plik: `frontend/src/store/chatStore.ts`

```typescript
import { create } from "zustand";
import { ChatState, Message } from "../types/chat";

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () =>
    set({
      messages: [],
      error: null,
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),
}));
```

### Sprawdzenie

- [ ] Plik utworzony bez błędów
- [ ] Store eksportuje się prawidłowo

---

## 🎯 Task 1.7: Komponenty UI - Message (0.5h)

### Cel

Komponent wyświetlający jedną wiadomość.

### Plik: `frontend/src/components/Message.tsx`

```typescript
import { Message as MessageType } from '../types/chat';
import { Card } from './ui/card';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card
        className={`max-w-xs lg:max-w-md px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-black rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </Card>
    </div>
  );
}
```

### Sprawdzenie

- [ ] Komponent kompiluje się bez błędów
- [ ] Przygotowany do wyświetlania pojedynczych wiadomości

---

## 🎯 Task 1.8: Komponenty UI - MessageList (0.5h)

### Cel

Lista wszystkich wiadomości w czacie.

### Plik: `frontend/src/components/MessageList.tsx`

```typescript
import { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types/chat';
import { Message } from './Message';
import { ScrollArea } from './ui/scroll-area';

interface MessageListProps {
  messages: MessageType[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll na dół gdy pojawiają się nowe wiadomości
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Brak wiadomości. Zacznij rozmowę! 📸</p>
          </div>
        ) : (
          messages.map((msg) => <Message key={msg.id} message={msg} />)
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
```

### Sprawdzenie

- [ ] Komponent kompiluje się
- [ ] Obsługuje pustą listę

---

## 🎯 Task 1.9: Komponenty UI - ChatInput (0.5h)

### Cel

Input do wpisywania wiadomości.

### Plik: `frontend/src/components/ChatInput.tsx`

```typescript
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pytaj o fotografię... (Shift+Enter = nowa linia)"
          disabled={isLoading}
          className="resize-none"
          rows={3}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="self-end"
        >
          {isLoading ? '⏳ Czekam...' : '📤 Wyślij'}
        </Button>
      </div>
    </div>
  );
}
```

### Sprawdzenie

- [ ] Input pozwala pisać
- [ ] Przycisk jest aktywny tylko gdy jest tekst
- [ ] Enter wysyła wiadomość (Shift+Enter = nowa linia)

---

## 🎯 Task 1.10: Komponenty UI - ChatWindow (0.5h)

### Cel

Główny komponent łączący wszystko razem.

### Plik: `frontend/src/components/ChatWindow.tsx`

```typescript
import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { Message as MessageType } from '../types/chat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Card } from './ui/card';

export function ChatWindow() {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();

  const handleSendMessage = async (content: string) => {
    // Dodaj wiadomość użytkownika
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Symulacja API call (mockowanie)
    setLoading(true);
    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `[MOCK] Odpowiedź na: "${content}"`,
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full h-screen flex flex-col bg-white">
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">📸 Promptly Photo - AI Photography Assistant</h1>
        <p className="text-sm opacity-90">Zapytaj o fotografię, kompozycję, sprzęt...</p>
      </div>

      <MessageList messages={messages} />

      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
}
```

### Sprawdzenie

- [ ] Komponent kompiluje się
- [ ] Logika wysyłania mockowanych wiadomości działa

---

## 🎯 Task 1.11: Integracja - App.tsx (0.5h)

### Cel

Połączenie wszystkiego w głównym komponencie.

### Plik: `frontend/src/App.tsx`

```typescript
import { ChatWindow } from './components/ChatWindow';
import './App.css';

function App() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <ChatWindow />
    </div>
  );
}

export default App;
```

### Sprawdzenie

- [ ] Aplikacja uruchamia się na `localhost:5173`
- [ ] Widoczne jest okno czatu z headerem
- [ ] Można wpisywać i "wysyłać" (mockowe) wiadomości
- [ ] Brak błędów w konsoli

---

## 🎯 Task 1.12: Chat Services - Setup (0.5h)

### Cel

Przygotowanie serwisu do komunikacji z backendem (na razie pusty template).

### Plik: `frontend/src/services/chatService.ts`

```typescript
// Placeholder na integrację z backendem w Sprint 2

export interface ChatRequest {
  message: string;
  previousResponseId?: string;
}

export interface ChatResponse {
  id: string;
  message: string;
  timestamp: string;
}

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  // TODO: Sprint 2 - Integracja z backend API
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(request),
  // });
  // return response.json();

  // Mockowanie na razie
  return {
    id: Date.now().toString(),
    message: `[TODO] Rzeczywista odpowiedź z AI`,
    timestamp: new Date().toISOString(),
  };
}
```

### Sprawdzenie

- [ ] Plik utworzony ze szablonami funkcji
- [ ] Przygotowany do rozszerzenia w Sprint 2

---

## 🎯 Task 1.13: Environment Variables (0.25h)

### Cel

Skonfigurowanie zmiennych środowiskowych dla frontend.

### Plik: `frontend/.env.local`

```env
VITE_API_URL=http://localhost:3001
```

### Sprawdzenie

- [ ] Plik `frontend/.env.local` utworzony
- [ ] Nie jest śledzony przez Git (sprawdź `.gitignore`)
- [ ] Dodaj do `frontend/.gitignore` (jeśli nie ma):
  ```
  .env.local
  ```

---

## 🎯 Task 1.14: Testing & Polish (0.5h)

### Cel

Testowanie całego flow'u UI.

### Testy manualne

- [ ] Aplikacja ładuje się bez błędów
- [ ] Input pozwala wpisywać tekst
- [ ] Można wysyłać wiadomości (mockowe)
- [ ] Wiadomości pojawiają się na czacie
- [ ] Auto-scroll działa (nowe wiadomości na dole)
- [ ] Design responsywny (test na mobile w DevTools)
- [ ] Ciemna paleta kolorów jest spójna
- [ ] Brak błędów TypeScript (`npm run build`)

### Polishing

- [ ] Dodaj favicona w `index.html`
- [ ] Zmień title na "Promptly Photo AI"
- [ ] Sprawdź, czy font jest czytelny na mobile

---

## 🎯 Task 1.15: Deployment Setup - Vercel (0.5h)

### Cel

Przygotowanie do deployu na Vercel (nie wdrażamy jeszcze).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

1. Utwórz plik `vercel.json` w folderze `frontend/`:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ]
}
```

2. Upewnij się, że `package.json` ma build script:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

3. Sprawdź build localnie (w folderze `frontend/`):

```bash
npm run build
npm run preview
```

### Sprawdzenie

- [ ] `npm run build` generuje folder `frontend/dist/`
- [ ] `npm run preview` wyświetla skompilowaną aplikację na `http://localhost:4173`
- [ ] Brak błędów w buildie

---

## ✅ Checklist Sprint 1 - Finał

### Weryfikacja struktury projektu

- [ ] Folder główny: `promptly-photo-ai/` ✅
- [ ] Podfolder: `promptly-photo-ai/frontend/` ✅
- [ ] Gotowy na dodanie `promptly-photo-ai/backend/` w Sprint 2 ✅

### Weryfikacja techniczna

- [ ] React + Vite zainstalowany i działa (`http://localhost:5173`)
- [ ] TailwindCSS + Shadcn/ui skonfigurowane (komponenty w `frontend/src/components/ui/`)
- [ ] Zustand store zaimplementowany (`frontend/src/store/chatStore.ts`)
- [ ] Wszystkie komponenty UI (Message, MessageList, ChatInput, ChatWindow) działają
- [ ] ChatWindow wyświetla się bez błędów w konsoli
- [ ] Mockowe wiadomości wysyłają się i pojawiają na czacie
- [ ] TypeScript nie pokazuje błędów (`npm run build` bez errorów w `frontend/`)
- [ ] Build lokalnie się udaje (`npm run build` + `npm run preview` w `frontend/`)
- [ ] Vercel setup przygotowany (`vercel.json` w `frontend/`)
- [ ] Environment variables (`frontend/.env.local` z `VITE_API_URL`)

### Git & Dokumentacja

- [ ] Kod scommitowany do Git: `git commit -m "feat: sprint-1-frontend-setup"`
- [ ] README zaktualizowane z linkami (jeśli potrzebne)
- [ ] Screenshots UI (opcjonalnie - dla portfolio)

### Gotowość do Sprint 2

- [ ] Struktura projektu: `promptly-photo-ai/frontend/` ✅
- [ ] Miejsce na `promptly-photo-ai/backend/` w Sprint 2 ✅
- [ ] `chatService.ts` ma placeholdery do wypełnienia w Sprint 2 ✅

---

## 🚀 Następny Krok: Sprint 2 - Backend Proxy

**Co dalej?**: Po ukończeniu Sprint 1 przejdź do **Sprint 2: Backend Setup** (plik `SPRINT-2.md` do utworzenia)

**Sprint 2 będzie obejmował**:

- Express.js + TypeScript setup
- Endpoint `/api/chat` proxy do OpenAI API
- Implementacja `previous_response_id` (jak w `example.ts`)
- System prompt Photography Assistant
- Deployment backendu na Render

**Timeframe Sprint 2**: 1 dzień (4h pracy efektywnej)

---

## 💡 Notatki dla Początkujących

### Co osiągnąłeś w Sprint 1?

✅ **Frontend Stack**: React 18 + Vite + TypeScript + TailwindCSS + Shadcn/ui  
✅ **State Management**: Zustand (prosta alternatywa dla Redux)  
✅ **Komponenty UI**: Message, MessageList, ChatInput, ChatWindow  
✅ **Mockowanie**: Symulacja API (przygotowanie na Sprint 2)  
✅ **Deployment Ready**: Vercel konfiguracja

### Co robisz dalej?

W **Sprint 2** stworzysz backend, który:

- Ukrywa OpenAI API key (bezpieczeństwo)
- Proxy requests Frontend → OpenAI API
- Zachowuje historię rozmowy (`previous_response_id` jak w `example.ts`)
- Dodaje system prompt (Photography Expert)

W **Sprint 3** połączysz Frontend + Backend i wdrożysz na produkcję! 🚀

### Problemy podczas Sprint 1?

- **TailwindCSS nie działa**: Sprawdź `tailwind.config.js` i `postcss.config.js`
- **Shadcn/ui nie instaluje**: Użyj `npx shadcn-ui@latest init --force`
- **TypeScript errors**: Upewnij się że wszystkie importy są poprawne
- **Brak Hot Reload**: Restartuj `npm run dev`

---

**Sprint Leader**: [Twoje imię]  
**Data rozpoczęcia**: 01.02.2026  
**Data zakończenia**: \***\*\_\_\_\*\***  
**Status**: 🟡 W trakcie / ✅ Ukończony

**Commit message po zakończeniu**:

```bash
git add .
git commit -m "feat: sprint-1-frontend-setup - UI mockup ready"
git push origin main
```

## 🚀 Następny Krok: Sprint 2 - Backend Proxy

**Co dalej?**: Po ukończeniu Sprint 1 przejdź do **Sprint 2: Backend Setup** (plik `SPRINT-2.md` do utworzenia)

**Sprint 2 będzie obejmował**:

- Express.js + TypeScript setup
- Endpoint `/api/chat` proxy do OpenAI API
- Implementacja `previous_response_id` (jak w `example.ts`)
- System prompt Photography Assistant
- Deployment backendu na Render

**Timeframe Sprint 2**: 1 dzień (4h pracy efektywnej)

**Przejdź do**: [README.md](./README.md) → sekcja "📅 Plan Pracy - Phase 1" → Sprint 2

---
