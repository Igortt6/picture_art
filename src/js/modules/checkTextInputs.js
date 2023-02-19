const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key.match(/[^А-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
}