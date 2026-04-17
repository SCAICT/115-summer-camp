This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Serelix GitLab CI / Deployment

This repository is configured for the Serelix GitLab platform. The platform owns the CI deploy flow in `.gitlab-ci.yml`; this project provides the app image through `Dockerfile` and declares runnable services in `service.config.yml`.

Current service:

- `frontend`: Next.js standalone server on internal port `3000`, exposed by the platform.

The production container starts with:

```bash
sh /app/bin/start-frontend.sh
```

The script maps the platform-provided `APP_PORT` to Next.js `PORT`, so the app follows the host-managed port assignment.

Future backend services can be added by:

1. adding the backend runtime and files to the same Docker image,
2. adding a backend start script such as `/app/bin/start-backend.sh`,
3. adding a second app service to `service.config.yml`,
4. adding managed sidecars such as `postgres` or `redis` only when needed.
