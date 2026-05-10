import type { MemberLifecycleStatus } from "../../../packages/types";
import type { OmdalatLocale } from "../../../packages/core";

export type BasicApplicationInput = {
  full_name: string;
  email: string;
  phone_or_contact: string;
  current_location: string;
  why_dalat: string;
  what_are_you_looking_for: string;
  what_can_you_do: string;
  skills: string[];
  work_status: string;
  planned_stay_length: string;
  portfolio_or_intro_link: string;
  notes: string;
};

export type MemberProfileRecord = BasicApplicationInput & {
  id: string;
  memberStatus: MemberLifecycleStatus;
  reviewedAt?: string;
  createdAt: string;
  lastUpdatedAt: string;
  statusNote?: string;
};

export type NextStepConfig = {
  href: string;
  label: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
};

export type StayOption = {
  id: string;
  space_name: string;
  type: "dorm" | "private" | "shared_house" | "studio" | "ap_node";
  area: string;
  monthly_price: string;
  capacity: string;
  available_from: string;
  house_rules: string;
  status: "available" | "waiting" | "full";
  note_vi: string;
  note_en: string;
};

export type WorkItem = {
  id: string;
  title: string;
  type: "internal_task" | "freelance" | "remote" | "local_partner" | "content";
  skills_required: string[];
  pay_type: "fixed" | "hourly" | "revenue_share" | "volunteer";
  pay_range: string;
  deadline: string;
  owner: string;
  status: "open" | "in_review" | "assigned" | "closed";
  summary_vi: string;
  summary_en: string;
};

export type LearningProgram = {
  id: string;
  title_vi: string;
  title_en: string;
  duration: "7 ngày" | "14 ngày" | "30 ngày" | "7 days" | "14 days" | "30 days";
  output_vi: string;
  output_en: string;
  mentor_vi: string;
  mentor_en: string;
  cost: string;
};

export type ResourceItem = {
  id: string;
  title_vi: string;
  title_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  href: string;
  minStatus: MemberLifecycleStatus;
};

export type EarningsRecord = {
  member_id: string;
  source: "task" | "content" | "work" | "program" | "place" | "product";
  amount: number;
  currency: "VND";
  status: "pending" | "approved" | "paid";
  paid_at: string;
  note: string;
};

export type PlaceProfile = {
  id: string;
  ownerId: string;
  place_name: string;
  area: string;
  type: "house" | "garden" | "studio" | "cafe" | "farm" | "work_corner" | "community_space";
  story_vi: string;
  story_en: string;
  images: string[];
  capacity: string;
  can_host_stay: boolean;
  can_host_work: boolean;
  can_host_event: boolean;
  legal_notes: string;
  status: "draft" | "under_review" | "published";
};

export type ContributorAssignment = {
  id: string;
  memberId: string;
  title_vi: string;
  title_en: string;
  kind_vi: string;
  kind_en: string;
  status: "draft" | "in_review" | "published";
  pay_vi: string;
  pay_en: string;
};

export type ReviewAction =
  | "approve_for_trial"
  | "request_more_info"
  | "mark_not_suitable"
  | "promote_active_member"
  | "promote_contributor"
  | "promote_host_partner";

export type AdminReviewItem = {
  id: string;
  memberId: string;
  memberName: string;
  email: string;
  currentStatus: MemberLifecycleStatus;
  submittedAt: string;
  summary_vi: string;
  summary_en: string;
  notes: string[];
};

export const memberStatusOrder: MemberLifecycleStatus[] = [
  "guest",
  "registered",
  "profile_pending",
  "under_review",
  "trial",
  "active_member",
  "contributor",
  "host_partner",
  "operator",
  "admin"
];

const statusLabels: Record<MemberLifecycleStatus, { vi: string; en: string }> = {
  guest: { vi: "Khách", en: "Guest" },
  registered: { vi: "Hồ sơ mới tạo", en: "Profile created" },
  profile_pending: { vi: "Chưa hoàn tất hồ sơ", en: "Profile incomplete" },
  under_review: { vi: "Đang được xem xét", en: "Under review" },
  trial: { vi: "Đang trong thời gian thử", en: "In trial period" },
  active_member: { vi: "Đã là thành viên", en: "Active member" },
  contributor: { vi: "Có thể nhận việc", en: "Contributor" },
  host_partner: { vi: "Đối tác không gian", en: "Host partner" },
  operator: { vi: "Đang vận hành hệ", en: "Operator" },
  admin: { vi: "Quản trị toàn hệ", en: "Admin" }
};

