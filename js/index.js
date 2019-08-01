(function() {

	console.log("ДА, ЭТА ПРИБЛУДА НЕ РАБОТАЕТ В БРАУЗЕРАХ С ОТКЛЮЧЕННЫМ JS. И МНЕ ПЛЕВАТЬ, Т.К. ЗАКОНЧЕННЫЕ ПАРАНОИКИ И МАМОНТЫ, СИДЯЩИЕ С IE6, МАЛО ПОХОЖИ НА АДЕКВАТНЫХ ЮЗЕРОВ И СКОРО ВЫМРУТ. ДЕРЖУ В КУРСЕ");

	let articles = document.getElementsByTagName("article");
	let labels = document.getElementsByTagName("label");
	let menu_toggle = document.getElementById("menu-toggle");
	let state = false; //tab is opened
	let article_id; //currently opened tab
	
	//saving current tab to page session for better page refresh UX
	window.addEventListener("load", loadSession);

	function loadSession() {
		let currentLocation = window.location.href;
		let currentLocationHash = window.location.hash;
		let tabName = currentLocationHash.slice(1, -4);
		
		//alert(tabName);
		if (tabName.length > 0) {
			menu_toggle.click();
			setTimeout(() => {document.querySelector('label[data-id="' + tabName + '"]').click();}, 250);
		}		
	}

	//labels getting their menu triggers
	for(let i = 0; i < articles.length; i++) {
		labels[i].addEventListener("click", articles_toggle);
	}

	//close button gets close function
	menu_toggle.addEventListener("click", close);

	//catching click event on label, getting data-id of event target label, opening menu and push up article with same id OR closing menu
	function articles_toggle(event) {

		article_id = this.dataset.id;
		location.hash = this.dataset.id + '_tab';
		

		if(menu_toggle.checked == true) {
			for(let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translateX(" + (100) + "%)";	articles[i].scrollTop = 0;}
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

	//close button function
	function close() {

		if(menu_toggle.checked == false && state == false) {
			for(let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translateX(" + (100) + "%)";	articles[i].scrollTop = 0;}
			document.getElementById(article_id).style.transform = "translateX(" + (0) + "%)";
			state = true;
		}
	}

	//skills button at home article sends user to skills article
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

	document.getElementById("theme-button").addEventListener("click", themeToggle);
	let themeSwitch = document.getElementById("theme-toggle");

	//themeToggle();
	//window.addEventListener("load", themeToggle);
	if (themeSwitch.checked === true) {	document.getElementById("theme-button").innerHTML = 'LIGHT THEME';}
	else {	document.getElementById("theme-button").innerHTML = 'DARK THEME';	}
	
	function themeToggle() {

		if (themeSwitch.checked === true) {	document.getElementById("theme-button").innerHTML = 'DARK THEME';}
		else {	document.getElementById("theme-button").innerHTML = 'LIGHT THEME';	}

	}
	


})();