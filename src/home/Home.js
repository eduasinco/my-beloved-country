import React from 'react';
import CountryCard from "./CountryCard"
import {Container, Row, Col, InputGroup, FormControl, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const url = "https://restcountries.eu/rest/v2/"


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            country: '',
            region: '',
            items: [],
            darkMode: props.darkMode,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.fetchData(url + "all")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.country !== this.state.country) {
            let ss = url + "all"
            if (this.state.country) {
                ss = url + "name/" + this.state.country
            }
            this.fetchData(ss)
        } else if (prevState.region !== this.state.region) {
            let ss = url
            if (this.state.region === "All") {
                ss += "all"
            } else {
                ss += "region/" + this.state.region
            }
            this.fetchData(ss)
        }
    }

    fetchData(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (Array.isArray(result)) {
                        this.setState({
                            items: result,
                            isLoaded: true,
                            error: null,
                        })
                    } else {
                        this.setState({
                            error: result,
                        })
                    }

                },
                (error) => {
                    this.setState({
                        items: [],
                        isLoaded: true,
                        error: null,
                    })
                }
            )
    }

    handleChange(event) {
        this.setState({country: event.target.value});
    }

    handleSelect(event) {
        this.setState({region: event.target.value});
    }

    render() {
        return (
            <>
                <Container className="py-4 ">
                    <Row>
                        <Col xs={12} md={6} lg={3}>
                            <Form.Label>Country</Form.Label>
                            <InputGroup className="mb-3" value={this.state.country}
                                        onChange={this.handleChange}>
                                <FormControl
                                    placeholder="Country Name"
                                    aria-label="Country Name"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="exampleForm.ControlSelect1"
                                        onChange={this.handleSelect}>
                                <Form.Label>Region</Form.Label>
                                <Form.Control as="select">
                                    <option>All</option>
                                    <option>Africa</option>
                                    <option>Americas</option>
                                    <option>Asia</option>
                                    <option>Europe</option>
                                    <option>Oceania</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    {!this.state.isLoaded ?
                        <div>Loading...</div> :
                        this.state.error ?
                            <div>Sorry this country was not found...</div> :
                            <Row>
                                {this.state.items.map((item) =>
                                    <Col key={item.name} xs={12} md={6} lg={3} className="py-3">
                                        <CountryCard {...this.props} item={item}/>
                                    </Col>
                                )}
                            </Row>
                    }
                </Container>
            </>
        );
    }
}

export default Home