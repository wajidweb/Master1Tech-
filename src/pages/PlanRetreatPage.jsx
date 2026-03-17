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
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Thank You, {formData.details.name}!
          </h1>
          <p className="text-slate text-sm sm:text-base mb-8 leading-relaxed">
            Your retreat request has been received. Our team will craft a personalized
            proposal for {formData.details.company} and send it to {formData.details.email} within 48 hours.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-white transition-all hover:bg-brand-hover"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-dark">
        <div className="container-wide py-3 sm:py-4 px-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/">
                <span className="font-heading text-lg sm:text-xl font-bold text-charcoal">
                  Master<span className="text-accent">1</span>Tech
                </span>
              </Link>
              <span className="text-xs sm:text-sm text-slate">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-charcoal">
              {stepNames[currentStep - 1]}
            </span>
          </div>
          <WizardProgress currentStep={currentStep} />
        </div>
      </div>

      <div className="container-wide py-6 sm:py-8 md:py-12 px-4">
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
