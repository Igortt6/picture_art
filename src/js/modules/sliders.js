const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;
    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated'); // додаємо класс для майбутньої анімації
            item.style.display = 'none'; // ховаємо всій слайди
        });

        items[slideIndex - 1].style.display = 'block'; // показуємо необхідний слайд 
    };

    showSlides(slideIndex); // ініціалізуємо слайдер. 

    function chengeSlide(n) {
        showSlides(slideIndex += n);
    }

    // блок TRY CATCH для перевірки. Чи булі передані селектори rev, next. Якщо ні, код не зламається. 
    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            chengeSlide(-1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
        nextBtn.addEventListener('click', () => {
            chengeSlide(1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        })

    } catch (e) {
    }

    // Навішуємо обробник на весь слайдер через parentNode, та в paused запамятовуємо інтервал при нведенні миші
    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function () {
                chengeSlide(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000)
        } else {
            paused = setInterval(function () {
                chengeSlide(1);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            }, 3000)
        }
    }
    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    })
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    })


};

export default sliders;