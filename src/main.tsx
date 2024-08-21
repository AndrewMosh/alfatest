import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { CardList } from "./Components/CardList/CardList.tsx";
import { CardDetail } from "./Components/CardDetail/CardDetail.tsx";
import { Layout } from "./Components/LayOut/Layout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <CardList />,
            },
            {
                path: "/card/:id",
                element: <CardDetail />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
