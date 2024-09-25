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