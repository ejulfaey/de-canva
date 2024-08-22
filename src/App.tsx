import Canvas from "./components/Canva";
import MiniSidebar from "./components/layouts/MiniSidebar";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import { ToolBar } from "./components/layouts/ToolBar";

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-clip">
      <Navbar />
      <div className="flex-1 flex overflow-y-auto">
        <MiniSidebar />
        <Sidebar />
        <div className="flex-1 flex flex-col items-center bg-gray-300">
          <ToolBar />
          <Canvas id="konvas-id" />
        </div>
      </div>
    </div>
  );
};

export default App;
