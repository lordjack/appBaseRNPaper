import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text, Title, Paragraph } from "react-native-paper";

export default class Sobre extends React.Component {
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
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Content>
          <Title>Tela Sobre</Title>
          <Paragraph>Aqui fica um texto</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}