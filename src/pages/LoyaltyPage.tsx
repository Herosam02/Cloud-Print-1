import React, { useState } from 'react';
import { 
  Star, 
  Gift, 
  Crown, 
  Award, 
  Users, 
  TrendingUp,
  Calendar,
  CheckCircle,
  Copy,
  Share2,
  ExternalLink,
  Zap,
  Target,
  Trophy,
  Heart,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoyaltyPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Mock data - in real app this would come from API
  const loyaltyData = {
    currentPoints: user?.loyaltyPoints || 1250,
    totalEarned: 3450,
    totalRedeemed: 2200,
    tier: user?.loyaltyPoints >= 2000 ? 'platinum' : user?.loyaltyPoints >= 1000 ? 'gold' : user?.loyaltyPoints >= 500 ? 'silver' : 'bronze',
    nextTierPoints: user?.loyaltyPoints >= 2000 ? 0 : user?.loyaltyPoints >= 1000 ? 2000 - (user?.loyaltyPoints || 0) : user?.loyaltyPoints >= 500 ? 1000 - (user?.loyaltyPoints || 0) : 500 - (user?.loyaltyPoints || 0),
    referralCode: `PRINT${user?.name?.toUpperCase().replace(/\s+/g, '') || 'USER'}24`,
    referralsCount: 8,
    referralEarnings: 4000
  };

  const tiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      color: 'bg-amber-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      icon: <Award className="h-6 w-6" />,
      benefits: ['5% cashback on orders', 'Birthday discount', 'Email support']
    },
    {
      name: 'Silver',
      minPoints: 500,
      color: 'bg-gray-400',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      icon: <Star className="h-6 w-6" />,
      benefits: ['7% cashback on orders', 'Priority email support', 'Free design consultation']
    },
    {
      name: 'Gold',
      minPoints: 1000,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: <Crown className="h-6 w-6" />,
      benefits: ['10% cashback on orders', 'Priority phone support', 'Free rush orders', 'Exclusive templates']
    },
    {
      name: 'Platinum',
      minPoints: 2000,
      color: 'bg-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: <Trophy className="h-6 w-6" />,
      benefits: ['15% cashback on orders', 'Dedicated account manager', 'Free design service', 'VIP events']
    }
  ];

  const rewards = [
    {
      id: 1,
      name: '₦500 Off Next Order',
      points: 500,
      description: 'Get ₦500 discount on your next printing order',
      category: 'discount',
      available: true
    },
    {
      id: 2,
      name: 'Free Business Cards (500 pcs)',
      points: 1000,
      description: 'Get 500 premium business cards absolutely free',
      category: 'product',
      available: true
    },
    {
      id: 3,
      name: '₦1,000 Off Next Order',
      points: 1000,
      description: 'Get ₦1,000 discount on orders above ₦5,000',
      category: 'discount',
      available: true
    },
    {
      id: 4,
      name: 'Free Design Service',
      points: 1500,
      description: 'Get professional design service for any project',
      category: 'service',
      available: true
    },
    {
      id: 5,
      name: 'Premium Template Access',
      points: 750,
      description: '1-month access to all premium design templates',
      category: 'service',
      available: true
    },
    {
      id: 6,
      name: '₦2,500 Off Large Orders',
      points: 2000,
      description: 'Get ₦2,500 discount on orders above ₦15,000',
      category: 'discount',
      available: loyaltyData.currentPoints >= 2000
    }
  ];

  const recentActivity = [
    {
      date: '2024-01-20',
      action: 'Earned',
      points: 250,
      description: 'Order ORD-2024-001 completed',
      type: 'earn'
    },
    {
      date: '2024-01-18',
      action: 'Redeemed',
      points: -500,
      description: '₦500 discount used',
      type: 'redeem'
    },
    {
      date: '2024-01-15',
      action: 'Earned',
      points: 300,
      description: 'Referral bonus - Friend signed up',
      type: 'earn'
    },
    {
      date: '2024-01-10',
      action: 'Earned',
      points: 175,
      description: 'Order ORD-2024-002 completed',
      type: 'earn'
    }
  ];

  const currentTier = tiers.find(tier => 
    loyaltyData.currentPoints >= tier.minPoints && 
    (tiers.indexOf(tier) === tiers.length - 1 || loyaltyData.currentPoints < tiers[tiers.indexOf(tier) + 1].minPoints)
  ) || tiers[0];

  const nextTier = tiers[tiers.indexOf(currentTier) + 1];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(loyaltyData.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <Star className="h-4 w-4" /> },
    { id: 'rewards', name: 'Rewards', icon: <Gift className="h-4 w-4" /> },
    { id: 'referrals', name: 'Referrals', icon: <Users className="h-4 w-4" /> },
    { id: 'activity', name: 'Activity', icon: <TrendingUp className="h-4 w-4" /> }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to sign in to view your loyalty rewards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`${currentTier.color} rounded-full p-4`}>
                {currentTier.icon}
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Loyalty Rewards</h1>
            <p className="text-xl text-purple-100 mb-6">
              You're a <span className="font-semibold">{currentTier.name}</span> member with <span className="font-bold">{loyaltyData.currentPoints}</span> points
            </p>
            
            {/* Progress to Next Tier */}
            {nextTier && (
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span>{currentTier.name}</span>
                  <span>{nextTier.name}</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${((loyaltyData.currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-sm text-purple-200 mt-2">
                  {loyaltyData.nextTierPoints} more points to reach {nextTier.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Current Points</p>
                    <p className="text-2xl font-bold text-gray-900">{loyaltyData.currentPoints}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Earned</p>
                    <p className="text-2xl font-bold text-gray-900">{loyaltyData.totalEarned}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Gift className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Redeemed</p>
                    <p className="text-2xl font-bold text-gray-900">{loyaltyData.totalRedeemed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Referrals</p>
                    <p className="text-2xl font-bold text-gray-900">{loyaltyData.referralsCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your {currentTier.name} Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentTier.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* All Tiers */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Membership Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tiers.map((tier, index) => (
                  <div 
                    key={tier.name} 
                    className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                      tier.name === currentTier.name 
                        ? `${tier.bgColor} border-2 ${tier.textColor.replace('text-', 'border-')} shadow-lg` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`${tier.color} rounded-full p-3 inline-flex mb-4`}>
                        {tier.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <p className="text-gray-600 mb-4">{tier.minPoints}+ points</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map(reward => (
                  <div 
                    key={reward.id} 
                    className={`border rounded-xl p-6 transition-all duration-300 ${
                      reward.available 
                        ? 'border-gray-200 hover:border-purple-300 hover:shadow-lg' 
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${
                        reward.category === 'discount' ? 'bg-green-100 text-green-600' :
                        reward.category === 'product' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {reward.category === 'discount' ? <Target className="h-5 w-5" /> :
                         reward.category === 'product' ? <Gift className="h-5 w-5" /> :
                         <Sparkles className="h-5 w-5" />}
                      </div>
                      <span className="text-2xl font-bold text-purple-600">{reward.points}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-gray-600 mb-4">{reward.description}</p>
                    
                    <button 
                      disabled={!reward.available}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        reward.available 
                          ? 'bg-purple-600 text-white hover:bg-purple-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {reward.available ? 'Redeem Now' : 'Not Enough Points'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="space-y-8">
            {/* Referral Overview */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg text-white p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Refer Friends & Earn</h2>
                <p className="text-xl text-green-100 mb-6">
                  Both you and your friend get ₦500 off when they place their first order!
                </p>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-sm text-green-100 mb-2">Your Referral Code:</p>
                  <div className="flex items-center space-x-3">
                    <code className="bg-white bg-opacity-20 px-4 py-2 rounded-lg font-mono text-lg font-bold flex-1">
                      {loyaltyData.referralCode}
                    </code>
                    <button
                      onClick={copyReferralCode}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                    >
                      {copiedCode ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                  {copiedCode && (
                    <p className="text-sm text-green-200 mt-2">Code copied to clipboard!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Referrals</p>
                    <p className="text-2xl font-bold text-gray-900">{loyaltyData.referralsCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Points Earned</p>
                    <p className="text-2xl font-bold text-gray-900">{loyaltyData.referralEarnings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Bonus Earned</p>
                    <p className="text-2xl font-bold text-gray-900">₦{(loyaltyData.referralsCount * 500).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Share Your Code</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <Share2 className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Share via WhatsApp</span>
                </button>
                
                <button className="flex items-center justify-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                  <ExternalLink className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-700">Share via Email</span>
                </button>
                
                <button className="flex items-center justify-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Copy className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Points Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {activity.type === 'earn' ? <TrendingUp className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${
                    activity.type === 'earn' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.type === 'earn' ? '+' : ''}{activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyPage;