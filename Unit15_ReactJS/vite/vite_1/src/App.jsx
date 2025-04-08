import { Fragment } from 'react'
import Header from './Header'
import ShoppingList from './ShoppingList'
import './App.css'
import Img from './assets/react.svg';
import vite from '../public/vite.svg';

function App() {
  return (
    <Fragment key="main">
      <img src={Img}/>
      <img src={vite}/>
      <Header text="Welcome to my homepage" color="magenta"></Header>
      <ShoppingList></ShoppingList>
    </Fragment>
  );
}

export default App
