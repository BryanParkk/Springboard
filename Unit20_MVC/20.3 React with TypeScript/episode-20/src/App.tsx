import React, { useCallback } from 'react';
import './App.css';

// const Heading = (props: {title: string}) => (
//     <h2>{props.title}</h2>
// )
const Heading = ({ title }: {title: string}) => (
    <h2>{title}</h2>
)

//const Box = ({ children }: { children: React.ReactNode }) => (
//const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
type BoxProps = {
  children?: React.ReactNode;
}

const Box = ({ children }: BoxProps) =>
    <div style={{
      padding: "1rem",
      fontWeight: "bold"
    }}>
      {children}
    </div>

type ListProps = {
  items: string[];
  onClick?: (item: string) => void
}

const List = ({ items, onClick }: ListProps)=> 
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>{item}</li>
    ))}
  </ul>

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item)
  }, [])

  return (
    <div className="App">
      <Heading title="Introduction"/>
      <Box>
        Hello There
      </Box>
      <List items={["one", "two", "three"]} onClick={onListClick} />
    </div>
  );
}

export default App;
