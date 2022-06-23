import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteRestart from 'vite-plugin-restart';
import { ViteEjsPlugin } from "vite-plugin-ejs";

const BASE_HOST = process.env.NODE_HOST || "localhost";
const PROTOCOL = process.env.NODE_PROTOCOL || process.env.NODE_PROTOCOL || "http";
const PORT = process.env.NODE_PORT || process.env.PORT || 3000;

/**
	We use this line to modify index.html with the ecs plugin.
	As we have a problem ( i have ^^' ) to get the i18n go the right way
	when using bad links url. Even if we have an error page, translation will be relative
	and not be accessible, so i use base url to fix it.
*/
const htmlBaseUrl = process.env.NODE_ENV !== 'production' ? `${PROTOCOL}://${BASE_HOST}${PORT ? ':' + PORT : ''}` : 
	'/vite-typescript-ssr-react18-portfolio';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
	    ViteRestart({
			reload: ["public/**/*"],
			restart: ["./server.ts"],
		}),
		ViteEjsPlugin({
			base: htmlBaseUrl,
      })
	],
	  build: {
		minify: false,
	  },
  root: "",
});
