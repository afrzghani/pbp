import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        {
          code: "missing_groq_key",
          message: "Groq belum dikonfigurasi. Tambahkan GROQ_API_KEY di Project Settings > Environment Variables.",
        },
        { status: 500 },
      )
    }
    const { content, language = "id" } = (await req.json()) as { content?: string; language?: "id" | "en" }
    if (!content || typeof content !== "string" || content.length < 20) {
      return new Response("Konten tidak valid untuk dirangkum.", { status: 400 })
    }

    const prompt =
      language === "id"
<<<<<<< HEAD
        ? `Ringkas CV berikut menjadi satu paragraf singkat, informatif, dan mudah dibaca (bukan bullet point), seolah-olah orang lain yang membacakan (.gunakan sudut pandang orang ketiga). Fokus pada: jabatan, lama pengalaman, dampak, keahlian inti, dan alat/teknologi. Hindari kalimat bertele-tele. Konten:\n\n${content}`
        : `Summarize the following CV into a single, concise, informative paragraph (not bullet points), as if written by someone else (use third-person perspective). Focus on: roles, years of experience, impact, core skills, and tools/technologies. Avoid fluff. Content:\n\n${content}`
=======
        ? `Ringkas CV berikut menjadi 5–7 poin yang jelas dan spesifik (gunakan bullet points). Fokus pada: jabatan, lama pengalaman, dampak terukur, keahlian inti, dan alat/teknologi. Hindari kalimat bertele-tele. Konten:\n\n${content}`
        : `Summarize the following CV into 5–7 clear, specific bullet points. Focus on: roles, years of experience, measurable impact, core skills, and tools/technologies. Avoid fluff. Content:\n\n${content}`
>>>>>>> 0ca84e10ed0614782ca9368850695d1a1adf8a91

    console.log("summarize using Groq model:", "llama-3.1-8b-instant")
    console.log("GROQ key present:", !!process.env.GROQ_API_KEY)

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
      maxOutputTokens: 350,
      temperature: 0.3,
    })

    return Response.json({ text })
  } catch (err: any) {
    const msg = (err?.message || "").toString()
    if (/requires a valid credit card/i.test(msg)) {
      console.error("[v0] summarize error (billing):", msg)
      return Response.json(
        {
          code: "billing_required",
          message:
            "AI belum diaktifkan.",
        },
        { status: 402 },
      )
    }

    console.error("summarize error:", msg || err)
    return new Response("Terjadi kesalahan saat merangkum.", { status: 500 })
  }
}
