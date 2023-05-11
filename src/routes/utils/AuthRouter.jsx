import React from "react"
import { useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { rootRouter } from "@/routes/index"
import { searchRouter } from "../../utils/util"
export default function AuthRouter(props) {
  const { pathname } = useLocation()
  const { userData } = useSelector((store) => store.userData)
  const route = searchRouter(pathname, rootRouter)
  const adminpath = [
    "/admin",
    "/chartData",
    "/documentManage",
    "/projectManage",
    "/userManage",
  ]

  if (!route.meta?.requiresAuth) return props.children
  if (userData.user_type !== 0 && adminpath.indexOf(pathname) !== -1) {
    return <Navigate to="/404" />
  }
  return props.children
}
