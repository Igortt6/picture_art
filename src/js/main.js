import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkNumInputs from "./modules/checkNumInputs";
import showMoreStyles from "./modules/showMoreFiles";

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    modals();
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name="phone"]');
    // checkNumInputs('[name="name"]');
    // checkNumInputs('[name="message"]');
    showMoreStyles('.button-styles', '.styles-2');
})
