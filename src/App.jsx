import { useState } from "react";

import Entrada from "./components/entrada/Entrada";
import Portfolio from "./Portfolio";

function App() {
  const [entrou, setEntrou] = useState(false);

  if (!entrou) {
    return <Entrada onEntrar={() => setEntrou(true)} />;
  }

  return <Portfolio />;
}

export default App;
