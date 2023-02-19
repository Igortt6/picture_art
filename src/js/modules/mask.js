
const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {          // поліфіл для EntExplorer
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),        // значення на основі матриці
            val = this.value.replace(/\D/g, '');    // значення на основі введені користувачем

        if (def.length >= val.length) {             // заборона користувачю знінювати маску
            val = def;
        }

        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            // перевіряємо кожний введений символ. Якщо ЦИФРА 'i' меньше введених цифр,  повертаємо наступний символ. Якщо 'i' більше введених цифр, повертаємо ''. При всіх інших повертаємо просто символ
        })

        if (event.type === 'blur') {                //Якщо фокус вийшов з форми
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {                                    //Якщо подія ФОКУС, або ІНПУТ
            setCursorPosition(this.value.length, this)
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    })
}

export default mask;