const statusNotes: Record<MemberLifecycleStatus, { vi: string; en: string }> = {
  guest: {
    vi: "Bạn chưa đăng ký. Hành trình này bắt đầu từ một tài khoản cơ bản.",
    en: "You have not registered yet. This journey begins with a basic account."
  },
  registered: {
    vi: "Bạn đã có tài khoản. Bước tiếp theo là hoàn tất vài thông tin nền để chúng tôi hiểu bạn rõ hơn.",
    en: "You already have an account. The next step is to complete a few basics so we can understand you more clearly."
  },
  profile_pending: {
    vi: "Hồ sơ vẫn chưa đủ để chuyển sang bước xem xét.",
    en: "Your profile is not complete enough to move into review yet."
  },
  under_review: {
    vi: "Hồ sơ của bạn đang được xem xét. Trong lúc chờ, bạn có thể đọc hướng dẫn cơ bản.",
    en: "Your profile is under review. While waiting, you can read the basic guide."
  },
  trial: {
    vi: "Bạn đang trong thời gian thử 7 ngày. Hãy giữ nhịp, quan sát và hoàn thành những việc nhỏ đã được giao.",
    en: "You are in a 7-day trial period. Keep the rhythm, observe, and complete the small tasks assigned to you."
  },
  active_member: {
    vi: "Bạn đã bước qua giai đoạn thử. Điều quan trọng bây giờ là tạo ra nhịp làm và nhịp sống đủ bền.",
    en: "You have moved beyond the trial stage. What matters now is building a steady rhythm of work and life."
  },
  contributor: {
    vi: "Bạn đã có thể nhận việc và đóng góp có trả công hoặc theo chia sẻ doanh thu.",
    en: "You can now take on work and contribute through paid tasks or revenue share."
  },
  host_partner: {
    vi: "Bạn đang đại diện cho một không gian hoặc một Ấp trong hệ.",
    en: "You now represent a place or an Ap within the system."
  },
  operator: {
    vi: "Bạn đang cầm lớp vận hành và cần nhìn hệ theo nhịp chung, không chỉ theo hồ sơ riêng.",
    en: "You are holding an operating layer and need to see the system as a whole, not only through one profile."
  },
  admin: {
    vi: "Bạn có quyền quản trị toàn hệ.",
    en: "You have full system administration access."
  }
};

const nextSteps: Record<MemberLifecycleStatus, NextStepConfig> = {
  guest: {
    href: "/member/register",
    label: { vi: "Tạo tài khoản cơ bản", en: "Create a basic account" },
    description: {
      vi: "Bắt đầu bằng một tài khoản để hệ biết bạn là ai trước khi mở hồ sơ.",
      en: "Start with an account so the system knows who you are before opening the application."
    }
  },
  registered: {
    href: "/apply",
    label: { vi: "Hoàn tất hồ sơ", en: "Complete profile" },
    description: {
      vi: "Điền những thông tin nền đầu tiên để chuyển sang bước xem xét.",
      en: "Fill in the first layer of profile details to move into review."
    }
  },
  profile_pending: {
    href: "/apply",
    label: { vi: "Gửi hồ sơ để được xem xét", en: "Submit profile for review" },
    description: {
      vi: "Hoàn tất các trường còn thiếu rồi gửi lại hồ sơ.",
      en: "Finish the missing fields and resubmit the application."
    }
  },
  under_review: {
    href: "/resources",
    label: { vi: "Đọc hướng dẫn trong lúc chờ", en: "Read the guide while waiting" },
    description: {
      vi: "Trong lúc chờ phản hồi, bạn có thể mở các tài liệu nền đã được mở.",
      en: "While waiting for a response, you can read the resources already open to you."
    }
  },
  trial: {
    href: "/learning",
    label: { vi: "Xem lịch thử 7 ngày", en: "View the 7-day trial schedule" },
    description: {
      vi: "Giữ nhịp hằng ngày và theo dõi những output nhỏ cần hoàn thành.",
      en: "Keep the daily rhythm and track the small outputs to complete."
    }
  },
  active_member: {
    href: "/work",
    label: { vi: "Xem cơ hội đang mở", en: "See open opportunities" },
    description: {
      vi: "Đi tiếp bằng những việc đang mở và những cách tham gia sâu hơn.",
      en: "Move forward through open work and deeper ways of participating."
    }
  },
  contributor: {
    href: "/contributor",
    label: { vi: "Nhận task phù hợp", en: "Take a fitting task" },
    description: {
      vi: "Chọn công việc đúng nhịp và cập nhật bản nháp, ảnh hoặc bản dịch của bạn.",
      en: "Choose work that fits your rhythm and update your drafts, images, or translations."
    }
  },
  host_partner: {
    href: "/places",
    label: { vi: "Cập nhật hồ sơ Ấp", en: "Update the place profile" },
    description: {
      vi: "Bổ sung thông tin, hình ảnh và trạng thái duyệt của không gian bạn đang giữ.",
      en: "Refresh the details, images, and review status of the place you host."
    }
  },
  operator: {
    href: "/admin/review",
    label: { vi: "Mở hàng đợi xét duyệt", en: "Open the review queue" },
    description: {
      vi: "Đi qua hồ sơ mới, gán trial và giữ cho flow không bị đứng lại.",
      en: "Process new applications, assign trials, and keep the flow moving."
    }
  },
  admin: {
    href: "/admin/review",
    label: { vi: "Đi tới lớp quản trị", en: "Go to the admin review layer" },
    description: {
      vi: "Bạn có thể xem toàn bộ hồ sơ, quyền và trạng thái đang mở trong hệ.",
      en: "You can see the full set of profiles, permissions, and active states in the system."
    }
  }
};

