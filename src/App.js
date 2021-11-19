import './App.css';
import MainPage from './pages/Mainpage.js';
import TasksPage from './pages/TasksPage.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  
  return (
    <div className="App">
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
