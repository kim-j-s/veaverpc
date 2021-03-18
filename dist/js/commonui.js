// var animaion = false;

$(function(){

    // 팝업 활성화 / 비활성화
    popControl();

    // chat 초기화
    chat365.init();

    // 휠 이벤트
    $('.content').each(function(index){
        //$(this).on('mousewheel DOMMouseScroll', function(e){

        $(this).on('wheel', function(e){
            e.stopPropagation();
            e.preventDefault();

            console.log('---------------------');
            console.log('진입 before : ' + animaion);            

            if (animaion === true) {
                return false;
            }

            console.log('---------------------');
            console.log('시작 before : ' + animaion);

            if (animaion === false) {
                animaion = true;
                //console.log('시작 : ' + animaion);
                
                var event = e.originalEvent.deltaY;
                //console.log('event :' + event);
                wheel(index, event);
            } else {
                return false;
            }
        })
        
    })

    // nav 이벤트
    navEvent();

    $('.logo > a').on('click', function(){
        var idx = -1;
        wheelAnimate(idx);
    })


    // top slide
    $('.top-slide').slick({
        autoplay: false,
        prevArrow: false,
        nextArrow: false,
        dots: true,
        cssEase: 'ease-out',
        useTransform: false,
    })

    $('.top-slide').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        //console.log(nextSlide, currentSlide);
        $('.top-slide').removeClass('bg-ty' + currentSlide).addClass('bg-ty' + nextSlide);
    });


    // 맞춤형 건강정보
    $('.item-inner').on('mouseenter', function(){
        console.log('break');
        
        if(roller != null) {
            clearInterval(roller);
        }
    })


    $('.item-inner').on('mouseleave', function(){
        loopAni();
    })

    $('.card-item').on('click', function(){
        var idx = $(this).index();
        if ( idx == 0 ){
            rollprev();
        }
        else if ( idx == 2 ){
            rollnext();
        }
    })

	//ready
});


// 휠 이벤트
function wheel(index, event) {
    var delta = 0;
    var contLng = $('.content').length;
    $('.nav-list').find('a').blur();
    if (event < 0) {
        // wheeled up
        if ( index > 0) {
            //console.log('상단으로 이동');
            wheelAnimate(index - 2);
        } else {
            //console.log('up 최상단 도달 시');
            animaion = false;
        }
    }
    else {
        // wheeled down
        if ( (index + 1) < contLng) {
            //console.log('down 1 내려간다 : ' + (index + 1), contLng);
            wheelAnimate(index);
        } else {
            //console.log('down 2 : ' + (index + 1));
            animaion = false;
        }
    }
}


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
    var wh = $(window).height();
    $('.content').removeClass('on');
    $('html').stop(true, true).animate({
        scrollTop: (index + 1) * wh + 'px',
    }, 500, function(){
        animaion = false;
        //console.log('rst = ' + animaion);
        $('.content').eq(index + 1).addClass('on');
        return animaion;
    })    

    if (index < 0) {
        $('.nav-list').find('a').removeClass('on');
    } else {
        $('.nav-list').find('a').removeClass('on');
        $('.nav-list').find('a').eq(index).addClass('on');
    }    

    // 쳇 이벤트 작동
    if ( $('.content').eq(index + 1).hasClass('chat-in')) {
        chat365.start();
    } else {
        chat365.reset();
    }


    // 맞춤형 건강 정보
    if ( $('.content').eq(index + 1).hasClass('roll')) {
        // 맞춤형 건강 정보
        loopAni();
    } else {
        clearInterval(roller);
    }
}


// 맞춤형 건강 정보
var roller = null;
function loopAni() {
    loop();
    roller = setInterval(loop, 2500);
}

function loop(){
    $('.card-item').removeClass('active').eq(2).addClass('active');
    $('.item-inner').stop().animate({
        left: '-310px',
    }, 1000, function(){
        $('.item-inner > .card-item').first().appendTo('.item-inner');
        $('.item-inner').css('left',0);
        $('.card-item').eq(1).addClass('active');
    })
}

function rollprev() {
    $('.item-inner > .card-item').last().prependTo('.item-inner');
    $('.item-inner').css('left','-310px');
    $('.card-item').removeClass('active').eq(1).addClass('active');
    $('.item-inner').stop().animate({
        left: '0px',
    }, 1000);
}

function rollnext() {
    $('.card-item').removeClass('active').eq(2).addClass('active');
    $('.item-inner').stop().animate({
        left: '-310px',
    }, 1000, function(){
        $('.item-inner > .card-item').first().appendTo('.item-inner');
        $('.item-inner').css('left',0);
        $('.card-item').eq(1).addClass('active');
    })
}


// 팝업 활성화 / 비활성화
function popControl(){
    $('[data-open]').on('click', function(){
        var data = $(this).data('open');
        $("[data-openpop='" + data +  "']").removeClass('out').addClass('active');
    })

    $('.layer-close').on('click', function(){
        $(this).closest('.layer-pop').removeClass('active').addClass('out');
    })
}


// chat365.init(); 초기화 처음에 페이지 로딩시 한번실행
// chat365.start(); 모션 시작
// chat365.reset(); 모션 멈추고 초기 상태로 리셋
var chat365 = {
    $chatList: null,
    $chatItem: null,
    timer: null,
    init: function () {
        var obj = this;

        obj.$chatList = $('.chat-history .chat-list');
        obj.$chatItem = obj.$chatList.children('li');

        obj.$chatItem.eq(0).find('.txt')[0].addEventListener('th.endType', function (e) {
            console.log('end 1');
            obj.$chatItem.eq(1).addClass('loading');

            obj.timer = setTimeout(function () {
                obj.$chatItem.eq(1).removeClass('loading');
                obj.$chatItem.eq(1).addClass('on');

                obj.timer = setTimeout(function () {
                    obj.$chatItem.eq(2).addClass('on');
                    TypeHangul.type('.chat-list li:nth-child(3) .txt', {
                        intervalType: 20
                    });
                }, 1200);
            }, 1200);
        });

        obj.$chatItem.eq(2).find('.txt')[0].addEventListener('th.endType', function (e) {
            console.log('end 3');
            obj.$chatItem.eq(3).addClass('loading');
            obj.timer = setTimeout(function () {
                obj.$chatItem.eq(3).removeClass('loading');
                obj.$chatItem.eq(3).addClass('on');
            }, 1200);
        });
    },
    start: function() {
        this.$chatItem.eq(0).addClass('on');
        TypeHangul.type('.chat-list li:nth-child(1) .txt', {
            intervalType: 20
        });
    },
    reset: function() {
        clearTimeout(this.timer);
        this.$chatList.find('.on, .loading').removeClass('loading').removeClass('on');
    }
};


// 전화기는 delay 후 노출
