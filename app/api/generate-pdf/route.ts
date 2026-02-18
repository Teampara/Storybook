import { NextRequest, NextResponse } from "next/server";
import { renderPrintPageToPdf } from "@/lib/pdf";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { storyId } = await request.json();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const printUrl = `${appUrl}/storybook/story/${storyId}/print`;

  const pdfBuffer = await renderPrintPageToPdf(printUrl);

  if (supabase) {
    const path = `pdfs/${storyId}.pdf`;
    await supabase.storage.from("storybook").upload(path, pdfBuffer, {
      upsert: true,
      contentType: "application/pdf",
    });
    const { data } = supabase.storage.from("storybook").getPublicUrl(path);
    await supabase.from("stories").update({ pdf_url: data.publicUrl }).eq("id", storyId);

    return NextResponse.json({ ok: true, pdfUrl: data.publicUrl });
  }

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=storybook-${storyId}.pdf`,
    },
  });
}
