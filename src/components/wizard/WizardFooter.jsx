import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function WizardFooter({ currentStep, canContinue, onBack, onContinue, isLastStep }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-charcoal/95 backdrop-blur-xl border-t border-white/5 p-3 sm:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))] z-40">
      <div className="container-wide flex items-center justify-between px-4">
        {currentStep === 1 ? (
          <Link
            to="/"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-medium transition-all text-white/40 hover:text-white text-[13px] tracking-wider uppercase"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        ) : (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-medium transition-all text-white/40 hover:text-white text-[13px] tracking-wider uppercase"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        )}

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-accent h-11 sm:h-12 min-w-28 sm:min-w-40 text-[13px] tracking-wider uppercase px-5 sm:px-7"
        >
          <span className="flex items-center gap-2">
            {isLastStep ? 'Submit' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  )
}
