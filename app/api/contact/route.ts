import { z } from "zod";
import { contactSchema } from "@/lib/contact";

/**
 * Contact form endpoint (stub).
 * Validates the payload with the same schema as the form.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return Response.json(
      {
        error: "Invalid request.",
        fields: z.flattenError(result.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot filled: answer like a success so bots learn nothing, but drop the message.
  if (result.data.website !== "") {
    return Response.json({ ok: true }, { status: 201 });
  }

  // TODO(contact): forward `result.data` (minus `website`) to the real endpoint
  // (CRM / helpdesk / email service) and send the confirmation email.

  return Response.json({ ok: true }, { status: 201 });
}
