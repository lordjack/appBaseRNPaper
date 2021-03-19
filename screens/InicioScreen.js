import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  //BottomNavigation,
  Card,
  Text,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";

//import UsuarioForm from "./UsuarioFormScreen";
//import UsuarioList from "./UsuarioListScreen";

export default class InicioScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  render() {
    /*
    const renderScene = BottomNavigation.SceneMap({
      Inicio: InicioScreen,
      Usuario: UsuarioList,
    });
    */
    return (
      <Card>
        <Text>App Base React-Native - CRUD com o Firebase</Text>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Content>
          <Title>App Base React-Native - CRUD com o Firebase</Title>
          <Paragraph>Bibliotecas: React Native Paper e React Native</Paragraph>

          <Button
            icon="account"
            mode="contained"
            onPress={() => this.props.navigation.navigate("UsuarioList")}
          >
            Usuário
          </Button>

          <Button
            icon="account"
            mode="contained"
            onPress={() => this.props.navigation.navigate("MaquinaList")}
          >
            Maquina
          </Button>
        </Card.Content>
        {/*
        <BottomNavigation
          navigationState={{
            index: 1,
            routes: [
              {
                key: "music",
                title: "Music",
                icon: "queue-music",
                color: "#3F51B5",
              },
              {
                key: "albums",
                title: "Albums",
                icon: "album",
                color: "#009688",
              },
              {
                key: "recents",
                title: "Recents",
                icon: "history",
                color: "#795548",
              },
              {
                key: "purchased",
                title: "Purchased",
                icon: "shopping-cart",
                color: "#607D8B",
              },
            ],
          }}
          onIndexChange={this.setState({ index: this.state.index })}
          renderScene={renderScene}
        />
        */}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 170,
    marginTop: 10,
    borderRadius: 15,
    height: 44,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginBottom: 10,
  },
});
