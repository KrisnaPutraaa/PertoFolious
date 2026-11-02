import { useState } from 'react'
import { profile } from '../data/portfolio'
import Reveal from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-40">
      <Reveal className="text-center">
        <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent uppercase">06 — Contact</p>
        <h2 className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
          Let’s build something
          <br />
          <span className="text-muted italic">reliable together.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-muted">
          Open to internships, full-time roles and collaborations in software engineering, QA and data.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Send an email
          </a>
          <button
            onClick={copyEmail}
            className="rounded-full border border-line px-7 py-3.5 font-mono text-sm transition-colors hover:bg-surface"
          >
            {copied ? 'Copied ✓' : profile.email}
          </button>
        </div>
      </Reveal>
    </section>
  )
}
