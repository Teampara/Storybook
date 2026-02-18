import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const bodyText = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

  const expectedSignature = crypto.createHmac("sha256", secret).update(bodyText).digest("hex");
  if (signature !== expectedSignature) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(bodyText);

  if (payload.event === "payment.captured" && supabase) {
    const receipt = payload.payload.payment.entity.notes?.receipt;
    if (receipt) {
      await supabase.from("stories").update({ is_paid: true }).eq("id", receipt);
    }
  }

  return NextResponse.json({ ok: true });
}
