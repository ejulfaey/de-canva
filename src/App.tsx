// import Canvas from "./components/layouts/Canva";
import React, { useRef, useState } from "react";
import Canvas from "./components/layouts/Canva";
// import CanvaClick from "./components/layouts/CanvaClick";
import MiniSidebar from "./components/layouts/MiniSidebar";
import Navbar from "./components/layouts/Navbar";
// import SidebarClick from "./components/layouts/SidebarClick";
import SidebarDragDrop from "./components/layouts/SidebarDragDrop";

const App = () => {

  // const handleShapeClick = (shapeType: string) => {
  //   if (shapeType) {
  //     console.log(`Shape clicked: ${shapeType}`);
  //   }
  // };
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number
  }>({
    width: 0,
    height: 0
  });


  React.useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
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
    <div className="h-full flex flex-col overflow-y-clip">
      <Navbar />
      <div className="flex-1 flex overflow-y-auto">
        <MiniSidebar />
        <SidebarDragDrop containerSize={containerSize} />

        <div className="flex-1 flex flex-col bg-gray-100 justify-center items-center w-full h-full">
          <Canvas id="konvas-id" containerRef={containerRef} containerSize={containerSize} />
        </div>
      </div>
    </div>
  );
};

export default App;