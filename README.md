# Portfolio with Vite Typescript React 18 SSR

Forked from [https://github.com/jonluca/vite-typescript-ssr-react](https://github.com/jonluca/vite-typescript-ssr-react)


<p>If you just want the vite ssr implementation without the portfolio, get it here [V.E.R.T boilerplate] (https://github.com/Angra974/vite-ssr-typescript-react-node)</p>

[![Node CI](https://github.com/Angra974/vite-typescript-ssr-react18-portfolio/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Angra974/vite-typescript-ssr-react18-portfolio/actions/workflows/nodejs.yml)

A _blazingly_ modern web development stack.


![video](docs/video.gif)


This template repo tries to achieve the minimum viable example for each of the following:

- [React 18](https://reactjs.org/blog/2020/10/20/react-v17.html)
- [Typescript 4.7.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-3-rc/)
- [Vite with Vite SSR](https://vitejs.dev/guide/ssr.html)
- [Vite-node : vite as a node runtime](https://github.com/vitest-dev/vitest/tree/main/packages/vite-node)
- [GitHub Actions](https://github.com/features/actions)
- [Tailwind CSS](https://tailwindui.com/)
- [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) & [StyleLint](https://stylelint.io)
- [Jest](https://jestjs.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [vite-node](https://github.com/vitest-dev/vitest/tree/main/packages/vite-node)

## Development

```
yarn dev:server or pnpm dev:server
```

That should start the server. It will open to http://localhost:7456.
We are using a little promise to detect if port is already used, so we catch
the error associated and we don't stop the server to run.
If necessary, you can kill the process on the port ID.

If you'd like to just develop the UI, you can use

```bash
yarn dev:client or pnpm dev:client
```

To start the native vite client.

## Building

```
pnpm build
pnpm serve
```

pnpm build will create the assets in `dist` - a `client` and `server` folder.
Serve will run `dist/server.js` with Node,
but feel free to change this to use Docker or some other process manager to suit your deployment needs.

To start the server in production mode,
you can run :
`Javascript NODE_ENV=production node server.js `
directly on the dist folder.

#### pnpm / npm / yarn

We use pnpm to install and run the project but you can use npm or yarn but be sure to change the command in
the package.json file in the scripts part.

### Does the api works?

After serving the application, it will run at port 7456
you can check if api respond with
/api/hello
/api/test
/api/alpha
to try to get a different response from the api.

We have tried to get it simple to let you use the api easily.
For that, check src\client\routes\api.ts and src\client\controllers\index.controllers.ts
but you are free to use your own impletation for your project. It's more beginner friendly to have a way
to get it works without the need to look around.

## Files

`eslintrc.js` - a barebones eslint configuration for 2021, that extends off of the recommended ESLint config and prettier

`.prettierrc.js` - the prettier config

`index.html` - the vite entrypoint, that includes the entry point for the client

`postcss.config.cjs` - CommonJS module that defines the PostCSS config

`server.ts` - The barebones Express server with logic for SSRing Vite pages

`tailwind.config.cjs` - CommonJS module that defines the Tailwind config

`tsconfig.json` - TypeScript configuration

`vite.config.ts` - Vite configuration

`src/client/routes/index.routes.ts` - Your api link. See server.ts for example to add route to server and this file to how to add api route to client.

## CI

We use GitHub actions to build the app. The badge is at the top of the repo. Currently it just confirms that everything builds properly.
