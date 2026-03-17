import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function WizardFooter({ currentStep, canContinue, onBack, onContinue, isLastStep }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark p-3 sm:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))] z-40">
      <div className="container-wide flex items-center justify-between px-4">
        {currentStep === 1 ? (
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-charcoal hover:text-brand text-sm sm:text-base"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        ) : (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-charcoal hover:text-brand text-sm sm:text-base"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Back</span>
          </button>
        )}

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 rounded-full bg-brand text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed h-11 sm:h-12 md:h-14 md:px-8 md:text-lg min-w-28 sm:min-w-40 text-sm sm:text-base px-4 sm:px-6"
        >
          <span className="flex items-center gap-1.5 sm:gap-2">
            {isLastStep ? 'Submit Request' : 'Continue'}
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </button>
      </div>
    </div>
  )
}
