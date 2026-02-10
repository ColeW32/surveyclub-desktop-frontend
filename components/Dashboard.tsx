
import React from 'react';
import OfferCard from './OfferCard';
import MissionsWidget from './MissionsWidget';
import SurveyTile from './SurveyTile';
import FeaturedOffer from './FeaturedOffer';
import { MOCK_OFFERS, MOCK_SURVEYS } from '../appConstants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-gray-400">
            <span>SURVEYCLUB PLATFORM</span>
            <span>/</span>
            <span className="text-gray-900">DASHBOARD</span>
          </div>
          <h1 className="text-4xl font-normal text-gray-900 leading-none">Earn Cash</h1>
        </div>
      </div>

      {/* Featured Locked Offer */}
      <div className="w-full">
        <FeaturedOffer />
      </div>

      {/* Missions Section */}
      <div className="w-full">
        <MissionsWidget />
      </div>

      {/* Offers Section */}
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">TOP OFFERS FOR YOU</span>
            <div className="h-[1px] w-48 bg-gray-100 mt-2"></div>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            View All Offers
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_OFFERS.slice(0, 3).map(offer => (
            <OfferCard 
              key={offer.id}
              title={offer.title}
              provider={offer.provider}
              amount={offer.amount}
              image={offer.image}
              category={offer.category}
            />
          ))}
        </div>
      </div>

      {/* Surveys Section - Enhanced with more space for new card height */}
      <div className="space-y-8">
        <div className="flex justify-between items-end px-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">HIGHEST PAYING SURVEYS</span>
            <div className="h-[1px] w-48 bg-gray-100 mt-2"></div>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center">
            <span>EXPLORE ALL</span>
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
        
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-10 pt-4 px-2 scroll-smooth">
            {MOCK_SURVEYS.map(survey => (
              <SurveyTile key={survey.id} survey={survey} />
            ))}
          </div>
          {/* Edge shadow for scroll depth */}
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-[#f8f9fa] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

// Supporting import for the "EXPLORE ALL" button
import { ChevronRight } from 'lucide-react';

export default Dashboard;