const stayOptions: StayOption[] = [
  {
    id: "stay-dorm-pine",
    space_name: "Nhà thông chung",
    type: "dorm",
    area: "Xuân Hương",
    monthly_price: "3.200.000 VND",
    capacity: "4 người",
    available_from: "2026-05-01",
    house_rules: "Giữ yên sau 22:30, dọn bếp sau khi dùng.",
    status: "available",
    note_vi: "Phù hợp với người đang thử nhịp sống 7 ngày đầu.",
    note_en: "Fits those entering the first 7 days of trial rhythm."
  },
  {
    id: "stay-studio-mist",
    space_name: "Studio sương sớm",
    type: "studio",
    area: "Trại Mát",
    monthly_price: "6.800.000 VND",
    capacity: "1-2 người",
    available_from: "2026-05-10",
    house_rules: "Không tổ chức tụ tập tối muộn, giữ sạch góc làm việc.",
    status: "waiting",
    note_vi: "Ưu tiên cho thành viên đã vào nhịp làm việc ổn định.",
    note_en: "Priority goes to members already holding a stable work rhythm."
  },
  {
    id: "stay-shared-ap",
    space_name: "Ấp nhà dốc",
    type: "shared_house",
    area: "Phường 3",
    monthly_price: "4.900.000 VND",
    capacity: "3 người",
    available_from: "2026-04-28",
    house_rules: "Ăn chung hai bữa tối mỗi tuần, có dọn không gian cuối tuần.",
    status: "available",
    note_vi: "Có thể ở và làm cùng nhau theo lịch tuần.",
    note_en: "Supports shared living and working with a weekly rhythm."
  },
  {
    id: "stay-private-forest",
    space_name: "Phòng riêng ven rừng",
    type: "private",
    area: "Tà Nung",
    monthly_price: "8.200.000 VND",
    capacity: "1 người",
    available_from: "2026-06-01",
    house_rules: "Không nuôi thú lớn, cần giữ xe riêng gọn trong khuôn viên.",
    status: "full",
    note_vi: "Đang kín chỗ, có thể vào danh sách chờ.",
    note_en: "Currently full, but you may join the waiting list."
  }
];

const workItems: WorkItem[] = [
  {
    id: "work-community-diary",
    title: "Nhật ký cộng đồng tuần",
    type: "content",
    skills_required: ["viết", "biên tập", "phỏng vấn"],
    pay_type: "fixed",
    pay_range: "1.500.000 VND",
    deadline: "2026-05-05",
    owner: "Content Lead",
    status: "open",
    summary_vi: "Viết một bài ngắn về nhịp sống tuần này trong hệ.",
    summary_en: "Write a short weekly community diary from the current rhythm."
  },
  {
    id: "work-place-photo",
    title: "Bộ ảnh không gian làm việc",
    type: "freelance",
    skills_required: ["chụp ảnh", "hậu kỳ"],
    pay_type: "fixed",
    pay_range: "3.200.000 VND",
    deadline: "2026-05-09",
    owner: "Ap Lead",
    status: "open",
    summary_vi: "Chụp một bộ ảnh nhỏ cho các góc làm việc đang mở.",
    summary_en: "Create a small photo set for the working corners now open."
  },
  {
    id: "work-remote-assistant",
    title: "Điều phối hỗ trợ từ xa",
    type: "remote",
    skills_required: ["viết tiếng Anh", "điều phối", "ghi chép"],
    pay_type: "hourly",
    pay_range: "120.000 VND / giờ",
    deadline: "2026-05-12",
    owner: "Operator",
    status: "open",
    summary_vi: "Hỗ trợ phản hồi inquiry và sắp lịch trao đổi ban đầu.",
    summary_en: "Support inquiry replies and early scheduling."
  },
  {
    id: "work-local-partner",
    title: "Khảo sát đối tác địa phương",
    type: "local_partner",
    skills_required: ["nghiên cứu", "đi thực địa", "viết ghi chú"],
    pay_type: "revenue_share",
    pay_range: "Theo thoả thuận",
    deadline: "2026-05-20",
    owner: "Partnership Lead",
    status: "in_review",
    summary_vi: "Khảo sát ba điểm có thể trở thành không gian cộng tác mới.",
    summary_en: "Survey three local partners that may become future collaboration spaces."
  }
];

const learningPrograms: LearningProgram[] = [
  {
    id: "program-7-day",
    title_vi: "Chương trình thực địa 7 ngày",
    title_en: "7-day real-life program",
    duration: "7 ngày",
    output_vi: "Nhịp sinh hoạt cơ bản, nhật ký mỗi ngày và một bài nhìn lại ngắn.",
    output_en: "Basic living rhythm, a daily log, and one short reflection.",
    mentor_vi: "Người giữ trial",
    mentor_en: "Trial lead",
    cost: "0 VND"
  },
  {
    id: "program-14-day",
    title_vi: "Chương trình thực địa 14 ngày",
    title_en: "14-day real-life program",
    duration: "14 ngày",
    output_vi: "Một phần việc thật, một bản tổng kết nhịp làm, và góp mặt trong review tuần.",
    output_en: "One real assignment, a work-rhythm summary, and participation in the weekly review.",
    mentor_vi: "Community lead",
    mentor_en: "Community lead",
    cost: "1.800.000 VND"
  },
  {
    id: "program-30-day",
    title_vi: "Chương trình thực địa 30 ngày",
    title_en: "30-day real-life program",
    duration: "30 ngày",
    output_vi: "Một dự án nhỏ hoàn chỉnh và bản tự đánh giá về việc ở lại lâu hơn.",
    output_en: "A complete small project and a self-review about staying longer.",
    mentor_vi: "Operator + host phù hợp",
    mentor_en: "Operator + matching host",
    cost: "4.500.000 VND"
  }
];

