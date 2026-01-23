import { Check, CreditCard, Calendar, Users, Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface AdminSubscriptionManagementProps {
  onSignOut: () => void;
}

export function AdminSubscriptionManagement({ onSignOut }: AdminSubscriptionManagementProps) {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCardUpdateModalOpen, setIsCardUpdateModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [currentPlanState, setCurrentPlanState] = useState('Professional');
  
  // Card update form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');

  // Current plan details
  const currentPlan = {
    name: currentPlanState,
    price: currentPlanState === 'Starter' ? 249 : currentPlanState === 'Professional' ? 599 : 2000,
    billingCycle: 'Monthly',
    nextBillingDate: 'February 20, 2026',
    teamMembers: currentPlanState === 'Starter' ? 3 : currentPlanState === 'Professional' ? 10 : 'Unlimited',
    jobPostings: currentPlanState === 'Starter' ? '10' : 'Unlimited',
    aiInterviews: currentPlanState === 'Starter' ? 100 : currentPlanState === 'Professional' ? 500 : 'Unlimited',
    storage: currentPlanState === 'Starter' ? '25 GB' : currentPlanState === 'Professional' ? '100 GB' : '1 TB'
  };

  // Available plans for upgrade
  const plans = [
    {
      name: 'Starter',
      price: 249,
      billingCycle: 'month',
      features: [
        'Up to 3 team members',
        '10 job postings',
        '100 AI interviews/month',
        '25 GB storage',
        'Email support'
      ],
      isCurrent: currentPlanState === 'Starter'
    },
    {
      name: 'Professional',
      price: 599,
      billingCycle: 'month',
      features: [
        'Up to 10 team members',
        'Unlimited job postings',
        '500 AI interviews/month',
        '100 GB storage',
        'Priority support',
        'Advanced analytics'
      ],
      isCurrent: currentPlanState === 'Professional'
    },
    {
      name: 'Enterprise',
      price: 2000,
      billingCycle: 'month',
      features: [
        'Unlimited team members',
        'Unlimited job postings',
        'Unlimited AI interviews',
        '1 TB storage',
        '24/7 dedicated support',
        'Custom integrations',
        'SLA guarantee'
      ],
      isCurrent: currentPlanState === 'Enterprise'
    }
  ];

  const handleUpgrade = (plan: any) => {
    setSelectedPlan(plan);
    setIsUpgradeModalOpen(true);
  };

  const handleCardUpdate = () => {
    setIsCardUpdateModalOpen(true);
  };

  const handleUpgradeConfirm = () => {
    if (selectedPlan) {
      setCurrentPlanState(selectedPlan.name);
      toast.success(`Upgraded to ${selectedPlan.name} plan`);
      setIsUpgradeModalOpen(false);
    }
  };

  const handleCardUpdateConfirm = () => {
    toast.success('Card updated successfully');
    setIsCardUpdateModalOpen(false);
  };

  return (
    <div className="px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 text-3xl mb-2">Subscription Management</h1>
        <p className="text-gray-500">Manage your organization's subscription plan</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">Current Plan</h2>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                {currentPlan.name}
              </span>
            </div>
            <p className="text-gray-500">Your subscription is active and in good standing</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">${currentPlan.price}</div>
            <div className="text-gray-500 text-sm">per {currentPlan.billingCycle.toLowerCase()}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Team Members</div>
              <div className="text-lg font-semibold text-gray-900">{currentPlan.teamMembers}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <Zap size={20} className="text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Job Postings</div>
              <div className="text-lg font-semibold text-gray-900">{currentPlan.jobPostings}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
              <CreditCard size={20} className="text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">AI Interviews</div>
              <div className="text-lg font-semibold text-gray-900">{currentPlan.aiInterviews}/mo</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Next Billing</div>
              <div className="text-lg font-semibold text-gray-900">{currentPlan.nextBillingDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                plan.isCurrent
                  ? 'border-indigo-600 ring-2 ring-indigo-100'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.billingCycle}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.isCurrent}
                className={`w-full h-12 rounded-lg font-medium transition-all ${
                  plan.isCurrent
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2'
                }`}
                onClick={() => handleUpgrade(plan)}
              >
                {plan.isCurrent ? (
                  'Current Plan'
                ) : (
                  <>
                    {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <CreditCard size={24} className="text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</div>
              <div className="text-sm text-gray-500">Expires 12/2027</div>
            </div>
          </div>
          <button className="h-10 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors" onClick={handleCardUpdate}>
            Update Card
          </button>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upgrade Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to upgrade to the {selectedPlan?.name} plan?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUpgradeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleUpgradeConfirm}>
              Upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Card Update Modal */}
      <Dialog open={isCardUpdateModalOpen} onOpenChange={setIsCardUpdateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Card</DialogTitle>
            <DialogDescription>
              Enter your new card details to update your payment method.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="CVC"
                value={cardCVC}
                onChange={(e) => setCardCVC(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCardUpdateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCardUpdateConfirm}>
              Update Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}