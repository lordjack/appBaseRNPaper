import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import telas
import InicioScreen from "./../screens/InicioScreen";
import UsuarioListScreen from "./../screens/UsuarioListScreen";
import UsuarioFormScreen from "./../screens/UsuarioFormScreen";
import MaquinasForm from "../screens/MaquinasForm";
import MaquinasList from "../screens/MaquinasList";
import ImagesSelectScreen from "../screens/ImagesSelectScreen";

const Stack = createStackNavigator();

export default class Rotas extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MaquinaList">
          <Stack.Screen
            name="Inicio" //nome da rota
            component={InicioScreen} //nome do componente
            options={{ headerShown: false }} //não exibe o titulo
          />
          <Stack.Screen
            name="UsuarioList"
            component={UsuarioListScreen}
            options={{ title: "Listagem Usuário" }} // titulo da tela
          />
          <Stack.Screen
            name="UsuarioForm"
            component={UsuarioFormScreen}
            options={{ title: "Formulário Usuário" }}
          />
          <Stack.Screen
            name="MaquinaForm"
            component={MaquinasForm}
            options={{ title: "Formulário Maquina" }}
          />
          <Stack.Screen
            name="MaquinaList"
            component={MaquinasList}
            options={{ title: "Listagem Máquinas" }}
          />
          <Stack.Screen
            name="ImagesSelectScreen"
            component={ImagesSelectScreen}
            options={{ title: "Formulário Maquina" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
