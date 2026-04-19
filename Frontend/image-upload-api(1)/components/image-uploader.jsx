'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AnnotationResults } from './annotation-results'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

export function ImageUploader() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile)
        setError('')
        
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview(event.target?.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setError('Please select a valid image file')
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0]
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile)
        setError('')
        
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview(event.target?.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setError('Please drop an image file')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image. Please ensure your FastAPI backend is running.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Card */}
      <Card className="border-2 border-neutral-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="pt-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Input Button 
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-primary rounded-lg hover:bg-primary/5 cursor-pointer transition-all duration-200 hover:border-primary/80 group"
              >
                <Upload className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Select Medical Image</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, or DICOM formats</p>
                </div>
              </label>
            </div>
            */}  
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-primary/30 rounded-lg p-10 text-center hover:border-primary/60 hover:bg-primary/2 transition-all duration-200"
            >
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">Drag and drop your image</p>
                <p className="text-sm text-muted-foreground">or use the button above to browse</p>
              </div>
            </div>

            {/* Preview Section */}
            {preview && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <p className="text-sm font-medium text-foreground">Image selected</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-56 rounded-lg border border-primary/20 mx-auto shadow-md"
                  />
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="flex gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Analysis Failed</p>
                  <p className="text-sm text-destructive/80">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!file || loading}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {loading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Analyzing Image...
                </>
              ) : (
                'Analyze Image'
              )}
            </Button>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground text-center">
              ✓ Images are processed securely and not stored.
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results && <AnnotationResults results={results} />}
    </div>
  )
}
