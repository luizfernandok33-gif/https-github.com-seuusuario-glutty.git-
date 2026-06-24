"use client";

import { useState, type FormEvent } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { regions, defaultRegion, type RegionCode } from "@/lib/regions";
import { Send } from "lucide-react";

export default function CTAFinal() {
  const { t } = useLanguage();
  const [regionCode, setRegionCode] = useState<RegionCode>(defaultRegion);
  const [restaurant, setRestaurant] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const region = regions.find((r) => r.code === regionCode)!;

    const lines = [
      `${t.ctaFinal.form.restaurantLabel}: ${restaurant}`,
      `${t.ctaFinal.form.nameLabel}: ${name}`,
      `${t.ctaFinal.form.regionLabel}: ${t.regions.labels[regionCode]}`,
      `${t.ctaFinal.form.cityLabel}: ${city}`,
      `${t.ctaFinal.form.phoneLabel}: ${phone}`,
      message ? `${t.ctaFinal.form.messageLabel}: ${message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${region.whatsappDial}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="cta" className="relative overflow-hidden bg-(--color-primary-tint) py-24 sm:py-32">
      <Container className="relative z-10 grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-(--color-primary)/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
            {t.ctaFinal.eyebrow}
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-(--color-primary) sm:text-5xl lg:text-[3.4rem]">
            {t.ctaFinal.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-(--color-primary)/70">
            {t.ctaFinal.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-(--color-primary)/70">
            {t.ctaFinal.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="#servicos" variant="ghost">
              {t.ctaFinal.ctaSecondary}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-(--color-primary)/10 bg-white p-7 shadow-[0_30px_60px_-30px_rgba(20,47,23,0.25)] sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-(--color-primary)">
                {t.ctaFinal.form.restaurantLabel}
                <input
                  required
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                  placeholder={t.ctaFinal.form.restaurantPlaceholder}
                  className="mt-2 w-full rounded-xl border border-(--color-primary)/15 px-4 py-2.5 text-base font-normal text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
                />
              </label>

              <label className="block text-sm font-semibold text-(--color-primary)">
                {t.ctaFinal.form.nameLabel}
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.ctaFinal.form.namePlaceholder}
                  className="mt-2 w-full rounded-xl border border-(--color-primary)/15 px-4 py-2.5 text-base font-normal text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
                />
              </label>

              <label className="block text-sm font-semibold text-(--color-primary)">
                {t.ctaFinal.form.regionLabel}
                <select
                  value={regionCode}
                  onChange={(e) => setRegionCode(e.target.value as RegionCode)}
                  className="mt-2 w-full rounded-xl border border-(--color-primary)/15 px-4 py-2.5 text-base font-normal text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
                >
                  {regions.map((r) => (
                    <option key={r.code} value={r.code}>
                      {t.regions.labels[r.code]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-(--color-primary)">
                {t.ctaFinal.form.cityLabel}
                <input
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.ctaFinal.form.cityPlaceholder}
                  className="mt-2 w-full rounded-xl border border-(--color-primary)/15 px-4 py-2.5 text-base font-normal text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
                />
              </label>

              <label className="block text-sm font-semibold text-(--color-primary) sm:col-span-2">
                {t.ctaFinal.form.phoneLabel}
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.ctaFinal.form.phonePlaceholder}
                  className="mt-2 w-full rounded-xl border border-(--color-primary)/15 px-4 py-2.5 text-base font-normal text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
                />
              </label>

              <label className="block text-sm font-semibold text-(--color-primary) sm:col-span-2">
                {t.ctaFinal.form.messageLabel}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.ctaFinal.form.messagePlaceholder}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-(--color-primary)/15 px-4 py-2.5 text-base font-normal text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
                />
              </label>
            </div>

            <Button type="submit" variant="primary" icon={<Send size={18} />} className="mt-7 w-full">
              {t.ctaFinal.form.submitLabel}
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
