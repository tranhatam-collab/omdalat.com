# apps/app

Next.js app shell for the Om Dalat member and operations workspace.

This package now represents the internal `/app` surface inside the same Om Dalat system:

- member dashboard and application status
- handbook and resource access by role
- settings, support, and internal operating tools
- future review, moderation, and member workflow actions

Current host assumptions in this package:

- app entry: `https://omdalat.com/app`
- docs entry: `https://omdalat.com/docs`
- auth and member flows stay on `https://omdalat.com`
- session cookie domain: `.omdalat.com`

Run the root workspace install, then start the app package or open the repo root dev surface while this workspace continues to be wired into the main Om Dalat deployment.
