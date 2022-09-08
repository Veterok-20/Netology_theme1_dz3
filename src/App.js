import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';

// const now = new Date(2017, 2, 8);
const now = new Date();

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
