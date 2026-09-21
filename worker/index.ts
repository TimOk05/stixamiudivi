import landingPage from "../index.html?raw";

interface Env {
  ASSETS: Fetcher;
}

const staticHeaders = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=300",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(landingPage, { headers: staticHeaders });
    }

    // GitHub Pages keeps assets under /public; Sites emits that folder at its
    // web root, so the worker maps the public path to the emitted asset.
    if (url.pathname.startsWith("/public/")) {
      url.pathname = url.pathname.replace(/^\/public/, "");
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  },
};
