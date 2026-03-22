import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const lettersRef = useRef([]);
  const counterRef = useRef(null);

  // ✅ NEW refs for reel digits
  const tensRef = useRef(null);
  const onesRef = useRef(null);

  useEffect(() => {

    // ✅ CREATE DIGITS (0–9 stack)
    const createDigits = (ref) => {
      if (!ref.current) return;
      ref.current.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const el = document.createElement("div");
        el.innerText = i;
        el.style.height = "1em";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        ref.current.appendChild(el);
      }
    };

    createDigits(tensRef);
    createDigits(onesRef);

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

    tl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })

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

      // ✅ REEL COUNTER (REPLACED LOGIC)
      .to(counter, {
        value: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: () => {
          const val = Math.floor(counter.value);

          if (val >= 100) {
            // animate OK like reel
            gsap.to(counterRef.current, {
              y: "-100%",
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                counterRef.current.innerHTML = "OK";
                gsap.fromTo(
                  counterRef.current,
                  { y: "100%", opacity: 0 },
                  { y: "0%", opacity: 1, duration: 0.4 }
                );
              },
            });
            return;
          }

          const tens = Math.floor(val / 10);
          const ones = val % 10;

          // animate reel
          gsap.to(tensRef.current, {
            y: `-${tens}em`,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(onesRef.current, {
            y: `-${ones}em`,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      })

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

      .to([lettersRef.current, counterRef.current], {
        opacity: 0,
        y: -40,
        stagger: 0.1,
        duration: 0.3,
      })

      .to({}, { duration: 0.2 });

  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-[#FEFFFF] text-[#2C3333] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* ✅ UPDATED COUNTER UI (reel style) */}
      <div
        ref={counterRef}
        className="mt-6 text-4xl tracking-widest flex overflow-hidden h-[1em]"
      >
        <div className="overflow-hidden h-[1em]">
          <div ref={tensRef} className="flex flex-col"></div>
        </div>
        <div className="overflow-hidden h-[1em]">
          <div ref={onesRef} className="flex flex-col"></div>
        </div>
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