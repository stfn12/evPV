import React from "react";
import { Card, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ControlorCtA = () => (
  <div>
    <Divider/>
    <Card centered>
      <Card.Content>
        <Link to="/controlori/adauga"> Adauga controlor
          <Icon name="plus square outline" size="massive"/>
        </Link>
      </Card.Content>
    </Card>
    <Divider/>
  </div>
);

export default ControlorCtA;