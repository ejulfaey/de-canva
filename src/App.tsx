import Canvas from "./components/layouts/Canva";
import MiniSidebar from "./components/layouts/MiniSidebar";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";

const App = () => {
  return (
    <div className="h-full flex flex-col overflow-y-clip">
      <Navbar />
      <div className="flex-1 flex overflow-y-auto">
        <MiniSidebar />
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100 justify-center items-center w-full h-full">
          <Canvas />

        </div>
      </div>
    </div>
  );
};

export default App;