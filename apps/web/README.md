# apps/web

This is now the public city-layer web app for `omdalat.com`.

It contains:

- homepage structure
- public-facing city signals
- shared datasets rendered for the web surface
- Stage 2 Next runtime scaffold under `apps/web/app/*`
- route shells for the public web map in `docs/REPO_BUILD_ORDER_OMDALAT.md`
- static entrypoint under `apps/web/index.html` for the current root dev flow

The repo dev server maps `/` to this app, and you can also open `/apps/web/` directly.
The same server now keeps public shell routes such as `/places`, `/hosts`, `/trust`, and `/contact` alive through the static surface while the Next runtime is still scaffold-only.

When dependencies are installed later, the runtime scaffold is ready to boot with the local `next` scripts in `apps/web/package.json`.
