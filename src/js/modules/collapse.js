const collapse = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.classList.contains('active-style')) {
                closeAllCollapse()
            }
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');


            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });

    function closeAllCollapse() {
        btns.forEach(btn => {
            btn.classList.remove('active-style');
            btn.nextElementSibling.classList.remove('active-content');
            btn.nextElementSibling.style.maxHeight = '0px';
        })
    }

};



export default collapse;