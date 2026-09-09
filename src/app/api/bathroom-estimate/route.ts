import { NextResponse } from "next/server";
import {
  calculateEstimate,
  COUNTY_LABELS,
  FINISH_LABELS,
  PROJECT_TYPE_LABELS,
  SIZE_LABELS,
  UPGRADE_LABELS,
  type BathroomSize,
  type County,
  type EstimateInput,
  type FinishLevel,
  type ProjectType,
  type Upgrade,
} from "@/lib/estimate";
import { site } from "@/lib/site";

type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  timeline: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOL_KEYS = [
  "secondFloor",
  "waterDamage",
  "builtBefore1980",
  "ceilingToo",
  "movingPlumbing",
  "movingWalls",
  "permitsNeeded",
] as const;

function isEstimateInput(v: unknown): v is EstimateInput {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.size === "string" &&
    o.size in SIZE_LABELS &&
    typeof o.projectType === "string" &&
    o.projectType in PROJECT_TYPE_LABELS &&
    Array.isArray(o.upgrades) &&
    o.upgrades.every((u) => typeof u === "string" && u in UPGRADE_LABELS) &&
    typeof o.finish === "string" &&
    o.finish in FINISH_LABELS &&
    typeof o.county === "string" &&
    o.county in COUNTY_LABELS &&
    BOOL_KEYS.every((k) => typeof o[k] === "boolean")
  );
}

function isContact(v: unknown): v is Contact {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.firstName === "string" &&
    o.firstName.trim().length > 0 &&
    typeof o.lastName === "string" &&
    o.lastName.trim().length > 0 &&
    typeof o.email === "string" &&
    EMAIL_RE.test(o.email) &&
    typeof o.phone === "string" &&
    o.phone.replace(/\D/g, "").length >= 10 &&
    typeof o.city === "string" &&
    typeof o.zip === "string" &&
    o.zip.replace(/\D/g, "").length >= 5 &&
    typeof o.timeline === "string"
  );
}

function summaryLines(
  input: EstimateInput,
  contact: Contact,
  low: number,
  high: number,
  confidence: number,
): string[] {
  const upgrades = input.upgrades.length
    ? input.upgrades.map((u) => UPGRADE_LABELS[u as Upgrade]).join(", ")
    : "None selected";
  const flags = [
    input.secondFloor && "Second floor",
    input.waterDamage && "Existing water damage",
    input.builtBefore1980 && "Home built before 1980",
    input.ceilingToo && "Include the ceiling",
    input.movingPlumbing && "Moving plumbing",
    input.movingWalls && "Moving walls",
    input.permitsNeeded && "Permits needed",
  ].filter(Boolean);
  return [
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
    `City / ZIP: ${contact.city || "—"} ${contact.zip}`,
    `Timeline: ${contact.timeline || "—"}`,
    "",
    `Estimate shown: $${low.toLocaleString()} – $${high.toLocaleString()} (confidence ${confidence}%)`,
    "",
    `Bathroom size: ${SIZE_LABELS[input.size as BathroomSize]}`,
    `Project type: ${PROJECT_TYPE_LABELS[input.projectType as ProjectType]}`,
    `Finish level: ${FINISH_LABELS[input.finish as FinishLevel]}`,
    `Location: ${COUNTY_LABELS[input.county as County]}`,
    `Upgrades: ${upgrades}`,
    `Details: ${flags.length ? flags.join(", ") : "none"}`,
  ];
}

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown> | null;
  if (!b || !isEstimateInput(b.input) || !isContact(b.contact)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const input = b.input as EstimateInput;
  const contact = b.contact as Contact;
  const { low, high, midpoint, confidence } = calculateEstimate(input);

  const lines = summaryLines(input, contact, low, high, confidence);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ESTIMATE_FROM_EMAIL ?? "estimates@10daykitchens.com";
  let emailed = false;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `${site.name} Estimator <${from}>`,
        to: ["office@10daykitchens.com"],
        replyTo: contact.email,
        subject: `New bathroom estimate lead — ${contact.firstName} ${contact.lastName}, ${
          contact.city || contact.zip
        }`,
        text: lines.join("\n"),
        html: `<pre style="font:14px/1.6 -apple-system,Segoe UI,sans-serif">${lines
          .map(escapeHtml)
          .join("\n")}</pre>`,
      });
      emailed = true;
    } catch (error) {
      console.error("bathroom-estimate: Resend send failed", error);
    }
  } else {
    console.warn("bathroom-estimate: RESEND_API_KEY not set — lead not emailed");
  }

  return NextResponse.json({ low, high, midpoint, confidence, emailed });
}
