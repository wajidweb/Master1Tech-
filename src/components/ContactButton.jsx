import { MessageCircle } from 'lucide-react'

export default function ContactButton() {
  return (
    <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-4 md:bottom-6 md:right-6 z-50">
      <a
        href="mailto:info@master1tech.com"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all bg-gradient-to-br from-brand to-brand-hover hover:from-brand-light hover:to-brand hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label="Contact us"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </a>
      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 flex h-3 w-3 sm:h-4 sm:w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-accent" />
      </span>
    </div>
  )
}
