export type AppVisual = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: {
    vi: string;
    en: string;
  };
  caption: {
    vi: string;
    en: string;
  };
};

export const appVisuals = [
  {
    key: "dalat-rhythm",
    src: "https://images.unsplash.com/photo-1609424360486-c5b2636741d1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=khanh-tran-mZ9UNtdwrlo-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    alt: {
      vi: "Đà Lạt trong sương sớm",
      en: "Dalat in early mist"
    },
    caption: {
      vi: "Nhịp tổng quan",
      en: "Overall rhythm"
    }
  },
  {
    key: "member-route",
    src: "https://images.unsplash.com/photo-1691058428634-86aea938b448?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-space-DiE0DPySJTU-unsplash.jpg&w=1400",
    width: 1400,
    height: 933,
    alt: {
      vi: "Con đường vùng ven Đà Lạt",
      en: "A road along the edge of Dalat"
    },
    caption: {
      vi: "Luồng thành viên",
      en: "Member path"
    }
  },
  {
    key: "daily-life",
    src: "https://images.unsplash.com/photo-1771581254097-7a186bd064bf?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=annie-hatuanh-R_wHZ6Xp6eU-unsplash.jpg&w=1200",
    width: 1200,
    height: 1500,
    alt: {
      vi: "Quầy trái cây ở chợ Đà Lạt",
      en: "A fruit stall at Dalat Market"
    },
    caption: {
      vi: "Đời sống thật",
      en: "Real life"
    }
  }
] as const satisfies readonly AppVisual[];

export const appOgImage = appVisuals[0];
