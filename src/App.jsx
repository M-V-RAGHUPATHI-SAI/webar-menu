import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

function App() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  // Dynamically inject the model-viewer script
  useEffect(() => {
    if (!document.querySelector('script[src*="model-viewer.min.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  // GSAP Premium Entrance Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main card
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }
      );

      // Staggered animation for the text elements
      gsap.fromTo(
        textRefs.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    // Sophisticated background gradient
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4 sm:p-8 antialiased selection:bg-gray-900 selection:text-white">
      
      {/* Main Glassmorphism Container */}
      <div 
        ref={containerRef} 
        className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white w-full max-w-5xl overflow-hidden flex flex-col md:flex-row opacity-0"
      >
        
        {/* Left Side: 3D Model Viewer */}
        <div className="relative w-full md:w-1/2 h-80 md:h-[600px] bg-gradient-to-b from-transparent to-gray-50/50 flex items-center justify-center group">
          
          {/* Subtle drag hint */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-xs font-medium text-gray-500 tracking-wide z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Drag to rotate
          </div>

          <model-viewer
            src="/burger/KFC,%20zinger%20burger%20photogrammetry.gltf"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            tone-mapping="neutral"
            shadow-intensity="1.5"
            shadow-softness="1"
            environment-image="legacy"
            auto-rotate
            rotation-per-second="30deg"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          >
            {/* Custom AR Button (Only visible on AR-capable mobile devices) */}
            <button
              slot="ar-button"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-3.5 rounded-full shadow-xl font-semibold tracking-wide active:scale-95 transition-all hover:bg-black hover:shadow-2xl flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
              View on Table
            </button>
          </model-viewer>
        </div>

        {/* Right Side: Typography & Details */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 bg-white/40">
          
          <div ref={addToRefs} className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
              Signature Item
            </span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
              Prep time: 10 mins
            </span>
          </div>

          <h1 ref={addToRefs} className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Classic Zinger <br /> Burger
          </h1>
          
          <p ref={addToRefs} className="text-base md:text-lg text-gray-500 leading-relaxed mb-8">
            A 100% chicken breast fillet, double hand-breaded and fried to a golden brown. Served with crisp lettuce and creamy mayo on a toasted sesame seed bun. 
          </p>

          <div ref={addToRefs} className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-black text-gray-900">₹ 299</span>
            <span className="text-lg text-gray-400 line-through mb-1">₹ 350</span>
          </div>

          {/* Desktop Call to Action (Since AR is mobile-mostly) */}
          <div ref={addToRefs}>
            <button className="w-full md:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-black hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Add to Cart
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;