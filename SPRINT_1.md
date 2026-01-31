# Sprint 1: Frontend Setup & Architektura - Promptly Photo

## 📋 Cele Sprintu

- [ ] Inicjalizacja projektu React + Vite
- [ ] Konfiguracja TailwindCSS + Shadcn/ui
- [ ] Struktura folderów i architektura
- [ ] Setup state managementu (Zustand)
- [ ] Komponenty podstawowe (layout, chat input)
- [ ] Mock API dla testowania UI (Photography-focused)

---

## 🎯 Zadania Szczegółowe

### Task 1.1: Inicjalizacja Projektu (0.5h)

```bash
npm create vite@latest promptly-photo -- --template react-ts
cd promptly-photo
npm install
npm run dev
```

**Oczekiwany rezultat**: Działający dev server na `localhost:5173`

**Czek list**:

- [ ] Projekt utworzony
- [ ] npm install wykonany
- [ ] Dev server uruchomiony
- [ ] Aplikacja wyświetla się w przeglądarce

---

### Task 1.2: Instalacja Zależności (0.5h)

#### Pakiety npm

```bash
npm install zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Shadcn/ui

```bash
npm install -D @shadcn/ui
npx shadcn-ui@latest init
```

Przy konfiguracji shadcn wybierz:

- Style: `Default`
- Base color: `Slate`
- CSS variables: `Yes`

#### Zainstaluj konkretne komponenty

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add card
npx shadcn-ui@latest add scroll-area
```

**Oczekiwany rezultat**: Wszystkie zależności zainstalowane i gotowe do użycia

**Czek list**:

- [ ] Zustand zainstalowany
- [ ] TailwindCSS skonfigurowany (tailwind.config.js istnieje)
- [ ] Shadcn/ui zainstalowany
- [ ] Komponenty UI dostępne w `src/components/ui/`

---

### Task 1.3: Struktura Folderów (0.5h)

Utwórz następującą strukturę:

```
src/
├── components/
│   ├── ChatWindow.tsx
│   ├── ChatInput.tsx
│   ├── MessageList.tsx
│   ├── Message.tsx
│   └── ui/
│       └── (komponenty shadcn/ui - auto-generated)
├── store/
│   └── chatStore.ts
├── types/
│   └── chat.ts
├── services/
│   └── chatService.ts
├── App.tsx
├── App.css
└── main.tsx
```

**Oczekiwany rezultat**: Wszystkie foldery i puste pliki

**Czek list**:

- [ ] Folder `components/` istnieje z 4 plikami
- [ ] Folder `store/` istnieje
- [ ] Folder `types/` istnieje
- [ ] Folder `services/` istnieje

---

### Task 1.4: TypeScript Types (1h)

**Plik**: `src/types/chat.ts`

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
  addMessage: (role: "user" | "assistant", content: string) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface ChatResponse {
  id: string;
  message: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  previousResponseId?: string;
}
```

**Oczekiwany rezultat**: Plik z kompletnym typowaniem

**Czek list**:

- [ ] Message interface zdefiniowany
- [ ] ChatState interface zdefiniowany
- [ ] ChatResponse interface zdefiniowany
- [ ] ChatRequest interface zdefiniowany
- [ ] Brak błędów TypeScript

---

### Task 1.5: Zustand Store (1h)

**Plik**: `src/store/chatStore.ts`

```typescript
import { create } from "zustand";
import { ChatState, Message } from "../types/chat";

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          role,
          content,
          timestamp: new Date(),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}));
