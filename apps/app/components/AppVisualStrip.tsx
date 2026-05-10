import type { OmdalatLocale } from "../../../packages/core";
import { appVisuals } from "../lib/visuals";

type AppVisualStripProps = {
  locale: OmdalatLocale;
  label: string;
};

export function AppVisualStrip({ locale, label }: AppVisualStripProps) {
  return (
    <section className="app-visual-strip" aria-label={label}>
      {appVisuals.map((image, index) => (
        <figure className={index === 0 ? "app-visual-card app-visual-card-featured" : "app-visual-card"} key={image.key}>
          <img
            src={image.src}
            alt={locale === "vi" ? image.alt.vi : image.alt.en}
            width={image.width}
            height={image.height}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
          <figcaption>{locale === "vi" ? image.caption.vi : image.caption.en}</figcaption>
        </figure>
      ))}
    </section>
  );
}
