import { useState, useRef, useEffect, useCallback } from 'react'
import SearchBar from '../components/features/fleetManagement/components/SearchBar'
import TreeContent from '../components/features/fleetManagement/components/TreeContent'
import { Minus, Plus, Maximize, ChevronUp } from 'lucide-react'

const FleetManager = () => {
  const [zoom, setZoom] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const MIN_ZOOM = 0.25
  const MAX_ZOOM = 2
  const ZOOM_STEP = 0.25

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const initialPinchDistance = useRef<number | null>(null)
  const initialZoom = useRef<number>(zoom)

  const handleScrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [scrollContainerRef])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }, [zoom, ZOOM_STEP, MAX_ZOOM])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }, [zoom, ZOOM_STEP, MIN_ZOOM])

  const getDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        initialPinchDistance.current = getDistance(e.touches)
        initialZoom.current = zoom
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialPinchDistance.current !== null) {
        e.preventDefault()
        const currentDistance = getDistance(e.touches)
        const scale = currentDistance / initialPinchDistance.current
        const newZoom = Math.min(Math.max(initialZoom.current * scale, MIN_ZOOM), MAX_ZOOM)
        setZoom(newZoom)
      }
    }

    const handleTouchEnd = () => {
      initialPinchDistance.current = null
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [zoom, getDistance])

  return (
    <div ref={containerRef} className='w-full h-full bg-[radial-gradient(circle,rgba(0,0,0,0.1)_2px,transparent_1px)] bg-[size:15px_15px] font-[Poppins] relative touch-none'>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className='w-20 z-20 bg-linear-to-r from-[#ffffff] to-[#FFFFFF00] h-full absolute top-0 left-0'></div>
      <div className='h-20 z-20 bg-linear-to-b from-[#FFFFFF00] to-[#FFFFFF] w-full absolute bottom-0 left-0'></div>

      {/* Zoom Controls */}
      <div className='absolute bottom-0 left-0 w-full z-30 flex items-center justify-end gap-2 p-3'>
        <div className='flex items-center gap-2 justify-between w-1/2'>

          <button onClick={handleScrollToTop} className='shadow-[0px_0px_1px_0px_rgba(0,0,0,0.1),0px_1px_1px_0px_rgba(0,0,0,0.09)] hover:bg-gray-50 hover:scale-110 transition-all duration-200 rounded-full p-1 flex items-center justify-center bg-[#FFFFFF] z-30 left-1/2 -translate-x-1/2'>
            <ChevronUp className='w-4 h-4 text-[#3F484A]' />
          </button>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              className='p-1.5 flex items-center justify-center bg-white rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)] border border-[#E8E8E8] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
              title='Zoom In'
            >
              <Plus className='w-5 h-5 text-[#3F484A]' />
            </button>
            <button
              type='button'
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              className='p-1.5 flex items-center justify-center bg-white rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)] border border-[#E8E8E8] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
              title='Zoom Out'
            >
              <Minus className='w-5 h-5 text-[#3F484A]' />
            </button>
            <button
              type='button'
              onClick={() => setZoom(1)}
              className='p-1.5 flex items-center justify-center bg-white rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)] border border-[#E8E8E8] hover:bg-gray-50 transition-colors'
              title='Reset Zoom'
            >
              <Maximize className='w-5 h-5 text-[#3F484A]' />
            </button>
          </div>
        </div>
      </div>



      {/* content  */}
      <div ref={scrollContainerRef} className='w-full h-full overflow-auto relative z-10 p-4 pt-24  tree-content'>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '0 0',
          }}
          className='transition-transform duration-200'
        >
          <TreeContent searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}

export default FleetManager