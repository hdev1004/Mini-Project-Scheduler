import Header from "./views/header/header";
import Contetns from "./views/contents/contents";
import NotFound  from "./views/notFound/notFound";
import Login from "./views/Login/login";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loginState, setLoginState} from "./recoil/state";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
	  		{
				loginState == false ? (
					<Header />
				) : (
					<></>
				)
			}

			<Routes>
				{/* 기본 경로 */}
				<Route path="/" element={<Login />}></Route>
				
				{/* 콘텐츠 */}
				<Route path="/contents" element={<Contetns />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