const resources: ResourceItem[] = [
  {
    id: "resource-basic-guide",
    title_vi: "Hướng dẫn cơ bản",
    title_en: "Basic guide",
    excerpt_vi: "Những điều nên đọc trước khi bắt đầu tham gia.",
    excerpt_en: "What to read before taking the first step.",
    href: "/resources",
    minStatus: "registered"
  },
  {
    id: "resource-trial-guide",
    title_vi: "Hướng dẫn thời gian thử",
    title_en: "Trial guide",
    excerpt_vi: "Lịch 7 ngày, nhịp sinh hoạt và những điều cần quan sát.",
    excerpt_en: "The 7-day schedule, daily rhythm, and what to observe.",
    href: "/resources",
    minStatus: "trial"
  },
  {
    id: "resource-member-handbook",
    title_vi: "Sổ tay thành viên",
    title_en: "Member handbook",
    excerpt_vi: "Nhịp sống, quy tắc chung và cách giữ một đời sống chung không hỏng đi.",
    excerpt_en: "Shared rhythms, common rules, and how to keep life together from breaking down.",
    href: "/resources",
    minStatus: "active_member"
  },
  {
    id: "resource-contributor-guide",
    title_vi: "Hướng dẫn người đóng góp",
    title_en: "Contributor guide",
    excerpt_vi: "Nhận việc, nộp bản nháp và đi qua feedback đúng nhịp.",
    excerpt_en: "Take assignments, submit drafts, and move through feedback in rhythm.",
    href: "/contributor",
    minStatus: "contributor"
  },
  {
    id: "resource-host-guide",
    title_vi: "Hướng dẫn đối tác không gian",
    title_en: "Host guide",
    excerpt_vi: "Cách mở một nơi ở hoặc góc làm việc mà không làm loãng nhịp chung.",
    excerpt_en: "How to open a place to stay or work without thinning the shared rhythm.",
    href: "/places",
    minStatus: "host_partner"
  },
  {
    id: "resource-ops-handbook",
    title_vi: "Sổ tay vận hành",
    title_en: "Ops handbook",
    excerpt_vi: "Luồng review, escalation và các mẫu vận hành sâu hơn.",
    excerpt_en: "Review flow, escalation, and deeper operating templates.",
    href: "/admin/review",
    minStatus: "operator"
  }
];

const earnings: EarningsRecord[] = [
  {
    member_id: "yen-contributor",
    source: "content",
    amount: 1800000,
    currency: "VND",
    status: "approved",
    paid_at: "",
    note: "Bài viết mở nền tháng này."
  },
  {
    member_id: "yen-contributor",
    source: "task",
    amount: 900000,
    currency: "VND",
    status: "pending",
    paid_at: "",
    note: "Bộ ảnh góc làm việc đang chờ thanh toán."
  },
  {
    member_id: "vu-host",
    source: "place",
    amount: 3500000,
    currency: "VND",
    status: "paid",
    paid_at: "2026-04-15",
    note: "Chia sẻ doanh thu từ hai inquiry ở lại."
  },
  {
    member_id: "mai-active",
    source: "program",
    amount: 1200000,
    currency: "VND",
    status: "approved",
    paid_at: "",
    note: "Hỗ trợ chương trình thực địa 14 ngày."
  }
];

let places: PlaceProfile[] = [
  {
    id: "place-vuon-doc",
    ownerId: "vu-host",
    place_name: "Ấp Vườn Dốc",
    area: "Phường 11",
    type: "garden",
    story_vi: "Một khu vườn nhỏ có thể ở, làm việc và đón những nhóm rất ít người.",
    story_en: "A small garden place that can host living, work, and very small groups.",
    images: ["garden-01.jpg", "garden-02.jpg"],
    capacity: "6 người",
    can_host_stay: true,
    can_host_work: true,
    can_host_event: false,
    legal_notes: "Đủ điều kiện đón ở ngắn và dài hạn theo quy mô nhỏ.",
    status: "under_review"
  },
  {
    id: "place-studio-may",
    ownerId: "vu-host",
    place_name: "Studio Mây",
    area: "Trại Mát",
    type: "studio",
    story_vi: "Một studio nhỏ cho nhóm làm nội dung và chụp ảnh.",
    story_en: "A small studio for content and photo work.",
    images: ["studio-01.jpg"],
    capacity: "3 người",
    can_host_stay: false,
    can_host_work: true,
    can_host_event: true,
    legal_notes: "Cần cập nhật thêm giấy tờ cho event nhỏ.",
    status: "draft"
  }
];

