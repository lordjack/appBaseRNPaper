import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    Platform,
    Dimensions,
    Alert,
    View,
} from "react-native";

import {Button, Card, Text, FAB, TextInput} from "react-native-paper";
import {Dropdown} from "sharingan-rn-modal-dropdown";

let {width} = Dimensions.get("window");
let numberGrid = 2;
let widthGrid = width / numberGrid;

// Componentes
import Fire from "../components/Fire";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Carousel from "react-native-snap-carousel";
import {ScrollView} from "react-native-gesture-handler";

export default class ProdutoFormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entidade: "produto",
            id: null,
            titulo: "",
            descricao: "",
            categoria: "",
            tipo: "",
            preco: "",
            images: [],
        };

        this.categoriaList = [
            {label: "Itens Cozinha", value: "itens_cozinha"},
            {label: "Ferramenta", value: "ferramenta"},
            {label: "Informática", value: "informatica"},
            {label: "Outros", value: "outros"},
        ];
        this.tipoList = [
            {label: "Eletrônico", value: "eletronico"},
            {label: "Inox", value: "inox"},
            {label: "Madeira", value: "madeira"},
            {label: "Outros", value: "outros"},
        ];
    }

    componentDidMount() {
        this.getPermissionAsync();

        this.loadData();
    }

    //atualiza depois de montado
    componentDidUpdate() {
        const {params} = this.props.route;
        if (params) {
            const {images} = params;
            if (images) this.setState({images});
            delete params.images;
        }
    }

    renderImage(item, i, arrayLength) {
        if (item.uri !== undefined) {
            return (
                <View>
                    <Image
                        style={styles.imagemPrincipal}
                        source={{uri: item.uri}}
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
                        source={{uri: item}}
                        key={i}
                    />
                    <Text style={styles.textoImagem}>
                        {i + 1}/{arrayLength}
                    </Text>
                </View>
            );
        }
    }

    getPermissionAsync = async () => {
        if (Platform.OS === "ios") {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasPermission: status === "granted"});
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
                tipo: this.state.tipo,
            };

            if (objItens.id === null) {
                label = "inserido";
            } else {
                label = "atualizado";
            }
            Fire.saveWithImagens(this.state.entidade, objItens, this.state.images);

            Alert.alert("Informação", "Registro " + label + " com sucesso!");

            this.props.navigation.navigate("ProdutoList");
        } catch (error) {
            console.log(error.message);
        }
    };

    loadData = async () => {
        const {route} = this.props;
        const {key} = route.params;

        if (key !== "") {
            const ref = Fire.db(this.state.entidade + "/" + key);

            await ref
                .once("value")
                .then((snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            id: key,
                            titulo: snapshot.val().titulo,
                            descricao: snapshot.val().descricao,
                            images: snapshot.val().images,
                            preco: snapshot.val().preco,
                            tipo: snapshot.val().tipo,
                            categoria: snapshot.val().categoria,
                        });
                    }
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
                <ScrollView>
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
                                sliderWidth={405}
                                itemWidth={405}
                                renderItem={(obj, index) =>
                                    this.renderImage(
                                        obj.item,
                                        obj.index,
                                        this.state.images.length
                                    )
                                }
                                onSnapToItem={(index) => this.setState({activeIndex: index})}
                            />
                        </View>
                    )}
                    <FAB
                        style={styles.fab}
                        icon="image-plus"
                        onPress={() => this.props.navigation.navigate("ImagesSelectScreen")}
                    />
                    <Card>
                        {this.state.images.length === 0 ||
                        this.state.images === undefined ? (
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
                            onChangeText={(text) => this.setState({titulo: text})}
                        />
                        <TextInput
                            rowSpan={3}
                            name="descricao"
                            label="Descrição"
                            value={this.state.descricao}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Descrição Maquina"
                            onChangeText={(text) => this.setState({descricao: text})}
                        />
                        <TextInput
                            name="preco"
                            label="Preço"
                            value={this.state.preco}
                            onChangeText={(text) => this.setState({preco: text})}
                        />
                        <Dropdown
                            label="Categoria"
                            data={this.categoriaList}
                            enableSearch
                            value={this.state.categoria}
                            onChange={(text) => this.setState({categoria: text})}
                        />
                        <Dropdown
                            label="tipo"
                            data={this.tipoList}
                            enableSearch
                            value={this.state.tipo}
                            onChangeText={(text) => this.setState({tipo: text})}
                        />
                        <Button
                            icon="content-save"
                            mode="contained"
                            onPress={() => this.salvar()}
                        >
                            {!this.state.id ? "Salvar" : "Editar"}
                        </Button>
                    </Card>
                </ScrollView>
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
        bottom: 480,
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
        width: widthGrid + 170,
        height: widthGrid + 15,
        padding: 3,
        borderRadius: 10,
    },
    textoImagem: {
        backgroundColor: "#424242",
        color: "white",
        borderRadius: 5,
        fontSize: 24,
        marginTop: 180,
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
});
