import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { deployFishes } from './utils/addFishes';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.deployFishes = deployFishes;