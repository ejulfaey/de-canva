import React, { useRef, useState } from "react";
import Canvas from "./components/layouts/Canva";
import MiniSidebar from "./components/layouts/MiniSidebar";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import { ToolBar } from "./components/layouts/ToolBar";

const App = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number
  }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const updatePosition = () => {

      if (containerRef.current) {
        const { offsetWidth, offsetHeight, offsetTop} = containerRef.current;
        setContainerSize({
          width: offsetWidth,
          height: offsetHeight - offsetTop
        })
      }
    };

    // Update width on initial render and when window resizes
    updatePosition();
    window.addEventListener('resize', updatePosition);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-y-clip">
      <Navbar />
      <div className="flex-1 flex overflow-y-auto">
        <MiniSidebar />
        <Sidebar containerSize={containerSize} />
        <div className="flex-1 flex flex-col items-center bg-gray-300">
          <ToolBar />
          <Canvas id="konvas-id" containerRef={containerRef} containerSize={containerSize} />
        </div>
      </div>
    </div>
  );
};

export default App;