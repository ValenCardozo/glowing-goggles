import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import NbaAPI from './NbaAPI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nba-stats" element={<NbaAPI />} />
      </Routes>
    </Router>
  );
}

export default App