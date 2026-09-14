# CodeType

A client-side coding typing trainer built with Next.js, TypeScript, Tailwind CSS, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

CodeType stores typing settings and the latest 25 completed sessions in browser `localStorage`. Source files are read entirely in the browser and are never uploaded to a server.
