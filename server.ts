import {Request, Response} from "express";

const fs = require('fs')
const path = require('path')
const express = require('express')
import routes from "./src/server/routes/api";

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD


  const app = express();


async function createServer(
    root = __dirname,
    isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p:string) => path.resolve(__dirname, p)


  const requestHandler = express.static(resolve('assets'));
  app.use(requestHandler)
  app.use('/assets', requestHandler)
  app.use("/", routes);



  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite:any;
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
        require('serve-static')(resolve('dist/client'), {
          index: false
        })
    )
  }

 app.use("*", async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl;
	  let serveApiOnly = process.env.NODE_ENGINE === 'api'

      let render;
	  // if server only or not
      let template = fs.readFileSync(resolve(`${serveApiOnly ? 'views/api.ejs' : 'index.html'}`), "utf-8");
	  
      if (!isProd && process.env.NODE_ENV) {
        // always read fresh template in dev
        template = await vite.transformIndexHtml(url, template);
		
		// if server only, we don't load the react stuff
        render = (await vite.ssrLoadModule(resolve(`./src/client/entry-${serveApiOnly ? 'empty' : 'server'}.tsx`))).render;
      } else {
        render = require(resolve("./server/entry-server.js")).render;
      }

      const context = {};
	  // dont serve react content but just a piece of html if on Api only
      const appHtml = serveApiOnly ? '<div style="margin: 10% auto;width: 40%;font-size: 30px;">Welcome to our api</div>' : render(url, context);

      const html = template.replace(`<!--app-html-->`, appHtml);
		
		res.status(200).set({ "Content-Type": 'text/html' }).end(html);
			
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}


const checkPort = (port: number, app: Application) =>
  new Promise(resolve => {
    app
      .listen(port, "0.0.0.0", () => {
        console.log(`Start listening application at http://localhost:${port}`);
      })
      .on("error", () => {
        console.log(`App already running at http://localhost:${port}`);
        resolve(false);
      });
  });



/* create a server and verify if port is already use : 
	catch error  EADDRINUSE and can let the app working instead
*/
createServer().then(({ app: Application }) => {
  const port = process.env.PORT ? Number(process.env.PORT) : 7456;
  checkPort(Number(port), app);
});


export default app;