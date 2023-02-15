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
  let message = 0;

  if (url.pathname === "/visits") {
    data.count++;
    return new Response(await renderFile("count.eta", data), responseDetails);
  } else if (url.pathname === "/meaning") {
      message = "Seeking truths beyond meaning of life, you will find 43.";
  } else {
      message = "Nothing here yet.";
  }

  return new Response(message);
};

serve(handleRequest, { port: 7777 });