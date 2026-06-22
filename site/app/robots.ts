import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://https-github-com-seuusuario-glutty.vercel.app/sitemap.xml",
  };
}
