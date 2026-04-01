import { MessageCircle } from 'lucide-react'

export default function ContactButton() {
  return (
    <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-4 md:bottom-6 md:right-6 z-50">
      <a
        href="mailto:info@master1tech.com"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-2xl flex items-center justify-center transition-all bg-accent/20 backdrop-blur-sm border border-accent/30 hover:bg-accent hover:border-accent hover:text-charcoal hover:scale-105 active:scale-95 text-accent"
        aria-label="Contact us"
        
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  )
}
