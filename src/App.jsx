import gsap from 'gsap';
import './App.css';
import { useEffect ,useRef } from 'react';

function App() {

  const boxRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 3,
        ease: "power3.out",
      }
    );
  }, []);
 
  return (
   <div className='h-screen flex items-center justify-center'>
    <div ref={boxRef} className="w-20 h-20 bg-black"></div>
    
   </div>
  )
}

export default App
