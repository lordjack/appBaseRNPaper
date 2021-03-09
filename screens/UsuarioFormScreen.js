import React from "react";
import { StyleSheet, Alert, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import Fire from "../components/Fire";

export default class UsuarioFormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entidade: "usuario",
      id: null,
      nome: "",
      telefone: "",
      datanascimento: "",
    };
  }

  salvar = () => {
    try {
      let label = "";
      let objItens = {
        id: this.state.id,
        nome: this.state.nome,
        telefone: this.state.telefone,
        datanascimento: this.state.datanascimento,
      };

      if (objItens.id === null) {
        Fire.db.save(this.state.entidade, objItens);
        label = "inserido";
      } else {
        Fire.db.update(this.state.entidade, objItens, objItens.id);
        label = "atualizado";
      }

      Alert.alert("Informação", "Registro " + label + " com sucesso!");

      this.props.navigation.navigate("UsuarioList");
    } catch (error) {
      console.log(error.message);
    }
  };
  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = () => {
    const { route } = this.props;
    const { key } = route.params;
    console.log(key);
    if (key !== "") {
      console.log("teste");
      Fire.db.database
        .ref(this.state.entidade + "/" + key)
        .on("value", (snapshot) => {
          this.setState({
            id: key,
            nome: snapshot.val().nome,
            telefone: snapshot.val().telefone,
            datanascimento: snapshot.val().datanascimento,
          });
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <TextInput
              name="nome"
              label="Nome"
              value={this.state.nome}
              onChangeText={(text) => this.setState({ nome: text })}
              left={<TextInput.Icon name="account" />}
            />
            <TextInput
              name="telefone"
              label="(84) 98800-0000"
              value={this.state.telefone}
              onChangeText={(text) => this.setState({ telefone: text })}
              left={<TextInput.Icon name="phone" />}
            />
            <TextInput
              name="datanascimento"
              label="00/00/0000"
              value={this.state.datanascimento}
              onChangeText={(text) => this.setState({ datanascimento: text })}
              left={<TextInput.Icon name="calendar" />}
            />
            <Button
              contentStyle={styles.input}
              icon="content-save"
              mode="contained"
              onPress={() => this.salvar()}
            >
              {!this.state.id ? "Salvar" : "Editar"}
            </Button>
          </Card.Content>
        </Card>
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
});
