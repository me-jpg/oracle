import React, { useState } from 'react';
import { ResultCard } from './ResultCard';

export function MyListView({ userData, toast }) {
  const { myList, watchHistory } = userData;
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="relative flex items-center gap-0 bg-white/[0.02] rounded-lg px-0.5 py-0.5 border border-white/[0.04] overflow-hidden backdrop-blur-sm w-fit">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-purple-500/20 to-purple-600/15 blur-2xl"></div>
        <button
          onClick={() => setActiveTab('list')}
          className={`relative z-10 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 text-white ${
            activeTab === 'list' ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
          }`}
        >
          My List
        </button>
        <button
          onClick={() => setActiveTab('ratings')}
          className={`relative z-10 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 text-white ${
            activeTab === 'ratings' ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
          }`}
        >
          My Ratings
        </button>
      </div>

      {/* My List Tab */}
      {activeTab === 'list' && (
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          My List
        </h2>
        
        {myList.length === 0 ? (
          <div className="relative rounded-3xl border border-white/[0.08] overflow-hidden bg-white/[0.02] backdrop-blur-sm p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-600/10"></div>
            <div className="relative z-10">
              <p className="text-lg text-white/50 mb-1 font-medium">Your list is empty</p>
              <p className="text-sm text-white/30">Add movies and shows to watch later</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {myList.map(content => (
              <ResultCard key={content.id} content={content} userData={userData} toast={toast} />
            ))}
          </div>
        )}
      </div>

      )}

      {/* Watch History Tab */}
      {activeTab === 'history' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Watch History
          </h2>
          
          <div className="space-y-4">
            {watchHistory.slice(0, 10).map(content => (
              <ResultCard key={content.id} content={content} userData={userData} toast={toast} />
            ))}
          </div>
        </div>
      )}

      {/* My Ratings Tab */}
      {activeTab === 'ratings' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            My Ratings
          </h2>
          
          {Object.keys(userData.thumbs || {}).length === 0 && Object.keys(userData.ratings || {}).length === 0 ? (
            <div className="relative rounded-3xl border border-white/[0.08] overflow-hidden bg-white/[0.02] backdrop-blur-sm p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-600/10"></div>
              <div className="relative z-10">
                <p className="text-lg text-white/50 mb-1 font-medium">No ratings yet</p>
                <p className="text-sm text-white/30">Start rating content to improve your recommendations</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Thumbs Up */}
              {userData.getAllThumbs?.().filter(t => t.type === 'up').length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span>👍</span> Liked ({userData.getAllThumbs().filter(t => t.type === 'up').length})
                  </h3>
                  <div className="space-y-3">
                    {watchHistory
                      .filter(item => userData.getThumb(item.id) === 'up')
                      .slice(0, 10)
                      .map(content => (
                        <ResultCard key={content.id} content={content} userData={userData} toast={toast} />
                      ))}
                  </div>
                </div>
              )}
              
              {/* Thumbs Down */}
              {userData.getAllThumbs?.().filter(t => t.type === 'down').length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span>👎</span> Disliked ({userData.getAllThumbs().filter(t => t.type === 'down').length})
                  </h3>
                  <div className="space-y-3">
                    {watchHistory
                      .filter(item => userData.getThumb(item.id) === 'down')
                      .slice(0, 10)
                      .map(content => (
                        <ResultCard key={content.id} content={content} userData={userData} toast={toast} />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
