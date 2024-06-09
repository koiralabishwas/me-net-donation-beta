This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
next run the strip cli ==> catches checkout sesssions status and runs
```bash
stripe listen --forward-to localhost:3000/api/v1/webhooks/checkou-sessions
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



