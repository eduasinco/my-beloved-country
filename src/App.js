import React, {useState} from 'react';
import Home from "./home/Home";
import Country from "./country/Country";
import {Route} from 'react-router-dom';
import {Navbar, Nav, ButtonGroup, ToggleButton} from "react-bootstrap"
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [radioValue, setRadioValue] = useState('2');

  const radios = [
    {name: 'Dark', value: '1'},
    {name: 'Light', value: '2'},
  ];

  function onThemeModeChange(e) {
    let val = e.currentTarget.value
    setRadioValue(val)
    setDarkMode(val === '1')
  }

  return (
      <div className={darkMode ? "dark-mode" : ""}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>MY BELOVED COUNTRY</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/*<Nav.Link href="/country/spain">Spain</Nav.Link>*/}
          </Nav>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => onThemeModeChange(e)}
                >
                  {radio.name}
                </ToggleButton>
            ))}
          </ButtonGroup>
        </Navbar>
        <div className="content">
          <Route path="/" exact component={Home}/>
          <Route path="/country/:countryname" exact component={Country}/>
        </div>
      </div>
  );
}

export default App;
