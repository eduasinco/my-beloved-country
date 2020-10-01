import React from 'react';
import {Container, Card, ListGroup, ListGroupItem, Row, Col, Badge} from "react-bootstrap"

const url = "https://restcountries.eu/rest/v2/name/"

class Country extends React.Component {
    constructor(props) {
        super()
        this.state = {
            countryname: props.match.params.countryname,
            isLoaded: false,
            country: null,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchData(url + this.state.countryname)
    }

    fetchData(url){
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        country: result[0],
                        isLoaded: true,
                        error: null,
                    })
                },
                (error) => {
                    this.setState({
                        country: null,
                        isLoaded: true,
                        error: null,
                    })
                }
            )
    }

    render() {
        return (
            <>
                <Container className="py-4">
                    {this.state.isLoaded ?
                        <Card>
                            <Card.Img variant="top" src={this.state.country.flag} style={{height: 400, objectFit: "cover"}} />
                            <Card.Body>
                                <Card.Title>{this.state.country.name}</Card.Title>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <b>Basic info</b>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <ListGroupItem>Region: <Badge variant="secondary">{this.state.country.region}</Badge></ListGroupItem>
                                                <ListGroupItem>Capital: <Badge variant="secondary">{this.state.country.capital}</Badge> </ListGroupItem>
                                                <ListGroupItem>subregion: <Badge variant="secondary">{this.state.country.subregion}</Badge> </ListGroupItem>
                                                <ListGroupItem>population: <Badge variant="secondary">{this.state.country.population}</Badge> </ListGroupItem>
                                                <ListGroupItem>Lat: <Badge variant="secondary">{this.state.country.latlng[0]}</Badge> </ListGroupItem>
                                                <ListGroupItem>Lng: <Badge variant="secondary">{this.state.country.latlng[1]}</Badge> </ListGroupItem>
                                                <ListGroupItem>Demonym: <Badge variant="secondary">{this.state.country.demonym}</Badge> </ListGroupItem>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <ListGroupItem>Area: <Badge variant="secondary">{this.state.country.area}</Badge></ListGroupItem>
                                                <ListGroupItem>Gini: <Badge variant="secondary">{this.state.country.gini}</Badge> </ListGroupItem>
                                                <ListGroupItem>Alpha Code: <Badge variant="secondary">{this.state.country.alpha2Code}</Badge> </ListGroupItem>
                                                <ListGroupItem>Native Name: <Badge variant="secondary">{this.state.country.nativeName}</Badge> </ListGroupItem>
                                                <ListGroupItem>Numeric Code: <Badge variant="secondary">{this.state.country.numericCode}</Badge> </ListGroupItem>
                                                <ListGroupItem>CIOC: <Badge variant="secondary">{this.state.country.cioc}</Badge> </ListGroupItem>
                                                <ListGroupItem>Alpha3 Code: <Badge variant="secondary">{this.state.country.alpha3Code}</Badge> </ListGroupItem>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Spellings:</b>
                                                <ListGroup>
                                                    {this.state.country.altSpellings.map((sp) =>
                                                        <ListGroup.Item>{sp}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Timezones:</b>
                                                <ListGroup>
                                                    {this.state.country.timezones.map((tz) =>
                                                        <ListGroup.Item>{tz}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Top level domains:</b>
                                                <ListGroup>
                                                    {this.state.country.topLevelDomain.map((dom) =>
                                                        <ListGroup.Item>{dom}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Calling codes:</b>
                                                <ListGroup>
                                                    {this.state.country.callingCodes.map((code) =>
                                                        <ListGroup.Item>{code}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Row className="py-2">
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Translations:</b>
                                                <ListGroup>
                                                    {Object.keys(this.state.country.translations).map((key, index) =>
                                                        <ListGroup.Item>{this.state.country.translations[key]}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Borders:</b>
                                                <ListGroup>
                                                    {this.state.country.borders.map((tz) =>
                                                        <ListGroup.Item>{tz}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Languages:</b>
                                                <ListGroup>
                                                    {this.state.country.languages.map((lan) =>
                                                        <ListGroup.Item>{lan.name}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Currencies:</b>
                                                <ListGroup>
                                                    {this.state.country.currencies.map((cur) =>
                                                        <ListGroup.Item>{cur.code}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <b>Regional blocks:</b>
                                        <ListGroup horizontal>
                                            {this.state.country.regionalBlocs.map((rb) =>
                                                <ListGroup horizontal>
                                                    {Object.keys(rb).map((key, index) => {
                                                        let element;
                                                        if (Array.isArray(rb[key])){
                                                            if (rb[key].length === 0){
                                                                element = <ListGroup.Item>
                                                                    <ListGroup>
                                                                        {rb[key].map((it) => <ListGroup.Item>{it}</ListGroup.Item>)}
                                                                    </ListGroup>
                                                                </ListGroup.Item>
                                                            }
                                                        } else {
                                                            element = <ListGroup.Item>
                                                                {rb[key]}
                                                            </ListGroup.Item>
                                                        }
                                                        return element
                                                    })}
                                                </ListGroup>
                                            )}
                                        </ListGroup>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        :
                        <div>
                            Loading...
                        </div>
                    }
                </Container>
            </>
        );
    }
}


export default Country;