import React from "react";
import "./Logo.css";
import logoImage from "../../pages/Home/images/final.png"


const Logo = () => (

	<div class="widget center">
	  
	  <div class="blur"></div>
	  
	  <div class="text center" id="logo-image">
	   	<img src={logoImage} style={{ margin: "auto"}}/>
	  </div>

	</div>
);

export default Logo;