import React from "react";
import "./Logo.css";
import logoImage from "../../pages/Home/images/onTap.png"


const Logo = () => (

	// <div class="widget center">
	  
	//   <div class="blur"></div>
	  
	  <div className="logoContainer">
	  	<section id="text-background">
	   		<img id="logo-image" src={logoImage} style={{ margin: "auto"}}/>
	   	</section>
	  </div>

	// </div>
);

export default Logo;