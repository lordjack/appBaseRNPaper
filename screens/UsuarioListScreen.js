import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import {
  Card,
  List,
  TextInput,
  FAB,
  Title,
  Paragraph,
  Divider,
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
    /*  let vetorTemp = await Fire.load(this.state.entidade);
    // console.log(vetorTemp);
    this.setState({ data: vetorTemp }); */

    const ref = Fire.db(this.state.entidade);

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
      let objSearch = Fire.search(text, "nome", this.state.data);

      this.setState({
        data: objSearch.dataArray,
        search: objSearch.search,
      });
    } else {
      this.loadData();
      this.setState({ search: "" });
    }
  };

  async componentDidMount() {
    this.loadData();
  }

  /*  componentDidUpdate() {
    this.loadData();
  } */

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
                  onPress: () => Fire.remove(this.state.entidade, key),
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
            <ScrollView>
              <List.Section>
                {this.state.data.map((item, i) => (
                  <Swipeable
                    renderLeftActions={(progress, dragX) =>
                      this.leftActions(progress, dragX, item.id)
                    }
                    renderRightActions={(progress, dragX) =>
                      this.rightActions(progress, dragX, item.id)
                    }
                  >
                    <Divider />
                    <RectButton style={styles.leftAction} onPress={this.close}>
                      <Card.Title
                        style={{ height: 80, backgroundColor: "#f8f9fa" }}
                        left={(props) => (
                          <View>
                            <Card.Cover
                              style={styles.imagemCard}
                              {...props}
                              source={require("../assets/favicon.png")}
                            />
                          </View>
                        )}
                      />
                      <Card.Content style={styles.descricao}>
                        <Title style={styles.titulo}>{item.nome}</Title>
                        <Paragraph>{item.telefone}</Paragraph>
                        <Paragraph>{item.datanascimento}</Paragraph>
                      </Card.Content>
                      <Divider />
                    </RectButton>
                  </Swipeable>
                ))}
              </List.Section>
            </ScrollView>
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
  imagemCard: {
    height: 50,
    width: 50,
    marginLeft: -10,
  },
  descricao: {
    marginLeft: 60,
    marginTop: -5,
    position: "absolute",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
