import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const lettersRef = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    let counter = { value: 0 };

    // 1. Initial fade in whole screen
    tl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })

      // 2. Letters stagger up
      .fromTo(
        lettersRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
        }
      )

      // 3. Counter animation
      .to(counter, {
        value: 100,
        duration: 3, // slower = smoother
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            const val = Math.floor(counter.value);
      
            // replace 100 with OK
            if (val >= 100) {
              counterRef.current.innerText = "OK";
            } else {
              counterRef.current.innerText = val + "";
            }
          }
        },
        onComplete: () => {
          setShowButton(true);
        },
      })

      // 4. Slight scale effect (premium feel)
      .to(
        lettersRef.current,
        {
          scale: 1.1,
          duration: 0.6,
          yoyo: true,
          repeat: 1,
        },
        "-=1"
      )

      // 5. Fade out content
      .to([lettersRef.current, counterRef.current], {
        opacity: 0,
        y: -40,
        stagger: 0.1,
        duration: 0.6,
      })

      // 6. Small delay (feels intentional)
      .to({}, { duration: 0.3 });

      
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-[#FEFFFF] text-[#2C3333] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex text-7xl font-bold tracking-widest text-aeonik">
        {"OK".split("").map((letter, i) => (
          <span key={i} ref={(el) => (lettersRef.current[i] = el)}>
            {letter}
          </span>
        ))}
      </div>

      <div ref={counterRef} className="mt-6 text-lg opacity-80 tracking-widest">
        0
      </div>
      <div className="absolute bottom-6 left-6 flex">
        {"LOADING".split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="text-[#2C3333] font-bold text-5xl tracking-widest"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
