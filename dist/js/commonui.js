(function ($) {

    // var isMac = (function () {
    //     var agent = navigator.userAgent;
    //     if (agent && agent.toLowerCase().indexOf("safari") != -1 && navigator.appVersion.indexOf("Mac")!=-1) return true;
    //     else return false;
    // })();
    var isMac = (function () {
        if (navigator.appVersion.indexOf("Mac") != -1) return true;
        else return false;
    })();

    const checkMobile = (function () {
        const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

        if (varUA.indexOf('android') > -1) {
            //안드로이드
            return 'android';
        } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
            //IOS
            return 'ios';
        } else {
            //아이폰, 안드로이드 외
            return 'other';
        }
    })();

    function checkVideoFe(src) {
        const arr = src.split('?')[0].split('.');
        return arr[arr.length - 1];
    }

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
        var movingTime = 500;

        var wheelEvtListener = null;

        if (isMac) {
            // safrai
            $slider.on('wheel', function (e) {
                // console.log(e);
                // console.log(e.originalEvent.deltaY);
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
                    isDown = false;
                }

                if (bfAbsDtY > absDtY) {
                    isDown = true;
                }

                bfAbsDtY = absDtY;
            });
        } else {
            wheelEvtListener = function (e) {
                // console.log(e.originalEvent.deltaY);
                var pageNum = Number($slider.attr('pnum'));

                if (e.originalEvent.deltaY > 0 && pageNum != pageLen) {
                    movePage(++pageNum);
                } else if (e.originalEvent.deltaY < 0 && pageNum != 1) {
                    movePage(--pageNum);
                }
            };

            $slide.eq(0).on('wheel', wheelEvtListener);
        }

        // 페이지 이동
        function movePage(pageNum) {
            if (isMac) {
                isMoving = true;
            }

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
            }

            if (!isMac) {
                $slide.off('wheel', wheelEvtListener);
            }

            setTimeout(function () {
                if (isMac) {
                    isMoving = false;
                } else {
                    $slide.eq(pageNum - 1).on('wheel', wheelEvtListener);
                }
            }, movingTime);
        }

        // 네비
        $navAnchor.not('.exception').on('click', function (e) {
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

    function initVdoSlider() {
        var $slider = $('.vdo-slider-wrap'); // vdo-slider-wrap
        var $contentWrap = $slider.closest('.content'); // vdo-slider-wrap
        var $btnPrev = $slider.find('.btn-prev'); // 이전
        var $btnNext = $slider.find('.btn-next'); // 이후
        var timer = null;
        var $video = $slider.find('video');

        function getSnum() {
            return Number($slider.attr('snum'));
        }

        function moveTo(n) {
            $slider.attr('snum', n);
        }

        function autoplay() {
            var aft = getSnum() + 1;
            if (aft == 7) aft = 1;

            moveTo(aft);

            clearTimeout(timer);
            timer = setTimeout(autoplay, 3000);
        }

        $video.each(function () {
            var video = this;
            var videoSrc = this.src;
            var fe = checkVideoFe(this.src);
            var $wrap = $(this).parent();

            if (fe == 'm3u8') {
                if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = videoSrc + "?playsinline=1";
                } else if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(videoSrc);
                    hls.attachMedia(video);

                    hls.on(Hls.Events.ERROR, function (event, data) {
                        var errorType = data.type;
                        var errorDetails = data.details;
                        var errorFatal = data.fatal;

                        hls.destroy();
                    });
                }
            } else {
                video.setAttribute('playsinline', true);
                video.src = videoSrc;
            }

            video.onended = function () {
                video.currentTime = 0;
                $wrap.removeClass('is-playing').removeClass('is-pause');
                $contentWrap.removeClass('dimmed');
                timer = setTimeout(autoplay, 3000);
            };

            $(this).siblings('.btn-close').on('click', function () {
                video.pause();
                video.onended();
            });

            $(this).siblings('.btn-play').on('click', function () {
                if($wrap.hasClass('is-playing')) {
                    if($wrap.hasClass('is-pause')) {
                        video.play();
                        $wrap.removeClass('is-pause');
                    } else {
                        video.pause();
                        $wrap.addClass('is-pause');
                    }
                } else {
                    $wrap.addClass('is-playing');
                    $contentWrap.addClass('dimmed');
                    clearTimeout(timer);
                    video.play();
                }
            });
        });


        $btnPrev.on('click', function () {
            var aft = getSnum() - 1;
            if (aft == 0) aft = 6;

            moveTo(aft);

            clearTimeout(timer);
            timer = setTimeout(autoplay, 3000);
        });

        $btnNext.on('click', function () {
            var aft = getSnum() + 1;
            if (aft == 7) aft = 1;

            moveTo(aft);

            clearTimeout(timer);
            timer = setTimeout(autoplay, 3000);
        });

        timer = setTimeout(autoplay, 3000);
    }

    // 메인 슬라이드
    function initTopSlide() {
        $('.top-slide').slick({
            autoplay: true,
            speed: 300,
            autoplaySpeed: 3000,
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
        $('.vdo-slick').slick({
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 3,
            prevArrow: false,
            nextArrow: false,
            dots: false,
            cssEase: 'ease-out',
            useTransform: false,
        })
    }

    // 팝업 활성화 / 비활성화
    function popControl() {
        $('[data-open]').on('click', function (e) {
            e.preventDefault();
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
    /*
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
    */

    // ready
    $(function () {
        // 페이지 슬라이드 & nav & logo
        initSlider();

        // initTopSlide
        initTopSlide();

        // 맞춤형 건강정보
        initHealthInfo();

        // 비디오 슬라이더
        initVdoSlider();

        // popControl
        popControl();
    });
})(jQuery);