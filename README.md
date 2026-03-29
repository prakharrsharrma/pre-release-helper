## Quick start

- Clone the repo: `git clone https://github.com/prakharrsharrma/pre-release-helper-ai.git`
- Recommended: `Node.js v20.x`
- **Install:** `npm i` or `yarn install`
- **Start:** `npm run dev` or `yarn dev`
- **Build:** `npm run build` or `yarn build`
- Open browser: `http://localhost:3000`

## Mock API setup

- Copy `.env.example` to `.env`.
- Set `ENABLE_MOCK=true` to start Mock Service Worker before the app renders.
- Keep `ENABLE_MOCK=false` to send requests to the configured backend.

When mocking is enabled, the browser intercepts supported API routes and returns local fixture data instead of calling the backend. The current setup includes a mock for `GET /generate-script` and can be extended from `src/mocks/handlers.ts` as more endpoints are added.
