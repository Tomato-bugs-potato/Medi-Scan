'use client'

import { ImageUploader } from '@/components/image-uploader'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f5f5f5, #e8f5f0)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e0e0e0', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(4px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0B6EBD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>◆</span>
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>MediScan</h1>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>AI-Powered Medical Imaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '48px', paddingBottom: '48px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', marginBottom: '16px', padding: '6px 12px', borderRadius: '9999px', background: 'rgba(11, 110, 189, 0.1)', border: '1px solid rgba(11, 110, 189, 0.2)' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#0B6EBD' }}>Advanced Diagnostics</span>
            </div>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '12px', lineHeight: 1.2 }}>
              Intelligent Medical Image Analysis
            </h2>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.6, maxWidth: '672px', margin: '0 auto' }}>
              Upload medical images for instant AI-powered detection and analysis. Get detailed predictions with confidence scores to support clinical decision-making.
            </p>
          </div>

          {/* Upload Component */}
          <ImageUploader />
        </div>
      </div>
    </main>
  )
}
