var numbers = [1,2,3,4,5,6,7,8,9];
var coll_cell = document.getElementsByClassName('cell-play');
var coll_num = document.getElementsByClassName('num-elem');
var numStartCell = 5;

var objLines = {
	func: function(){
		var context = this;
		return  function(item){
					coll_cell[item].style.backgroundColor = context.colorStart;
				}
	},

	colorStart: '#e2e7ed',
	colorAction: '#c8d0de',

	0: function(){
		var arr = [1,3,2,6];
		arr.forEach(this.func());
	},
	1: function(){
		var arr = [0,2,4,7];
		arr.forEach(this.func());
	},
	2: function(){
		var arr = [1,5,0,8];
		arr.forEach(this.func());
	},
	3: function(){
		var arr = [0,4,6,5];
		arr.forEach(this.func());
	},
	4: function(){
		var arr = [1,3,5,7];
		arr.forEach(this.func());
	},
	5: function(){
		var arr = [2,4,8,3];
		arr.forEach(this.func());
	},
	6: function(){
		var arr = [3,7,0,8];
		arr.forEach(this.func());
	},
	7: function(){
		var arr = [4,6,8,1];
		arr.forEach(this.func());
	},
	8: function(){
		var arr = [5,7,2,6];
		arr.forEach(this.func());
	}
};

// счетчик Hint
var hintCount = numbers.length - numStartCell;
var elemCount = document.getElementsByClassName('text-count');
elemCount[0].innerHTML = hintCount;


var cleanCell = function(){
	var arr = [];
	for(var i = 0; i < coll_cell.length; i++){
		if(!coll_cell[i].innerHTML){
			arr.push(i);;
		}
	}
	return arr;
}
var arrCleanCell = cleanCell(); // [0, 1, 2, 3, 4, 5, 6, 7, 8]


// Заполняем пустые клетки
function firstPushInCell(){
	for(var i = 0; i < numStartCell; i++){
		var rand1 = Math.floor(Math.random() * numbers.length);
		var randNumber = numbers[rand1];
		numbers.splice(rand1, 1);

		var rand2 = Math.floor(Math.random() * arrCleanCell.length);
		var randArrCleanCell = arrCleanCell[rand2];
		var cellItem = coll_cell[randArrCleanCell];

		cellItem.innerHTML = randNumber;
		arrCleanCell.splice(rand2, 1);
	}
}
firstPushInCell(); // Заполняем пустые клетки


// Заполняем числовую панель
function firstPushInNumPan(){
	for(var i = 0; i < numbers.length; i++){
		var index = numbers[i];

		for(var j = 0; j < coll_num.length; j++){
			if(coll_num[j].innerHTML == index){
				coll_num[j].style.cssText="color:#335aad; opacity: 1";
			}
		}

	}
}
firstPushInNumPan(); // Заполняем числовую панель


// Выбираем рандомно клетку для мигания
function randFlashCell(){
	var rand = Math.floor(Math.random() * arrCleanCell.length);
	randIndexCell = rand;
	randItem = arrCleanCell[rand];

	// условие, для того чтобы в конце не вылазила ошибка в консольке))
	if(coll_cell[randItem]){

		objLines[randItem](); // установка стиля цвета соседних ячеек с мигающей ячейкой

		coll_cell[randItem].style.animation="flashing_cell .9s linear infinite";
		flashCellItem = coll_cell[randItem];
	}
	
}
var flashCellItem; // Мигающий элемент (КЛЕТКА);
var randItem; // рандомный элемент массива значений пустых клеток
randFlashCell(); // Выбираем рандомно клетку для мигания



// Выбираем рандомно число для мигания
function randFlashNum(){
	var rand = Math.floor(Math.random() * numbers.length);
	randIndexNum = rand;
	var randNum = numbers[rand];

	for(var i = 0; i < coll_num.length; i++){
		if(coll_num[i].innerHTML == randNum){
			coll_num[i].style.animation="font_size 1.5s steps(5) infinite";
			flashNumItem = coll_num[i];
			// назначаем клик по элементу и внутри even отменяем его для текущего элемента
			flashNumItem.addEventListener("click", event);
			break;
		}
	}

}
var flashNumItem; // Мигающий элемент числовой панели;
var randIndexNum;
randFlashNum(); // Выбираем рандомно число для мигания


// для сброса стиля цвета соседних ячеек с мигающей ячейкой
function clearLineCell(){
	for(var i = 0; i < coll_cell.length; i++){
		coll_cell[i].style.backgroundColor = '';
	}
}



// действия при клике
function event(){

			// сброс onclick с уже не нужного элемента числовой панели
			flashNumItem.removeEventListener("click", event);

			// сброс стиля цвета соседних ячеек с мигающей ячейкой
			clearLineCell();

			// удаляем надпись Add a unique number при клике
			document.getElementsByClassName('play-field')[0].classList.remove("pseudo-play-field");

			// забрасываем нужное число в клетку
			flashCellItem.innerHTML = flashNumItem.innerHTML;
			flashCellItem.style.animation="";

			// сброс стилей при клике
			flashNumItem.style.animation="";
			flashNumItem.style.cssText="";

			setTimeout(function(){
				createAnimLines(randItem, 80, objLines.colorAction);
			}, 0);	
}

