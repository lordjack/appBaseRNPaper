import React from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Card, Button, Title, Paragraph, Divider} from "react-native-paper";
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from "react-native-paper-tabs";

import SobreScreen from "./SobreScreen";
import DetalheScreen from "./DetalheScreen";

//import UsuarioList from "./UsuarioListScreen";

export default class InicioScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }

    render() {
        return (
            <Tabs
                // defaultIndex={0} // default = 0
                // uppercase={false} // true/false | default=true | labels are uppercase
                // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                // iconPosition // leading, top | default=leading
                // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
                // dark={false} // works the same as AppBar in react-native-paper
                // theme={} // works the same as AppBar in react-native-paper
                // mode="scrollable" // fixed, scrollable | default=fixed
                // onChangeIndex={(newIndex) => {}} // react on index change
                // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
            >
                <TabScreen label="Início" icon="compass">
                    <View style={{flex: 1}}>
                        <Card>
                            <Card.Title
                                title="Card Title"
                                subtitle="Card Subtitle"
                                left={(props) => <Avatar.Icon {...props} icon="account"/>}
                            />
                            <Card.Content>
                                <Title>App Base React-Native - CRUD com o Firebase</Title>
                                <Paragraph>
                                    Bibliotecas: React Native Paper e React Native
                                </Paragraph>
                                <Button
                                    icon="account"
                                    mode="contained"
                                    onPress={() => this.props.navigation.navigate("UsuarioList")}
                                >
                                    Usuário
                                </Button>
                                <Divider/>
                                <Button
                                    icon="account"
                                    mode="contained"
                                    onPress={() => this.props.navigation.navigate("ProdutoList")}
                                >
                                    Produto
                                </Button>
                            </Card.Content>
                        </Card>
                    </View>
                </TabScreen>
                <TabScreen label="Usuário" icon="account">
                    <View style={{flex: 1}}>
                        <DetalheScreen/>
                    </View>
                </TabScreen>
                <TabScreen label="Sobre" icon="information">
                    <View style={{flex: 1}}>
                        <SobreScreen/>
                    </View>
                </TabScreen>
            </Tabs>
        );
    }
}
