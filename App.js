import React from "react";
import { Button, Provider as PaperProvider } from "react-native-paper";

import Rotas from "./components/Rotas";

export default function App() {
  return (
    <PaperProvider>
      <Rotas />
    </PaperProvider>
  );
}
