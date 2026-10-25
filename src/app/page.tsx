'use client';

import React, { useState } from 'react';
import SidebarNav from '../components/SidebarNav';
import AppHeader from '../components/AppHeader';
import MobileNav from '../components/MobileNav';
import UploadModal from '../components/UploadModal';
import DashboardTab from '../components/DashboardTab';
import SummaryReader from '../components/SummaryReader';
import FlashcardDeck from '../components/FlashcardDeck';
import QuizPlayer from '../components/QuizPlayer';
import StudyPlannerView from '../components/StudyPlannerView';
import CommunityView from '../components/CommunityView';
import CommunityLibraryView from '../components/CommunityLibraryView';
import MessagesView from '../components/MessagesView';
import SettingsView from '../components/SettingsView';
import NotificationsView from '../components/NotificationsView';
import { DocumentItem } from '../data/mockData';

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'summary' | 'flashcards' | 'quiz' | 'planner' | 'community' | 'library' | 'messages' | 'notifications' | 'settings'
  >('dashboard');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [chatPeerId, setChatPeerId] = useState<string>('peer-blessing');

  // Sidebar collapse and mobile drawer states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleTabChange = (t: string) => {
    setActiveTab(t as any);
    setIsMobileSidebarOpen(false); // ALWAYS close mobile sidebar when tab is clicked!
  };

  const handleUploadComplete = () => {
    setActiveTab('summary');
  };

  const handleOpenChatWithPeer = (peerId: string) => {
    setChatPeerId(peerId);
    setActiveTab('messages');
    setIsMobileSidebarOpen(false);
  };

  const handleGenerateStudyPackFromLibrary = (doc: DocumentItem) => {
    setIsUploadOpen(true);
  };

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 900) {
      setIsMobileSidebarOpen(prev => !prev);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  return (
    <div className="saas-layout">
      {/* 1. Sleek Left Dark Sidebar Navigation (Collapsible + Auto-close on click) */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace Area */}
      <div className="saas-main-area">
        {/* Top Header Bar with Toggle Sidebar Button */}
        <AppHeader
          onOpenUpload={() => setIsUploadOpen(true)}
          onNavigateToNotifications={() => handleTabChange('notifications')}
          onNavigateToProfile={() => handleTabChange('settings')}
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Content Container */}
        <main className="saas-content-container">
          <div key={activeTab} className="animate-fade-in">
            {activeTab === 'dashboard' && (
              <DashboardTab
                onOpenUpload={() => setIsUploadOpen(true)}
                onSelectMaterial={handleTabChange}
              />
            )}

            {activeTab === 'summary' && (
              <SummaryReader
                onGoToCards={() => handleTabChange('flashcards')}
                onGoToQuiz={() => handleTabChange('quiz')}
              />
            )}

            {activeTab === 'flashcards' && <FlashcardDeck />}

            {activeTab === 'quiz' && <QuizPlayer />}

            {activeTab === 'planner' && <StudyPlannerView />}

            {activeTab === 'community' && (
              <CommunityView
                onOpenChat={handleOpenChatWithPeer}
                onSelectCourseStudy={() => handleTabChange('summary')}
              />
            )}

            {activeTab === 'library' && (
              <CommunityLibraryView
                onOpenUpload={() => setIsUploadOpen(true)}
                onGenerateStudyPack={handleGenerateStudyPackFromLibrary}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesView
                initialPeerId={chatPeerId}
                onOpenStudyMaterial={() => handleTabChange('summary')}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsView
                onOpenStudyMaterial={() => handleTabChange('summary')}
                onOpenMessages={() => handleTabChange('messages')}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView />
            )}
          </div>
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation (for phone screens) */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* 4. Upload & AI Processing Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onComplete={handleUploadComplete}
      />

    </div>
  );
}
