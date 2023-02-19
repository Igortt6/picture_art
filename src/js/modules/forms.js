import checkNumInputs from "./checkNumInputs";
import { postData } from "../services/requests"

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Завантаження...',
        success: 'Дякую, ми з вами звʼяжемось',
        failed: "Щось пішло не так...",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        desiner: 'assets/server.php',
        question: 'assets/question.php'
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не вибран';
        })
    };

    // Для кожного інпуту завантаження картинкі на сайті, при відправці, відображаємо імʼя файлу на сайті. З умовою скорочення довгих назв.
    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 1 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })


    // блок для обробки натискання на кнопку ВІДПРАВИТИ 
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');        //прозора форма
            setTimeout(() => {
                item.style.display = 'none';                    //видаляємо прозору форму 
            }, 400)

            let statusImg = document.createElement('img');      //створили спінер завантаження
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('amimated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');    //створили напис завантаження
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);


            const formData = new FormData(item);                // FormData збирає всі дані з форми.
            let api;                                            // куди будем відправляти форму
            item.closest('.popup-design') ||
                item.classList.contains('calc_form') ?
                api = path.desiner : api = path.question;       // якщо при відправленні форми, форма має батьківський елемент .popup-design - path.desiner. АБО path.question

            postData(api, formData)
                .then(res => {                                  // обробка вдачної відправки форми. 
                    console.log(res);
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success;
                })
                .catch(() => {                                  // обробка помилки при відправці
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failed;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        })
    })
}
export default forms; 