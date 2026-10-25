'use client';

import React, { useState } from 'react';
import { BookOpen, FileText, Download, Sparkles, Search, Filter, Share2, UploadCloud, CheckCircle2 } from 'lucide-react';
import { MOCK_SHARED_LIBRARY, DocumentItem } from '../data/mockData';

interface CommunityLibraryProps {
  onOpenUpload: () => void;
  onGenerateStudyPack: (doc: DocumentItem) => void;
}

export default function CommunityLibraryView({ onOpenUpload, onGenerateStudyPack }: CommunityLibraryProps) {
  const [library, setLibrary] = useState<DocumentItem[]>(MOCK_SHARED_LIBRARY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  const courses = ['All', 'CSC201', 'MTH201', 'GST211', 'PHY202'];

  const handleDownload = (id: string) => {
    setDownloadedIds(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      alert('PDF successfully downloaded to your device for offline reading.');
    }, 400);
  };

  const filteredDocs = library.filter(doc => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.sharedBy && doc.sharedBy.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || doc.courseCode === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1040, margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        padding: '28px 32px',
        borderRadius: 'var(--radius-lg)',
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderLeft: '6px solid var(--green-600)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ maxWidth: 620 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="badge badge-green">Community Handouts & Past Questions</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Free & Open Library
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.3 }}>
            Shared University PDF Library
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Access verified lecture handouts and past questions shared by classmates across Nigeria. Convert any shared PDF into AI summaries and flashcards in 1 click!
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenUpload} style={{ padding: '12px 20px' }}>
          <UploadCloud size={18} />
          <span>Contribute Handout</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '18px 24px', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{
          flex: '1 1 280px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: 14 }} />
          <input
            type="text"
            placeholder="Search past questions, handouts, or contributors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px 11px 40px',
              borderRadius: 'var(--radius-md)',
              background: '#FFFFFF',
              border: '1.5px solid var(--border-medium)',
              color: 'var(--text-dark)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Filter Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: '#FFFFFF',
              border: '1.5px solid var(--border-medium)',
              color: 'var(--text-dark)',
              fontSize: '0.88rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            {courses.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredDocs.map(doc => {
          const isDownloaded = !!downloadedIds[doc.id];

          return (
            <div
              key={doc.id}
              className="card"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: '1 1 340px' }}>
                <div style={{
                  width: 46,
                  height: 46,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-100)',
                  color: 'var(--green-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={24} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="badge badge-green">{doc.courseCode}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {doc.fileName}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>Shared by <strong>{doc.sharedBy}</strong></span>
                    <span>• {doc.pageCount} Pages</span>
                    <span>• {(doc.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                    <span>• {doc.downloads} downloads</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDownload(doc.id)}
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  {isDownloaded ? <CheckCircle2 size={16} color="var(--green-600)" /> : <Download size={16} />}
                  <span>{isDownloaded ? 'Downloaded' : 'Download PDF'}</span>
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => onGenerateStudyPack(doc)}
                  style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                >
                  <Sparkles size={16} />
                  <span>AI Study Pack</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
