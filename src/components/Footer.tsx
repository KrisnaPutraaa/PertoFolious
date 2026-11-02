import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted md:flex-row md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-6">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-text">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-text">
            LinkedIn
          </a>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-text">
            WhatsApp
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-text">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
