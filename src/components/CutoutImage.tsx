import React, { useEffect, useState } from 'react'

interface CutoutImageProps {
  src: string
  alt: string
  className?: string
}

export const CutoutImage: React.FC<CutoutImageProps> = ({ src, alt, className = '' }) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data

        // Flood fill from outer image borders to remove all background checkerboard
        const w = canvas.width
        const h = canvas.height
        const visited = new Uint8Array(w * h)
        const queue: number[] = []

        const isCheckerboard = (r: number, g: number, b: number) => {
          const maxVal = Math.max(r, g, b)
          const minVal = Math.min(r, g, b)
          const delta = maxVal - minVal
          const brightness = (r + g + b) / 3

          // Checkerboard squares are neutral light grey (~204) or white (255) with near-zero saturation
          // Protect skin tone (r > g and r - b > 15) and cyan/purple rim lights (delta > 20)
          const isSkinTone = r > g && (r - b) > 15
          return brightness >= 170 && delta <= 18 && !isSkinTone
        }

        // Seed with outer borders (top, left, right)
        for (let x = 0; x < w; x++) {
          const idxTop = x
          const r = data[idxTop * 4]
          const g = data[idxTop * 4 + 1]
          const b = data[idxTop * 4 + 2]
          if (isCheckerboard(r, g, b)) {
            visited[idxTop] = 1
            queue.push(idxTop)
          }
        }
        for (let y = 0; y < h; y++) {
          const idxLeft = y * w
          const idxRight = y * w + (w - 1)
          if (!visited[idxLeft] && isCheckerboard(data[idxLeft * 4], data[idxLeft * 4 + 1], data[idxLeft * 4 + 2])) {
            visited[idxLeft] = 1
            queue.push(idxLeft)
          }
          if (!visited[idxRight] && isCheckerboard(data[idxRight * 4], data[idxRight * 4 + 1], data[idxRight * 4 + 2])) {
            visited[idxRight] = 1
            queue.push(idxRight)
          }
        }

        // BFS flood fill - only clears outer contiguous background, NEVER touches face or body
        let head = 0
        while (head < queue.length) {
          const curr = queue[head++]
          data[curr * 4 + 3] = 0 // Transparent alpha

          const cx = curr % w
          const cy = Math.floor(curr / w)

          const neighbors = [
            cy > 0 ? curr - w : -1,
            cy < h - 1 ? curr + w : -1,
            cx > 0 ? curr - 1 : -1,
            cx < w - 1 ? curr + 1 : -1,
          ]

          for (let n = 0; n < 4; n++) {
            const next = neighbors[n]
            if (next !== -1 && !visited[next]) {
              visited[next] = 1
              const nr = data[next * 4]
              const ng = data[next * 4 + 1]
              const nb = data[next * 4 + 2]
              if (isCheckerboard(nr, ng, nb)) {
                queue.push(next)
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0)
        setProcessedSrc(canvas.toDataURL('image/png'))
      } catch (err) {
        console.warn('Canvas transparency fallback:', err)
      }
    }
  }, [src])

  return (
    <img
      src={processedSrc}
      alt={alt}
      className={className}
      draggable={false}
      loading="eager"
    />
  )
}
