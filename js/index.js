(function() {

	console.log("ДА, ЭТА ПРИБЛУДА НЕ РАБОТАЕТ В БРАУЗЕРАХ С ОТКЛЮЧЕННЫМ JS. И МНЕ ПЛЕВАТЬ, Т.К. ЗАКОНЧЕННЫЕ ПАРАНОИКИ И МАМОНТЫ, СИДЯЩИЕ С IE6, МАЛО ПОХОЖИ НА АДЕКВАТНЫХ ЮЗЕРОВ И СКОРО ВЫМРУТ. ДЕРЖУ В КУРСЕ");

	let articles = document.getElementsByTagName("article");
	let labels = document.getElementsByTagName("label");
	let menu_toggle = document.getElementById("menu-toggle");
	let state = false; //tab is opened
	let article_id; //currently opened tab
	/*
	if(menu_toggle.checked == true) {
		menu_toggle.checked = false;
	}
	*/

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

	document.getElementById("skills").addEventListener("click", skills);

	function skills() {

		let about = document.querySelector('label[data-id="about_me"]');
		let home = document.querySelector('label[data-id="home"]');

		setTimeout(home.click(), 200);
		setTimeout(abc, 300);

		function abc () {
			setTimeout(about.click(), 200);
		}
	
	}


})();