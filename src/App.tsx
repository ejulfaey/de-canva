import MiniSidebar from "./components/layouts/MiniSidebar";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-clip">
      <Navbar />
      <div className="flex-1 flex overflow-y-auto">
        <MiniSidebar />
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100 justify-center items-center overflow-y-auto">
          
        </div>
      </div>
    </div>
  );
};

export default App;