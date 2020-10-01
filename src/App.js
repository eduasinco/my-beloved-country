import React, {useState, useEffect} from 'react';
import Home from "./home/Home";
import Country from "./country/Country";
import {Route} from 'react-router-dom';
import {Navbar, Nav, ButtonGroup, ToggleButton} from "react-bootstrap"
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const [radioValue, setRadioValue] = useState(getInitialMode() ? '1' : '2');

  const radios = [
    {name: 'Dark', value: '1'},
    {name: 'Light', value: '2'},
  ];

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

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
          <Route path="/" exact component={(props) => <Home {...props} darkMode={darkMode}/>}/>
          <Route path="/country/:countryname" exact component={(props) => <Country {...props} darkMode={darkMode}/>}/>
        </div>
      </div>
  );
}

export default App;
