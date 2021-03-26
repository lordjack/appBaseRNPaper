import React from "react";
import {Avatar, Card, Text, Title, Paragraph} from "react-native-paper";

export default class Detalhe extends React.Component {
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
                    title="Card Detalhe"
                    subtitle="Card Subtitle"
                    left={(props) => <Avatar.Icon {...props} icon="account"/>}
                />
                <Card.Content>
                    <Title>Tela Detalhe</Title>
                    <Paragraph>Aqui fica um texto</Paragraph>
                </Card.Content>
            </Card>
        );
    }
}
