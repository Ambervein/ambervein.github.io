(function() {

	let articles = document.getElementsByTagName("article");
	let menu_toggle = document.getElementById("menu-toggle");

	for(let i = 0; i < articles.length; i++) {

		articles[i].addEventListener("click", articles_toggle);
	}


	function articles_toggle() {
		//this.style.zIndex = "10";
		//alert(this.id);
		if(menu_toggle.checked == true) {

		for(let i = 0; i < articles.length; i++) {	articles[i].classList.add("left-forced");	}

		this.classList.remove("left-forced");

		}

		//else {
		//	this.classList.toggle("left-forced");
		//}

	}


})();