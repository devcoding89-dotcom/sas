'use client';

import React, { useState } from 'react';
import {
  Send,
  FileText,
  Paperclip,
  Search,
  Phone,
  Video,
  MoreVertical,
  UserCheck,
  UserPlus,
  BookOpen,
  ArrowRight,
  Download,
  Info,
  CheckCheck,
  Share2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import {
  MOCK_STUDENTS,
  MOCK_CHATS,
  StudentPeer,
  ChatMessage,
  CURRENT_STUDENT
} from '../data/mockData';

interface MessagesViewProps {
  initialPeerId?: string;
  onOpenStudyMaterial?: () => void;
}

export default function MessagesView({
  initialPeerId = 'peer-blessing',
  onOpenStudyMaterial
}: MessagesViewProps) {
  const [selectedPeerId, setSelectedPeerId] = useState<string>(initialPeerId);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(MOCK_CHATS);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [profileTab, setProfileTab] = useState<'docs' | 'about' | 'friends'>('docs');
  const [isFriend, setIsFriend] = useState(true);

  const activePeer = MOCK_STUDENTS.find(s => s.id === selectedPeerId) || MOCK_STUDENTS[0];
  const messages = chats[selectedPeerId] || [];

  const filteredPeers = MOCK_STUDENTS.filter(peer =>
    peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peer.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_STUDENT.id,
      senderName: CURRENT_STUDENT.name.split(' ')[0],
      text: text,
      timestamp: '10:25 AM',
    };

    setChats(prev => ({
      ...prev,
      [selectedPeerId]: [...(prev[selectedPeerId] || []), newMsg],
    }));
    setInputText('');

    // Simulated reply from active peer
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: activePeer.id,
        senderName: activePeer.name.split(' ')[0],
        text: `Thanks ${CURRENT_STUDENT.name.split(' ')[0]}! I've loaded it into my StudyMate AI study pack. Let's do the quiz together tonight.`,
        timestamp: '10:26 AM',
      };
      setChats(prev => ({
        ...prev,
        [selectedPeerId]: [...(prev[selectedPeerId] || []), replyMsg],
      }));
    }, 1800);
  };

  const handleAttachPDF = () => {
    const attachMsg: ChatMessage = {
      id: `msg-attach-${Date.now()}`,
      senderId: CURRENT_STUDENT.id,
      senderName: CURRENT_STUDENT.name.split(' ')[0],
      text: "Here are the complete Binary Search Trees & AVL Rotations notes for CSC201.",
      timestamp: '10:25 AM',
      attachmentPdf: "Data Structures Notes.pdf",
      attachmentSize: "2.4 MB"
    };

    setChats(prev => ({
      ...prev,
      [selectedPeerId]: [...(prev[selectedPeerId] || []), attachMsg],
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Three-Column or Two-Column Messenger Stage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showProfilePanel
          ? '290px 1fr 340px'
          : '310px 1fr',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        minHeight: 680,
        overflow: 'hidden',
        transition: 'grid-template-columns 0.3s ease'
      }}>

        {/* ========================================================
            COLUMN 1: CONVERSATIONS LIST
            ======================================================== */}
        <div style={{
          borderRight: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0
        }}>
          {/* List Header */}
          <div style={{
            padding: '20px 20px 14px 20px',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                Messaging
              </h2>
              <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                {MOCK_STUDENTS.length} Chats
              </span>
            </div>

            {/* Search Input */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12 }} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-dark)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {filteredPeers.map(peer => {
              const isSelected = peer.id === selectedPeerId;
              const hasUnread = (peer.unreadCount || 0) > 0;

              return (
                <div
                  key={peer.id}
                  onClick={() => setSelectedPeerId(peer.id)}
                  style={{
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--primary-soft)' : 'transparent',
                    borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent',
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Avatar + Online Indicator */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: isSelected ? 'var(--primary)' : 'var(--border-medium)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      overflow: 'hidden'
                    }}>
                      {peer.avatarUrl ? (
                        <img
                          src={peer.avatarUrl}
                          alt={peer.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        peer.avatarInitials
                      )}
                    </div>
                    {peer.online && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: '#22C55E',
                        border: '2px solid #FFFFFF'
                      }} />
                    )}
                  </div>

                  {/* Text preview */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: isSelected || hasUnread ? 800 : 700,
                        color: 'var(--text-dark)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {peer.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                        {peer.lastMessageTime || '10:24 AM'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: '0.8rem',
                        color: hasUnread ? 'var(--text-dark)' : 'var(--text-secondary)',
                        fontWeight: hasUnread ? 700 : 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {peer.lastMessage || 'Hey, can you send me the notes...'}
                      </span>

                      {hasUnread && (
                        <span style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: 'var(--primary)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 6
                        }}>
                          {peer.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            COLUMN 2: ACTIVE CHAT CONVERSATION
            ======================================================== */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-body)',
          minWidth: 0,
          borderRight: showProfilePanel ? '1px solid var(--border-light)' : 'none'
        }}>
          {/* Chat Top Bar */}
          <div style={{
            padding: '14px 22px',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.94rem',
                  overflow: 'hidden'
                }}>
                  {activePeer.avatarUrl ? (
                    <img
                      src={activePeer.avatarUrl}
                      alt={activePeer.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    activePeer.avatarInitials
                  )}
                </div>
                {activePeer.online && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    background: '#22C55E',
                    border: '2px solid #FFFFFF'
                  }} />
                )}
              </div>

              <div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  {activePeer.name}
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'var(--primary-text)', fontWeight: 600 }}>
                  {activePeer.online ? 'Online' : 'Offline'} • {activePeer.university.split(' ')[0]} • {activePeer.department}
                </span>
              </div>
            </div>

            {/* Action Buttons in Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                className="btn btn-secondary"
                style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}
                title="Start Audio Call"
                onClick={() => alert(`Starting voice study call with ${activePeer.name}...`)}
              >
                <Phone size={16} color="var(--text-secondary)" />
              </button>

              <button
                className="btn btn-secondary"
                style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}
                title="Start Video Session"
                onClick={() => alert(`Starting video study session with ${activePeer.name}...`)}
              >
                <Video size={16} color="var(--text-secondary)" />
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowProfilePanel(!showProfilePanel)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: showProfilePanel ? 'var(--primary-soft)' : undefined,
                  borderColor: showProfilePanel ? 'var(--primary-border)' : undefined,
                  color: showProfilePanel ? 'var(--primary)' : undefined
                }}
                title={showProfilePanel ? "Hide Student Details" : "Show Student Profile & Shared Notes"}
              >
                <Info size={16} />
              </button>

              <button
                className="btn btn-secondary"
                style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}
                title="More Options"
              >
                <MoreVertical size={16} color="var(--text-secondary)" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div style={{
            flex: 1,
            padding: '24px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            {/* Date divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '4px 0 10px 0'
            }}>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                padding: '3px 12px',
                borderRadius: 9999,
                border: '1px solid var(--border-light)'
              }}>
                Today
              </span>
            </div>

            {messages.map((msg) => {
              const isMe = msg.senderId === CURRENT_STUDENT.id;

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    alignSelf: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  {/* Bubble Content */}
                  <div style={{
                    padding: '13px 18px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isMe ? 'var(--primary)' : 'var(--bg-card)',
                    color: isMe ? '#FFFFFF' : 'var(--text-dark)',
                    border: isMe ? 'none' : '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-xs)',
                    fontSize: '0.92rem',
                    lineHeight: 1.55
                  }}>
                    {msg.text}

                    {/* PDF Document Card Attachment (exact design from reference screenshot) */}
                    {msg.attachmentPdf && (
                      <div
                        style={{
                          marginTop: 10,
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          background: isMe ? 'rgba(255,255,255,0.14)' : 'var(--bg-elevated)',
                          border: isMe ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--border-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {/* Red PDF Icon badge */}
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: '#EF4444',
                            color: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.62rem',
                            flexShrink: 0
                          }}>
                            <FileText size={16} />
                            <span>PDF</span>
                          </div>

                          <div>
                            <span style={{
                              display: 'block',
                              fontWeight: 700,
                              fontSize: '0.86rem',
                              color: isMe ? '#FFFFFF' : 'var(--text-dark)'
                            }}>
                              {msg.attachmentPdf}
                            </span>
                            <span style={{
                              display: 'block',
                              fontSize: '0.72rem',
                              color: isMe ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)'
                            }}>
                              {msg.attachmentSize || '2.4 MB'} • Verified Document
                            </span>
                          </div>
                        </div>

                        {/* Open in AI Study button */}
                        <button
                          onClick={onOpenStudyMaterial}
                          className="btn"
                          style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            background: isMe ? '#FFFFFF' : 'var(--primary)',
                            color: isMe ? 'var(--primary)' : '#FFFFFF',
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            boxShadow: 'var(--shadow-xs)'
                          }}
                        >
                          <BookOpen size={13} />
                          <span>Open</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Timestamp & read receipts */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    padding: '0 6px'
                  }}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck size={14} color="var(--primary)" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggested Quick Messages */}
          <div style={{
            padding: '8px 20px',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            <button
              onClick={() => handleSendMessage("Here are the complete notes for Data Structures!")}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: 9999,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              📚 "Here are the notes!"
            </button>
            <button
              onClick={handleAttachPDF}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--primary)',
                padding: '4px 10px',
                borderRadius: 9999,
                background: 'var(--primary-soft)',
                border: '1px solid var(--primary-border)',
                cursor: 'pointer'
              }}
            >
              📎 Attach Data Structures Notes
            </button>
            <button
              onClick={() => handleSendMessage("Are we revising tonight at 6:00 PM?")}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: 9999,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              ⏰ "Are we revising at 6pm?"
            </button>
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--bg-card)'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAttachPDF}
              style={{ padding: 10, borderRadius: '50%' }}
              title="Attach Document PDF"
            >
              <Paperclip size={18} color="var(--text-secondary)" />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1.5px solid var(--border-medium)',
                color: 'var(--text-dark)',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!inputText.trim()}
              style={{
                padding: '12px 20px',
                opacity: inputText.trim() ? 1 : 0.6,
                cursor: inputText.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* ========================================================
            COLUMN 3: STUDENT PROFILE & SHARED DOCUMENTS PANEL
            (As designed in the StudyMate AI screenshot!)
            ======================================================== */}
        {showProfilePanel && (
          <div style={{
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}>
            {/* Campus Cover Banner */}
            <div style={{
              height: 110,
              width: '100%',
              background: 'linear-gradient(135deg, var(--primary) 0%, #1E3A8A 100%)',
              position: 'relative'
            }}>
              {activePeer.coverUrl && (
                <img
                  src={activePeer.coverUrl}
                  alt="University Campus"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
              )}
              <button
                onClick={() => setShowProfilePanel(false)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Close panel"
              >
                <X size={15} />
              </button>
            </div>

            {/* Profile Avatar & Info */}
            <div style={{ padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column' }}>
              {/* Overlapping circular avatar */}
              <div style={{
                marginTop: -38,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  border: '3px solid var(--bg-card)',
                  background: 'var(--primary)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '1.4rem'
                }}>
                  {activePeer.avatarUrl ? (
                    <img
                      src={activePeer.avatarUrl}
                      alt={activePeer.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    activePeer.avatarInitials
                  )}
                </div>

                {/* Friend / Connected badge */}
                <button
                  onClick={() => setIsFriend(!isFriend)}
                  className={`btn ${isFriend ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  {isFriend ? (
                    <>
                      <UserCheck size={14} color="var(--primary)" />
                      <span>Friends</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={14} />
                      <span>Add Friend</span>
                    </>
                  )}
                </button>
              </div>

              {/* Name, Handle, School */}
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.2 }}>
                {activePeer.name}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {activePeer.handle || '@student'}
              </span>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                {activePeer.university} • {activePeer.department} • {activePeer.level}
              </p>

              {/* Bio */}
              <p style={{
                fontSize: '0.86rem',
                color: 'var(--text-body)',
                lineHeight: 1.5,
                marginTop: 10,
                fontStyle: 'italic'
              }}>
                "{activePeer.bio || 'Learning, growing, and building a better future!'}"
              </p>

              {/* Stats: Following & Followers */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                marginTop: 14,
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)'
              }}>
                <div>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--text-dark)' }}>
                    {activePeer.followingCount || 245}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: 4 }}>
                    Following
                  </span>
                </div>
                <div style={{ width: 1, height: 16, background: 'var(--border-medium)' }} />
                <div>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--text-dark)' }}>
                    {activePeer.followersCount || 189}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: 4 }}>
                    Followers
                  </span>
                </div>
              </div>

              {/* Action buttons (Message & Add Friend) */}
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
                  onClick={() => alert(`Active chat with ${activePeer.name}`)}
                >
                  Message
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
                  onClick={() => setIsFriend(!isFriend)}
                >
                  {isFriend ? 'Connected' : 'Add Friend'}
                </button>
              </div>

              {/* Segmented Profile Tabs: Shared Documents | About | Friends */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border-light)',
                marginTop: 18,
                marginBottom: 12
              }}>
                <button
                  onClick={() => setProfileTab('docs')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: profileTab === 'docs' ? 'var(--primary)' : 'var(--text-secondary)',
                    borderBottom: profileTab === 'docs' ? '2.5px solid var(--primary)' : '2.5px solid transparent'
                  }}
                >
                  Shared Documents
                </button>

                <button
                  onClick={() => setProfileTab('about')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: profileTab === 'about' ? 'var(--primary)' : 'var(--text-secondary)',
                    borderBottom: profileTab === 'about' ? '2.5px solid var(--primary)' : '2.5px solid transparent'
                  }}
                >
                  About
                </button>

                <button
                  onClick={() => setProfileTab('friends')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: profileTab === 'friends' ? 'var(--primary)' : 'var(--text-secondary)',
                    borderBottom: profileTab === 'friends' ? '2.5px solid var(--primary)' : '2.5px solid transparent'
                  }}
                >
                  Friends
                </button>
              </div>

              {/* Tab 1: Shared Documents List (exact items from screenshot!) */}
              {profileTab === 'docs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(activePeer.sharedDocs || [
                    { title: "Data Structures Notes", department: "Computer Science", size: "1.4 MB", date: "2 Apr 2025" },
                    { title: "Network Security Summary", department: "Computer Science", size: "800 KB", date: "3 Apr 2025" },
                    { title: "Web Development Guide", department: "Computer Science", size: "5.2 MB", date: "5 Apr 2025" },
                  ]).map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          background: '#EF4444',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <FileText size={16} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <span style={{
                            display: 'block',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            color: 'var(--text-dark)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {doc.title}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                            {doc.department} • {doc.size} • {doc.date}
                          </span>
                        </div>
                      </div>

                      <button
                        className="btn btn-secondary"
                        onClick={onOpenStudyMaterial}
                        style={{
                          padding: '5px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          flexShrink: 0,
                          color: 'var(--primary)',
                          borderColor: 'var(--primary-border)'
                        }}
                      >
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: About */}
              {profileTab === 'about' && (
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Enrolled Courses:</span>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                      {activePeer.courses.map(c => (
                        <span key={c} className="badge badge-green">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Study Streak:</span>
                    <span style={{ display: 'block', color: '#D97706', fontWeight: 700 }}>
                      🔥 {activePeer.streakDays} Days Active
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 3: Friends */}
              {profileTab === 'friends' && (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <p>Mutual study buddies at {activePeer.university}:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    {MOCK_STUDENTS.slice(1, 4).map(p => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'var(--primary)',
                          color: '#fff',
                          fontSize: '0.68rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}>
                          {p.avatarInitials}
                        </div>
                        <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
