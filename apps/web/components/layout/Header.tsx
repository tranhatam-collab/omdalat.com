import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="runtime-header">
      <div className="runtime-brand">
        <strong>OMDALAT Runtime Scaffold</strong>
        <span>Stage 2 public web runtime shells running alongside the static surface.</span>
      </div>
      <Nav />
    </header>
  );
}
