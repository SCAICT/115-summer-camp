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

## GitLab CI / Deployment

This repository is configured for GitLab CI with a server-capable Next.js deployment path. The app uses Next.js standalone output, so future backend routes, SSR, API routes, or server-side integrations can be deployed without switching away from static hosting later.

Pipeline stages:

- `validate`: installs dependencies with `npm ci` and runs `npm run lint`.
- `build`: runs `npm run build` and stores `.next/` as a short-lived artifact.
- `package`: on the `main` branch, builds a Docker image with Kaniko and pushes it to the GitLab Container Registry as:
  - `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA`
  - `$CI_REGISTRY_IMAGE:latest`

The production container listens on port `3000`.

To run the image after CI publishes it:

```bash
docker run -p 3000:3000 registry.example.com/scaict/115-summer-camp:latest
```

For the GitLab instance at `gitlab.serelix.xyz`, use the image path shown in the project's **Deploy > Container Registry** page.

If a deployment server is added later, configure that server to pull and run the `latest` image after the `docker_image` job finishes.
