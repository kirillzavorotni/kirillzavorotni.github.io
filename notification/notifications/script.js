window.onload = function onload() {
  function slowDown() {
    localStorage.removeItem('checkedInput');

    if (!localStorage.checkedInput) {
      document.querySelector('.notification').style.display = 'block';
    }

    const tips = [
      'Ежедневно делайте зарядку и различные физические упражнения. Развивайте своё тело и дух.',
      'Будьте благодарны Вселенной за каждый прожитый день.',
      'Любите себя таким, какой вы есть, со всеми достоинствами и недостатками.',
      'Верьте только в самое лучшее и тогда в вашей жизни станет ещё больше приятных сюрпризов и хорошего настроения.',
      'Прочтите как можно больше биографий великих людей.',
      'Планируйте предстоящий день. Выделяйте наиболее приоритетные задачи, которые необходимо выполнить в первую очередь.',
    ];

    function workSlider(data) {
      // начальная настройка элемента
      let count = 0;
      const parentElem = document.querySelector('.control');
      const elemBefore = document.querySelector('.arrow-next');
      const checkBox = document.querySelector('#not-dis__checkbox');
      const notification = document.querySelector('.notification');

      for (let i = 0; i < data.length; i += 1) {
        const newP = document.createElement('div');
        newP.classList.add('control__point');
        parentElem.insertBefore(newP, elemBefore);
      }

      document.querySelector('.control__point').classList.add('active-btn');
      const sliderP = document.querySelector('.slider__elem');
      sliderP.innerText = data[0];
      // начальная настройка элемента

      // взаимодействие
      function clickNext() {
        if (count === data.length - 1) {
          count = 0;
          sliderP.innerText = data[count];
          document.querySelector('.active-btn').classList.remove('active-btn');
          document.querySelectorAll('.control__point')[count].classList.add('active-btn');
          return;
        }
        count += 1;
        sliderP.innerText = data[count];
        document.querySelector('.active-btn').classList.remove('active-btn');
        document.querySelectorAll('.control__point')[count].classList.add('active-btn');
      }

      function clickPrev() {
        if (count === 0) {
          count = data.length - 1;
          sliderP.innerText = data[count];
          document.querySelector('.active-btn').classList.remove('active-btn');
          document.querySelectorAll('.control__point')[count].classList.add('active-btn');
          return;
        }
        count -= 1;
        sliderP.innerText = data[count];
        document.querySelector('.active-btn').classList.remove('active-btn');
        document.querySelectorAll('.control__point')[count].classList.add('active-btn');
      }

      function closeNotif() {
        document.querySelector('.notification').style.display = 'none';
      }

      function checkBoxChange() {
        if (!this.hasAttribute('checked')) {
          this.setAttribute('checked', 'checked');
          localStorage.setItem('checkedInput', true);
        } else {
          this.removeAttribute('checked');
          localStorage.removeItem('checkedInput');
        }
      }

      function addClassForActive(event) {
        event.stopPropagation();
        notification.classList.add('active-box');
      }

      function removeClassForActive(event) {
        event.stopPropagation();
        notification.classList.remove('active-box');
      }

      function clickArrowNext() {
        clickNext();
      }

      function clickArrowPrev() {
        clickPrev();
      }

      function clickArrows(event) {
        if (event.keyCode === 39) {
          clickArrowNext();
        }
        if (event.keyCode === 37) {
          clickArrowPrev();
        }
      }

      function activeArrowPress(event) {
        if (!notification.classList.contains('active-box')) {
          return;
        }
        clickArrows(event);
      }

      const next = document.querySelector('.arrow-next');
      const prev = document.querySelector('.arrow-prev');
      const close = document.querySelector('.notification__close');
      const body = document.body;

      next.addEventListener('click', clickNext);
      prev.addEventListener('click', clickPrev);
      close.addEventListener('click', closeNotif);
      checkBox.addEventListener('click', checkBoxChange);
      body.addEventListener('click', removeClassForActive);
      body.addEventListener('keydown', activeArrowPress);
      notification.addEventListener('click', addClassForActive);
    }

    workSlider(tips);
  }

  setTimeout(slowDown, 5000);
};
