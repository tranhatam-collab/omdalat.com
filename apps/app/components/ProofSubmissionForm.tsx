import { Section } from "../../../packages/ui";
import { submitProofAction } from "../app/actions";

type ProofSubmissionFormProps = {
  redirectTo?: string;
  defaultSubjectName?: string;
};

export function ProofSubmissionForm({
  redirectTo = "/proofs",
  defaultSubjectName = "Lake Edge Signal Loop"
}: ProofSubmissionFormProps) {
  return (
    <Section className="app-panel">
      <p className="app-kicker">Write flow</p>
      <h2>Submit a proof into the local trust ledger</h2>
      <form action={submitProofAction} className="app-form">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="app-form-grid">
          <label className="app-field">
            <span>Proof title</span>
            <input className="app-input" name="title" placeholder="Example: Warm dinner produced a repeat session" required />
          </label>
          <label className="app-field">
            <span>Proof kind</span>
            <select className="app-input" name="kind" defaultValue="Trust proof">
              <option>Trust proof</option>
              <option>Hosting proof</option>
              <option>Place proof</option>
              <option>Community proof</option>
            </select>
          </label>
          <label className="app-field">
            <span>Subject type</span>
            <select className="app-input" name="subjectType" defaultValue="place">
              <option value="place">Place</option>
              <option value="host">Host</option>
              <option value="expert">Expert</option>
              <option value="community">Community</option>
              <option value="event">Event</option>
            </select>
          </label>
          <label className="app-field">
            <span>Subject name</span>
            <input className="app-input" name="subjectName" defaultValue={defaultSubjectName} required />
          </label>
        </div>
        <label className="app-field">
          <span>Outcome</span>
          <textarea
            className="app-input app-textarea"
            name="outcome"
            placeholder="What concrete result happened in real life?"
            required
          />
        </label>
        <label className="app-field">
          <span>Evidence</span>
          <textarea
            className="app-input app-textarea"
            name="evidence"
            placeholder="What evidence supports this proof?"
            required
          />
        </label>
        <button className="app-button" type="submit">
          Submit proof for review
        </button>
      </form>
    </Section>
  );
}
