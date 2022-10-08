(function() {
// SMOOTHSCROLL
/*
$('.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});
*/

// MOBILE MENU HANDLER
let myMenu = document.querySelector(".menu");
let oppMenu = document.querySelector(".menu-icon");
myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
myMenu.addEventListener("click", toggleClassMenu, false);

function toggleClassMenu() {
	myMenu.classList.add("menu-animatable");	
	if(!myMenu.classList.contains("menu-visible")) {		
		myMenu.classList.add("menu-visible");
	} else {
		myMenu.classList.remove('menu-visible');		
	}	
}

function OnTransitionEnd() {myMenu.classList.remove("menu-animatable");}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FORM VALIDATION

// --- Globals ---

// Submit button lock / Отключение кнопки отправки, пока все не проверится
let submit_button = document.getElementById('submit_order');
submit_button.disabled = true;
	
// Validation success flags / Флаги проверок полей
let name_valid = false;
let tel_valid = false;
let cap_valid = false;

// KeyUp listeners for instant validation / Листнеры полей
document.getElementById("name").addEventListener("keyup", name_validator);
document.getElementById("tel").addEventListener("keyup", tel_validator);
document.getElementById("sum").addEventListener("keyup", cap_validator);

// Prevent page refreshing after submit

document.getElementById('submit_order').addEventListener("click", (function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value;
    let tel = document.getElementById("tel").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let wish = document.getElementById("wish").value;

    let status = document.getElementById("submit_status");

    let xhr = new XMLHttpRequest();

	let body = 'name=' + encodeURIComponent(name) + '&tel=' + encodeURIComponent(tel) + '&city=' + encodeURIComponent(city) + '&email=' + encodeURIComponent(email) + '&wish=' + encodeURIComponent(wish);

	xhr.open("POST", 'sendmail.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function() {  if (this.readyState != 4) {return;} else status.textContent = "Сообщение отправлено";}

	xhr.send(body);


    /*
    $.post("sendmail.php", {
      name: name,
      email: email,
      tel: tel,
      city: city,
      wish: wish
    }).complete(function() {
        console.log("Success");
      });
     */
    
  }));


// --- End of Globals ---

// Captcha / Капча
function Captcha() {

	let a = Math.floor(Math.random() * 10);
	let b = Math.floor(Math.random() * 10);
	let sum = a + b;

	let capcha = document.createElement("div");
	capcha.className = "capcha";
	capcha.innerHTML = "Введите сумму чисел:&nbsp;&nbsp;&nbsp;<span id='a'>" + a + "</span> + <span id='b'>" + b + "</span>";
	document.getElementById("cap_container").appendChild(capcha);

}

Captcha();

// Validators
function name_validator() {
	
	let name = document.getElementById("name");
	let name_alert = document.getElementById("name_alert");
	let name_value = name.value;
	let check = /^[А-Яа-яіїІЇA-za-z _]{1,35}$/;

	if (!check.test(name.value) || name_value.length < 5) {name_alert.dataset.toggle = "enabled"; name_valid = false;}
	else {name_alert.dataset.toggle = "disabled"; name_valid = true;};

	check_counter();
	
}

function tel_validator() {

	let tel = document.getElementById("tel");
	let tel_alert = document.getElementById("tel_alert");
	let tel_value = tel.value;
	let tel_check = /^[0-9+()]{1,20}$/;

	if (!tel_check.test(tel.value) || tel_value.length < 4) {tel_alert.dataset.toggle = "enabled"; tel_valid = false;}
	else {tel_alert.dataset.toggle = "disabled"; tel_valid = true;};

	check_counter();

}

function cap_validator() {

	let sum_value = document.getElementById("sum");
	let a = document.getElementById("a").innerHTML;
	let b = document.getElementById("b").innerHTML;
	
	let sum = parseInt(a, 10) + parseInt(b, 10);

	if (sum_value.value == sum) {cap_valid = true;}
	else {cap_valid = false;};

	check_counter();

}

// Success flags checkout
function check_counter() {

	if(!name_valid == true || !tel_valid == true || !cap_valid == true) {submit_button.disabled = true;} 
	else {submit_button.disabled = false;};

}

})();