function nextAction(){
	setTimeout(function(){

		// счетчик на Hint
		hintCount -= 1;
		elemCount[0].innerHTML = hintCount;

		// очиска массивов при клике
		numbers.splice(randIndexNum, 1);
		arrCleanCell.splice(randIndexCell, 1);

		// запуск функций заново при клике
		randFlashNum();
		randFlashCell();

		if(!numbers.length){
			setTimeout(function(){
				hide(arrForHideElems, 0.7, 50); // исчезание игрового поля в конце
				showWinPanel();
			}, 800);
		}

	}, 0);
}


// анимация при клике на на элемент в числовой панели
function createAnimLines(item, time, color){
	// elem - мигающий элемент
	// time (время) скорость анимации
	// color - цвет для клеток
	if(item === 0){
		setTimeout(function(){
			coll_cell[1].style.backgroundColor = color;
			coll_cell[3].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[1].style.backgroundColor = '';
					coll_cell[3].style.backgroundColor = '';
					coll_cell[2].style.backgroundColor = color;
					coll_cell[6].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[2].style.backgroundColor = '';
							coll_cell[6].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 1){
		setTimeout(function(){
			coll_cell[0].style.backgroundColor = color;
			coll_cell[2].style.backgroundColor = color;
			coll_cell[4].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[0].style.backgroundColor = '';
					coll_cell[2].style.backgroundColor = '';
					coll_cell[4].style.backgroundColor = '';
					coll_cell[7].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[7].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 2){
		setTimeout(function(){
			coll_cell[1].style.backgroundColor = color;
			coll_cell[5].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[1].style.backgroundColor = '';
					coll_cell[5].style.backgroundColor = '';
					coll_cell[0].style.backgroundColor = color;
					coll_cell[8].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[0].style.backgroundColor = '';
							coll_cell[8].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 3){
		setTimeout(function(){
			coll_cell[0].style.backgroundColor = color;
			coll_cell[6].style.backgroundColor = color;
			coll_cell[4].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[0].style.backgroundColor = '';
					coll_cell[6].style.backgroundColor = '';
					coll_cell[4].style.backgroundColor = '';
					coll_cell[5].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[5].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 4){
		setTimeout(function(){
			coll_cell[1].style.backgroundColor = color;
			coll_cell[3].style.backgroundColor = color;
			coll_cell[5].style.backgroundColor = color;
			coll_cell[7].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[1].style.backgroundColor = '';
					coll_cell[3].style.backgroundColor = '';
					coll_cell[5].style.backgroundColor = '';
					coll_cell[7].style.backgroundColor = '';

						nextAction();

				}, (time));

		}, time);
	} else if(item === 5){
		setTimeout(function(){
			coll_cell[2].style.backgroundColor = color;
			coll_cell[4].style.backgroundColor = color;
			coll_cell[8].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[2].style.backgroundColor = '';
					coll_cell[4].style.backgroundColor = '';
					coll_cell[8].style.backgroundColor = '';
					coll_cell[3].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[3].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 6){
		setTimeout(function(){
			coll_cell[3].style.backgroundColor = color;
			coll_cell[7].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[3].style.backgroundColor = '';
					coll_cell[7].style.backgroundColor = '';
					coll_cell[0].style.backgroundColor = color;
					coll_cell[8].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[0].style.backgroundColor = '';
							coll_cell[8].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 7){
		setTimeout(function(){
			coll_cell[4].style.backgroundColor = color;
			coll_cell[6].style.backgroundColor = color;
			coll_cell[8].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[4].style.backgroundColor = '';
					coll_cell[6].style.backgroundColor = '';
					coll_cell[8].style.backgroundColor = '';
					coll_cell[1].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[1].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	} else if(item === 8){
		setTimeout(function(){
			coll_cell[5].style.backgroundColor = color;
			coll_cell[7].style.backgroundColor = color;

				setTimeout(function(){
					coll_cell[5].style.backgroundColor = '';
					coll_cell[7].style.backgroundColor = '';
					coll_cell[2].style.backgroundColor = color;
					coll_cell[6].style.backgroundColor = color;

						setTimeout(function(){
							coll_cell[2].style.backgroundColor = '';
							coll_cell[6].style.backgroundColor = '';

								nextAction();

						}, (time));

				}, (time));

		}, time);
	}
}

// коллекция элементов для исчезания
var arrForHideElems = [];
arrForHideElems.push(document.getElementsByClassName('play-field')[0]);
arrForHideElems.push(document.getElementsByClassName('console')[0]);
arrForHideElems.push(document.getElementsByClassName('number-panel')[0]);

// исчезание игрового поля в конце
function hide(items, t, f){

	var time = (t * 1000) || 2000; // общее время длительности анимации
	var fps = f || 50; // кадры в секунду
	var steps = time / (1000 / fps); // общее кол-во кадров будет показано

	var opacity = 1;
	var d0 = opacity / steps // изменение прозрачности за один кадр

	var timer = setInterval(function(){

		opacity -= d0;

		[].forEach.call(items, function(item){
			item.style.opacity = opacity;
		});

		steps--;

		if(steps <= 0){
			clearInterval(timer);
		}

	}, (1000 / fps));

}

// появление панели поздравления
function showWinPanel(){
	var item = document.getElementsByClassName('blue_win_fon')[0];
	item.style.animation = '1s flying_panel ease-in-out forwards';
}