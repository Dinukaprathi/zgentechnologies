# ZGenLabs Website

Production website built with Next.js (App Router), Tailwind CSS, and Three.js.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Open http://localhost:3000.

## Production Build

Run a production build:

```bash
pnpm build
```

This project uses a memory-tuned build command:

```bash
cross-env NODE_OPTIONS=--max-old-space-size=4096 next build --webpack
```

## Vercel Deployment

This repository is ready for Vercel deployment.

Included configuration:

- [vercel.json](vercel.json)
	- framework: nextjs
	- installCommand: pnpm install --frozen-lockfile
	- buildCommand: pnpm run vercel-build

- [package.json](package.json)
	- vercel-build script with memory configuration

Deployment steps:

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Keep detected settings (Next.js + pnpm).
4. Deploy.

If your project requires runtime environment variables, add them in Vercel Project Settings under Environment Variables.
