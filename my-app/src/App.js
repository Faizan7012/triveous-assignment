import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <Navbar/>
      <AllRoutes/>
    </ChakraProvider>
  );
}

export default App;
