import React from "react"
import { Navigate } from "react-router-dom"

import LazyLoad from "../utils/LazyLoad"
import Layout from "../../pages/Layout"
export const UserLayoutRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="home" />,
      },
      {
        path: "/home",
        element: LazyLoad(React.lazy(() => import("../../pages/Composer"))),
      },
    ],
  },
]
