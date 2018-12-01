function changeStyle() {
    const current = $('.domain-name__input')[0];
    const elem1 = $('.domain-name')[0];
    const elem2 = $('.domain-name__text')[0];
    const elem3 = $('.domain-name__area')[0];

    function styleOn() {
        current.onfocus = () => {
            elem1.style.boxShadow = '0 0 15px -3px #868686';
            elem2.style.color = '#868686';
            elem3.style.color = '#868686';
        }
    }

    function styleOff() {
        current.onblur = () => {
            if (!current.value) {
                elem1.style.boxShadow = 'none';
                elem2.style.color = '#cbcbcb';
                elem3.style.color = '#cbcbcb';
            }
        }
    }

    styleOn();
    styleOff();
}

changeStyle();