# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

This example also shows how to use [Workspace Configurations](https://turborepo.com/docs/core-concepts/monorepos/configuring-workspaces).

## Using this template

Run the following command:

```sh
pnpm install
just r
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `@workspace/biome-config`: biome configurations used throughout the monorepo
- `@workspace/jest-presets`: Jest configurations
- `@workspace/logger`: isomorphic logger (a small wrapper around console.log)
- `@workspace/ui`: a empty React UI library with shadcn/ui
- `@workspace/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [biome](https://biomejs.dev/guides/getting-started/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [lefthook](https://lefthook.dev/) for git hooks
- [typos](https://github.com/crate-ci/typos) for spell checking
- [czg](https://github.com/streamich/git-cz) for git commitizen
- [commitlint](https://commitlint.js.org/#/guides-local-setup) for commitlint
- [justfile](https://github.com/casey/just) for task runner
- [git-cliff](https://github.com/orhun/git-cliff) for changelog generation
- [pnpm](https://pnpm.io/) for package management
- [bun](https://bun.sh/) for runtime
- [prisma](https://www.prisma.io/) for database
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [kubectx](https://github.com/ahmetb/kubectx) for kubernetes context switching
