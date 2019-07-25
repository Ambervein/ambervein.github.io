(function() {

	let articles = document.getElementsByTagName("article");
	let labels = document.getElementsByTagName("label");
	let menu_toggle = document.getElementById("menu-toggle");
	let state = false; //tab is opened
	let article_id; //currently opened tab

	if(menu_toggle.checked == true) {
		menu_toggle.checked = false;
	}

	for(let i = 0; i < articles.length; i++) {

		//articles[i].addEventListener("click", articles_toggle);
		labels[i].addEventListener("click", articles_toggle);
	}

	menu_toggle.addEventListener("click", close);

	function articles_toggle(event) {

		//event.stopImmediatePropagation();
		article_id = this.dataset.id;
		//alert(article_id);
		
		//if(event.target.nodeName == "LABEL" || event.target.nodeName == "H2" || event.target.nodeName == "DIV" || event.target.nodeName == "SPAN") {	

		if(menu_toggle.checked == true) {
			for(let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translateX(" + (100) + "%)";	}
			document.getElementById(article_id).style.transform = "translateX(" + (0) + "%)";
			state = true;
		}

		else 

		{
			for(let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translate(calc(0% + " + (i+1)*45 + "px), calc(0% + " + (i+1)*45 + "px))";}
			state = false;
		}

		return article_id;
		
		}

	function close() {

		if(menu_toggle.checked == false && state == false) {
			for(let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translateX(" + (100) + "%)";	}
			document.getElementById(article_id).style.transform = "translateX(" + (0) + "%)";
			//menu_toggle.click;
			state = true;
		}
	}



})();