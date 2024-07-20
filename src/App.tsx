import Header from "./layouts/header";

const App = () => {
  return (
    <>
      <Header />
      <div className="h-screen">
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold tracking-wider">Kanvas</h1>
        </div>
      </div>
    </>
  );
};

export default App;