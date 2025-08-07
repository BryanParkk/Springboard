import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import DayList from "./component/DayList";
import Day from "./component/Day";
import EmptyPage from "./component/EmptyPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<DayList />} />
          <Route path="/day" element={<DayList />} />
          <Route path="/day/:day" element={<Day />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
