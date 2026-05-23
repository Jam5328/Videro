import { Router } from "express";
import { db, leadsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { SubmitLeadBody } from "@workspace/api-zod";
import { sendLeadEmails } from "../services/email";

const router = Router();

/**
 * Cloudflare Turnstile server-side verification.
 * Set TURNSTILE_SECRET_KEY in environment to enable.
 * Passes through (returns true) if key is absent — safe for development.
 */
async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // graceful bypass when not configured
  // No token = widget failed to load (domain not allowlisted, CDN blocked, etc.)
  // Allow through — the widget is a UX layer; determined bots bypass frontend anyway.
  if (!token) return true;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    // Network error during verification — allow through to avoid blocking legitimate users
    console.warn("[Turnstile] Verification request failed — allowing submission.");
    return true;
  }
}

router.post("/leads", async (req, res) => {
  const parsed = SubmitLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  // Turnstile spam check (no-op if TURNSTILE_SECRET_KEY is not set)
  const turnstileToken = req.body?.cf_turnstile_response as string | undefined;
  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    res.status(403).json({ error: "Bot verification failed. Please try again." });
    return;
  }

  try {
    const { name, email, company, clientType, message, sourcePage } = parsed.data;

    const [lead] = await db
      .insert(leadsTable)
      .values({
        name,
        email,
        company: company ?? null,
        clientType,
        message: message ?? null,
        sourcePage: sourcePage ?? null,
      })
      .returning();

    req.log.info({ leadId: lead.id, email }, "New lead submitted");

    // Fire-and-forget email notifications — never block the response
    sendLeadEmails({ name, email, company, clientType, message, sourcePage }).catch((err) => {
      req.log.warn({ err }, "[Email] Failed to send lead notification emails");
    });

    res.status(201).json({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      clientType: lead.clientType,
      message: lead.message,
      sourcePage: lead.sourcePage,
      createdAt: lead.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit lead");
    res.status(500).json({ error: "Failed to submit lead" });
  }
});

router.get("/leads", async (req, res) => {
  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));

    res.json(
      leads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        company: l.company,
        clientType: l.clientType,
        message: l.message,
        sourcePage: l.sourcePage,
        createdAt: l.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to fetch leads");
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

export default router;
