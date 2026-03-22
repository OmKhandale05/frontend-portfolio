import { useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && (
        <Loader onComplete={() => setShowLoader(false)} />
      )}

      {!showLoader && (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl">Home Page</h1>
        </div>
      )}
    </>
  );
}

export default App;