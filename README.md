# Promptly Photo - AI Photography Assistant

## 📋 Opis Projektu

Promptly Photo to aplikacja webowa z AI asystentem specjalizującym się w **fotografii**. Asystent udziela porad na temat techniki fotograficznej, kompozycji, wyboru sprzętu, obróbki zdjęć i fotografii specjalistycznej.

Projekt rozwija się iteracyjnie - zaczynamy od MVP z podstawową funkcjonalnością, a następnie stopniowo dodajemy nowe features.

### Fazy Rozwoju

- **Phase 1 (MVP)**: Podstawowy czat z Photography AI Assistant (ten dokument)
- **Phase 2** (przyszłość): Systemy kont użytkowników i autoryzacja
- **Phase 3** (przyszłość): Historia chatów dla portfolio fotografów, eksport rozmów

---

## 🛠️ Stack Technologiczny - Phase 1 (MVP)

### Frontend

- **Framework**: React 18 (Vite)
- **Styling**: TailwindCSS + Shadcn/ui (komponenty UI)
- **State Management**: Zustand (prosty i lekki)
- **HTTP Client**: Fetch API (natywny)
- **Build Tool**: Vite

### Backend (Minimalny - Proxy)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Cel**: Proxy do OpenAI API (ukrywanie klucza API)
- **System Prompt**: Ekspert fotografii (poniżej)
- **Rozmiar**: ~200 linii kodu, 1 endpoint

### Baza Danych

- **Brak** (Phase 1 - bez persystencji danych, bez kont użytkowników)

### External Services

- **OpenAI API** (najnowszy dostępny model)

### DevOps & Deployment

- **Frontend**: Vercel (free tier)
- **Backend**: Render (free tier)
- **Version Control**: Git + GitHub

---

## 📁 Struktura Projektu

```
promptly-photo/
├── frontend/                 # Aplikacja React (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── Message.tsx
│   │   │   └── ui/
│   │   │       └── (komponenty shadcn/ui - auto-generated)
│   │   ├── store/
│   │   │   └── chatStore.ts (Zustand)
│   │   ├── types/
│   │   │   └── chat.ts
│   │   ├── services/
│   │   │   └── chatService.ts (komunikacja z backend proxy)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/                  # Micro-service proxy (~200 linii)
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts (proxy endpoint)
│   │   └── index.ts (Express server)
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 📅 Plan Pracy - Phase 1 (MVP - Zoptymalizowany)

### Sprint 1: Setup Frontend (1-2 dni)

- [ ] Inicjalizacja React + Vite
- [ ] Instalacja TailwindCSS + Shadcn/ui
- [ ] Setup Zustand store
- [ ] Struktura folderów komponentów

### Sprint 2: Backend - Micro-proxy (1 dzień)

- [ ] Express server z 1 endpointem
- [ ] Proxy do OpenAI API (`POST /api/chat`)
- [ ] Obsługa `previous_response_id` w requestzie
- [ ] Error handling
- [ ] Environment variables (.env)

### Sprint 3: Frontend - UI & Integracja (2-3 dni)

- [ ] Komponenty UI (ChatMessage, ChatInput, ChatWindow)
- [ ] Layout aplikacji
- [ ] Zustand store do zarządzania historią
- [ ] Integration z backend proxy (chatService.ts)
- [ ] Obsługa loading i error states

### Sprint 4: Polish & Testowanie (1-2 dni)

- [ ] Responsywny design (mobile-friendly)
- [ ] Edge cases (timeout, error messages)
- [ ] UX improvements (auto-scroll, loading indicators)
- [ ] Local testing (npm run dev)

### Sprint 5: Deployment (1 dzień)

- [ ] Deployment backendu na Render (free tier)
- [ ] Deployment frontendu na Vercel (free tier)
- [ ] Konfiguracja environment variables
- [ ] Testing produkcji

---

## 🚀 Kluczowe Features - MVP

✅ **Podstawowa Funkcjonalność**

- Wysyłanie pytań do Photography AI
- Odbieranie porad fotograficznych
- Historia rozmowy (w ramach sesji)
- UI podobne do ChatGPT (dark mode, responsywne)
- System prompt zapewnia spójne, ekspertowe odpowiedzi

❌ **Poza Scope - Phase 1**

- Konta użytkowników
- Persystencja danych
- Historia chatów
- Tworzenie/zapisywanie rozmów

---

## 📦 Instalacja & Uruchomienie (Dev)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplikacja będzie dostępna na `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4
PORT=3001

