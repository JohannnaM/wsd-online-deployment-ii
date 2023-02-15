import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  count: 0,
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/count") {
    data.count++;
    return new Response(await renderFile("count.eta", data), responseDetails);
  }

  return new Response("Hello you!");
};

serve(handleRequest, { port: 7777 });