# API_MAP: Frontend Calls vs Backend Routes

**Project:** Office Info Controller  
**Audit Date:** 2026-10-24  
**Audit Purpose:** Comprehensive mapping of client API requests against backend HTTP endpoints to identify missing routes, unused handlers, and payload schema mismatches.

---

## 1. Route Comparison Table

| Category | Required Route (`docs/SPEC.md`) | Method | Client Caller (`app.js` / React) | Backend Handler (`server/`) | Status / Mismatch |
|---|---|---|---|---|---|
| **Health** | `/api/health` | `GET` | *None* | *Missing* | **MISMATCH:** Health probe route missing on server and uncalled by client. |
| **Health** | `/api/time` | `GET` | *None* (client uses `Date.now()`) | *Missing* | **MISMATCH:** Server UTC clock synchronization endpoint missing. |
| **Auth** | `/api/auth/register` | `POST` | `handleRegisterSubmit` (pushes to `AppState.users`) | *Missing* | **MISMATCH:** Client mutates local array; no server route or bcrypt hashing. |
| **Auth** | `/api/auth/login` | `POST` | `handleLoginSubmit` (opens OTP modal directly) | *Missing* | **MISMATCH:** Client does not authenticate credentials; `ROLE_MISMATCH` not returned. |
| **Auth** | `/api/auth/verify-otp` | `POST` | `verifyOtpSubmit` (checks hardcoded `123456`) | *Missing* | **MISMATCH:** Client checks code in browser; no server hashed OTP verification or session cookie. |
| **Auth** | `/api/auth/logout` | `POST` | `handleLogout` (clears client flags) | *Missing* | **MISMATCH:** No server route to invalidate session cookie. |
| **Auth** | `/api/auth/forgot` | `POST` | `handlePasswordRecoverySubmit` (shows alert) | *Missing* | **MISMATCH:** Password recovery email dispatch route missing. |
| **Auth** | `/api/auth/reset` | `POST` | `handlePasswordRecoverySubmit` (shows alert) | *Missing* | **MISMATCH:** Password token validation & bcrypt reset missing. |
| **Auth** | `/api/auth/me` | `GET` | *None* | *Missing* | **MISMATCH:** Session restoration endpoint missing on client startup. |
| **Users** | `/api/users/tree` | `GET` | `getHierarchyForUser` (reads `AppState.users`) | *Missing* | **MISMATCH:** Hierarchy tree computed in client JS rather than authoritative DB. |
| **Users** | `/api/users/lookup?email=` | `GET` | `AppState.users.find` | *Missing* | **MISMATCH:** User autocomplete lookup route missing. |
| **Users** | `/api/users/reports-to-options?role=` | `GET` | `AppState.users.filter` | *Missing* | **MISMATCH:** Registration manager candidate query route missing. |
| **Files** | `/api/files` | `POST` | `handleFileUploadSubmit` (pushes to `AppState.files`)| *Missing* | **MISMATCH:** Upload payload not received via `multer` or encrypted in vault. |
| **Files** | `/api/files/mine` | `GET` | `myFiles = AppState.files.filter` | *Missing* | **MISMATCH:** Author inventory fetched from memory, not database. |
| **Files** | `/api/files/inbox` | `GET` | `receivedFiles = AppState.files.filter` | *Missing* | **MISMATCH:** Recipient inbox fetched from memory, not database. |
| **Files** | `/api/files/:id/versions` | `POST` | `handleReplaceVersionSubmit` (increments integer) | *Missing* | **MISMATCH:** File version replacement endpoint missing. |
| **Files** | `/api/files/:id/transmit` | `POST` | *None* (upload auto-transmits in client) | *Missing* | **MISMATCH:** 5-step Socket.IO transmission stepper route missing. |
| **Files** | `/api/files/:id/kill` | `POST` | `confirmKillSwitch` (sets `f.killed = true`) | *Missing* | **MISMATCH:** Emergency kill-switch route and socket broadcaster missing. |
| **Files** | `/api/files/:id/restore` | `POST` | `restoreFile` (sets `f.killed = false`) | *Missing* | **MISMATCH:** File restoration endpoint missing. |
| **Files** | `/api/files/:id/remind` | `POST` | `sendRecipientReminder` (browser alert) | *Missing* | **MISMATCH:** Reminder notification dispatch endpoint missing. |
| **Files** | `/api/files/:id/extend` | `POST` | `extendAccess` (adds integer to `remainingSeconds`) | *Missing* | **MISMATCH:** Time-bound access extension endpoint missing. |
| **Files** | `/api/files/:id/view-token` | `GET` | *None* (viewer opens file directly from memory) | *Missing* | **MISMATCH:** Short-lived (60s) single-user view token route missing. |
| **Files** | `/api/files/:id/stream?token=`| `GET` | *None* (renders simulated static strings) | *Missing* | **MISMATCH:** Decrypted binary `ArrayBuffer` streaming route missing. |
| **Files** | `/api/files/:id/analytics` | `GET` | `openFileDrawer` (reads local recipient stats) | *Missing* | **MISMATCH:** Detailed recipient telemetry route missing. |
| **Receipts**| `/api/receipts/:fileId/event`| `POST` | `autoAcknowledgeViewer` (toggles local string) | *Missing* | **MISMATCH:** Dwell/scroll progress and read receipt event route missing. |
| **Notifs** | `/api/notifications` | `GET` | `AppState.notifications` (static array) | *Missing* | **MISMATCH:** User notification inbox route missing. |
| **Notifs** | `/api/notifications/:id/read` | `POST` | `dismissNotification` (filters local array) | *Missing* | **MISMATCH:** Notification acknowledgement endpoint missing. |
| **AI** | `/api/ai/health` | `GET` | *None* | *Missing* | **MISMATCH:** AI engine status and probe endpoint missing. |
| **AI** | `/api/ai/scan/:fileId` | `POST` | `runAiScan` (client `setTimeout`) | *Missing* | **MISMATCH:** Document parsing & Claude API tool calling missing. |
| **AI** | `/api/ai/autofix/:fileId` | `POST` | `runAiAutoFix` (client `setTimeout`) | *Missing* | **MISMATCH:** Binary document rewriting (DOCX/XLSX) endpoint missing. |
| **Security**| `/api/security/verify/:fileId`| `POST` | *None* (renders static protocol text) | *Missing* | **MISMATCH:** 12 automated security verification checks missing. |
| **Security**| `/api/security/system` | `GET` | *None* | *Missing* | **MISMATCH:** Global security header and rate limit inspection missing. |
| **Audit** | `/api/audit?fileId=` | `GET` | `AppState.auditLogChain` (local array) | *Missing* | **MISMATCH:** Persistent audit ledger query endpoint missing. |
| **Audit** | `/api/audit/verify-chain` | `GET` | `verifyAuditChain` (loops local array) | *Missing* | **MISMATCH:** Merkle chain verification route missing. |
| **Brand** | `/api/brand` | `GET` | `AppState.masterBrandProfile` (local object) | *Missing* | **MISMATCH:** Master Brand Profile retrieval route missing. |
| **Brand** | `/api/brand` | `PUT` | *None* | *Missing* | **MISMATCH:** Master Brand Profile update route missing. |

---

## 2. Summary of Contract Gaps
1. **Zero Client-to-Server Integration:** Currently, 100% of the 36 required backend endpoints are missing.
2. **Missing Typed API Client:** The client contains no unified API client module (`client/src/api/client.ts`).
3. **Missing Request/Response Validation Schemas:** No Zod schemas exist to enforce strict data contracts between client and server.
4. **Resolution Required in Phase B:** Construct the monorepo architecture with a centralized `/shared` package providing Zod schemas and TypeScript types shared across the React frontend and Express backend.