```

**Oczekiwany rezultat**: Działający store do zarządzania stanem czatu

**Czek list**:

- [ ] Store importuje się bez błędów
- [ ] Wszystkie metody są dostępne
- [ ] State ma prawidłowe typy

---

### Task 1.6: Chat Service (Mock API) (1.5h)

**Plik**: `src/services/chatService.ts`

```typescript
import { ChatRequest, ChatResponse } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const chatService = {
  /**
   * Wysyła wiadomość do rzeczywistego backendu
   * Używa Fetch API (MVP)
   * TODO: Zamienić na Axios w Sprint 2+
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw new Error("Nie udało się wysłać wiadomości do serwera");
    }
  },

  /**
   * Mock API - używany do testowania bez backendu
   * Symuluje opóźnienie jak prawdziwy serwer
   * Zwraca Photography-focused odpowiedzi
   */
  async sendMessageMock(userMessage: string): Promise<ChatResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponses = [
          "Do fotografii nocnej rekomenduje: zwiększ ISO do 3200-6400, otwórz przysłonę na f/2.8 lub szerzej, użyj tripodu. Unikaj autofocusa - przełącz na manual focus.",
          "Dla kompozycji portretów: stosuj regułę trzeciego, ustaw ostrość na oczy. Preferuję aperturę f/1.8-f/2.8 dla naturalnej głębi. Testuj różne kąty.",
          "Sprzęt: do krajobrazów rekomenduje obiektyw 16-35mm. Dla portretów - 85mm f/1.8. Zawsze miej filtr ND do filmowania w słoneczne dni.",
          "Obróbka: w Lightroomie zacznij od balansu bieli, zwiększ kontrast, popracuj nad szczegółami. Unikaj przesadnej nasycenia - naturalne kolory wyglądają najlepiej.",
          "Fotografia krajobrazowa: wstawaj wcześnie na golden hour (30 min po wschodzie). Używaj tripodu dla ostrości. Композиция: niebo 1/3, ziemia 2/3.",
        ];

        const randomIndex = Math.floor(Math.random() * mockResponses.length);

        resolve({
          id: `mock-${Date.now()}`,
          message: mockResponses[randomIndex],
          timestamp: new Date().toISOString(),
        });
      }, 800); // Symuluj opóźnienie sieci
    });
  },
};
```

**Oczekiwany rezultat**: Service działający z realnym i mock endpointem

**Czek list**:

- [ ] sendMessage() wysyła żądanie do backendu (będzie dostępne w Sprint 2)
- [ ] sendMessageMock() zwraca mock odpowiedź
- [ ] Obie metody obsługują błędy
- [ ] Typy są prawidłowe

---

### Task 1.7: Komponenty React (2.5h)

#### Task 1.7.1: Message Component

**Plik**: `src/components/Message.tsx`

```typescript
import { Message as IMessage } from '../types/chat';

interface MessageProps extends IMessage {}

