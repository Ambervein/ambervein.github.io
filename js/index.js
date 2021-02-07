(function() {

	let articles = document.getElementsByTagName("article");
	let labels = document.getElementsByTagName("label");
	let menu_toggle = document.getElementById("menu-toggle");
	let menuIsClosed_state = false; //menu state, needed for correct menu closing with returning of currently opened tab
	let currentTab; //currently opened tab
	
	//saving current tab to page session for better page refresh UX
	window.addEventListener("load", loadSession);

	//sending to last opened tab after page refresh
	function loadSession() {

		//getting name of currently opened tab
		let currentLocationHash = window.location.hash;
		let tabName = currentLocationHash.slice(1, -4);
		
		//if url has #hash - going to tab with id from #hash
		if (tabName.length > 0) {
			menu_toggle.click();
			setTimeout(() => {document.querySelector('label[data-id="' + tabName + '"]').click();}, 220);
			//timeout shows click animation to compensate blinking transition on tabs after refresh(like preloader)
		}		
	}

	//labels getting their menu transition handlers
	for (let i = 0; i < articles.length; i++) {
		labels[i].addEventListener("click", articles_toggle);
	}

	//close button gets close function
	menu_toggle.addEventListener("click", close);

	//handling click on title label, getting data-id of target label, opening menu and pushing up tab with same id OR closing menu
	function articles_toggle(event) {

		//picking up currently opened tab id
		currentTab = this.dataset.id;

		//pushing up new location #hash to address bar 
		location.hash = this.dataset.id + '_tab';
		
		//if menu opened - clicking on any title label will center chosen tab and push away others
		if (menu_toggle.checked == true) {
			for (let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translateX(" + (100) + "%)";	articles[i].scrollTop = 0;}
			document.getElementById(currentTab).style.transform = "translateX(" + (0) + "%)";
			menuIsClosed_state = true;

			for (let i = 0; i < articles.length; i++) { articles[i].style.overflowY = "scroll";}

		}

		else 

		//if menu closed - clicking on menu icon will open it 
		{
			for (let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translate(calc(0% + " + (i+1)*45 + "px), calc(0% + " + (i+1)*45 + "px))";}
			menuIsClosed_state = false;

			for (let i = 0; i < articles.length; i++) { articles[i].style.overflowY = "hidden";}
		}

		return currentTab;
		
		}

	//close button function
	function close() {

		if (menu_toggle.checked == false && menuIsClosed_state == false) {
			for(let i = 0; i < articles.length; i++) {	articles[i].style.transform = "translateX(" + (100) + "%)";	articles[i].scrollTop = 0;}
			document.getElementById(currentTab).style.transform = "translateX(" + (0) + "%)";
			menuIsClosed_state = true;

			for (let i = 0; i < articles.length; i++) { articles[i].style.overflowY = "scroll";}
		}
	}

	
	function goToSkills() {

		let about = document.querySelector('label[data-id="about_me"]');
		let home = document.querySelector('label[data-id="home"]');

		//simulating live user's click
		setTimeout(home.click(), 200); //open menu
		setTimeout(()=>{setTimeout(about.click(), 200);}, 300); //wait and click 'about' tab
	
	}

	//footer home link handler
	const footer_home = document.querySelectorAll("div[data-home='go-home']");
    for (let elem of footer_home) {   elem.addEventListener("click", go_home);  }

	function go_home() {

		let current = document.querySelector('label[data-id='+currentTab+']');
		let home = document.querySelector('label[data-id="home"]');

		//simulating live user's click
		setTimeout(current.click(), 200);
		setTimeout(()=>{setTimeout(home.click(), 200); scrollDown();}, 300);

		// document.getElementById("on_top").style.display = "none";
	
	}

	//handling theme switch
	let themeButton = document.getElementById("theme-button");
	let themeSwitch = document.getElementById("theme-toggle");

	themeButton.addEventListener("click", themeToggle);

	//checking saved theme state
	let themeSwitch_state = localStorage.getItem('isDark');
	if (themeSwitch_state === 'true') { themeSwitch.click(); }

	function themeToggle() {

		if (themeSwitch.checked === true) {	localStorage.setItem('isDark', false);}
	 	else {	localStorage.setItem('isDark', true);}

	}

	//scrolling top button handler
	document.getElementById("on_top").addEventListener("click", scrollToTop);

	function scrollToTop() {

		document.getElementById(currentTab).scrollTop = 0;

	}

	//scrolling top button visibility switching
	for (let i = 0; i < articles.length; i++) {
		articles[i].addEventListener("scroll", scrollDown);
	}

	function scrollDown() {

		let documentPosition = this.scrollTop;
		let windowHeight = document.documentElement.clientHeight;

		if (documentPosition > (windowHeight / 4)) { document.getElementById("on_top").style.display = "flex";	}
		else {document.getElementById("on_top").style.display = "none";}

	}


	//disable tab focus
	setTimeout(()=> {	let tabbableElements = document.querySelectorAll('button, a, input, select, textarea, label, article, section');
		for (let i = 0; i < tabbableElements.length; i++) { tabbableElements[i].setAttribute('tabIndex', '-1'); }}, 1500);


})();