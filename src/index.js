export default {
  async fetch(request, env, ctx) {
    // This worker is a placeholder.
    // The static assets are served automatically by the configuration in wrangler.toml.
    // This fetch handler will only be called for requests that don't match a static asset.
    return new Response('Not Found', { status: 404 });
  },
};
