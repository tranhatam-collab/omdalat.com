import { Section } from "../../../packages/ui";
import { submitProofAction } from "../app/actions";
import { getRequestLocale } from "../lib/locale";

type ProofSubmissionFormProps = {
  redirectTo?: string;
  defaultSubjectName?: string;
};

export async function ProofSubmissionForm({
  redirectTo = "/proofs",
  defaultSubjectName = "Lake Edge Signal Loop"
}: ProofSubmissionFormProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";

  return (
    <Section className="app-panel">
      <p className="app-kicker">{isVi ? "Luồng ghi nhận" : "Write flow"}</p>
      <h2>{isVi ? "Gửi bằng chứng vào sổ trust địa phương" : "Submit a proof into the local trust ledger"}</h2>
      <form action={submitProofAction} className="app-form">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="app-form-grid">
          <label className="app-field">
            <span>{isVi ? "Tiêu đề bằng chứng" : "Proof title"}</span>
            <input
              className="app-input"
              name="title"
              placeholder={isVi ? "Ví dụ: Bữa tối ấm cúng tạo ra một lần quay lại" : "Example: Warm dinner produced a repeat session"}
              required
            />
          </label>
          <label className="app-field">
            <span>{isVi ? "Loại bằng chứng" : "Proof kind"}</span>
            <select className="app-input" name="kind" defaultValue="Trust proof">
              <option>{isVi ? "Bằng chứng trust" : "Trust proof"}</option>
              <option>{isVi ? "Bằng chứng host" : "Hosting proof"}</option>
              <option>{isVi ? "Bằng chứng địa điểm" : "Place proof"}</option>
              <option>{isVi ? "Bằng chứng cộng đồng" : "Community proof"}</option>
            </select>
          </label>
          <label className="app-field">
            <span>{isVi ? "Loại đối tượng" : "Subject type"}</span>
            <select className="app-input" name="subjectType" defaultValue="place">
              <option value="place">{isVi ? "Địa điểm" : "Place"}</option>
              <option value="host">{isVi ? "Host" : "Host"}</option>
              <option value="expert">{isVi ? "Chuyên gia" : "Expert"}</option>
              <option value="community">{isVi ? "Cộng đồng" : "Community"}</option>
              <option value="event">{isVi ? "Sự kiện" : "Event"}</option>
            </select>
          </label>
          <label className="app-field">
            <span>{isVi ? "Tên đối tượng" : "Subject name"}</span>
            <input className="app-input" name="subjectName" defaultValue={defaultSubjectName} required />
          </label>
        </div>
        <label className="app-field">
          <span>{isVi ? "Kết quả" : "Outcome"}</span>
          <textarea
            className="app-input app-textarea"
            name="outcome"
            placeholder={isVi ? "Kết quả cụ thể nào đã xảy ra ngoài thực tế?" : "What concrete result happened in real life?"}
            required
          />
        </label>
        <label className="app-field">
          <span>{isVi ? "Dữ liệu xác thực" : "Evidence"}</span>
          <textarea
            className="app-input app-textarea"
            name="evidence"
            placeholder={isVi ? "Dữ liệu nào chứng minh cho bằng chứng này?" : "What evidence supports this proof?"}
            required
          />
        </label>
        <button className="app-button" type="submit">
          {isVi ? "Gửi bằng chứng để rà soát" : "Submit proof for review"}
        </button>
      </form>
    </Section>
  );
}
