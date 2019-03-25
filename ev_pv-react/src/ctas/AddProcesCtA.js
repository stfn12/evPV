import React from "react";
import { Card, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProcesCtA = () => (
  <div>
    <Divider/>
    <Card centered>
      <Card.Content>
        <Link to="/procese/adauga"> Adauga PV
          <Icon name="plus square outline" size="massive"/>
        </Link>
      </Card.Content>
    </Card>
    <Divider/>
  </div>
);

export default ProcesCtA;