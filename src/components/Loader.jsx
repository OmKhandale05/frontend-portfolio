import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const bottomRef = useRef(null);

  const [progress, setProgress] = useState(0);

  // Counter logic
  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count++;
      setProgress(count);

      if (count >= 100) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 1 },
        "-=0.5"
      );
  }, []);

  const handleEnter = () => {
    gsap.to(loaderRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut",
      onComplete: onComplete,
    });
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center"
    >
      {/* Initials */}
      <h1 ref={textRef} className="text-6xl font-bold tracking-widest">
        OK
      </h1>

      {/* Counter */}
      <p ref={counterRef} className="mt-4 text-lg">
        {progress}%
      </p>

      {/* Bottom text */}
      <div
        ref={bottomRef}
        className="absolute bottom-6 text-sm opacity-70"
      >
        LOADING
      </div>

      {/* CTA */}
      {progress === 100 && (
        <button
          onClick={handleEnter}
          className="mt-6 px-6 py-2 border border-white hover:bg-white hover:text-black transition"
        >
          Enter Site
        </button>
      )}
    </div>
  );
};

export default Loader;