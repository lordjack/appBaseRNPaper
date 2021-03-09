import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Animated,
} from "react-native";
import {
  Button,
  Card,
  List,
  SearchBar,
  TextInput,
  Icon,
  Colors,
  Text,
  FAB,
} from "react-native-paper";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Fire from "./../components/Fire";

export default class UsuarioListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entidade: "usuario",
      data: [],
      search: "",
      trans: "",
    };
  }

  loadData = async () => {
    const ref = Fire.db.database.ref(this.state.entidade);

    await ref.on("value", (snapshot) => {
      var vetorTemp = [];
      if (snapshot) {
        snapshot.forEach((child) => {
          vetorTemp.push({
            id: child.key,
            nome: child.val().nome,
            telefone: child.val().telefone,
            datanascimento: child.val().datanascimento,
          });
        });
      }

      this.setState({ data: vetorTemp });
    });
  };

  search = (text) => {
    if (text) {
      console;
      let newArray = Fire.db.search(text, "nome", this.state.data);

      console.log(newArray.arrayItems);
      this.setState({
        data: newArray.arrayItems,
        search: newArray.text,
      });
    } else {
      this.loadData();
      this.setState({ search: "" });
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
                  onPress: () => Fire.db.remove(this.state.entidade, key),
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
            this.props.navigation.navigate("UsuarioForm", {
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
      <View style={styles.container}>
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
                    <List.Item
                      title={item.nome}
                      description={item.telefone + " - " + item.datanascimento}
                      left={(props) => <List.Icon {...props} icon="folder" />}
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
            this.props.navigation.navigate("UsuarioForm", { key: "" })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#09f",
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 80,
    height: 80,
    //backgroundColor: "black",
  },
});
