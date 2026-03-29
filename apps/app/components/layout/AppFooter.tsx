import { OMDALAT_INBOXES } from "../../../../packages/core";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <p>Fixture-backed app runtime for `app.omdalat.com`.</p>
      <p>
        Support mail: <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.support}`}>{OMDALAT_INBOXES.support}</a> · App mail:{" "}
        <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.app}`}>{OMDALAT_INBOXES.app}</a>
      </p>
    </footer>
  );
}
