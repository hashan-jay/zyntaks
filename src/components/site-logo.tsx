import logoMeta from "../../public/brand/logo-meta.json";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Site wordmark from d:\\Zyntaks\\zyntaks-logo-new.psd
 * Uses a plain <img> + cache-busting query so browsers don't keep the old asset.
 */
export function SiteLogo({ className, priority = false }: SiteLogoProps) {
  const src = `/brand/logo.png?v=${logoMeta.cacheKey}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Zyntaks — software development and SEO company"
      width={logoMeta.width}
      height={logoMeta.height}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
