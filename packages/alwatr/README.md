# Alwatr

Alwatr Ecosystem

## Introduction

Alwatr is a comprehensive ecosystem designed to streamline your development process. It includes a variety of tools and libraries to help you build robust applications efficiently.

## Installation

To install the Alwatr package, use the following command:

```sh
yarn add alwatr
```

## Usage

To use Alwatr in your project, import the necessary modules as shown below:

```typescript
import { someFunction } from 'alwatr/nanolib';
import { anotherFunction } from 'alwatr/flux';
```

## v2 Breaking Changes

- **Exports all alwatr ecosystem packages as a single `alwatr` npm package.** This significantly changes how you install and import alwatr packages.

Instead of installing individual packages like `@alwatr/resolve-url`, you now install the `alwatr` package:

```bash
npm install alwatr
```

And import modules like this:

```ts
import { resolveUrl } from 'alwatr/nanolib';
```

This change simplifies dependency management and reduces bundle size for projects using multiple alwatr packages.

### Migration Guide

1. **Uninstall individual `@alwatr/*` packages:**  Use `npm uninstall @alwatr/package-name` for each alwatr package you have installed.
2. **Install the `alwatr` package:** `npm install alwatr`
3. **Update imports:** Change your import statements to use the new format, e.g., `import { resolveUrl } from 'alwatr/nanolib';`

This major release streamlines the alwatr ecosystem and improves the developer experience. Be sure to update your projects accordingly!

## Sponsors

The following companies, organizations, and individuals support Nitrobase ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

### License

This project is licensed under the [AGPL-3.0 License](LICENSE).
