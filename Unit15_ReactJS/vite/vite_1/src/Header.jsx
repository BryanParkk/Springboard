import './Header.css'
export default function Header({color, text}) {
  return <h1 style={{color: color}} className="Header">{text}</h1>;
}

