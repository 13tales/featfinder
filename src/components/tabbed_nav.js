import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

let TabNav  =  () => {
    return <Nav bsStyle="tabs" activeKey={1}>
                <NavItem eventKey={1} href="/">Feat Search</NavItem>
                <NavItem eventKey={2} >Character</NavItem>
    </Nav>
};

export { TabNav };
