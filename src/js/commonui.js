$(function(){


    // 휠 이벤트
    $('.content').each(function(index){
        $(this).on('mousewheel DOMMouseScroll', function(e){

            e.preventDefault();
            var delta = 0;
            var contLng = $('.content').length;
            $('.nav-list').find('a').blur();

            // if (animaion == false) {
            if ( !$('html').is(':animated') && animaion == false) {
                var bt = $('html').scrollTop();
                console.log('scrollTop : ' + bt);
                console.log('active : ' + animaion);
                animaion = true;
            
                // firefox를 제외한 브라우져 마우스 이벤트 값
                if (event.wheelDelta) {
                    delta = event.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } 
                // firefox 브라우져 마우스 이벤트 값
                else if (event.detail)
                    delta = -event.detail / 3;

                // up
                if (delta > 0) {
                    if ( index > 0) {
                        console.log('상단으로 이동');
                        wheelAnimate(index - 2);
                    } else {
                        console.log('up 최상단 도달 시');
                        animaion = false;
                    }
                } 
                // down
                else if (delta < 0) {
                    if ( (index + 1) < contLng) {
                        console.log('down 1 내려간다 : ' + (index + 1), contLng);
                        wheelAnimate(index);
                    } else {
                        console.log('down 2 : ' + (index + 1));
                        animaion = false;
                    }
                }
            }
        })
    })

    // nav 이벤트
    navEvent();

	//ready
});



var animaion = false;


// nav 이벤트
function navEvent() {
    var $navList = $('.nav-list').find('a');
    $navList.on('click', function(e){
        e.preventDefault();
        var idx = $(this).closest('li').index();
        wheelAnimate(idx);
    })
}


// 페이지 휠 이동
function wheelAnimate(index){
    console.log('ani : ' + index);
    var wh = $(window).height();
    /*
    $('html').stop().animate({
        scrollTop: (index + 1) * wh + 'px',
    }, 500, function(){
        setTimeout(function(){
            animaion = false;
        }, 500)
    })
    */

    $('html').stop().animate({
        scrollTop: (index + 1) * wh + 'px',
    }, 500, function(){
        animaion = false;
    })

    if (index < 0) {
        $('.nav-list').find('a').removeClass('on');
    } else {
        $('.nav-list').find('a').removeClass('on');
        $('.nav-list').find('a').eq(index).addClass('on');
    }

    if ( !$('.content').eq(index + 1).hasClass('on') ) {
        $('.content').eq(index + 1).addClass('on');
    }

    /* 쳇 이벤트 작동
    if ( $('.content').eq(index + 1).hasClass('chat-in') && !$('.chat-in').hasClass('active') ) {
    	$('.chat-in').addClass('active');
		ChatList();
    }
    */
}




var word = []








// chat list
var chatMessages = [
    {
        name: "msg1",
        msg: "나의 건강 기록을 한눈에 볼 수 있을까?",
        delay: 10,
        align: "chat-left",
    },
    {
        name: "msg2",
        msg: "건강365에서 건강보험공단에 등록된<br> 나의 건강 Data를 정리해 드립니다.",
        delay: 11200,
        align: "chat-right",
    },
    {
        name: "msg3",
        msg: "매일매일 스스로 건강관리는 어떻게 하나요?",
        delay: 10,
        align: "chat-left",
    },
    {
        name: "msg4",
        msg: "주기적인 관리가 필요한 건강 데이터를<br> 건강365에서 기록하며 관리하세요!",
        delay: 11200,
        align: "chat-right",
    }
];


function ChatList() {
    var chatDelay = 0;
    $.each(chatMessages, function(index, obj) {
        chatDelay = chatDelay + 1000;
        chatDelay2 = chatDelay + obj.delay;
        chatDelay3 = chatDelay2 + 10;
        chatTimeString = " ";
        msgname = "." + obj.name;
        spinner = ".sp-" + obj.name;

        $(".chat-list").append(
            "<li class=" + obj.align + ">" +
                "<span class='txt'>" + obj.msg + "</span>" +
               	"<span class='spin-ele sp-" + obj.name +  "'>" +
                    "<span class='spinner'>" + 
                        "<span class='bounce1'></span>" +
                        "<span class='bounce2'></span>" +
                        "<span class='bounce3'></span>" +
                    "</span>" + 
                "</span>" +
            "</li>"
        );

        // display      
        $('.chat-list > li').eq(index).delay(chatDelay).animate({
            opacity: 1,
        }, 500);
        $(spinner).delay(chatDelay2).hide(1);
        $('.chat-list > li').eq(index).children('.txt').delay(chatDelay3).animate({
            opacity: 1,
        }, 500);
        chatDelay = chatDelay3;
    });
}