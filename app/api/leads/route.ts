import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { name, email, phone, services, website } = body as Record<string, unknown>;

  // Honeypot: bots preenchem campos ocultos como "website".
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const phoneDigits = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
  if (phoneDigits.length < 10) {
    return NextResponse.json({ error: "Telefone inválido." }, { status: 400 });
  }

  console.log("[lead]", {
    name: typeof name === "string" ? name : "",
    email,
    phone: phoneDigits,
    services: Array.isArray(services) ? services : [],
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
