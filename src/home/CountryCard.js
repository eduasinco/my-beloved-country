import React from 'react';
import {Card} from "react-bootstrap"

function CountryCard(props) {

    function handleSelectCountry(event, name) {
        props.history.push("country/" + name)
    }

    return (
        <Card className={props.darkMode ? "dark-mode" : ""}
              style={{cursor: "pointer"}}
              onClick={(event) => handleSelectCountry(event, props.item.name)}>
            <Card.Img variant="top" src={props.item.flag} style={{height: 200, objectFit: "cover"}}/>
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Text>
                    {props.item.name} has a population of {props.item.population} people and is located
                    in {props.item.region}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CountryCard;