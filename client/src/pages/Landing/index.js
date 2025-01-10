import {Link} from 'react-router-dom';

import logo from '../../logo.svg';
import '../../App.css';

function Landing() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/test1">To Returning Function</Link>
        <Link to="/test2">To Wrapper what can has children components</Link>
        <Link to="/test3">To Using Customized Hook on -useContext-</Link>
        {/* <Link to="/test3demo">To Test3demo</Link> */}
        <Link to="/test4">To Using Redux</Link>
      </header>
    </div>
  );
}

export default Landing;
