import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import {
  Button,
  Card,
  List,
  TextInput,
  Avatar,
  Title,
  Caption,
  FAB,
  Divider,
  IconButton,
  Paragraph,
} from "react-native-paper";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
// Componentes
//import firebase from './firebase_';
import Fire from "./../components/Fire";

export default class ListagemMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidade: "maquina",
      data: [],
      search: null,
    };
  }
  loadUsers = () => {
    fetch("https://randomuser.me/api/?results=7")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ data: res.results || [] });
      });
  };

  loadData = async () => {
    const ref = Fire.db.database.ref(this.state.entidade);

    await ref.on("value", (snapshot) => {
      var vetorTemp = [];
      snapshot.forEach((child) => {
        vetorTemp.push({
          id: child.key,
          titulo: child.val().titulo,
          descricao: child.val().descricao,
          images: child.val().images,
        });
        //    console.log(child.val().images);
      });

      this.setState({ data: vetorTemp });
    });
  };

  search = (text) => {
    if (text != "") {
      let newArray = Fire.db.search(text, "titulo", this.state.data);

      this.setState({
        data: newArray.arrayItems,
        search: newArray.text,
      });
    } else {
      this.loadData();
      this.setState({ search: null });
    }
  };

  async componentDidMount() {
    await this.loadData();
  }

  leftActions = (progress, dragX, key) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View
        style={{ flex: 1, backgroundColor: "#09f", justifyContent: "center" }}
      >
        <Animated.Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            fontWeight: "600",
            transform: [{ scale }],
          }}
        >
          Detalhes
        </Animated.Text>
      </View>
    );
  };

  rightActions = (progress, dragX, key) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Remover",
              "Deseja realmente remover o registro?",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancelar Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () =>
                    Fire.db.removeWithFiles(this.state.entidade, key),
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "600",
                transform: [{ scale }],
              }}
            >
              Deletar
            </Animated.Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("MaquinaForm", {
              key: key,
            })
          }
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "green",
              justifyContent: "center",
            }}
          >
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "600",
                transform: [{ scale }],
              }}
            >
              Editar
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  render() {
    return (
      <View style={styles.organiza}>
        <Card>
          <Card.Content>
            <TextInput
              label="Pesquisar por nome"
              onChangeText={(text) => this.search(text)}
              value={this.state.search}
              left={<TextInput.Icon name="magnify" size={28} />}
            />
            {this.state.data.map((item, i) => (
              <List.Section>
                <Swipeable
                  renderLeftActions={(progress, dragX) =>
                    this.leftActions(progress, dragX, item.id)
                  }
                  renderRightActions={(progress, dragX) =>
                    this.rightActions(progress, dragX, item.id)
                  }
                >
                  <RectButton style={styles.leftAction} onPress={this.close}>
                    <Card.Title
                      title={item.titulo}
                      subtitle="teset1"
                      right={(props) => (
                        <IconButton
                          {...props}
                          icon="dots-vertical"
                          onPress={() => {
                            Alert.alert(
                              "Informações",
                              "Arraste para o lado direito Edite ou Exclua, esquerdo para ver detalhes."
                            );
                          }}
                        />
                      )}
                      left={(props) => (
                        <View>
                          {this.state.data === 0 ||
                          item.images === undefined ? (
                            <Avatar.Image
                              size={60}
                              {...props}
                              source={require("../assets/favicon.png")}
                            />
                          ) : (
                            <Avatar.Image
                              size={60}
                              {...props}
                              source={{
                                uri: item.images[0].uri,
                              }}
                            />
                          )}
                        </View>
                      )}
                    />
                  </RectButton>
                </Swipeable>
              </List.Section>
            ))}
          </Card.Content>
        </Card>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() =>
            this.props.navigation.navigate("MaquinaForm", { key: "" })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  organiza: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#09f",
  },
  line: {
    height: 50,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    alignSelf: "center",
  },
  info: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  descricao: {
    fontSize: 12,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 14,
  },
  texto: {
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
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
    backgroundColor: "blue",
  },
  inputd: {
    width: 125,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    backgroundColor: "blue",
    marginBottom: 5,
  },
});
