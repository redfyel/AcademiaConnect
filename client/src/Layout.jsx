import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
function Layout(){
    return(
        <div className="mx-0">
        <Header></Header>
           <main>
              <Outlet></Outlet>
           </main>
      </div>
    )
}
export default Layout;