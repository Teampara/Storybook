import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { to, link } = await request.json();

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME ?? "storybook_ready";

  if (!token || !phoneNumberId) {
    return NextResponse.json({ error: "Missing WhatsApp API credentials" }, { status: 500 });
  }

  const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en_US" },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: `Your story is ready! Download here: ${link}` }],
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to send WhatsApp template" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
