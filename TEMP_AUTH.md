# TEMP AUTH

To jest robocza wersja planu do samodzielnego napisania pliku `backend/src/routes/auth.ts`.

## Cel pliku

Masz stworzyć router autentykacji z dwoma endpointami:

- `POST /register`
- `POST /login`

Ten plik ma:

- przyjmować dane z requestu,
- walidować je,
- komunikować się z bazą przez Prismę,
- hashować hasła przez bcrypt,
- generować token JWT,
- zwracać bezpieczną odpowiedź do frontendu.

---

## 1. Setup pliku

Na górze pliku potrzebujesz importów:

- `Router`, `Request`, `Response` z Express
- `bcrypt`
- `jsonwebtoken`
- `prisma` z lokalnego singletona Prismy

Potem:

1. Tworzysz `authRouter` przez `Router()`.
2. Pobierasz `JWT_SECRET` z `process.env`.
3. Definiujesz `BCRYPT_ROUNDS = 10`.

---

## 2. Endpoint POST /register

Tworzysz asynchroniczny handler dla ścieżki `/register`.

Cały handler powinien być w `try/catch`.

### Kolejność działania

1. Z `req.body` pobierasz `email` i `password`.
2. Sprawdzasz, czy oba pola istnieją.
   Jeśli nie, zwracasz `400` i komunikat o brakujących danych.
3. Sprawdzasz długość hasła.
   Jeśli ma mniej niż 8 znaków, zwracasz `400`.
4. Sprawdzasz w bazie przez `prisma.user.findUnique`, czy user z tym emailem już istnieje.
   Jeśli tak, zwracasz `409`.
5. Jeśli email jest wolny, haszujesz hasło przez `bcrypt.hash(password, BCRYPT_ROUNDS)`.
6. Tworzysz użytkownika w bazie przez `prisma.user.create`.
   Do bazy zapisujesz `email` i `passwordHash`.
7. Po utworzeniu usera generujesz JWT przez `jwt.sign(...)`.
   Do payloadu wkładasz:
   - `userId`
   - `email`
8. Ustawiasz czas wygaśnięcia tokenu na `7d`.
9. Zwracasz `201` oraz JSON z:
   - `token`
   - `user: { id, email }`

### Ważna zasada

Nigdy nie zwracasz `passwordHash` w odpowiedzi.

### Obsługa błędów

Jeśli coś wywali się w `try`, w `catch`:

1. logujesz błąd do konsoli,
2. zwracasz `500` z komunikatem typu „Błąd serwera”.

---

## 3. Endpoint POST /login

Tworzysz asynchroniczny handler dla ścieżki `/login`.

Znowu cały handler ma być w `try/catch`.

### Kolejność działania

1. Z `req.body` pobierasz `email` i `password`.
2. Sprawdzasz, czy oba pola istnieją.
   Jeśli nie, zwracasz `400`.
3. Szukasz usera w bazie po emailu przez `prisma.user.findUnique`.
4. Jeśli user nie istnieje albo hasło się nie zgadza, zwracasz `401`.

To ma być jeden wspólny warunek:

- brak usera,
- albo `bcrypt.compare(password, user.passwordHash)` zwróci `false`.

5. Jeśli dane są poprawne, generujesz JWT tak samo jak przy rejestracji.
6. Zwracasz odpowiedź JSON z:
   - `token`
   - `user: { id, email }`

### Ważna zasada bezpieczeństwa

Dla błędnego emaila i błędnego hasła zwracasz ten sam komunikat.

Nie robisz:

- „Użytkownik nie istnieje”
- „Hasło nieprawidłowe”

Robisz jeden wspólny komunikat, np.:

- „Nieprawidłowy email lub hasło.”

Powód: nie chcesz ujawniać, czy dany email istnieje w systemie.

### Obsługa błędów

W `catch`:

1. logujesz błąd,
2. zwracasz `500`.

---

## 4. Finalna struktura logiczna pliku

Plik powinien mieć taki układ:

1. Importy
2. `authRouter`
3. Stałe konfiguracyjne
4. Handler `POST /register`
5. Handler `POST /login`

```
auth.ts
├── importy (4 źródła)
├── stałe (JWT_SECRET, BCRYPT_ROUNDS)
├── POST /register
│ ├── walidacja inputu (400)
│ ├── check unikalności emaila (409)
│ ├── bcrypt.hash()
│ ├── prisma.user.create()
│ ├── jwt.sign()
│ └── response 201 (token + user)
├── POST /login
│ ├── walidacja inputu (400)
│ ├── prisma.user.findUnique()
│ ├── bcrypt.compare() + generic error (401)
│ ├── jwt.sign()
│ └── response 200 (token + user)
```

---

## 5. Mentalny model działania

### Rejestracja

Flow wygląda tak:

1. klient wysyła email i hasło,
2. backend sprawdza dane,
3. backend sprawdza, czy email nie jest zajęty,
4. backend haszuje hasło,
5. backend zapisuje usera,
6. backend wystawia token,
7. frontend dostaje token i dane usera.

### Logowanie

Flow wygląda tak:

1. klient wysyła email i hasło,
2. backend znajduje usera,
3. backend porównuje hasło z hashem,
4. jeśli wszystko się zgadza, wystawia token,
5. frontend dostaje token i dane usera.

---

## 6. Na co uważać podczas pisania

1. Nie zapisuj plaintext hasła do bazy.
2. Nie zwracaj `passwordHash` w response.
3. Nie rozbijaj błędu logowania na dwa różne komunikaty.
4. Pamiętaj o `await` przy:
   - sprawdzaniu usera w bazie,
   - hashowaniu hasła,
   - porównywaniu hasła,
   - tworzeniu usera.
5. Pamiętaj, że JWT wymaga sekretu z env.
6. Oba endpointy powinny być asynchroniczne.
7. Każdy endpoint powinien kończyć się `return res...`, żeby flow był czytelny.

---

## 7. Minimalna checklista po napisaniu

Po napisaniu kodu sprawdź:

1. Czy router jest eksportowany jako `authRouter`.
2. Czy są dokładnie dwa endpointy: `/register` i `/login`.
3. Czy register robi walidację, hash, zapis do bazy i generację JWT.
4. Czy login robi walidację, odczyt z bazy, compare hasła i generację JWT.
5. Czy błędy mają sensowne statusy:
   - `400` dla złych danych,
   - `401` dla błędnego logowania,
   - `409` dla zajętego emaila,
   - `500` dla błędu serwera.

---

## 8. Jak pracować z tym planem offline

Najlepsza kolejność:

1. Napisz sam szkielet pliku i importy.
2. Dodaj sam endpoint register bez implementacji środka.
3. Uzupełnij register krok po kroku.
4. Dopiero potem napisz login.
5. Na końcu przejrzyj status code i komunikaty błędów.

Jeśli utkniesz, nie zgaduj kolejnej linijki na ślepo. Zatrzymaj się i odpowiedz sobie:

- jaki input wchodzi,
- co mam sprawdzić,
- co powinno wyjść,
- w którym miejscu dotykam bazy,
- w którym miejscu tworzę token.
