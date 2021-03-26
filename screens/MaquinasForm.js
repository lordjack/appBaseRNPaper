import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  Alert,
  View,
} from "react-native";

import { Button, Card, Text, FAB, TextInput } from "react-native-paper";

let { width } = Dimensions.get("window");
let numberGrid = 2;
let widthGrid = width / numberGrid;

// Componentes
import Fire from "../components/Fire";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Carousel from "react-native-snap-carousel";

export default class MaquinasForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidade: "maquina",
      id: null,
      titulo: "a",
      descricao: "a",
      categoria: "a",
      tipo: "maquina",
      preco: "a",
      latitude: "a",
      longitude: "a",
      images: [],
      activeIndex: 0,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();

    this.loadData();
  }

  //atualiza depois de montado
  componentDidUpdate() {
    const { params } = this.props.route;
    if (params) {
      const { images } = params;
      if (images) this.setState({ images });
      delete params.images;
    }
  }
  renderImage(item, i, arrayLength) {
    if (item.uri !== undefined) {
      return (
        <View>
          <Image
            style={styles.imagemPrincipal}
            source={{ uri: item.uri }}
            key={i}
          />
          <Text style={styles.textoImagem}>
            {i + 1}/{arrayLength}
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={styles.imagemPrincipal}
            source={{ uri: item }}
            key={i}
          />
          <Text style={styles.textoImagem}>
            {i + 1}/{arrayLength}{" "}
          </Text>
        </View>
      );
    }
  }
  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  salvar = () => {
    try {
      let label = "";
      let objItens = {
        id: this.state.id,
        titulo: this.state.titulo,
        descricao: this.state.descricao,
        preco: this.state.preco,
        categoria: this.state.categoria,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        tipo: this.state.tipo,
      };

      if (objItens.id === null) {
        label = "inserido";
      } else {
        label = "atualizado";
      }
      Fire.db.saveWithImagens(this.state.entidade, objItens, this.state.images);

      Alert.alert("Informação", "Registro " + label + " com sucesso!");

      this.props.navigation.navigate("MaquinaList");
    } catch (error) {
      console.log(error.message);
    }
  };

  loadData = async () => {
    const { route } = this.props;
    const { key } = route.params;

    if (key !== "") {
      const ref = Fire.db.database.ref(this.state.entidade + "/" + key);

      await ref
        .once("value")
        .then((snapshot) => {
          this.setState({
            id: key,
            titulo: snapshot.val().titulo,
            descricao: snapshot.val().descricao,
            images: snapshot.val().images,
            preco: snapshot.val().preco,
            tipo: snapshot.val().tipo,
            categoria: snapshot.val().categoria,
            latitude: snapshot.val().latitude,
            longitude: snapshot.val().longitude,
          });
        })
        .catch((error) => {
          console.error(error);
        });

      this.forceUpdate();
    }
  };

  render() {
    return (
      <View style={styles.organiza}>
        {this.state.images.length === 0 || this.state.images === undefined ? (
          <Image
            style={styles.logo}
            source={require("../assets/favicon.png")}
          />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Carousel
              layout={"default"}
              ref={(c) => {
                this._carousel = c;
              }}
              data={this.state.images}
              sliderWidth={505}
              itemWidth={505}
              renderItem={(obj, index) =>
                this.renderImage(obj.item, obj.index, this.state.images.length)
              }
              onSnapToItem={(index) => this.setState({ activeIndex: index })}
            />
          </View>
        )}
        <FAB
          style={styles.fab}
          icon="image-plus"
          onPress={() => this.props.navigation.navigate("ImagesSelectScreen")}
        />
        <Card>
          {this.state.images.length === 0 || this.state.images === undefined ? (
            <Text style={styles.texto}>
              Incluir de 0 a 6 fotos - A primeira imagem será a principal
            </Text>
          ) : (
            <Text style={styles.texto}>
              {this.state.images.length} de 6 adicionados
            </Text>
          )}
          <TextInput
            name="titulo"
            label="Titulo"
            value={this.state.titulo}
            onChangeText={(text) => this.setState({ titulo: text })}
          />
          <TextInput
            rowSpan={3}
            name="descricao"
            label="Descrição"
            value={this.state.descricao}
            multiline={true}
            numberOfLines={5}
            placeholder="Descrição Maquina"
            onChangeText={(text) => this.setState({ descricao: text })}
          />
          <TextInput
            name="preco"
            label="Preço"
            value={this.state.preco}
            onChangeText={(text) => this.setState({ preco: text })}
          />
          <TextInput
            name="categoria"
            label="Categoria"
            value={this.state.categoria}
            onChangeText={(text) => this.setState({ categoria: text })}
          />
          <TextInput
            name="tipo"
            label="tipo"
            value={this.state.tipo}
            onChangeText={(text) => this.setState({ tipo: text })}
          />
          <TextInput
            name="latitude"
            label="Latitude"
            value={this.state.latitude}
            onChangeText={(text) => this.setState({ latitude: text })}
          />
          <TextInput
            name="longitude"
            label="Longitude"
            value={this.state.longitude}
            onChangeText={(text) => this.setState({ longitude: text })}
          />
          <Button
            icon="content-save"
            mode="contained"
            onPress={() => this.salvar()}
          >
            {!this.state.id ? "Salvar" : "Editar"}
          </Button>
        </Card>
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
    bottom: 625,
    backgroundColor: "#09f",
  },
  logo: {
    height: 110,
    marginTop: 60,
    width: 110,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imagemPrincipal: {
    width: widthGrid + 200,
    height: widthGrid + 50,
    padding: 3,
    borderRadius: 10,
  },
  textoImagem: {
    backgroundColor: "#424242",
    color: "white",
    borderRadius: 5,
    fontSize: 24,
    marginTop: 300,
    paddingLeft: 10,
    paddingRight: 12,
    alignSelf: "center",
    position: "absolute",
  },
  nomeApp: {
    fontStyle: "italic",
    fontSize: 25,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  texto: {
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 25,
  },
  input: {
    width: 200,
    marginTop: 28,
    height: 44,
    borderRadius: 15,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
});
