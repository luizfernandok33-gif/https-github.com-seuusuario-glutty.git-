"use client";

import { useState } from "react";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { regions, defaultRegion, type RegionCode } from "@/lib/regions";
import { Check } from "lucide-react";

export default function Pacotes() {
  const { t } = useLanguage();
  const [regionCode, setRegionCode] = useState<RegionCode>(defaultRegion);
  const region = regions.find((r) => r.code === regionCode)!;

  return (
    <section id="pacotes" className="relative bg-(--color-cream) py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            description={t.pricing.description}
          />

          <Reveal delay={0.05} className="flex shrink-0 flex-col gap-2 sm:items-end">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)/60">
              {t.regions.selectorLabel}
            </span>
            <div className="inline-flex rounded-full border border-(--color-primary)/15 bg-white p-1">
              {regions.map((r) => (
                <button
                  key={r.code}
                  type="button"
                  onClick={() => setRegionCode(r.code)}
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    r.code === regionCode
                      ? "bg-(--color-primary) text-(--color-primary-tint)"
                      : "text-(--color-primary)/60 hover:text-(--color-primary)"
                  )}
                >
                  {t.regions.labels[r.code]}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal stagger={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={clsx(
                "relative flex flex-col rounded-3xl border p-8",
                tier.highlighted
                  ? "border-(--color-accent)/30 bg-(--color-primary) text-(--color-cream) shadow-[0_30px_60px_-25px_rgba(20,47,23,0.35)]"
                  : "border-(--color-primary)/10 bg-white text-(--color-primary) shadow-[0_25px_55px_-30px_rgba(20,47,23,0.18)]"
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-(--color-accent) px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  {t.pricing.mostPopularLabel}
                </span>
              )}

              <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>

              <p
                className={clsx(
                  "mt-4 text-3xl font-semibold tracking-tight",
                  tier.highlighted ? "text-(--color-primary-tint)" : "text-(--color-primary)"
                )}
              >
                {region.currencySymbol} ---
                <span className="text-base font-medium opacity-60">{region.pricePeriod}</span>
              </p>

              <p
                className={clsx(
                  "mt-3 text-sm leading-relaxed",
                  tier.highlighted ? "text-(--color-cream)/70" : "text-(--color-ink-soft)"
                )}
              >
                <span className="font-semibold">{t.pricing.recommendedForLabel}:</span> {tier.recommendedFor}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check
                      size={18}
                      className={clsx(
                        "mt-0.5 shrink-0",
                        tier.highlighted ? "text-(--color-leaf)" : "text-(--color-accent)"
                      )}
                    />
                    <span className={tier.highlighted ? "text-(--color-cream)/90" : "text-(--color-ink-soft)"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href="#cta"
                variant={tier.highlighted ? "tint" : "secondary"}
                className="mt-8 w-full"
              >
                {t.pricing.ctaLabel}
              </Button>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-(--color-primary)/60">{t.pricing.priceNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
