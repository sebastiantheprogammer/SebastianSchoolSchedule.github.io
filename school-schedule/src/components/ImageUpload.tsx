import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  onRemove: () => void
  uploadedImage: File | null
  isProcessing?: boolean
}

export function ImageUpload({ onImageUpload, onRemove, uploadedImage, isProcessing = false }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onImageUpload(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-center">Upload Your Schedule</CardTitle>
          <p className="text-white/70 text-center text-sm">
            Take a photo of your schedule or upload an existing image
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {!uploadedImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-white bg-white/5'
                    : 'border-white/30 hover:border-white/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white/70" />
                  </div>
                  
                  <div>
                    <p className="text-white font-medium mb-2">
                      Drop your schedule image here
                    </p>
                    <p className="text-white/60 text-sm">
                      or click to browse files
                    </p>
                  </div>
                  
                  <Button
                    onClick={openFileDialog}
                    variant="outline"
                    className="border-white/20 text-white bg-transparent hover:bg-white/10"
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">📸 Tips for best results:</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Make sure the text is clearly visible</li>
                  <li>• Avoid shadows and glare</li>
                  <li>• Include the full schedule in the frame</li>
                  <li>• Supported formats: JPG, PNG, WebP</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Uploaded Image Preview */}
              <div className="relative">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Image uploaded successfully!</p>
                      <p className="text-white/60 text-sm">{uploadedImage.name}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 flex items-center space-x-3">
                    <ImageIcon className="w-8 h-8 text-white/70" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Schedule Image</p>
                      <p className="text-white/60 text-xs">
                        {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      onClick={onRemove}
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                    <p className="text-blue-400 font-medium">Processing your schedule...</p>
                  </div>
                  <p className="text-blue-300/70 text-sm mt-2">
                    Our AI is analyzing your schedule image and extracting the information.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
