import { useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <Loader onComplete={() => setDone(true)} />}

      {done && (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl">Welcome </h1>
        </div>
      )}
    </>
  );
}

export default App;