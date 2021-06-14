import React, { Component } from "react";
import "./App.css";
import { trace_store, trace_fetch, infected_store, infected_match } from "./axios";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage"
import { Redirect, Route, Switch } from "react-router";
import { shallowEqual, useSelector } from "react-redux";

export default function App(){

    const user = useSelector(state=>state.user, shallowEqual)

    return(
      <Switch>
        {user.isLogin?
          <Redirect from='/login' to='/home'/>
          :
          <Redirect from='/home' to='/login'/>
        }
        <Route path='/home' component={user.isLogin?MainPage:LoginPage}/>
        <Route path='/login' component={LoginPage}/>
        <Redirect from='/' to={user.isLogin?'/home':'/login'}/>
      </Switch>
  )
}