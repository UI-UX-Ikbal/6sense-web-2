import { z } from "zod";
import { bookingSchema } from "@/lib/booking";

/**
 * Meeting booking endpoint (stub).
 * Validates the scheduler payload with the same schema as the form.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = bookingSchema.safeParse(payload);
  if (!result.success) {
    return Response.json(
      {
        error: "Invalid booking.",
        fields: z.flattenError(result.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  // TODO(booking): forward `result.data` to the real scheduling endpoint (calendar provider /
  // CRM), check the slot is still free, and send the confirmation email.

  return Response.json({ ok: true }, { status: 201 });
}
