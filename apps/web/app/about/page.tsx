import { PageScaffold } from "../../components/shared/PageScaffold";

export default function AboutPage() {
  return (
    <PageScaffold
      eyebrow="Context shell"
      title="About OMDALAT"
      description="Public context shell for what OMDALAT is and how it relates to OMDALA."
      highlights={["Brand context", "System relationship", "Future supporting copy"]}
      nextStep="Expand this route into a high-signal explanation page with entity-rich copy."
    />
  );
}