const contributorAssignments: ContributorAssignment[] = [
  {
    id: "assignment-yen-article",
    memberId: "yen-contributor",
    title_vi: "Bài viết về nhịp sống sáng sớm",
    title_en: "Essay on the early morning rhythm",
    kind_vi: "Viết bài",
    kind_en: "Writing",
    status: "in_review",
    pay_vi: "1.200.000 VND",
    pay_en: "1,200,000 VND"
  },
  {
    id: "assignment-yen-photos",
    memberId: "yen-contributor",
    title_vi: "Bộ ảnh ba góc làm việc mới",
    title_en: "Photo essay for three new work corners",
    kind_vi: "Ảnh",
    kind_en: "Photography",
    status: "published",
    pay_vi: "2.000.000 VND",
    pay_en: "2,000,000 VND"
  }
];

const memberProfiles = new Map<string, MemberProfileRecord>(
  ([
    {
      id: "thao-registered",
      full_name: "Thảo Nguyễn",
      email: "thao@omdalat.com",
      phone_or_contact: "@thaonguyen",
      current_location: "TP.HCM",
      why_dalat: "",
      what_are_you_looking_for: "",
      what_can_you_do: "",
      skills: [],
      work_status: "Đang chuyển từ remote sang bán thời gian địa phương",
      planned_stay_length: "2 tháng",
      portfolio_or_intro_link: "",
      notes: "",
      memberStatus: "registered",
      createdAt: "2026-04-20T09:00:00.000Z",
      lastUpdatedAt: "2026-04-20T09:00:00.000Z"
    },
    {
      id: "phuc-pending",
      full_name: "Phúc Lê",
      email: "phuc@omdalat.com",
      phone_or_contact: "0900000002",
      current_location: "Nha Trang",
      why_dalat: "Muốn thử một nhịp sống làm việc đều hơn.",
      what_are_you_looking_for: "Một nơi có thể ở và làm trong ít nhất 3 tháng.",
      what_can_you_do: "",
      skills: ["thiết kế"],
      work_status: "Freelance",
      planned_stay_length: "3 tháng",
      portfolio_or_intro_link: "https://example.com/phuc",
      notes: "Còn thiếu phần mô tả khả năng làm việc thực tế.",
      memberStatus: "profile_pending",
      createdAt: "2026-04-18T09:00:00.000Z",
      lastUpdatedAt: "2026-04-22T11:30:00.000Z"
    },
    {
      id: "an-review",
      full_name: "An Trần",
      email: "an@omdalat.com",
      phone_or_contact: "@antran",
      current_location: "Đà Nẵng",
      why_dalat: "Muốn ở lại đủ lâu để biết mình có hợp với một nơi yên hơn hay không.",
      what_are_you_looking_for: "Chỗ ở chung và cơ hội làm nội dung.",
      what_can_you_do: "Viết, dựng video ngắn, hỗ trợ nghiên cứu địa phương.",
      skills: ["viết", "video", "nghiên cứu"],
      work_status: "Remote",
      planned_stay_length: "6 tuần",
      portfolio_or_intro_link: "https://example.com/an",
      notes: "Hồ sơ đã đủ cho vòng xem xét đầu.",
      memberStatus: "under_review",
      createdAt: "2026-04-17T08:20:00.000Z",
      lastUpdatedAt: "2026-04-22T08:20:00.000Z"
    },
    {
      id: "linh-trial",
      full_name: "Linh Phạm",
      email: "linh.pham@omdalat.com",
      phone_or_contact: "@linhpham",
      current_location: "Hà Nội",
      why_dalat: "Muốn chuyển một phần cuộc sống vào Đà Lạt.",
      what_are_you_looking_for: "Không gian nhỏ nhưng có thể làm đều mỗi ngày.",
      what_can_you_do: "Chụp ảnh, tổ chức lịch nhóm nhỏ, hỗ trợ nội dung.",
      skills: ["ảnh", "điều phối", "nội dung"],
      work_status: "Hybrid",
      planned_stay_length: "14 ngày",
      portfolio_or_intro_link: "https://example.com/linh",
      notes: "Đang ở ngày 3 của trial.",
      memberStatus: "trial",
      createdAt: "2026-04-10T09:15:00.000Z",
      lastUpdatedAt: "2026-04-23T09:15:00.000Z",
      reviewedAt: "2026-04-20T09:15:00.000Z"
    },
    {
      id: "mai-active",
      full_name: "Mai Võ",
      email: "mai.active@omdalat.com",
      phone_or_contact: "0900000005",
      current_location: "Đà Lạt",
      why_dalat: "Đã ở đủ lâu để muốn vào nhịp dài hơn.",
      what_are_you_looking_for: "Cơ hội làm thật và học thực địa.",
      what_can_you_do: "Điều phối, viết, chụp ảnh cơ bản.",
      skills: ["điều phối", "viết"],
      work_status: "Local",
      planned_stay_length: "6 tháng",
      portfolio_or_intro_link: "",
      notes: "Đã qua trial và duy trì nhịp làm tuần.",
      memberStatus: "active_member",
      createdAt: "2026-03-01T09:15:00.000Z",
      lastUpdatedAt: "2026-04-18T09:15:00.000Z",
      reviewedAt: "2026-03-08T09:15:00.000Z"
    },
    {
      id: "yen-contributor",
      full_name: "Yến Đỗ",
      email: "yen@omdalat.com",
      phone_or_contact: "@yendo",
      current_location: "Đà Lạt",
      why_dalat: "Đã vào nhịp sống và muốn đóng góp bền hơn.",
      what_are_you_looking_for: "Task nội dung, ảnh và bản dịch.",
      what_can_you_do: "Viết, chụp, dịch Anh - Việt.",
      skills: ["viết", "ảnh", "dịch"],
      work_status: "Freelance",
      planned_stay_length: "1 năm",
      portfolio_or_intro_link: "https://example.com/yen",
      notes: "Contributor đang hoạt động.",
      memberStatus: "contributor",
      createdAt: "2026-02-10T09:15:00.000Z",
      lastUpdatedAt: "2026-04-22T09:15:00.000Z",
      reviewedAt: "2026-02-20T09:15:00.000Z"
    },
    {
      id: "vu-host",
      full_name: "Vũ Trịnh",
      email: "vu@omdalat.com",
      phone_or_contact: "0900000007",
      current_location: "Đà Lạt",
      why_dalat: "Đang giữ một nơi chốn có thể mở thành Ấp nhỏ.",
      what_are_you_looking_for: "Kết nối đúng người và đúng nhịp để vận hành nơi ở.",
      what_can_you_do: "Host, chăm nơi chốn, đón nhóm nhỏ.",
      skills: ["host", "không gian", "điều phối"],
      work_status: "Local host",
      planned_stay_length: "Dài hạn",
      portfolio_or_intro_link: "",
      notes: "Đang ở lớp host partner.",
      memberStatus: "host_partner",
      createdAt: "2026-01-22T09:15:00.000Z",
      lastUpdatedAt: "2026-04-23T09:15:00.000Z",
      reviewedAt: "2026-02-02T09:15:00.000Z"
    },
    {
      id: "mai-operator",
      full_name: "Mai Nguyễn",
      email: "mai.nguyen@omdalat.com",
      phone_or_contact: "@mainguyen",
      current_location: "Đà Lạt",
      why_dalat: "Đang vận hành hệ.",
      what_are_you_looking_for: "Giữ flow vận hành và review.",
      what_can_you_do: "Review hồ sơ, điều phối trial, giữ nhịp team.",
      skills: ["ops", "review", "community"],
      work_status: "Operator",
      planned_stay_length: "Dài hạn",
      portfolio_or_intro_link: "",
      notes: "Operator chính của vòng hiện tại.",
      memberStatus: "operator",
      createdAt: "2025-12-10T09:15:00.000Z",
      lastUpdatedAt: "2026-04-23T09:15:00.000Z",
      reviewedAt: "2025-12-15T09:15:00.000Z"
    },
    {
      id: "tam-admin",
      full_name: "Trần Hà Tâm",
      email: "tam@omdalat.com",
      phone_or_contact: "@tranhatam",
      current_location: "Đà Lạt",
      why_dalat: "Giữ toàn bộ định hướng hệ.",
      what_are_you_looking_for: "Bề mặt vận hành đủ rõ để scale đúng.",
      what_can_you_do: "Quản trị, chốt quyết định, điều phối.",
      skills: ["admin", "strategy", "ops"],
      work_status: "Admin",
      planned_stay_length: "Dài hạn",
      portfolio_or_intro_link: "",
      notes: "Quyền quản trị toàn bộ.",
      memberStatus: "admin",
      createdAt: "2025-10-01T09:15:00.000Z",
      lastUpdatedAt: "2026-04-23T09:15:00.000Z",
      reviewedAt: "2025-10-02T09:15:00.000Z"
    }
  ] satisfies MemberProfileRecord[]).map<[string, MemberProfileRecord]>((profile) => [profile.id, profile])
);