SYSTEM_PROMPT=Jesteś ekspertem fotografii: technika, kompozycja, sprzęt, obróbka, fotografia nocna i krajobrazowa. Odpowiadasz konkretnie, z przykładami i praktycznymi wskazówkami. Unikasz ogólników.
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:3001
```

---

## 📝 API Specification - MVP

### Chat Endpoint

```
POST /api/chat

Request Body:
{
  "message": "Jak robić zdjęcia nocne bez tripodu?",
  "previousResponseId": "chatcmpl-1234..." (optional)
}

Response:
{
  "id": "chatcmpl-5678...",
  "message": "Do fotografii nocnej bez tripodu rekomenduje...",
  "timestamp": "2026-01-31T10:00:00Z"
}

Error Response (e.g., 500):
{
  "error": "Failed to connect to OpenAI API"
}
```

---

## 💡 System Prompt - Jak To Działa?

System prompt to "instrukcja" dla modelu AI. Ustawiasz ją raz, a model "zachowuje się" jak zadany ekspert - bez trenowania, bez ML:

```typescript
const SYSTEM_PROMPT = `Jesteś ekspertem fotografii z 15-letnim doświadczeniem. 
Specjalizujesz się w: 
- Technice fotograficznej (ISO, apertura, czas otwarcia)
- Kompozycji (reguła trzeciego, perspektywa, głębia ostrości)
- Wyborze sprzętu (aparaty, obiektywy, akcesoria)
- Obróbce zdjęć (lightroom, photoshop, presets)
- Fotografii nocnej i krajobrazowej

Odpowiadasz konkretnie, z praktycznymi wskazówkami i przykładami.
Unikasz ogólników. Gdy pytacie o problem fotograficzny - sugerujesz rozwiązania.`;
```

**Efekt**: Model zawsze odpowiada jak fotograf 📸

---

## 🎨 Design Inspiration

- ChatGPT UI (prosty, funkcjonalny layout)
- Tematy fotograficzne (dark mode, ciepłe akcenty)
- Responsive design (mobile-first approach)

---

## 📚 Techniczne Notatki

1. **State Management**: Historia czatu będzie przechowywana lokalnie w Zustand. W Phase 1 resetuje się po refresh strony.
2. **HTTP Client**: MVP używa Fetch API. **Axios planowany do Sprint 2+** (dodatkowy learning).
3. **System Prompt**: Konfigurowany w backend `.env` - łatwo zmienić tematykę asystenta (np. na "Fitness Coach" czy "Web Dev Expert")
4. **Error Handling**: Graceful error handling z user-friendly komunikatami.
5. **CORS**: Backend proxy musi mieć poprawnie skonfigurowany CORS dla frontendu.
6. **Bezpieczeństwo**: API key przechowywany po stronie serwera, nigdy nie trafia do frontendu.

---

## 🔄 Next Steps - Sprint 2+

**Sprint 2 (Backend)**:

- Integracja z OpenAI API
- Express proxy server z system prompt

**Sprint 3+ (Ulepszenia & Learning)**:

- Wdrożenie Axios (zamiast Fetch API)
- Persystencja chatów (baza danych - PostgreSQL)
- Systemy autoryzacji (JWT)
- Możliwość tworzenia wielu rozmów
- Historia użytkownika
- Export rozmów (PDF)
- Dalsze specjalizacje (Fitness Coach, Web Dev Expert, itp.)

---

## 📖 Przydatne Zasoby

- [OpenAI API Docs](https://platform.openai.com/docs)
- [React Best Practices](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Zustand State Management](https://github.com/pmndrs/zustand)

---

**Status**: Przygotowanie Phase 1 MVP - Promptly Photo  
**Ostatnia Aktualizacja**: 31.01.2026
