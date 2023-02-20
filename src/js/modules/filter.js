const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.style.textAlign = 'center';

            mark.classList.remove('animated', 'fadeIn');
        })

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType.length) {                                  // якщо було щось передано
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            })
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    }
    items.forEach(item => {                                     // отримуємо класс натиснутої кнопки МЕНЮ 
        item.addEventListener('click', (e) => {
            const targetClass = e.target.className
            const markType = wrapper.querySelectorAll(`.${targetClass}`); // Отримуємо всі елементи з таким самим класом МЕНЮ
            // console.log(markType);
            typeFilter(markType);
        })
    })
}
export default filter;