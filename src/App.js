import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Redirect,
} from 'react-router-dom';
import './styles/App.css';
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
