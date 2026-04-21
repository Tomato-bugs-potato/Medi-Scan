'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, TrendingUp } from 'lucide-react'

export function AnnotationResults({ results }) {
  const { annotated_image, predictions, original_size } = results

  const confidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'bg-secondary/10 border-secondary text-secondary'
    if (confidence >= 0.75) return 'bg-accent/10 border-accent text-accent'
    return 'bg-muted border-neutral-200 text-muted-foreground'
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Annotated Image Card */}
      <Card className="border-2 border-neutral-200 bg-white shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle>Annotated Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <img
                src={`data:image/png;base64,${annotated_image}`}
                alt="Annotated result"
                className="w-full rounded-md shadow-md border border-primary/20"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Original Resolution</span>
              <span className="font-semibold text-foreground">{original_size[0]} × {original_size[1]} px</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions Card */}
      <Card className="border-2 border-neutral-200 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <CardTitle>Detection Results</CardTitle>
            </div>
            <span className="text-sm font-semibold bg-secondary/10 text-secondary px-3 py-1 rounded-full">
              {predictions.length} detected
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {predictions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No anomalies detected in the image</p>
            </div>
          ) : (
            <div className="space-y-3">
              {predictions.map((pred, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border-2 border-neutral-200 hover:border-primary/40 bg-white transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-foreground text-lg">{pred.class}</span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${confidenceColor(pred.confidence)}`}>
                          {(pred.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Confidence:</span> {(pred.confidence * 100).toFixed(2)}%
                        </p>
                        <p className="text-muted-foreground break-all">
                          <span className="font-medium">Location:</span> [{pred.bbox.map(v => v.toFixed(1)).join(', ')}]
                        </p>
                      </div>
                    </div>
                    
                    {/* Confidence Indicator */}
                    <div className="flex-shrink-0 text-right">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                        <span className="text-lg font-bold text-primary">
                          {Math.round(pred.confidence * 100)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${pred.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clinical Notes */}
      <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4">
        <p className="text-sm text-primary font-medium">📋 Clinical Note</p>
        <p className="text-sm text-muted-foreground mt-1">
          These results are AI-generated predictions and should be reviewed by a qualified healthcare professional before making clinical decisions.
        </p>
      </div>
    </div>
  )
}
