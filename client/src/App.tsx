import { ListUsers } from "./components/ListUsers";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main
        style={{
          width: "98vw",
          margin: "0 auto",
          height: "60vh",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center"
        }}
      >
        <ListUsers />
      </main>
      <Footer />
    </>
  );
}

export default App;