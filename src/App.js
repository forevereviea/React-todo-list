import './App.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
// import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle';
// import OffcanvasBody from 'react-bootstrap/OffcanvasBody';

import MainPage from './pages/Mainpage.js';
import TasksPage from './pages/TasksPage.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Overlay from '@restart/ui/esm/Overlay';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas className="offCanvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum fuga, quae obcaecati reprehenderit excepturi voluptas libero, id consequuntur odit vitae accusantium corrupti qui ipsam numquam inventore optio culpa a?
        </Offcanvas.Body>
      </Offcanvas> */}
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage}>
          </Route>
          <Route path="/" component={TasksPage}>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}
// Get all my tasks and filter the task by the project ID or project name
// Check the last item, do the last project items ID and then add it

export default App;
