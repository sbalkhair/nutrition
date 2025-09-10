# Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It appears to be a nutrition tracking application.

**Main Technologies:**

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) as the ORM.
*   **Authentication:** [better-auth](https://www.npmjs.com/package/better-auth)
*   **UI:** [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/) components.
*   **Linting:** [ESLint](https://eslint.org/)
*   **Package Manager:** [pnpm](https://pnpm.io/)

**Architecture:**

The project follows the standard Next.js `app` directory structure. It uses server components and server actions. The database schema is defined in `prisma/schema.prisma` and includes models for `User`, `Food`, `Meal`, and `ServingUnit`. Authentication is handled by `better-auth`, and the UI is built with Tailwind CSS and Shadcn UI components.

# Building and Running

**1. Install dependencies:**

```bash
pnpm install
```

**2. Run the development server:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**3. Build for production:**

```bash
pnpm build
```

**4. Run in production:**

```bash
pnpm start
```

**5. Lint the code:**

```bash
pnpm lint
```

# Development Conventions

*   **Coding Style:** The project uses Prettier for code formatting and ESLint for linting.
*   **Testing:** There are no testing frameworks configured in the `package.json` file.
*   **Database:** The database schema is managed with Prisma. To apply changes to the database, you can use the `prisma migrate dev` command.
*   **Authentication:** The project uses `better-auth` for authentication. The authentication logic is located in `lib/auth.ts` and `lib/auth-client.ts`.
*   **UI:** The project uses Shadcn UI components, which are located in the `components/ui` directory.
