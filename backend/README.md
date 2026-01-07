## 🔐 Auth module — how it works

This project uses a **clean, scalable authentication architecture** designed to support:

- local auth (email + password)
- refresh tokens with rotation
- multiple devices
- OAuth providers (Google, Apple, etc.)

The auth module is split into **clear responsibility layers**.

---

### 🔄 High-level auth flow

```text
Controller
  ↓
AuthService.authenticate(provider, flow, payload)
  ↓
resolveIdentity(provider, flow)
  ↓
IdentityProvider.validate()
  ↓
SessionService.issueSession()
  ↓
UserService.createRefreshSession()
```

### 🧠 Core concepts

#### AuthProvider

Defines **where identity comes from**.

- `LOCAL`
- `GOOGLE` (future)
- `APPLE` (future)

Answers: **“Who are you?”**

---

#### AuthFlow

Defines **what the user is doing**.

- `LOGIN`
- `REGISTER`

Answers: **“What action is happening?”**

---

#### IdentityProvider

Provider-specific identity resolution.

Responsibilities:

- validate credentials **or** create a user
- return a `User` entity

Does **not**:

- issue tokens
- work with cookies
- access refresh sessions

Examples:

- `LocalAuthProvider`
- `RegisterAuthProvider`
- `GoogleAuthProvider` (future)

---

### 🧩 AuthService — orchestration layer

Single entry point for all auth operations.

Responsibilities:

- resolve identity (`AuthProvider + AuthFlow`)
- issue access & refresh tokens
- persist refresh sessions
- handle refresh & logout flows

Does **not**:

- hash passwords
- sign JWTs directly
- access the database directly

---

### 🔑 SessionService — tokens & cookies

Stateless session mechanics only.

Responsibilities:

- sign JWT access tokens
- sign JWT refresh tokens
- hash refresh tokens
- set / clear httpOnly cookies

Does **not**:

- store sessions
- read from DB
- decide expiration policies

---

### 🗄 UserService — persistence layer

Owns all auth-related database state.

Responsibilities:

- create users
- manage auth accounts
- store refresh sessions
- revoke refresh sessions
- support multi-device logout

Does **not**:

- issue JWTs
- access cookies
- know about HTTP

---

### 🔁 Refresh token flow (rotation)

```text
Client → POST /auth/refresh
  ↓
Read refreshToken from httpOnly cookie
  ↓
Hash refresh token
  ↓
Find active refresh session in DB
  ↓
Revoke old refresh session
  ↓
Issue new access + refresh tokens
  ↓
Store new refresh session
```

### 🔁 Logout flow

```text
Client → POST /auth/logout
  ↓
Read refreshToken from cookie
  ↓
Hash token
  ↓
Revoke refresh session
  ↓
Clear refresh cookie
```
