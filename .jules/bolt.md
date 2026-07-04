## 2026-07-04 - Native APIs over small libraries
**Learning:** This codebase had imported the `animejs` animation library just to use a simple button scale animation. This highlights a common anti-pattern of pulling in an entire 3rd party dependency for trivial functionality that can be achieved natively.
**Action:** Always favor native APIs (like Web Animations API) or CSS transitions over third-party animation libraries unless the animations are highly complex and genuinely warrant the bundle size overhead.
