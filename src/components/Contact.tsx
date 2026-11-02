import { useState } from 'react'
import { profile } from '../data/portfolio'
import { useLang } from '../i18n'
import Reveal from './Reveal'

export default function Contact() {
  const { t } = useLang()
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
        <p className="mb-6 font-pixel text-sm text-accent">{t.contact.label}</p>
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] font-semibold tracking-tight">
          {t.contact.title}
          <br />
          <span className="text-muted">{t.contact.titleMuted}</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-muted">{t.contact.text}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5">
            {t.contact.email}
          </a>
          <a
            href={`https://wa.me/${profile.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm transition-colors hover:bg-surface"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6c1.8 1 3.7 1.5 5.7 1.5 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.5z" />
            </svg>
            WhatsApp
          </a>
          <button onClick={copyEmail} className="rounded-full border border-line px-7 py-3.5 text-sm transition-colors hover:bg-surface">
            {copied ? t.contact.copied : profile.email}
          </button>
        </div>
      </Reveal>
    </section>
  )
}
