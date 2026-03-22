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
    tl.fromTo(
      loaderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    )

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
      .to(
        counter,
        {
          value: 100,
          duration: 2.5,
          ease: "power1.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.innerText =
                Math.floor(counter.value) + "%";
            }
          },
        },
        "-=0.8"
      )

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
      .to(
        [lettersRef.current, counterRef.current],
        {
          opacity: 0,
          y: -40,
          stagger: 0.1,
          duration: 0.6,
        }
      )

      // 6. Small delay (feels intentional)
      .to({}, { duration: 0.3 });

  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Initials */}
      <div className="flex text-7xl font-bold tracking-widest">
        {"OK".split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className="mt-6 text-lg opacity-80 tracking-widest"
      >
        0%
      </div>
    </div>
  );
};

export default Loader;