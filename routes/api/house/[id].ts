import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    try {
      const json = JSON.parse(Deno.readTextFileSync(`${Deno.cwd()}/static/${id}/info.json`));
      return new Response(JSON.stringify(json), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response("House not found", { status: 404 });
    }
  },
};