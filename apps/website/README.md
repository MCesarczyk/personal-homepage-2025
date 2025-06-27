# Personal homepage

This is my private portfolio website. It is a Next.js project with TypeScript, Tailwind CSS, and Storybook.

## Project uses:

- Next.js 14.1.0
- Node.js 20.11.1
- Pnpm 8.15.1

## Avilable targets:

- run developmnent server

### `pnpm dev`

Application will be available at [http://localhost:3000](http://localhost:3000)

- build project

### `pnpm build`

- preview built project

### `pnpm start`

- run storybook

### `pnpm storybook`

After running storybook, it will be available at [http://localhost:6006](http://localhost:6006)

Moreover, deployed version of storybook is available in Chromatic service:
https://www.chromatic.com/builds?appId=65d6460d027aed20a437099e

or in Storybook format: https://65d6460d027aed20a437099e-nhxdtyarll.chromatic.com/?path=/docs/atoms-caption--docs

Additionaly, there are some scripts for code formatting and linting.
Linting is done with ESLint and Prettier, and formatting is done with Prettier.
Before commiting, Husky will run linting and formatting scripts.
Test build is also run before commiting.

## Future plans

- adding repositories interactively to list, store data on premise or using serverless function
- dedicated subpages for every project
- add CV available to download in pdf

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
