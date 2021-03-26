import React from "react";
import {StyleSheet, Alert, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {Button, Card, TextInput} from "react-native-paper";
import {Dropdown} from "sharingan-rn-modal-dropdown";
import {DatePickerModal} from "react-native-paper-dates";
import {format} from "date-fns";
import {TextInputMask} from "react-native-masked-text";
import Fire from "../components/Fire";

export default class UsuarioFormScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entidade: "usuario",
            id: null,
            nome: "",
            telefone: "",
            tipo: "",
            datanascimento: null,
            open: false,
        };

        this.tipoList = [
            {label: "Padrão", value: "padrao"},
            {label: "Administrador", value: "administrador"},
            {label: "Convidado", value: "convidado"},
        ];
    }

    salvar = () => {
        try {
            let label = "";
            let objItens = {
                id: this.state.id,
                nome: this.state.nome,
                telefone: this.state.telefone,
                tipo: this.state.tipo,
                datanascimento: this.state.datanascimento,
            };

            if (objItens.id === null) {
                Fire.save(this.state.entidade, objItens);
                label = "inserido";
            } else {
                Fire.update(this.state.entidade, objItens, objItens.id);
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
        const {route} = this.props;
        const {key} = route.params;
        if (key !== "") {
            Fire.db(this.state.entidade + "/" + key).on("value", (snapshot) => {
                if (snapshot.val()) {
                    this.setState({
                        id: key,
                        nome: snapshot.val().nome,
                        telefone: snapshot.val().telefone,
                        datanascimento: snapshot.val().datanascimento,
                    });
                }
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <Card.Content>
                        <ScrollView>
                            <TextInput
                                name="nome"
                                label="Nome"
                                value={this.state.nome}
                                onChangeText={(text) => this.setState({nome: text})}
                                left={<TextInput.Icon name="account"/>}
                            />
                            <Dropdown
                                style={{backgroundColor: "#ccc"}}
                                label="Tipo"
                                data={this.tipoList}
                                enableSearch
                                value={this.state.tipo}
                                onChange={(text) => this.setState({tipo: text})}
                            />
                            <TextInput
                                name="telefone"
                                label="(84) 98800-0000"
                                value={this.state.telefone}
                                onChangeText={(text) => this.setState({telefone: text})}
                                left={<TextInput.Icon name="phone"/>}
                                render={(props) => (
                                    <TextInputMask
                                        {...props}
                                        type={"custom"}
                                        options={{
                                            mask: "(99) 9999-9999",
                                        }}
                                    />
                                )}
                            />
                            <TextInput
                                name="Data Nascimento"
                                label="00/00/2000"
                                value={this.state.datanascimento}
                                onChangeText={(text) => this.setState({datanascimento: text})}
                                onTouchStart={() =>
                                    this.setState({open: true, datanascimento: null})
                                }
                                left={<TextInput.Icon name="calendar-month-outline"/>}
                            />
                            <DatePickerModal
                                locale={"pt"}
                                mode="single"
                                visible={this.state.open}
                                onDismiss={() => {
                                    this.setState({open: false});
                                }}
                                date={this.state.datanascimento}
                                onConfirm={(params) => {
                                    this.setState({
                                        open: false,
                                        datanascimento: format(params.date, "dd/MM/yyyy"),
                                    });
                                }}
                                saveLabel="Salvar" // optional
                                label="Selecionar Data" // optional
                            />
                            <Button
                                contentStyle={styles.input}
                                icon="content-save"
                                mode="contained"
                                onPress={() => this.salvar()}
                            >
                                {!this.state.id ? "Salvar" : "Editar"}
                            </Button>
                        </ScrollView>
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
