# Atlas Patient Hub — QA Test Suite

Automated test framework for the Atlas Patient Hub built with Playwright + TypeScript.

## Test Plan & Test Cases
Full test plan and test cases documented in the [Wiki](../../wiki).

##  Project Structure
```
tests/
├── auth/           # Login page object
├── appointments/   # Appointments page object
├── billing/        # Billing page object  
├── profile/        # Profile page object
├── fixtures/       # Test credentials
└── utils/          # Shared helpers (auth)
```

##  Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
npx playwright install
```

### Run all tests
```bash
npx playwright test
```

### Run specific module
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/appointments.spec.ts
npx playwright test tests/billing.spec.ts
npx playwright test tests/profile.spec.ts
```

### Run with UI
```bash
npx playwright test --headed
```

### View HTML report
```bash
npx playwright show-report
```

## Test Coverage

| Module | Test Cases | Status |
|---|---|---|
| Authentication | TC-AUTH-001 to 003 |  Passing |
| Appointments | TC-APPT-001 to 004 | Passing |
| Billing & Payments | TC-BILL-001 to 006 |  Passing |
| Profile | TC-PROF-001 to 004 |  Passing |

## 🛠️ Tech Stack
- [Playwright](https://playwright.dev/) — E2E automation framework
- TypeScript — Type-safe test code
- Page Object Model — Maintainable test architecture
- GitHub Actions — CI/CD
- GitHub Wiki — Test plan & test cases documentation
