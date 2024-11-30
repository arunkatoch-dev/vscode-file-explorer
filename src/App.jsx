import MainBody from "./components/MainBody";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {

  return (
    <>
      <Navbar />
      <MainBody>
        <Sidebar />
      </MainBody>
    </>
  );
}

export default App;
