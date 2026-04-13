import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

function App() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    if (!document.querySelector('script[src*="model-viewer.min.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );

      gsap.fromTo(
        textRefs.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
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
    // Added 'antialiased' for perfectly crisp typography on high-res screens
    <div className="h-[100dvh] w-full bg-zinc-950 text-zinc-100 font-sans flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden selection:bg-zinc-700 antialiased">
      
      {/* Top Branding - Now Clickable with a subtle brightness transition */}
      <div className="w-full pt-2 flex justify-center shrink-0 z-10">
        <a 
          href="https://floatmenu.io" 
          className="tracking-[0.3em] text-zinc-500 hover:text-zinc-300 transition-colors duration-300 text-[9px] uppercase font-medium cursor-pointer"
        >
          FloatMenu.io
        </a>
      </div>

      <div ref={containerRef} className="w-full max-w-md flex flex-col items-center flex-1 min-h-0 mt-4 mb-4 z-0">
        
        {/* Slightly refined border opacity to make the model pop */}
        <div className="w-full flex-1 relative rounded-2xl bg-zinc-900 shadow-2xl overflow-hidden mb-6 border border-zinc-800/60">
          <model-viewer
            src="/burger-v1.glb"
            poster="/burger-screenshot.webp" 
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            rotation-per-second="30deg"
            tone-mapping="neutral"
            max-camera-orbit="auto 85deg auto"
            min-camera-orbit="auto 20deg auto"
            camera-orbit="0deg 60deg 2.5m"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          >
            {/* Custom AR Button - Added subtle hover scale and color shift for desktop users */}
            <button
              slot="ar-button"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] font-semibold text-xs tracking-widest uppercase active:scale-95 hover:scale-[0.98] hover:bg-zinc-200 transition-all duration-300"
            >
              View on Table
            </button>
          </model-viewer>
        </div>

        {/* Typography & Marketing */}
        <div className="w-full text-center px-2 shrink-0">
          
          {/* Monochrome Frosted Pill */}
          <div ref={addToRefs} className="mb-4 cursor-default">
            <span className="text-[9px] font-semibold text-zinc-200 uppercase tracking-[0.25em] border border-zinc-700/60 bg-zinc-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              Live Demo
            </span>
          </div>

          <h1 ref={addToRefs} className="text-[2rem] leading-tight sm:text-3xl font-light tracking-tight text-white mb-2">
            MENUS, REIMAGINED
          </h1>

          <p ref={addToRefs} className="text-[13px] text-zinc-400 leading-relaxed font-light mb-4 px-2 max-w-[320px] mx-auto">
            Stop guessing your order. The era of flat PDF menus is over. Welcome to the future of hospitality.
          </p>

          <div ref={addToRefs} className="w-12 h-[1px] bg-zinc-800 mx-auto mb-6"></div>

          <div ref={addToRefs} className="flex flex-col items-center w-full px-2">
            <p className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] mb-4 font-semibold">
              Bring this to your restaurant
            </p>
            
            {/* Premium Links with the slick, expanding underline hover animation */}
            <div className="flex justify-center items-center gap-6 text-[11px] uppercase tracking-wider font-medium">
              <a 
                href="https://instagram.com/floatmenu.io" 
                target="_blank" 
                rel="noreferrer"
                className="relative text-zinc-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Instagram
              </a>
              <a 
                href="mailto:venkataraghupathisaimannava@gmail.com" 
                className="relative text-zinc-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Email Us
              </a>
              <a 
                href="tel:+917095758402" 
                className="relative text-zinc-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;