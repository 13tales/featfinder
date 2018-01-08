import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, ControlLabel, Form, FormGroup } from 'react-bootstrap';

let SearchBox = ({handleInput, input}) => {
    return <Form horizontal>
        <FormGroup>
        <Col sm={2} componentClass={ControlLabel} htmlFor="search">
        Search
    </Col>
        <Col sm={10}>
        <FormControl
        id="search"
        name="search"
        type="text"
        placeholder="Input goes here"
        value={ input }
        onChange={ (e) => { return handleInput(e.target.value); }}
        />
        </Col>
        </FormGroup>
        </Form>;
};

export { SearchBox };
