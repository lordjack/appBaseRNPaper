import React, {Component} from "react";
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Button,
    Text,
    Root,
    Toast,
} from "native-base";
import {StyleSheet, Image, KeyboardAvoidingView} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

// Componentes
import firebase from "./firebase_";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }

    logar = () => {
        const {email, password} = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("O login está ok!");
                this.props.navigation.navigate("Página inicial");
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
                if (error.code === "auth/invalid-email") {
                    Toast.show({
                        text: "E-mail ou senha inválidos!",
                    });
                }
            });
    };

    render() {
        return {
            /* <Root>
                      <Container style={styles.organiza}>
                          <Content>
                              <Image
                                  style={styles.logo}
                                  source={require('../assets/snack-icon.png')}
                              />
                              <Text style={styles.nomeApp}>THE DONUT NEWS</Text>
                              <Text style={styles.texto}>
                                  Para entrar é necessário realizar o login. Não tem? Cadastre-se
                                  abaixo!
                              </Text>
                              <Form>
                                  <Item floatingLabel>
                                      <Label>E-mail</Label>
                                      <Input
                                          name="email"
                                          value={this.state.email}
                                          onChangeText={(text) => this.setState({email: text})}
                                      />
                                  </Item>
                                  <Item floatingLabel>
                                      <Label>Senha</Label>
                                      <Input
                                          name="password"
                                          value={this.state.password}
                                          onChangeText={(text) => this.setState({password: text})}
                                          secureTextEntry={true}
                                      />
                                  </Item>
                                  <KeyboardAvoidingView>
                                      <Button style={styles.input} onPress={() => this.logar()}>
                                          <Text>Entrar</Text>
                                          <FontAwesome5
                                              name="sign-in-alt"
                                              size={20}
                                              color={'white'}></FontAwesome5>
                                      </Button>
                                      <Button
                                          style={styles.input}
                                          onPress={() => this.props.navigation.navigate('Cadastro Usuário')}>
                                          <Text>Criar cadastro</Text>
                                          <FontAwesome5
                                              name="arrow-right"
                                              size={20}
                                              color={'white'}></FontAwesome5>
                                      </Button>
                                  </KeyboardAvoidingView>
                              </Form>
                          </Content>
                      </Container>
                  </Root> */
        };
    }
}

const styles = StyleSheet.create({
    organiza: {
        justifyContent: "center",
        padding: 10,
    },
    logo: {
        height: 110,
        marginTop: 30,
        width: 110,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    nomeApp: {
        fontStyle: "italic",
        fontSize: 25,
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    texto: {
        fontSize: 15,
        marginTop: 20,
        textAlign: "center",
        marginBottom: 15,
    },
    input: {
        width: 200,
        borderRadius: 15,
        marginTop: 28,
        height: 44,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "pink",
    },
});