let adminReviewQueue: AdminReviewItem[] = [
  {
    id: "review-an",
    memberId: "an-review",
    memberName: "An Trần",
    email: "an@omdalat.com",
    currentStatus: "under_review",
    submittedAt: "2026-04-22T08:20:00.000Z",
    summary_vi: "Muốn ở lại 6 tuần và làm nội dung / nghiên cứu địa phương.",
    summary_en: "Wants to stay for six weeks and work in content / local research.",
    notes: ["Hồ sơ đủ, cần xác nhận khung trial phù hợp."]
  },
  {
    id: "review-phuc",
    memberId: "phuc-pending",
    memberName: "Phúc Lê",
    email: "phuc@omdalat.com",
    currentStatus: "profile_pending",
    submittedAt: "2026-04-22T11:30:00.000Z",
    summary_vi: "Thiếu phần mô tả công việc thật có thể làm mỗi tuần.",
    summary_en: "Still missing the part about the real work they can do each week.",
    notes: ["Đã yêu cầu bổ sung thông tin."]
  }
];

const stayRequests: Array<{ memberId: string; stayOptionId: string; note: string; createdAt: string }> = [];
const workApplications: Array<{ memberId: string; workItemId: string; note: string; createdAt: string }> = [];

function trimValue(value: string) {
  return value.trim();
}

export function normalizeMemberStatus(inputRole: string, profileComplete = false): MemberLifecycleStatus {
  if (memberStatusOrder.includes(inputRole as MemberLifecycleStatus)) {
    return inputRole as MemberLifecycleStatus;
  }

  if (inputRole === "member") {
    return profileComplete ? "under_review" : "profile_pending";
  }

  if (inputRole === "verified_member") {
    return "active_member";
  }

  if (inputRole === "internal_member") {
    return "operator";
  }

  return "guest";
}

