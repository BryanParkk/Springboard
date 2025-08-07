import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import DayList from "./component/DayList";
import Day from "./component/Day";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<DayList />} />
          <Route path="/day" element={<DayList />} /> {/* 추가 */}
          <Route path="/day/:day" element={<Day />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
