import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
//Cards -reactstrap
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
	document.getElementById("root")
);
