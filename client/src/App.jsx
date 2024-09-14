import StudentCorner from "./components/student-corner/StudentCorner";
import Header from "./components/header/Header";
import Layout from "./Layout";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import { RouterProvider } from "react-router-dom";
import './App.css'
const router=createBrowserRouter(
    [
        {
        path:'/',
        element:<Layout />,
        children:[
              {
                path:'/',
                element:<Home />
              },
              {
                path:'/student-corner',
                element:<StudentCorner />
              }

        ]
    }
    ]
)
function App(){
    return(
       <RouterProvider router={router}></RouterProvider>
    )
}
export default App;