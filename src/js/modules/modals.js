const modals = () => {
    let btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll(),
            gift = document.querySelector('.fixed-gift');

        function openPopup() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;
            document.addEventListener(`keydown`, ifEsc);
            gift.style.marginRight = `${scroll}px`;

        }
        function closePopup() {
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`
            document.removeEventListener(`keydown`, ifEsc);
            gift.style.marginRight = ``;
        }
        function ifEsc(e) {
            if (e.key === "Escape") {
                console.log('Escape :>> ');
                closePopup()
            }
        }
        function allPopup() {
            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn')
            })
        }

        triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { // event.target - якщо існуе
                    e.preventDefault(); // відміняемо перезавантаження, при клікі не на кнопку(на лінк)
                }
                btnPressed = true; // кудись клікнув

                if (destroy) {
                    item.remove();
                }
                allPopup();
                openPopup();
            });
        });
        close.addEventListener('click', () => {

            allPopup();
            closePopup();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {

                allPopup();
                closePopup()
            }
        })
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            let display;
            let gift = document.querySelector('.fixed-gift');


            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block"
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
                scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`
                gift.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';


        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        })

    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    // showModalByTime('.popup-consultation', 5000);
    openByScroll('.fixed-gift')


};

export default modals;