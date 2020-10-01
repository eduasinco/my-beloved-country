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
            darkMode: props.darkMode ? "dark-mode-card" : "",
        };
    }

    componentDidMount() {
        this.fetchData(url + this.state.countryname)
    }

    fetchData(url) {
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
                        <Card className={this.state.darkMode ? "dark-mode-card" : ""}>
                            <Card.Img variant="top" src={this.state.country.flag}
                                      style={{height: 400, objectFit: "cover"}}/>
                            <Card.Body>
                                <Card.Title>{this.state.country.name}</Card.Title>
                                <ListGroup className={"list-group-flush"}>
                                    <ListGroupItem className={this.state.darkMode ? "dark-mode-card" : ""}>
                                        <b>Basic info</b>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <ListGroupItem className={this.state.darkMode}>Region: <Badge
                                                    variant="secondary">{this.state.country.region}</Badge></ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Capital: <Badge
                                                    variant="secondary">{this.state.country.capital}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>subregion: <Badge
                                                    variant="secondary">{this.state.country.subregion}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>population: <Badge
                                                    variant="secondary">{this.state.country.population}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Lat: <Badge
                                                    variant="secondary">{this.state.country.latlng[0]}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Lng: <Badge
                                                    variant="secondary">{this.state.country.latlng[1]}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Demonym: <Badge
                                                    variant="secondary">{this.state.country.demonym}</Badge>
                                                </ListGroupItem>
                                            </Col>
                                            <Col xs={12} md={6} className={this.state.darkMode ? "dark-mode-card" : ""}>
                                                <ListGroupItem className={this.state.darkMode}>Area: <Badge
                                                    variant="secondary">{this.state.country.area}</Badge></ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Gini: <Badge
                                                    variant="secondary">{this.state.country.gini}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Alpha Code: <Badge
                                                    variant="secondary">{this.state.country.alpha2Code}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Native Name: <Badge
                                                    variant="secondary">{this.state.country.nativeName}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Numeric Code: <Badge
                                                    variant="secondary">{this.state.country.numericCode}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>CIOC: <Badge
                                                    variant="secondary">{this.state.country.cioc}</Badge>
                                                </ListGroupItem>
                                                <ListGroupItem className={this.state.darkMode}>Alpha3 Code: <Badge
                                                    variant="secondary">{this.state.country.alpha3Code}</Badge>
                                                </ListGroupItem>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className={this.state.darkMode}>
                                        <Row>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Spellings:</b>
                                                <ListGroup>
                                                    {this.state.country.altSpellings.map((sp) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{sp}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Timezones:</b>
                                                <ListGroup>
                                                    {this.state.country.timezones.map((tz) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{tz}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Top level domains:</b>
                                                <ListGroup>
                                                    {this.state.country.topLevelDomain.map((dom) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{dom}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Calling codes:</b>
                                                <ListGroup>
                                                    {this.state.country.callingCodes.map((code) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{code}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                        <Row className="py-2">
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Translations:</b>
                                                <ListGroup>
                                                    {Object.keys(this.state.country.translations).map((key, index) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{this.state.country.translations[key]}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Borders:</b>
                                                <ListGroup>
                                                    {this.state.country.borders.map((tz) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{tz}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Languages:</b>
                                                <ListGroup>
                                                    {this.state.country.languages.map((lan) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{lan.name}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                            <Col xs={12} md={6} lg={3}>
                                                <b>Currencies:</b>
                                                <ListGroup>
                                                    {this.state.country.currencies.map((cur) =>
                                                        <ListGroup.Item
                                                            className={this.state.darkMode}>{cur.code}</ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className={this.state.darkMode}>
                                        <b>Regional blocks:</b>
                                        <ListGroup>
                                            {this.state.country.regionalBlocs.map((rb) =>
                                                <ListGroup horizontal>
                                                    {Object.keys(rb).map((key, index) => {
                                                        let element;
                                                        if (Array.isArray(rb[key])) {
                                                            if (rb[key].length === 0) {
                                                                element =
                                                                    <ListGroup.Item className={this.state.darkMode}>
                                                                        <ListGroup className={this.state.darkMode}>
                                                                            {rb[key].map((it) => <ListGroup.Item
                                                                                className={this.state.darkMode}>{it}</ListGroup.Item>)}
                                                                        </ListGroup>
                                                                    </ListGroup.Item>
                                                            }
                                                        } else {
                                                            element = <ListGroup.Item className={this.state.darkMode}>
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