export function getStatusRank(status: MemberLifecycleStatus) {
  return memberStatusOrder.indexOf(status);
}

export function getStatusLabel(status: MemberLifecycleStatus, locale: OmdalatLocale) {
  return locale === "vi" ? statusLabels[status].vi : statusLabels[status].en;
}

export function getStatusNote(status: MemberLifecycleStatus, locale: OmdalatLocale) {
  return locale === "vi" ? statusNotes[status].vi : statusNotes[status].en;
}

export function isReviewedMemberStatus(status: MemberLifecycleStatus) {
  return getStatusRank(status) >= getStatusRank("trial");
}

export function canAccessContributor(status: MemberLifecycleStatus) {
  return status === "contributor" || status === "operator" || status === "admin";
}

export function canAccessHost(status: MemberLifecycleStatus) {
  return status === "host_partner" || status === "operator" || status === "admin";
}

export function canAccessOperator(status: MemberLifecycleStatus) {
  return status === "operator" || status === "admin";
}

export function canAccessEarnings(status: MemberLifecycleStatus) {
  return getStatusRank(status) >= getStatusRank("active_member");
}

export function getNextStep(status: MemberLifecycleStatus) {
  return nextSteps[status];
}

export function listStayOptions() {
  return stayOptions;
}

export function listWorkItems() {
  return workItems;
}

export function listLearningPrograms() {
  return learningPrograms;
}

export function listAccessibleResources(status: MemberLifecycleStatus) {
  return resources.filter((item) => getStatusRank(status) >= getStatusRank(item.minStatus));
}

export function listEarningsForMember(memberId: string) {
  return earnings.filter((item) => item.member_id === memberId);
}

export function listContributorAssignments(memberId: string) {
  return contributorAssignments.filter((assignment) => assignment.memberId === memberId);
}

export function listPlacesForMember(memberId: string) {
  return places.filter((place) => place.ownerId === memberId);
}

export function listAllPlaces() {
  return places;
}

export function listAdminReviewItems() {
  return adminReviewQueue;
}

export function listStayRequestsForMember(memberId: string) {
  return stayRequests.filter((item) => item.memberId === memberId);
}

export function listWorkApplicationsForMember(memberId: string) {
  return workApplications.filter((item) => item.memberId === memberId);
}

export function ensureProfileRecord(input: {
  id: string;
  name: string;
  email: string;
  memberStatus: MemberLifecycleStatus;
}): MemberProfileRecord {
  const existing = memberProfiles.get(input.id);
  if (existing) {
    return existing;
  }

  const now = new Date().toISOString();
  const profile: MemberProfileRecord = {
    id: input.id,
    full_name: input.name,
    email: input.email,
    phone_or_contact: "",
    current_location: "",
    why_dalat: "",
    what_are_you_looking_for: "",
    what_can_you_do: "",
    skills: [],
    work_status: "",
    planned_stay_length: "",
    portfolio_or_intro_link: "",
    notes: "",
    memberStatus: input.memberStatus,
    createdAt: now,
    lastUpdatedAt: now
  };

  memberProfiles.set(profile.id, profile);
  return profile;
}

export function getMemberProfileRecord(memberId: string) {
  return memberProfiles.get(memberId);
}

export function listMemberProfiles() {
  return Array.from(memberProfiles.values());
}

export function registerBasicAccount(input: { id: string; fullName: string; email: string }) {
  const now = new Date().toISOString();
  const profile: MemberProfileRecord = {
    id: input.id,
    full_name: trimValue(input.fullName),
    email: trimValue(input.email).toLowerCase(),
    phone_or_contact: "",
    current_location: "",
    why_dalat: "",
    what_are_you_looking_for: "",
    what_can_you_do: "",
    skills: [],
    work_status: "",
    planned_stay_length: "",
    portfolio_or_intro_link: "",
    notes: "",
    memberStatus: "registered",
    createdAt: now,
    lastUpdatedAt: now
  };

  memberProfiles.set(profile.id, profile);
  return profile;
}

