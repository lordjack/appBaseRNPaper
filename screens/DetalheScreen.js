import React from "react";
import {Avatar, Card, Text, Title, Paragraph} from "react-native-paper";

export default class DetalheScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }

    render() {
        return (
            <Card>
                <Card.Title
                    title="Card DetalheScreen"
                    subtitle="Card Subtitle"
                    left={(props) => <Avatar.Icon {...props} icon="account"/>}
                />
                <Card.Content>
                    <Title>Tela DetalheScreen</Title>
                    <Paragraph>Aqui fica um texto</Paragraph>
                </Card.Content>
            </Card>
        );
    }
}
