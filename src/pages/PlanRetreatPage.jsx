import { useState } from 'react'
import { Link } from 'react-router-dom'
import WizardProgress, { stepNames } from '../components/wizard/WizardProgress'
import WizardFooter from '../components/wizard/WizardFooter'
import StepWhere from '../components/wizard/StepWhere'
import StepWhen from '../components/wizard/StepWhen'
import StepWho from '../components/wizard/StepWho'
import StepStyle from '../components/wizard/StepStyle'
import StepDetails from '../components/wizard/StepDetails'
import { CheckCircle } from 'lucide-react'

const TOTAL_STEPS = 5

export default function PlanRetreatPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    where: [],
    when: '',
    who: {},
    style: {},
    details: {},
  })

  const canContinue = () => {
    switch (currentStep) {
      case 1: return formData.where.length > 0
      case 2: return formData.when !== ''
      case 3: return formData.who.size && formData.who.type
      case 4: return formData.style.style
      case 5: return formData.details.name && formData.details.email && formData.details.company && formData.details.role
      default: return false
    }
  }

  const handleContinue = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      setSubmitted(true)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <CheckCircle className="h-14 w-14 text-accent mx-auto mb-6" />
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-white mb-4">
            Thank You, <span className="text-accent">{formData.details.name}</span>
          </h1>
          <p className="text-white/40 text-sm sm:text-base mb-8 leading-relaxed font-semibold">
            Your retreat request has been received. Our team will craft a personalized
            proposal for <strong className="text-white/60">{formData.details.company}</strong> and
            send it to {formData.details.email} within 48 hours.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal px-8 py-3 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-xl border-b border-white/5">
        <div className="container-wide py-3 sm:py-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Link to="/">
                <span className="font-heading text-xl font-semibold text-white">
                  Master<span className="text-accent">1</span>Tech
                </span>
              </Link>
              <span className="text-[11px] text-white/30 tracking-wider uppercase">
                Step {currentStep}/{TOTAL_STEPS}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-white/50 tracking-wider uppercase">
              {stepNames[currentStep - 1]}
            </span>
          </div>
          <WizardProgress currentStep={currentStep} />
        </div>
      </div>

      <div className="container-wide py-8 sm:py-10 md:py-14 px-4">
        {currentStep === 1 && (
          <StepWhere
            selected={formData.where}
            onUpdate={(val) => setFormData({ ...formData, where: val })}
          />
        )}
        {currentStep === 2 && (
          <StepWhen
            selected={formData.when}
            onUpdate={(val) => setFormData({ ...formData, when: val })}
          />
        )}
        {currentStep === 3 && (
          <StepWho
            selected={formData.who}
            onUpdate={(val) => setFormData({ ...formData, who: val })}
          />
        )}
        {currentStep === 4 && (
          <StepStyle
            selected={formData.style}
            onUpdate={(val) => setFormData({ ...formData, style: val })}
          />
        )}
        {currentStep === 5 && (
          <StepDetails
            selected={formData.details}
            onUpdate={(val) => setFormData({ ...formData, details: val })}
          />
        )}
      </div>

      <div className="h-20 sm:h-24" />

      <WizardFooter
        currentStep={currentStep}
        canContinue={canContinue()}
        onBack={handleBack}
        onContinue={handleContinue}
        isLastStep={currentStep === TOTAL_STEPS}
      />
    </div>
  )
}
