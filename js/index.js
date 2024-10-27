const carouselContainer = document.querySelector('.carousel_container');
const slides = document.querySelectorAll('.carousel_slide');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

nextSlide.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % slides.length;
	updateCarousel();
});

prevSlide.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	updateCarousel();
});

indicators.forEach((indicator, index) => {
	indicator.addEventListener('click', () => {
		currentIndex = index;
		updateCarousel();
	});
});

function updateCarousel() {
	const offset = -currentIndex * 100;
	carouselContainer.style.transform = `translateX(${offset}%)`;

	indicators.forEach(indicator => {
		indicator.classList.remove('active');
	});
	indicators[currentIndex].classList.add('active');
}

indicators[currentIndex].classList.add('active');

document.getElementById("contactForm").addEventListener("submit", function (event) {
	event.preventDefault();

	const formData = new FormData(event.target);

	const name = formData.get("name");
	const email = formData.get("email");
	const subject = formData.get("subject");
	const phone = formData.get("phone");
	const plan = formData.get("plan");
	const message = formData.get("message");

	if (!name || !email || !subject || !phone || !plan || !message) {
		alert("Please complete all fields.");
		return;
	}

	if (!validateEmail(email)) {
		alert("Please enter a valid email address.");
		return;
	}

	if (!validatePhone(phone)) {
		alert("Please enter a valid phone number (numbers only).");
		return;
	}

	console.log("Sending data...");
	console.log({
		name,
		email,
		subject,
		phone,
		plan,
		message,
	});

	fakeFetch("/submit", {
		method: "POST",
		body: formData,
	})
		.then((response) => {
			alert("Form successfully submitted.");
		})
		.catch((error) => {
			alert("There was an error submitting the form.");
		});
});

function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
	const re = /^[0-9]+$/;
	return re.test(phone);
}

document.getElementById("phone").addEventListener("input", function (e) {
	this.value = this.value.replace(/[^0-9]/g, "");
});

function fakeFetch(url, options) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
			});
		}, 1000);
	});
}

let btnCopyRight = document.getElementById('copyRight');

btnCopyRight.innerHTML = `&copy; ${new Date().getFullYear()} All rights reserved`;
