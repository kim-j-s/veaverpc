(function ($) {

    function initSlider() {
        var $slider = $('.content-wrap'); // content-wrap
        var $slide = $slider.find('.content'); // 슬라이드
        var $navAnchor = $('.nav-list a');
        var $logo = $('.logo a');

        var pageLen = $slide.length; // 슬라이드 개수

        $slider.attr('pnum', 1);

        var isMoving = false;
        var bfAbsDtY = 0;
        var isDown = true;
        var movingTime = 300;

        $slider.on('wheel', function (e) {
            var absDtY = Math.abs(e.originalEvent.deltaY);
            if (isDown && bfAbsDtY < absDtY) {
                var pageNum = Number($slider.attr('pnum'));

                // moving
                if (!isMoving) {
                    if (e.originalEvent.deltaY > 0 && pageNum != pageLen) {
                        movePage(++pageNum);
                    } else if (e.originalEvent.deltaY < 0 && pageNum != 1) {
                        movePage(--pageNum);
                    }
                }
            }

            if (bfAbsDtY <= absDtY) {
                isDown = false;
            } else {
                isDown = true;
            }
            bfAbsDtY = absDtY;
        });

        // 페이지 이동
        function movePage(pageNum) {
            isMoving = true;

            $slider.attr('pnum', pageNum);
            $slide.removeClass('on').eq(pageNum - 1).addClass('on');


            // nav
            $navAnchor.removeClass('on');

            if (pageNum > 1 && pageNum < 7) {
                $navAnchor.eq(pageNum - 2).addClass('on');
            }

            // 건강365
            if (pageNum == 4 && !$('.chat-in').hasClass('passed')) {
                $('.chat-in').addClass('passed');
                chat365.start();
            }

            setTimeout(function () {
                isMoving = false;
            }, movingTime);
        }

        // 네비
        $navAnchor.on('click', function (e) {
            e.preventDefault();

            $navAnchor.removeClass('on');
            $(this).addClass('on');

            movePage($(this).parent().index() + 2);
        });

        // 로고
        $logo.on('click', function (e) {
            e.preventDefault();
            $navAnchor.removeClass('on');
            movePage(1);
        });
    }

    // 메인 슬라이드
    function initTopSlide() {
        $('.top-slide').slick({
            autoplay: false,
            prevArrow: false,
            nextArrow: false,
            dots: true,
            cssEase: 'ease-out',
            useTransform: false,
        })

        $('.top-slide').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.top-slide').removeClass('bg-ty' + currentSlide).addClass('bg-ty' + nextSlide);
        });
    }

    // 맞춤형 건강정보
    function initHealthInfo(params) {
        // 맞춤형 건강 정보
        var roller = null;
        function loopAni() {
            roller = setInterval(loop, 2500);
        }

        function loop() {
            $('.card-item').removeClass('active').eq(2).addClass('active');
            $('.item-inner').stop().animate({
                left: '-310px',
            }, 1000, function () {
                $('.item-inner > .card-item').first().appendTo('.item-inner');
                $('.item-inner').css('left', 0);
                $('.card-item').eq(1).addClass('active');
            })
        }

        function rollprev() {
            if ($('.item-inner').is(':animated')) return false;
            $('.item-inner > .card-item').last().prependTo('.item-inner');
            $('.item-inner').css('left', '-310px');
            $('.card-item').removeClass('active').eq(1).addClass('active');
            $('.item-inner').stop().animate({
                left: '0px',
            }, 1000);
        }

        function rollnext() {
            $('.card-item').removeClass('active').eq(2).addClass('active');
            $('.item-inner').stop().animate({
                left: '-310px',
            }, 1000, function () {
                $('.item-inner > .card-item').first().appendTo('.item-inner');
                $('.item-inner').css('left', 0);
                $('.card-item').eq(1).addClass('active');
            })
        }

        $('.item-inner').on('mouseenter', function () {
            if (roller != null) {
                clearInterval(roller);
            }
        });


        $('.item-inner').on('mouseleave', function () {
            loopAni();
        });

        $('.card-item').on('click', function () {
            var idx = $(this).index();
            if (idx == 0 && !$(this).hasClass('active')) {
                rollprev();
            }
            else if (idx == 2 && !$(this).hasClass('active')) {
                rollnext();
            }
        });
    }

    // 팝업 활성화 / 비활성화
    function popControl() {
        $('[data-open]').on('click', function () {
            var data = $(this).data('open');
            $("[data-openpop='" + data + "']").removeClass('out').addClass('active');
        })

        $('.layer-close').on('click', function () {
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
                obj.$chatItem.eq(3).addClass('loading');
                obj.timer = setTimeout(function () {
                    obj.$chatItem.eq(3).removeClass('loading');
                    obj.$chatItem.eq(3).addClass('on');
                }, 1200);
            });
        },
        start: function () {
            this.$chatItem.eq(0).addClass('on');
            TypeHangul.type('.chat-list li:nth-child(1) .txt', {
                intervalType: 20
            });
        },
        reset: function () {
            clearTimeout(this.timer);
            this.$chatList.find('.on, .loading').removeClass('loading').removeClass('on');
        }
    };

    // ready
    $(function () {
        // 페이지 슬라이드 & nav & logo
        initSlider();

        // initTopSlide
        initTopSlide();

        // 맞춤형 건강정보
        initHealthInfo();

        chat365.init();

        // popControl
        popControl();
    });
})(jQuery);