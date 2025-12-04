import React from 'react';
import { STREAMING_SERVICE_INFO } from '../data/streamingServices';

export function StreamingDeals() {
  const dealsData = [
    {
      service: 'Netflix',
      plan: 'Standard with ads',
      price: '$6.99/month',
      features: ['HD quality', 'Limited ads', '2 devices'],
      highlight: false
    },
    {
      service: 'Netflix',
      plan: 'Standard',
      price: '$15.49/month',
      features: ['Full HD (1080p)', 'Ad-free', '2 simultaneous streams'],
      highlight: true
    },
    {
      service: 'Disney+',
      plan: 'Bundle: Disney+, Hulu, ESPN+',
      price: '$14.99/month',
      features: ['3 streaming services', 'Best value', 'Ad-supported'],
      highlight: true
    },
    {
      service: 'Hulu',
      plan: 'Hulu + Live TV',
      price: '$76.99/month',
      features: ['95+ live channels', 'Unlimited DVR', 'Disney+ & ESPN+ included'],
      highlight: false
    },
    {
      service: 'Max',
      plan: 'With Ads',
      price: '$9.99/month',
      features: ['HD streaming', 'Limited ads', 'All HBO content'],
      highlight: false
    },
    {
      service: 'Prime Video',
      plan: 'Prime Membership',
      price: '$14.99/month',
      features: ['Free shipping', 'Prime Video', 'Music & more'],
      highlight: true
    }
  ];

  // Sort: Best Value (highlight) items first
  const deals = [...dealsData].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">Streaming Deals & Packages</h1>
        <p className="text-white/50 text-lg">Find the best streaming service plans for your budget</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal, index) => {
          const serviceInfo = STREAMING_SERVICE_INFO[deal.service] || {};
          
          return (
            <div
              key={index}
              className={`relative bg-white/[0.02] backdrop-blur-sm rounded-2xl border ${
                deal.highlight ? 'border-purple-500/30' : 'border-white/[0.08]'
              } p-6 hover:bg-white/[0.04] transition-all duration-300 ${
                deal.highlight ? 'shadow-xl shadow-purple-500/10' : ''
              }`}
            >
              {deal.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full text-base font-bold text-white">
                  Best Value
                </div>
              )}
              
              <div className="space-y-4">
                {/* Service Logo */}
                {serviceInfo.logo && (
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center p-3">
                    <img
                      src={serviceInfo.logo}
                      alt={deal.service}
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                )}
                
                {/* Plan Name and Price on same line */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{deal.service}</h3>
                    <p className="text-sm text-white/60">{deal.plan}</p>
                  </div>
                  <div className="text-lg font-bold text-white whitespace-nowrap">{deal.price}</div>
                </div>
                
                {/* Features */}
                <ul className="space-y-2">
                  {deal.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="text-purple-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <a
                  href={serviceInfo.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                    deal.highlight
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white'
                  }`}
                >
                  Learn More
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-white/30 mt-8">
        Prices are subject to change. Visit official websites for current pricing and promotions.
      </p>
    </div>
  );
}