export function submitBasicApplication(memberId: string, input: BasicApplicationInput) {
  const now = new Date().toISOString();
  const existing = memberProfiles.get(memberId);
  const nextStatus =
    trimValue(input.why_dalat) &&
    trimValue(input.what_are_you_looking_for) &&
    trimValue(input.what_can_you_do) &&
    input.skills.length > 0 &&
    trimValue(input.work_status)
      ? "under_review"
      : "profile_pending";

  const profile: MemberProfileRecord = {
    id: memberId,
    full_name: trimValue(input.full_name),
    email: trimValue(input.email).toLowerCase(),
    phone_or_contact: trimValue(input.phone_or_contact),
    current_location: trimValue(input.current_location),
    why_dalat: trimValue(input.why_dalat),
    what_are_you_looking_for: trimValue(input.what_are_you_looking_for),
    what_can_you_do: trimValue(input.what_can_you_do),
    skills: input.skills.map((skill) => trimValue(skill)).filter(Boolean),
    work_status: trimValue(input.work_status),
    planned_stay_length: trimValue(input.planned_stay_length),
    portfolio_or_intro_link: trimValue(input.portfolio_or_intro_link),
    notes: trimValue(input.notes),
    memberStatus: nextStatus,
    createdAt: existing?.createdAt ?? now,
    lastUpdatedAt: now,
    statusNote:
      nextStatus === "under_review"
        ? "Hồ sơ đã đủ để chuyển sang bước xem xét."
        : "Hồ sơ còn thiếu vài phần nền trước khi được xem xét."
  };

  memberProfiles.set(memberId, profile);

  const queueIndex = adminReviewQueue.findIndex((item) => item.memberId === memberId);
  const queueItem: AdminReviewItem = {
    id: queueIndex >= 0 ? adminReviewQueue[queueIndex].id : `review-${memberId}`,
    memberId,
    memberName: profile.full_name,
    email: profile.email,
    currentStatus: profile.memberStatus,
    submittedAt: now,
    summary_vi: `${profile.what_are_you_looking_for || "Người dùng mới"} · ${profile.what_can_you_do || "đang bổ sung khả năng làm việc"}`,
    summary_en: `${profile.what_are_you_looking_for || "New applicant"} · ${profile.what_can_you_do || "still completing work details"}`,
    notes:
      nextStatus === "under_review"
        ? ["Hồ sơ mới đã vào hàng đợi xem xét."]
        : ["Hồ sơ chưa đủ để chuyển vào review đầy đủ."]
  };

  if (queueIndex >= 0) {
    adminReviewQueue[queueIndex] = queueItem;
  } else {
    adminReviewQueue = [queueItem, ...adminReviewQueue];
  }

  return profile;
}

export function applyForWork(memberId: string, workItemId: string, note: string) {
  const createdAt = new Date().toISOString();
  workApplications.unshift({ memberId, workItemId, note: trimValue(note), createdAt });
  return workApplications[0];
}

export function requestStay(memberId: string, stayOptionId: string, note: string) {
  const createdAt = new Date().toISOString();
  stayRequests.unshift({ memberId, stayOptionId, note: trimValue(note), createdAt });
  return stayRequests[0];
}

export function upsertPlaceProfile(input: Omit<PlaceProfile, "id"> & { id?: string }) {
  const existingIndex = input.id ? places.findIndex((place) => place.id === input.id) : -1;
  const nextPlace: PlaceProfile = {
    ...input,
    id: input.id ?? `place-${Date.now()}`
  };

  if (existingIndex >= 0) {
    places = places.map((place, index) => (index === existingIndex ? nextPlace : place));
  } else {
    places = [nextPlace, ...places];
  }

  return nextPlace;
}

export function reviewMemberApplication(memberId: string, action: ReviewAction, note: string) {
  const profile = memberProfiles.get(memberId);
  if (!profile) {
    return undefined;
  }

  const reviewedAt = new Date().toISOString();
  let nextStatus: MemberLifecycleStatus = profile.memberStatus;
  let nextNote = trimValue(note);

  if (action === "approve_for_trial") {
    nextStatus = "trial";
    nextNote ||= "Đã mở trial 7 ngày.";
  }

  if (action === "request_more_info") {
    nextStatus = "profile_pending";
    nextNote ||= "Cần bổ sung thêm vài thông tin trước khi đi tiếp.";
  }

  if (action === "mark_not_suitable") {
    nextStatus = "registered";
    nextNote ||= "Hiện chưa phải độ phù hợp tốt cho vòng này.";
  }

  if (action === "promote_active_member") {
    nextStatus = "active_member";
    nextNote ||= "Đã mở bước thành viên chính thức.";
  }

  if (action === "promote_contributor") {
    nextStatus = "contributor";
    nextNote ||= "Đã mở lớp contributor.";
  }

  if (action === "promote_host_partner") {
    nextStatus = "host_partner";
    nextNote ||= "Đã mở lớp host partner.";
  }

  const updatedProfile: MemberProfileRecord = {
    ...profile,
    memberStatus: nextStatus,
    reviewedAt,
    lastUpdatedAt: reviewedAt,
    statusNote: nextNote
  };
  memberProfiles.set(memberId, updatedProfile);

  adminReviewQueue = adminReviewQueue.map((item) =>
    item.memberId === memberId
      ? {
          ...item,
          currentStatus: nextStatus,
          notes: nextNote ? [nextNote, ...item.notes] : item.notes
        }
      : item
  );

  return updatedProfile;
}

export function buildInitialApplicationInput(profile?: MemberProfileRecord): BasicApplicationInput {
  return {
    full_name: profile?.full_name ?? "",
    email: profile?.email ?? "",
    phone_or_contact: profile?.phone_or_contact ?? "",
    current_location: profile?.current_location ?? "",
    why_dalat: profile?.why_dalat ?? "",
    what_are_you_looking_for: profile?.what_are_you_looking_for ?? "",
    what_can_you_do: profile?.what_can_you_do ?? "",
    skills: profile?.skills ?? [],
    work_status: profile?.work_status ?? "",
    planned_stay_length: profile?.planned_stay_length ?? "",
    portfolio_or_intro_link: profile?.portfolio_or_intro_link ?? "",
    notes: profile?.notes ?? ""
  };
}
