import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Navbar, Nav, NavItem, MenuItem, NavDropdown,
        FormControl, ControlLabel } from 'react-bootstrap';


class Header extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedSetting: false,
    }
    this.input = null;
    this.eatClick = this.eatClick.bind(this);
  }

  validateTimer() {
    if ((this.props.settings.turnTimer < 5) ||
        (this.props.settings.turnTimer > 120)) {
          return 'warning';
    }
    return 'success';
  }

  eatClick = (e) => {
    console.log("click:" + e.type + ", this:" + this.input.value);
    e.stopPropagation();
    if (this.input) {
      this.input.focus();
    }
    // this.input.focus();
  }

  onSel = (key, e) => {
    console.log("select:" + key + ", event:" + e.type);

    // this.setState({selectedSetting: key});
    // e.preventDefault();
    // e.stopPropagation();
  }

  onToggle = (isOpen, e, src) => {
    console.log("toggler:" + isOpen + ", e:" + e.type + ", src:" + src.toString());

    if (!isOpen) {

      return false;
    }
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input)
    if (input) {
      input.focus();
    }
  }

  render () {
    var s = this.props.settings;
    // <DropdownButton
    //   id="settings-dropdown"
    //   title="Settings">
    //   <ControlLabel>Turn Timer</ControlLabel>
    //   <FormControl
    //     ref={c => { this.input = c; }}
    //     type="number"
    //     placeholder={this.state.turnTimer}
    //     onChange={this.onChange}
    //     value={this.state.turnTimer}
    //   />
    // </DropdownButton>
    // <Dropdown
    //   id="settings1"
    //   bsStyle="navbar-inverse navbar-nav">
    //   <SettingsToggle bsRole="toggle">Settings</SettingsToggle>
    //   <SettingsMenu bsRole="menu" settings={this.props.settings} />
    // </Dropdown>

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#biaginiGameBoards">{this.props.hdr}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <SettingsTwo settings={this.props.settings}/>
        <Nav pullRight>
          <NavItem eventKey={2} href="/">Reset Game</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

class SettingsToggle extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(e);
  }

  render () {
    return (
        <a href="" onClick={this.handleClick}>
          {this.props.children}
        </a>);
  }
}

class SettingsMenu extends React.Component {

  constructor (props) {
    super(props);
    this.onChange = e => this.setState({ turnTimer: e.target.value });
    this.state = { turnTimer: this.props.turnTimer };
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input)
    if (input) {
      input.focus();
    }
  }

  render () {
    // var s = this.state.settings;
    return (
        <div className="dropdown-menu" style={{ padding: '' }}>
          <ControlLabel>Turn Timer</ControlLabel>
          <FormControl
            ref={c => { this.input = c; }}
            type="number"
            placeholder={this.state.turnTimer}
            onChange={this.onChange}
            value={this.state.turnTimer}
          />
        </div>
    );
  }
}

class SettingsTwo extends React.Component {

  render () {
    var s = this.props.settings;
    return(
      <Nav>
        <NavDropdown id="settings-dropdown"
                      title="Settings">
          <MenuItem onSelect={() => {}} eventKey={1.1}>
            <ControlLabel>Turn Timer</ControlLabel>
            <FormControl type="number"
                    value={s.turnTimer}
                    onSelect={e => e.stopPropagation()}
                    onChange={this.props.settingsChange}/>
          </MenuItem>
          <MenuItem eventKey={1.1}>Setting 1</MenuItem>
        </NavDropdown>
      </Nav>);

    }
}

export default Header;
