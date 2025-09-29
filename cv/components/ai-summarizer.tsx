"use client"

import { useCallback, useMemo, useState } from "react"

type Props = {
  targetSelector?: string

  language?: "id" | "en"
}

export function AISummarizer({ targetSelector = "#cv-content", language = "id" }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)

  const grabContent = useCallback(() => {
    const el = document.querySelector<HTMLElement>(targetSelector)
    if (!el) return ""

    return el.innerText.trim()
  }, [targetSelector])

  const basicSummarize = useCallback((text: string) => {
    const lines = text
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)

    const expMatch = text.match(/(\d+)\+?\s*tahun/i)
    const pengalaman = expMatch ? `${expMatch[1]}+ tahun pengalaman` : null

    const roleLine = lines.find((l) => /engineer|developer/i.test(l)) || null

    const impactLines = lines
      .filter((l) => /(\d+%|\d+\s*(ms|s)|\bLCP\b|CLS|TTI|\d+\+?\s*(fitur|rilis))/i.test(l))
      .slice(0, 2)

    const skillsStart = lines.findIndex((l) => /^keahlian$/i.test(l))
    const skills: string[] = []
    if (skillsStart >= 0) {
      for (let i = skillsStart + 1; i < lines.length; i++) {
        const v = lines[i]
        if (/^©\s|\bringkas cv\b|\btentang saya\b|\bpengalaman\b|\bpendidikan\b/i.test(v)) break
        if (v.length > 2) skills.push(v)
      }
    }
    const skillsList = skills.slice(0, 6).join(", ")

    // Gabungkan info penting jadi satu paragraf
    let summary = ""
    if (roleLine) summary += `Peran utama: ${roleLine}. `
    if (pengalaman) summary += `Pengalaman: ${pengalaman}. `
    if (impactLines.length > 0) summary += `Dampak: ${impactLines.join(", ")}. `
    if (skillsList) summary += `Keahlian inti: ${skillsList}. `
    if (!summary) summary = lines.find((l) => l.length > 20) || "CV ringkasan tidak tersedia."

    return summary.trim()
  }, [])

  const canSummarize = useMemo(() => !loading, [loading])

  const handleSummarize = useCallback(async () => {
    setLoading(true)
    setError(null)
    setSummary(null)

    try {
      const content = grabContent()
      if (!content) {
        setError("Konten CV tidak ditemukan.")
        setLoading(false)
        return
      }

      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, language }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        const isBilling = res.status === 402 || /billing_required|valid credit card/i.test(text)
        if (isBilling) {
          const local = basicSummarize(content)
          setSummary(`(Ringkasan lokal tanpa AI)\n\n${local}`)
          setError("AI belum diaktifkan. Menampilkan ringkasan lokal.")
          return
        }
        throw new Error(text || "Gagal merangkum.")
      }

      const data = (await res.json()) as { text?: string }
      setSummary(data.text || "(Tidak ada hasil)")
    } catch (e: any) {
      const content = grabContent()
      if (content) {
        const local = basicSummarize(content)
        setSummary(`(Ringkasan lokal tanpa AI)\n\n${local}`)
        setError(e?.message || "Terjadi kesalahan. Menampilkan ringkasan lokal.")
      } else {
        setError(e?.message || "Terjadi kesalahan.")
      }
    } finally {
      setLoading(false)
    }
  }, [grabContent, language, basicSummarize])

  return (
    <div>
      <button className="ai-button" onClick={handleSummarize} disabled={!canSummarize} aria-busy={loading}>
        {loading ? "Sedang merangkum…" : "Ringkas CV saya"}
      </button>
      
      {error && (
        <div role="alert" style={{ color: "crimson", marginTop: "1rem", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      {summary && (
        <div className="ai-result" style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, marginTop: "1rem" }}>
          {summary}
        </div>
      )}
    </div>
  )
}
