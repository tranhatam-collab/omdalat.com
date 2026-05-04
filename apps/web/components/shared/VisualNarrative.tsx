import type { OmdalatLocale } from "../../../../packages/core";
import { getRuntimeVisualSources, type RuntimeVisual } from "../../lib/visuals";

type VisualNarrativeProps = {
  images: RuntimeVisual[];
  locale: OmdalatLocale;
  label: string;
  priority?: boolean;
  altOverride?: string;
};

export function VisualNarrative({ images, locale, label, priority = false, altOverride }: VisualNarrativeProps) {
  if (images.length === 0) return null;

  return (
    <section className="runtime-visual-strip" aria-label={label}>
      {images.map((image, index) => (
        <figure className={index === 0 ? "runtime-visual-card runtime-visual-card-featured" : "runtime-visual-card"} key={image.key}>
          {(() => {
            const sources = getRuntimeVisualSources(image.src);
            const alt = altOverride ?? (locale === "vi" ? image.alt.vi : image.alt.en);

            return (
              <picture>
                {sources.avif ? <source srcSet={sources.avif} type="image/avif" /> : null}
                {sources.webp ? <source srcSet={sources.webp} type="image/webp" /> : null}
                <img
                  src={sources.fallback}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  loading={priority && index === 0 ? "eager" : "lazy"}
                  fetchPriority={priority && index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </picture>
            );
          })()}
          <figcaption>
            <span>{locale === "vi" ? image.caption.vi : image.caption.en}</span>
            <small>{image.credit}</small>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