export const Message = ({ role, content, timestamp }: MessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {timestamp.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};
```

**Oczekiwany rezultat**: Komponenta wyświetlająca pojedynczą wiadomość

**Czek list**:

- [ ] Wiadomości użytkownika są niebieskie po prawej
- [ ] Wiadomości AI są szare po lewej
- [ ] Timestamp wyświetla się w dolnym rogu
- [ ] Brak błędów TypeScript

---

#### Task 1.7.2: MessageList Component

**Plik**: `src/components/MessageList.tsx`

```typescript
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from './Message';
import { useChatStore } from '../store/chatStore';

export const MessageList = () => {
  const messages = useChatStore((state) => state.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll do dołu gdy pojawiają się nowe wiadomości
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollRef} className="flex-1 p-4 bg-white">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Brak wiadomości</p>
            <p className="text-sm">Rozpocznij rozmowę, aby zacząć 👋</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <Message key={msg.id} {...msg} />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};
```

**Oczekiwany rezultat**: Lista wiadomości z auto-scroll

**Czek list**:

- [ ] Wiadomości wyświetlają się w kolejności
- [ ] Auto-scroll do dołu działa
- [ ] Empty state wyświetla się gdy brak wiadomości
- [ ] ScrollArea z shadcn/ui działa poprawnie

---

#### Task 1.7.3: ChatInput Component

**Plik**: `src/components/ChatInput.tsx`

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chatService';

export const ChatInput = () => {
  const [input, setInput] = useState('');
  const { addMessage, setLoading, setError, isLoading } = useChatStore();

  const handleSend = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    // Dodaj wiadomość użytkownika
    addMessage('user', trimmedInput);
    setLoading(true);
    setError(null);
    setInput('');

    try {
      // Użyj mock API do testowania bez backendu
      const response = await chatService.sendMessageMock(trimmedInput);
      addMessage('assistant', response.message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Nieznany błąd';
      setError(errorMessage);
      console.error('Chat Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Shift+Enter pozwala na nową linię
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Zapytaj o fotografię... (Shift+Enter = nowa linia)"
          disabled={isLoading}
          className="resize-none"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="h-auto"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Wysyłam...
            </>
          ) : (
            'Wyślij'
          )}
        </Button>
      </div>
    </div>
  );
};
```

**Oczekiwany rezultat**: Input do wysyłania wiadomości

**Czek list**:

- [ ] Enter wysyła wiadomość
- [ ] Shift+Enter robi nową linię
- [ ] Button jest disabled podczas wysyłania
- [ ] Loading indicator wyświetla się
- [ ] Disabled gdy input jest pusty

---

#### Task 1.7.4: ChatWindow Component

**Plik**: `src/components/ChatWindow.tsx`

```typescript
import { Card } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatStore } from '../store/chatStore';

export const ChatWindow = () => {
  const error = useChatStore((state) => state.error);

  return (
    <Card className="flex flex-col h-screen max-h-screen border-0 rounded-none shadow-none bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">📸 Promptly Photo</h1>
        <p className="text-sm opacity-90">AI Expert w Fotografii</p>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 p-4">
          <p className="text-red-700 text-sm">❌ Błąd: {error}</p>
        </div>
      )}

      {/* Input */}
      <ChatInput />
    </Card>
  );
};
```

**Oczekiwany rezultat**: Główny kontener czatu

**Czek list**:

- [ ] Header wyświetla się
- [ ] MessageList się renderuje
- [ ] ChatInput się renderuje
- [ ] Error message wyświetla się gdy jest błąd
- [ ] Layout zajmuje całą wysokość ekranu

---

### Task 1.8: App Component & Styling (1h)

#### App Component

**Plik**: `src/App.tsx`

```typescript
import './App.css';
import { ChatWindow } from './components/ChatWindow';

function App() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <ChatWindow />
    </div>
  );
}

export default App;
```

**Oczekiwany rezultat**: Główny App komponenty

**Czek list**:

- [ ] ChatWindow się renderuje
- [ ] Cała strona zajmuje 100% wysokości

---

#### Globalne Style

**Plik**: `src/App.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Oczekiwany rezultat**: Globalne style

**Czek list**:

- [ ] TailwindCSS działa
- [ ] Shadcn/ui komponenty mają prawidłowe style

---

### Task 1.9: Main & Index HTML (0.5h)

#### Index HTML

**Plik**: `index.html`

```html
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Promptly Photo - AI Photography Assistant</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### Main

**Plik**: `src/main.tsx`

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Oczekiwany rezultat**: Aplikacja renderuje się w DOM

**Czek list**:

- [ ] Root element istnieje w HTML
- [ ] React inicjalizuje się prawidłowo

---

### Task 1.10: Environment Variables (0.5h)

#### Development

**Plik**: `.env.local`

```env
VITE_API_URL=http://localhost:3001
```

#### Production

**Plik**: `.env.production`

```env
VITE_API_URL=https://your-backend-on-render.com
```

#### Example

**Plik**: `.env.example`

```env
# Backend URL - gdzie wysyłamy żądania
VITE_API_URL=http://localhost:3001
```

**Oczekiwany rezultat**: Konfiguracja environment variables

**Czek list**:

- [ ] `.env.local` istnieje i nie jest commitowany
- [ ] `.gitignore` zawiera `.env.local`
- [ ] `.env.example` ma instrukcje

---

### Task 1.11: Testing & Debug (1h)

#### Testy Funkcjonalne

**Do sprawdzenia**:

- [ ] Aplikacja uruchamia się bez błędów na `localhost:5173`
- [ ] Możesz wpisać wiadomość w input
- [ ] Po wciśnięciu Enter (lub kliknięciu guzika) wiadomość się wysyła
- [ ] Mock API zwraca odpowiedź po ~0.8s
- [ ] Wiadomość AI pojawiła się w czacie
- [ ] Auto-scroll przewija do ostatniej wiadomości
- [ ] Loading state pokazuje się podczas wysyłania
- [ ] Shift+Enter robi nową linię w textarea

#### Testy Responsywności

- [ ] Na telefonie (375px): UI się prawidłowo skaluje
- [ ] Na tablecie (768px): Chat jest czytelny
- [ ] Na desktopie (1920px): Chat wygląda dobrze

#### Debug Console

```bash
npm run dev
# Otwórz DevTools (F12)
# Przejdź na zakładkę Console
# Nie powinno być błędów
```

**Oczekiwany rezultat**: Aplikacja działa bez błędów

**Czek list**:

- [ ] Brak błędów w console
- [ ] Brak warnings w console
- [ ] Wszystkie funkcje działają
- [ ] UI wygląda profesjonalnie

---

### Task 1.12: Git & Dokumentacja (0.5h)

#### Git Setup

```bash
git init
git add .
git commit -m "Sprint 1: Frontend setup z React + Vite + TailwindCSS"
git remote add origin https://github.com/YOUR_USERNAME/promptly.git
git branch -M main
git push -u origin main
```

#### .gitignore

```
# Dependencies
node_modules
.pnpm-lock.yaml
yarn.lock
package-lock.json

# Environment
.env.local
.env.*.local

# Build
dist
build

# IDE
.vscode
.idea
*.swp
*.swo
.DS_Store

# Vite
.vite
```

**Oczekiwany rezultat**: Projekt na GitHubie

**Czek list**:

- [ ] Repo utworzony na GitHubie
- [ ] Kod zacommitowany
- [ ] .gitignore prawidłowo skonfigurowany

---

## ⏱️ Szacunkowy Czas

| Task               | Czas     | Status |
| ------------------ | -------- | ------ |
| 1.1: Inicjalizacja | 0.5h     | [ ]    |
| 1.2: Zależności    | 0.5h     | [ ]    |
| 1.3: Struktura     | 0.5h     | [ ]    |
| 1.4: Types         | 1h       | [ ]    |
| 1.5: Store         | 1h       | [ ]    |
| 1.6: Service       | 1.5h     | [ ]    |
| 1.7: Komponenty    | 2.5h     | [ ]    |
| 1.8: App & Style   | 1h       | [ ]    |
| 1.9: Main & HTML   | 0.5h     | [ ]    |
| 1.10: Env Vars     | 0.5h     | [ ]    |
| 1.11: Testing      | 1h       | [ ]    |
| 1.12: Git          | 0.5h     | [ ]    |
| **ŁĄCZNIE**        | **~10h** |        |

**Rekomendacja**: 2-3 dni po 4-5 godzin pracy

**Notatka**: Czas zmniejszył się o ~1h dzięki usunięciu Axios. Axios dodamy w Sprint 2+!

---

## ✅ Acceptance Criteria - Sprint Complete

Spint 1 uważa się za skończony, gdy:

- [x] Aplikacja uruchomiona na `localhost:5173`
- [x] React + Vite + TypeScript działają
- [x] TailwindCSS + Shadcn/ui zainstalowane
- [x] Zustand store funkcjonalny
- [x] Mock czat odpowiada na wiadomości
- [x] UI wygląda profesjonalnie (podobnie do ChatGPT)
- [x] Wiadomości wyświetlają się z timestampem
- [x] Enter wysyła wiadomość
- [x] Shift+Enter robi nową linię
- [x] Auto-scroll działa
- [x] Loading indicator wyświetla się
- [x] Error messages wyświetlają się
- [x] Brak błędów w console
- [x] Kod zacommitowany na GitHubie

---

## 🚀 Co Dalej?

Po ukończeniu Sprint 1 → Przejdź do **Sprint 2: Backend Setup**

W Sprint 2 będziemy:

- Tworzyć Express server
- Integrować OpenAI API
- Zamieniać mock API na rzeczywisty endpoint

---

## 📝 Notatki

### Przydatne Polecenia

```bash
# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Typecheck
npm run typecheck

# Dodaj komponent shadcn
npx shadcn-ui@latest add [komponent]
```

### Przydatne Linki

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Shadcn/ui Docs](https://ui.shadcn.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Przyszłość - Sprint 2+

- **Axios**: Zainstalujemy w Sprint 2, gdy będziesz mieć backend
- **System Prompt**: Backend będzie wysyłać system prompt do OpenAI dla każdego requestu (Photography Expert)
- **Custom Hooks**: Możemy tworzyć hooki dla logiki biznesowej
- **React Query / TanStack Query**: Opcjonalnie do zarządzania cache'em API (Sprint 3+)
- [Zustand Docs](https://github.com/pmndrs/zustand)
