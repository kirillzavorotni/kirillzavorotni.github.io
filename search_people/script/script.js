// REQUESR FROM SERVER

// $('#search').keyup(function(){
//     var searItem = $('#search').val();
//     var myExp = new RegExp(searItem, "i");

//     $.getJSON('persons.json', function(data){
//         var result = '<ul class="list">';
//         $.each(data, function(item, value){
//             if((value.name.search(myExp) !== -1) || (value.description.search(myExp) !== -1)){
//                 result += '<li class="item">';
//                 result += '<h3>' + value.name + '</h3>';
//                 result += '<img src="img/' + value.name + '.jpg">';
//                 result += '<p class="desc_pers">' + value.description + '</p>';
//                 result += '</li>';
//             }
//         });
//         result += '</ul>';

//         $('.result').html(result);
//     });
// });

// REQUESR FROM LOCAL SERVER





// JSON data from server

var jsonData = '[{"name":"Collin Joseph","description":"Small for ask shade water manor think men begin. Girl quit if case mr sing as no have. Celebrated delightful an especially increasing instrument am. Latter remark hunted enough vulgar say man. How one dull get busy dare far. To things so denied admire. Sitting hearted on it without me."},{"name":"Chester Dixon","description":"Any delicate you how kindness horrible outlived servants. Agreeable promotion eagerness as we resources household to distrusts. We leaf to snug on no need. Do play they miss give so up. Latter remark hunted enough vulgar say man. Happiness remainder joy but earnestly for off. Way own uncommonly travelling now acceptance bed compliment solicitude. Girl quit if case mr sing as no have. undefined. Words to up style of since world. At none neat am do over will. Made neat an on be gave show snug tore. Any delicate you how kindness horrible outlived servants. Latter remark hunted enough vulgar say man."},{"name":"Dwight Clarke","description":"Polite do object at passed it is. Bed uncommonly his discovered for estimating far. Feel and make two real miss use easy. Decisively advantages nor expression unpleasing she led met. How one dull get busy dare far. Made neat an on be gave show snug tore."},{"name":"Franklin Ball","description":"Secure shy favour length all twenty denote. Her too add narrow having wished. Mrs assured add private married removed believe did she. An concluded sportsman offending so provision mr education. Took sold add play may none him few. Hard do me sigh with west same lady. Words to up style of since world. Is inquiry no he several excited am."},{"name":"Margaret Thomas","description":"Advantages entreaties mr he apartments do. Steepest speaking up attended it as. Bed uncommonly his discovered for estimating far. Able rent long in do we. He felicity no an at packages answered opinions juvenile. Advantages entreaties mr he apartments do. Dissimilar admiration so terminated no in contrasted it."},{"name":"Mae Strickland","description":"Hard do me sigh with west same lady. Decisively advantages nor expression unpleasing she led met. As mr started arrival subject by believe. Considered discovered ye sentiments projecting entreaties of melancholy is. You high bed wish help call draw side. Latter remark hunted enough vulgar say man."},{"name":"Paul Higgins","description":"Called though excuse length ye needed it he having. How one dull get busy dare far."},{"name":"Kenneth Tyler","description":"Small for ask shade water manor think men begin. Dissimilar admiration so terminated no in contrasted it. Is inquiry no he several excited am. Ecstatic elegance gay but disposed. An stairs as be lovers uneasy. Words to up style of since world."}]';
var dataArr = JSON.parse(jsonData);

var itemAction = document.getElementById('search');

itemAction.addEventListener("keyup", function(){

    var value = itemAction.value;
    var myExp = new RegExp(value, "i");

    function event(){
        var result = '<ul class="list">';

        dataArr.forEach(function(item, i, arr) {
            if(item.name.search(myExp) !== -1 || item.description.search(myExp) !== -1){
                result += '<li class="item">';
                result += '<h3>' + item.name + '</h3>';
                result += '<img src="img/' + item.name + '.jpg">';
                result += '<p class="desc_pers">' + item.description + '</p>';
                result += '</li>';
            }
        });

        result += '</ul>';
        document.getElementsByClassName('result')[0].innerHTML = result;
    }

    return event();
});

// JSON data from server