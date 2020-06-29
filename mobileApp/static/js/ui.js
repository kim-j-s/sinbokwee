
//doneDv 클래스 가운데영역 맞춤 회전감지 가로사이즈일때 
$(window).on('resize', function(){
	var winWidth  = $(window).width();
	if (winWidth < 568) {
		$('.doneDv').removeClass('landscape');
	}else{
		$('.doneDv').addClass('landscape');
	}
});

$(function(){

	right_menu();
	main_menu();
	main_slick();
	popClose();

	$('.necessary').attr('aria-label','필수입력').attr('role','img');
	$('.btnBack').attr('role','button');
	$("[data-popup]").removeAttr('aria-hidden');
	$('.btntd.ty1').attr('aria-label','예약시간 선택 가능');
	$('.btntd.ty2').attr('aria-label','예약시간 선택 불가');
	$('.btntd.ty3').attr('aria-label','예약시간 선택 완료');
	$('.idcardImg').attr('role','img');

	effectTime = 500;

	/* ==============================
	 * gnb 
	 * ============================== */
	/* Right Hidden Menu */
	function right_menu(){
		var $el = $(".innerSide");
		if($el) init();
		function init(){
			var $menu = $(".innerSide .layWrap");
			rhidden_resize();
			function isOpen(x){
				x.toggleClass("open");
			}
			$(".btnSide").click(function(){
				isOpen($el);
				$menu.animate({right: "0px"}, "slow");
				$el.attr('aria-hidden', 'false');
				$('.ctWrap').attr('aria-hidden', 'true');
				$('body').addClass('no_scroll').on('scroll touchmove mousewheel', function(e){
					e.preventDefault();
				});
			});
			$(".btnClose").click(function(){
				$menu.animate({right: "-100%"}, "slow");
				setTimeout(function(){
					isOpen($el);
				}, 600);
				$el.attr('aria-hidden', 'true');
				$('.ctWrap').attr('aria-hidden', 'false');
				$('body').removeClass('no_scroll').off('scroll touchmove mousewheel');
			});
			
			$(window).resize(function(){
				rhidden_resize();
			});
			function rhidden_resize(){
				var win_h = $(window).innerHeight();
				$el.height(win_h);
			};
			$(".menuDepth1 > li a").attr('aria-label','축소됨');
			$(".menuDepth1 > li").click(function(){
				if ($(this).find('.menuDepth2').css('display') == 'none') {
					$(this).addClass('on');
					$(this).find('.menuDepth2').slideDown();
					$(this).children('a').attr('aria-expanded', 'true');
					$(this).children('a').attr('aria-label','확장됨');
				}else{
					$(this).removeClass('on');
					$(this).find('.menuDepth2').slideUp();
					$(this).children('a').attr('aria-expanded', 'false');
					$(this).children('a').attr('aria-label','축소됨');
				}
			});
		};
	};

	/* ==============================
	 * main 
	 * ============================== */
	 function main_menu(){
	 	var $navBtn = $(".menuArea section .navMore");

	 	if ($('.menuArea').hasClass('menuTit') == false) {
	 		$('.navMore').attr('aria-expanded','false');
	 	}

	 	$($navBtn).click(function(){
	 		if (!$(this).parent('section').hasClass('on')){
				if ($('.menuArea section').hasClass('on') == true) {
					$('.mainSlider').animate({"height": "0px"}, "slow");
					$('section.on').find('.menuList').animate({"height": "0px"}, "slow");
					$('section.on').find('.menuList').children('h2').attr('aria-hidden', 'true');
					$('section.on').find('.menuList').children('p').attr('aria-hidden', 'true');
					$('section.on').find('.menuList').children().find('a').attr('aria-hidden', 'true');
					$('section.on').animate({"height": "58px"}, "slow");
					$('section.on').removeClass('on');
					$(this).parent('section').addClass('on');
					$(this).next('.menuList').animate({"height": "270px"}, "slow");
					$(this).next('.menuList').children('h2').attr('aria-hidden', 'false');
					$(this).next('.menuList').children('p').attr('aria-hidden', 'false');
					$(this).next('.menuList').children().find('a').attr('aria-hidden', 'false');
					$(this).parent('section').animate({"height": "280px"}, "slow");
					$(this).attr('aria-expanded','true');
					$('.wrap.main .ctWrap').animate({"min-height": "568px"}, "slow");
				}else{
					$('.mainSlider').animate({"height": "0px"}, "slow");
					$(this).parent('section').addClass('on');
	 				$(this).next('.menuList').animate({"height": "270px"}, "slow");
	 				$(this).next('.menuList').children('h2').attr('aria-hidden', 'false');
	 				$(this).next('.menuList').children('p').attr('aria-hidden', 'false');
	 				$(this).next('.menuList').children().find('a').attr('aria-hidden', 'false');
					$(this).parent('section').animate({"height": "280px"}, "slow");
					$(this).attr('aria-expanded','true');
					$('.wrap.main .ctWrap').animate({"min-height": "568px"}, "slow");
				}
			}else{
				$('.mainSlider').animate({"height": "170px"}, "slow");
				$(this).parent('section').removeClass('on');
	 			$(this).next('.menuList').animate({"height": "0px"}, "slow");
	 			$(this).next('.menuList').children('h2').attr('aria-hidden', 'true');
	 			$(this).next('.menuList').children('p').attr('aria-hidden', 'true');
	 			$(this).next('.menuList').children().find('a').attr('aria-hidden', 'true');
	 			$(this).parent('section').animate({"height": "58px"}, "slow");
				$(this).attr('aria-expanded','false');
				$('.wrap.main .ctWrap').animate({"min-height": "513px"}, "slow");
	 		}
	 	});
	 }

	 //main slick
	 function main_slick(){
	 	var slickPause = '<button class="slickBtn pause">Pause</button>';
	 	var controls = '<div class="controls"></div>'
		$('.mainSlider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			dots: true,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 4000
		}).append(slickPause).children().not('.slick-list').wrapAll(controls);
		$('.slickBtn').on('click', function(){
			if ($(this).hasClass('pause')) {
				$('.mainSlider').slick('slickPause');
				$(this).removeClass('pause').addClass('play').text('play');
			}else{
				$('.mainSlider').slick('slickPlay');
				$(this).removeClass('play').addClass('pause').text('pause');
			}
		});
	 }


	/* ==============================
	 * content 
	 * ============================== */
	// terms
	// 전체 동의
	var Allchk = $('.termsLabel.all').find('input');
	var termsList = $('.termsList').find('a');
	var termsListEtc = $('.termsListTwo').find('a');
	$('.chkAllTxt').on('keydown', function(key){
		if (key.keyCode == 13)
		{
			$(Allchk).click();
		}
	});


	// 약관동의 상태값
	// 약관 내용 동의 체크 박스 - 리스트 하단 체크박스
	var dataConfirm = 0;
	// 동의 체크 리스트 상태 - 체크박스
	var dataListChk = 0;
	// 동의 체크 리스트 상태 - 스크롤
	var dataList = 0;	

	$('.agreeLabel').not('.all').find('label').text('예');
	$('.termsLabel.all').find('label').removeAttr('role');
	$('.chkList > li').find('label').removeAttr('role');
	$('.agreeLabel.all').find('span').text('전체 선택');
	$(Allchk).on('change', function(){
		if (Allchk.prop('checked')) {
			$(this).closest('.termsList').find('.termsLabel').addClass('on').find('input').prop('checked',true);
			$(this).closest('.termsList').find('.termsLabel').not('.all').find('label').html('동의 완료');
			$(this).closest('.termsList').find('li').addClass('on fix');
			$(this).closest('.termsList').find('dd').stop(true, true).slideDown(effectTime);
			$(this).closest('.termsList').find('.agreeTit').parent('a').attr('aria-expanded',true);
			// 개인(신용)정보 조회 동의서(필수) 별도 팝업
			var termsPop = $('.termsList li');
			if ($(termsPop).hasClass('agreePop')) {
				$("[data-popup='popup']").show();
				$('body').addClass('no_scroll2');
				$('.wrap').attr('aria-hidden', 'true');
				$('.popWrap .btnClose').focus();
			}
			dataListChk = 1;
		} else {
			$('.termsLabel').removeClass('on').find('input').prop('checked',false);
			$('.termsLabel').not('.all').find('label').html('동의 하기');
			$('.termsList > li').removeClass('on fix');
			$(this).closest('.termsList').find('dd').stop(true, true).slideUp(effectTime);
			$(this).closest('.termsList').find('.agreeTit').parent('a').attr('aria-expanded',false);
			$(this).closest('.termsList').find('.trems').removeClass('done').scrollTop(0).removeAttr('tabindex');
			confirmData = $(this).closest('.termsList').data('confirm');
			$('[data-btnconfirm="'+ confirmData +'"]').addClass('off');
			dataList = 0;
			dataListChk = 0;
		}
	});
	
	// 약관 리스트 개별 - 단순 슬라이드 기능
	$(termsList).each(function(){
		$(this).on('click', function(){
			if ( !$(this).closest('li').hasClass('on') )
			{
				$(this).attr('aria-expanded',true);
				$(this).closest('li').addClass('on').find('dd').slideDown(effectTime);
			}
			else {
				$(this).attr('aria-expanded',false);
				$(this).closest('li').removeClass('on').find('dd').slideUp(effectTime);
			}
		});
	});

	
	// 약관 개별 checkbox checked 상태 표시
	$('.termsList').find('.termsLabel').not('.all').children('input').each(function(){
		$(this).on('click', function(){

			// 개별 체크 상태 실행
			if ( $(this).prop('checked') )
			{
				$(this).closest('.termsLabel').addClass('on');
				$(this).next('label').html('동의 완료');
				$(this).closest('li').addClass('on fix').find('dd').slideDown(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('aria-expanded',true);
				termsLabelLng = $(this).closest('.termsList').find('.termsLabel').not('.termsLabel.exception, .termsLabel.all').length;
				termsLabeldoneLng = $(this).closest('.termsList').find('.termsLabel.on').not('.termsLabel.exception, .termsLabel.all').length;
				termsLabelLngAll = $(this).closest('.termsList').find('.termsLabel').not('.termsLabel.all').length;
				termsLabeldoneLngAll = $(this).closest('.termsList').find('.termsLabel.on').not('.termsLabel.all').length;
				if (termsLabelLng <= termsLabeldoneLng)
				{
					dataListChk = 1;
					lng = $('.termsList').find('.trems').not('.trems.exception').length;
					doneLng = $('.termsList').find('.done').length;
					if (lng == doneLng)
					{
						if ( $(this).closest('.termsList').hasClass('single') )
						{
							dataListChk = 1;
						}
						dataList = 1;
					}

					if (dataConfirm == 1 && dataList == 1 && dataListChk == 1)
					{
						Data = $(this).closest('.termsList').data('confirm');
						$('[data-btnconfirm="'+ Data +'"]').removeClass('off');
					}
				}

				if ( termsLabelLngAll === termsLabeldoneLngAll )
				{
					$('.termsLabel.all').find('input').prop('checked',true);
				}
				var termsPop = $(this).closest('li');
				if ($(termsPop).hasClass('agreePop')) {
					$("[data-popup='popup']").show();
					$('body').addClass('no_scroll2');
					$('.wrap').attr('aria-hidden', 'true');
					$('.popWrap .btnClose').focus();
				}
			}
			// 개별 체크 해지 상태 실행
			else {
				$(this).closest('.termsLabel').removeClass('on');
				$(this).next('label').html('동의 하기');
				$(this).closest('li').removeClass('on fix').find('.trems').removeClass('done');
				$(this).closest('li').find('dd').stop(true, true).slideUp(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('aria-expanded',false);
				if ( $(this).closest('.termsLabel').hasClass('exception') )
				{
					$('.termsLabel.all').find('input').prop('checked',false);
					$(this).closest('li').find('.trems').addClass('exception');
				}
				else {
					dataListChk = 0;
					dataList = 0;
					tlistLng = $('.termsList > li').length;
					tlistLngOn = $('.termsList > .fix').length;
					$('.termsLabel.all').find('input').prop('checked',false);
					confirmData = $(this).closest('.termsList').data('confirm');
					$('[data-btnconfirm="'+ confirmData +'"]').addClass('off');
				}
			}
		});
	});
	
	// 약관 개별 스크롤 체크
	$('.termsList').find('.trems').each(function(){
		$(this).on('scroll', function(){
			if ( $(this).scrollTop() + $(this).outerHeight() >= $(this)[0].scrollHeight)
			{
				$(this).addClass('done');
				lng = $('.termsList').find('.trems').not('.trems.exception').length;
				doneLng = $('.termsList').find('.done').length;
				if (lng == doneLng)
				{
					if ( $(this).closest('.termsList').hasClass('single') )
					{
						dataListChk = 1;
					}
					dataList = 1;
					if (dataConfirm == 1 && dataList == 1 && dataListChk == 1)
					{
						Data = $(this).closest('.termsList').data('confirm');
						$('[data-btnconfirm="'+ Data +'"]').removeClass('off');
					}
				}
			}
		});
	});

	// 선택 항목
	$(termsListEtc).each(function(){
		$(this).on('click', function(){
			if ( !$(this).closest('li').hasClass('on') )
			{
				$(this).closest('.termsLabel').addClass('on');
				$(this).next('label').html('동의 완료');
				$(this).closest('li').addClass('on fix').find('dd').slideDown(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('aria-expanded',true);
			}
			else {
				$(this).closest('.termsLabel').removeClass('on');
				$(this).next('label').html('동의 하기');
				$(this).closest('li').removeClass('on fix').find('.trems').removeClass('done');
				$(this).closest('li').find('dd').stop(true, true).slideUp(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('aria-expanded',false);
			}
		});
	});

	$('.termsListTwo').find('.termsLabel').not('.all').children('input').each(function(){
		$(this).on('click', function(){
			if ( $(this).prop('checked') )
			{
				$(this).closest('.termsLabel').addClass('on');
				$(this).next('label').html('동의 완료');
				$(this).closest('li').addClass('on fix').find('dd').slideDown(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('aria-expanded',true);
			}
			else {
				$(this).closest('.termsLabel').removeClass('on');
				$(this).next('label').html('동의 하기');
				$(this).closest('li').removeClass('on fix').find('.trems').removeClass('done');
				$(this).closest('li').find('dd').stop(true, true).slideUp(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('aria-expanded',false);
			}
		});
	});

	// 약관 동의 체크박스
	$('[data-dchk="confirm"]').on('click', function(){
		agreeConfirm = 0;
		Data = $(this).data('dchk');
		if ( $(this).prop('checked') )
		{
			dataConfirm = 1;
			if (dataConfirm == 1 && dataList == 1 && dataListChk == 1)
			{
				agreeConfirm = 1;
			} else {
				agreeConfirm = 0;
			}
		} else {
			dataConfirm = 0;
		}

		if (agreeConfirm == 1)
		{
			$('[data-btnconfirm="'+ Data +'"]').removeClass('off');
		} else {
			$('[data-btnconfirm="'+ Data +'"]').addClass('off');
		}
	});

	// 체크 리스트
	var agreeAllchk = $('.agreeLabel.all').find('input');
	var agreeList = $('.chkList li');
	$('.chkAllTxt').on('keydown', function(key){
		if (key.keyCode == 13)
		{
			$(agreeAllchk).click();
		}
	});

	$(agreeAllchk).on('change', function(){
		if (agreeAllchk.prop('checked')) {
			$('.chkList > li').addClass('on');
			$('.chkList').find('input').prop('checked',true);
		} else {
			$('.chkList > li').removeClass('on');
			$('.chkList').find('input').prop('checked',false);
		}
	});

	// 동의 리스트 개별
	$(agreeList).each(function(){
		$(this).on('click', function(){
			if (!$(this).hasClass('agreeAll')) {
				chkBox = $(this).find('input');
				if (chkBox.prop('checked')) {
					$(this).removeClass('on');
					$(chkBox).prop('checked',false);				
					agreelistLng = $('.chkList > li').length;
					agreelistLngOn = $('.chkList > .on').length;
					if ((agreelistLng - 2) != agreelistLngOn)
					{
						$(this).closest('.chkList').find('.agreeAll').find('input').prop('checked',false);
						$(this).closest('.chkList').find('.agreeAll').removeClass('on');
					}
				} else {
					$(this).addClass('on');
					$(chkBox).prop('checked',true);
					agreelistLng = $('.chkList > li').length;
					agreelistLngOn = $('.chkList > .on').length;
					if ((agreelistLng - 1) == agreelistLngOn)
					{
						$(this).closest('.chkList').find('.agreeAll').find('input').click();
					}
				}
			}
		});
	});

	// 행정정보 전체 동의
	$('.chkBoxAll').on('click', function(){
		chkGroup = $(this).data('chkgroup');
		if ($(this).is(':checked'))
		{
			$('[data-chkAll="'+ chkGroup +'"]').find('input:not(.exception)').prop('checked',true);
		} else {
			$('[data-chkAll="'+ chkGroup +'"]').find('input:not(.exception)').prop('checked',false);
		}
	});

	chkAllGroup = $('[data-chkAll="chkGroup"]');
	$(chkAllGroup).each(function(){
		$(this).find('input:not(.exception)').on('click', function(){
			if ( !$(this).is(':checked') )
			{
				$(this).closest('[data-chkAll="chkGroup"]').find('.chkBoxAll').prop('checked',false);
			}
		});
	});

	// slideList
	var SlideTit = $('.slideList1').find('.tit');
	var STitlast = $('.slideList1 li');
	$(SlideTit).on('click', function(){
		console.log($(this).index());
		if ( $(this).next('.slideCont').css('display') == 'none')
		{
			$(this).addClass('on').attr('aria-expanded',true);
			$(this).next('.slideCont').stop(true, true).slideDown(effectTime);
			if ($(STitlast).hasClass('etcLast')) {
				var scrollPosition = $('.etcLast .dvInner').offset().top;
				$('html, body').animate({
					scrollTop:scrollPosition-200
				},500);
				console.log(scrollPosition);
			}
			if ($(this).next('.slideCont').find('.trems').length > 0)
			{
				$(this).next('.slideCont').find('.trems').prop('tabindex','0');				
			}
			
		} else {
			$(this).removeClass('on').attr('aria-expanded',false);
			$(this).next('.slideCont').stop(true, true).slideUp(effectTime);
			if ($(this).next('.slideCont').find('.trems').length > 0)
			{
				$(this).next('.slideCont').find('.trems').removeAttr('tabindex');
			}
		}
	});
});


// functions

// input Reset
function inpReset(e) {
	$(e).closest('.inputBox').find('.inp').val('');
	$(e).css('display','none');
}

// input Reset Focusout
function inpResetFocusout(e) {
	$(e).css('display','none');
}

// input keyup
function inpkeyup(e) {
	if ( $(e).val().length >= 1)
	{
		$(e).closest('.inputBox').find('.inpReset').css('display','block');
	}
	if ( $(e).val().length == 0)
	{
		$(e).closest('.inputBox').find('.inpReset').css('display','none');
	}
}

// input Focusin
function inpFocusin(e) {
	if ( $(e).val().length >= 1)
	{
		$(e).closest('.inputBox').find('.inpReset').css('display','block');
	}
}

// input 숫자 한글 표기
function numHangul2(event) {
	if ( event.which >=37 && event.which <= 40 ) return;
	$(event).val(function(index, value) {
		return value
		.replace(/\D/g, "")
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	});
	numHangul(event);
	var obJ = $(event).attr('maxlength');
}

// 숫자 한글 표기3
function numHangul(event) {
	var Dom = '<span class="moneyHangul"></span>';
	// 기본단위
	var arrNum = new Array('', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구');
	//자리수
	var arrDigitWord = new Array('', '십', '백', '천');
	//만단위
	var arrManWord = new Array('', '만', '억', '조', '경', '해');

	var data = 11;
	var val = $(event).val();
	var valLng = val.length;
	var valnoComma = $(event).val().replace(/\D/g, "");
	var valnoCommaLng = valnoComma.length;

	$(event).val(val);
	if ( valnoCommaLng > data )
	{
		str2 = valnoComma.substr(0,(data));
		str3 = str2.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		$(event).val(str3);
	}

	var v = $(event).val();
	var vRe = v.replace(/,/g,'');
	var v_lng = vRe.length;

	if (isNaN(vRe) == true)
		return;
	
	var result = '';
	var manCount = 0;

	for (i = 0; i < vRe.length; i++)
	{
		strTxt = arrNum[vRe.charAt(i)]
		if ( strTxt != '')
		{
			manCount++;
			strTxt += arrDigitWord[(v_lng - (i + 1)) % 4];
		}
		if (manCount != 0 && (v_lng - (i+1)) % 4 == 0)
		{
			manCount = 0;
			strTxt = strTxt + arrManWord[ (v_lng - (i + 1)) / 4 ]
		}
		result += strTxt;
	}
	if (vRe != 0)
		result = result + ' 원';

	$(event).closest('.inputBox').append(Dom);
	if ( $(event).closest('.inputBox').find('.moneyHangul').length > 1)
	{
		$(event).closest('.inputBox').find('.moneyHangul').not(':first').remove();
	}
	$(event).closest('.inputBox').find('.moneyHangul').text(result);
}
// input 숫자 한글 표기

// input 숫자 한글 표기 입력 오류 체크
function numHangulBlur (event) {
	var v = $(event).val();
	var vRe = v.replace(/,/g,'');
	var v_lng = vRe.length;

	var parsVal = parseInt($(event).val().replace(/\D/g, ""));
	$(event).val(parsVal);
	$(event).val(function(index, value) {
		return value
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	});

	if (isNaN(parsVal))
    {
        $(event).val('0');
    }

	// 마지막 5자리 체크
	var vReChk = Number(vRe.slice(-5));
	// 한도
	var Max = $(event).data('max');
	var Min = $(event).data('min');

	caution1 = '<p class="blTxt4">신청금액을 10만원 단위로 입력하여 주십시오.</p>';
	caution2 = '<p class="blTxt4">대출 신청금액은 최대 300만원까지 입력 가능합니다.</p>';
	caution3 = '<p class="blTxt4">대출 신청금액은 50만원 이상 입력하여 주십시오.</p>';

	// 10만단위 체크
	if (vReChk == '00000')
	{
		$(event).closest('dd').find('.blTxt4').remove();

	} else {
		$(event).closest('dd').find('.blTxt4').remove();
		$(event).closest('dd').append(caution1);
		console.log('10 단위로 넣어라');
	}

	// 한도 체크
	if (vRe > Max)
	{
		$(event).closest('dd').find('.blTxt4').remove();
		$(event).closest('dd').append(caution2);
	} else if (vRe < Min)
	{
		$(event).closest('dd').find('.blTxt4').remove();
		$(event).closest('dd').append(caution3);
	}
}
// input 숫자 한글 표기 입력 오류 체크

// 0원 입력 제어
function numHangulBlur2 (event) {
	var parsVal = parseInt($(event).val().replace(/\D/g, ""));
	$(event).val(parsVal);
	$(event).val(function(index, value) {
		return value
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	});

	if (isNaN(parsVal))
    {
        $(event).val('0');
    }
}
// 0원 입력 제어

//layer popup
$(function(){
	//------OPEN
	$('[data-popup-open]').on('click',function(e){
		var targeted_pop_class = $(this).attr('data-popup-open');
		$('.wrap').attr('aria-hidden', 'true');
		$('[data-popup]').attr('aria-hidden', 'true');	
		$('[data-popup="'+ targeted_pop_class +'"]').fadeIn(350);
		$('[data-popup="'+ targeted_pop_class +'"]').attr('aria-hidden', 'false');	
		$('[data-popup="'+ targeted_pop_class +'"]').find('.btnClose').focus();
		e.preventDefault();
	});
	//------CLOSE
	$('[data-popup-close]').on('click',function(e){
		var targeted_pop_class = $(this).attr('data-popup-close');
		$('.wrap').attr('aria-hidden', 'false');
		$('[data-popup]').attr('aria-hidden', 'false');
		$('[data-popup="'+ targeted_pop_class +'"]').fadeOut(350);
		$('[data-popup="'+ targeted_pop_class +'"]').attr('aria-hidden', 'true');	
		e.preventDefault();
	});
});


function iFrameHeight() {
	setTimeout(function(){
		var frame = $('#contentFrame').get(0);
		var doc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		console.log(doc.body.scrollHeight + ' , ' + doc.body.scrollWidth);
		$('#contentFrame').height(doc.body.scrollHeight + 5);
	}, 500);
}

// 정보입력 보유 유무 활성화 비 활성화
function changeDisabledOn(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',false);
	}
}

function changeDisabledOff(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('off');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',true);
	}
}

function changeDisabledOnChkbox(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',false);
	} else {
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',true);
	}
}

function changereadOnlyOn(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('readonly',false);
	}
}

function changereadOnlyOff(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('off');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('readonly',true);
	}
}
// 정보입력 보유 유무 활성화 비 활성화

//layer popup
$(function(){
	//------OPEN
	$('[data-popup-open]').on('click',function(e){;
		var targeted_pop_class = $(this).attr('data-popup-open');
		$('[data-popup="'+ targeted_pop_class +'"]').fadeIn(350);
		$('body').addClass('no_scroll2');
		$('.wrap').attr('aria-hidden', 'true');
		$('[data-popup]').attr('aria-hidden', 'true');
		$('[data-popup="'+ targeted_pop_class +'"]').attr('aria-hidden', 'false');
		$('[data-popup="'+ targeted_pop_class +'"]').find('.btnClose').focus();
		e.preventDefault();
	});
	//------CLOSE
	$('[data-popup-close]').on('click',function(e){
		 popClose();
		 $('.wrap').attr('aria-hidden', 'false');
	});
});

//------layer popup OPEN
function popOpen(){
	var targeted_pop_class = $(this).attr('data-popup-open');
	$('.wrap').attr('aria-hidden', 'true');
	$('[data-popup="'+ targeted_pop_class +'"]').fadeIn(350);
	$('body').addClass('no_scroll2');
	$('[data-popup]').attr('aria-hidden', 'true');
	$('[data-popup="'+ targeted_pop_class +'"]').attr('aria-hidden', 'false');
	$('[data-popup="'+ targeted_pop_class +'"]').find('.btnClose').focus();
}

//------layer popup CLOSE
function popClose(){
	var targeted_pop_class = $(this).attr('data-popup-close');
	$('[data-popup="'+ targeted_pop_class +'"]').fadeOut(350);
	$('body').removeClass('no_scroll2');
	$('[data-popup]').attr('aria-hidden', 'false');
	$('[data-popup="'+ targeted_pop_class +'"]').attr('aria-hidden', 'true');
}

// tab
$(function(){
	// tab first show
	$('.tabBar').each(function(){
		var $active, $content, $links = $(this).find('a');
		var $first = $('.tabBar li:first a').attr('href');
		$active = $($links.filter('[href="'+$first+'"]'));
		$active.parent().addClass('on');
		$content = $($active.attr('href'));
		$content.show();
	});
	
	// tab event
	$('.tabBar li').click(function(){
		$('.tabBar li').removeClass('on');
		$(this).addClass('on');
		$('.tabCon').hide();
		$('.tabBar li a').attr('aria-selected','false');
		var selected_tab = $(this).find('a').attr('href');
		var starting = selected_tab.indexOf('#');
		var sub = selected_tab.substring(starting);
		$(this).find('a').attr('aria-selected','true');
		$(sub).fadeIn();
		
		return false;
	});
});

//방문예약 본인 여부 선택시 화면 전환
$(function() {
	$("input:radio").click(function() {
		var rdoCek  = $(this).attr('data-checked');
		var chk = $("input:radio[data-checked]").is(':checked');
		if (chk) {
			$('[data-ceklist="'+ rdoCek +'"]').show();
		} else {
			$('[data-ceklist]').hide();
		}
	});
});

// 채무조정 확인서 확인 버튼
function txtBtn(e) {
	$(e).hide();
	$(e).next('.value').addClass('on');
}

$(function() {
	// ToolTip
	$('.btnToolTip').on('click', function(){
		$('.toolTip').css('z-index','2');
		$(this).closest('.toolTip').css('z-index','3');
		$('.btnToolTip').removeClass('on');
		$(this).addClass('on');
		$(this).next('.toolTipContent').attr('aria-hidden','false');
	});

	$('.btnToolTipClose').on('click', function(){
		$('.toolTip').css('z-index','2');
		$('.btnToolTip').removeClass('on');
		$(this).parent('.toolTipContent').attr('aria-hidden','true');
	});

	// selectbox 선택에 따른 input box disabled 처리
	$('.disabledSelect').on('change', function(){
		var selectData = $(this).find('option:selected').data('selectdisabled');
		if (!selectData == '')
		{
			$(this).closest('.inpGroup2').find('[data-inpdisabled="'+ selectData +'"]').attr('disabled',false);
		} else {
			$(this).closest('.inpGroup2').find('.inp').attr('disabled',true);
		}
	});

	// slideList3 slide Open Close
	$('.listOpen').on('click', function(){
		if ($(this).parent().next('.ckArea').css('display') == 'none'){
			$(this).parent().closest('li').addClass('on').find('.ckArea').stop(true, true).slideDown(effectTime);
			$(this).parent().closest('li').attr('aria-expanded',true);
			$(this).find('span').text('취소');
		}else{
			$(this).parent().closest('li').removeClass('on').find('.ckArea').stop(true, true).slideUp(effectTime);
			$(this).parent().closest('li').attr('aria-expanded',false);
			$(this).find('span').text('선택');
		}
			
	});

	// footer약관 slide Open Close
	$('.slideList2 dl dt a').on('click', function(){
		if (!$(this).parent().parent().parent().parent().hasClass('amList')) {
				if ($(this).parent().next('dd').css('display') == 'none'){
				$(this).parent().closest('li').addClass('on');
				$(this).parent().next('dd').slideDown();
				$(this).attr('aria-expanded', 'true');
			}else{
				$(this).parent().closest('li').removeClass('on');
				$(this).parent().next('dd').slideUp();
				$(this).attr('aria-expanded', 'false');
			}
		}			
	});

	//신용상담보고서발급 변제 계획안 항목별 출력
	$('.viewChkList .btn.tyfull').on('click', function(){
		if ($(this).next().css('display') == 'none'){
			$(this).addClass('on');
			$(this).next().attr('aria-expanded',true).stop(true, true).slideDown(effectTime);
		}else{
			$(this).removeClass('on');
			$(this).next().attr('aria-expanded',false).stop(true, true).slideUp(effectTime);
		}
	});

	//신용상담보고서발급 서민금융상품 항목별 출력
	$('.itemCalc li .btn.tyfull').on('click', function(){
		if ($(this).next().css('display') == 'none'){
			$(this).addClass('on');
			$(this).next().attr('aria-expanded',true).stop(true, true).slideDown(effectTime);
			$(this).next().find('.btnBox').addClass('on');
		}else{
			$(this).removeClass('on');
			$(this).next().attr('aria-expanded',false).stop(true, true).slideUp(effectTime);
			$(this).next().find('.btnBox').removeClass('on');
		}
	});

	//알림내역 알림설정
	$('.alarmBox .alarmChk').on('click', function(){
		if (!$(this).hasClass('on')){
			$(this).addClass('on');
			$(this).find('span').text('ON');
		}else{
			$(this).removeClass('on');
			$(this).find('span').text('OFF');
		}			
	});

	//지원현황 조회 변제금 납입 현황 조회기간 button
	$('.sptBtn input[type=date]').attr('type', 'text');
	$('.sptBtn li').removeAttr('title');
		var dateVal = $('.sptBtn .btnDate');
		if ($(dateVal).hasClass('on')) {
			$('.sptBtn input[type=text]').attr('type', 'date');
			$(dateVal).attr('aria-label', '선택');
			$('.sptBtn li button').on('click', function(){
			if (!$(this).hasClass('on')){
				if ($(this).hasClass('btnDate')){
					$('.sptBtn input').attr('type', 'date');
				}else{
					$('.sptBtn input').attr('type', 'text');
				}
				$('.sptBtn li button').removeClass('on');
				$('.sptBtn li button').attr('aria-label', '선택 해제');
				$(this).addClass('on');
				$(this).attr('aria-label', '선택');
			}else{
				$(this).removeClass('on');
			}			
		});
		}else{
			$('.sptBtn li button').on('click', function(){
			if (!$(this).hasClass('on')){
				if ($(this).hasClass('btnDate')){
					$('.sptBtn input').attr('type', 'date');
				}else{
					$('.sptBtn input').attr('type', 'text');
				}
				$('.sptBtn li button').removeClass('on');
				$('.sptBtn li button').attr('aria-label', '선택 해제');
				$(this).addClass('on');
				$(this).attr('aria-label', '선택');
			}else{
				$(this).removeClass('on');
			}			
		});
	}
});

// 스크래핑 on off 스크립트
function onoff(e) {
	if ( $(e).hasClass('on') )
	{
		$(e).removeClass('on').attr('title', '선택 해제');
		$(e).attr('aria-selected', 'false');
	} else {
		$(e).parent().find('button').removeClass('on').attr('title', '선택 해제');
		$(e).addClass('on').attr('title', '선택');
		$(e).attr('aria-selected', 'true');
	}
}

// 정보입력 보유 유무 활성화 비 활성화
function changeDisabledOn(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',false);
	}
}

function changeDisabledOff(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('off');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',true);
	}
}

function changeDisabledOnChkbox(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',false);
	} else {
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('disabled',true);
	}
}

function changereadOnlyOn(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('on');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('readonly',false);
	}
}

function changereadOnlyOff(e) {
	if ( $(e).is(':checked') )
	{
		data = $(e).data('off');
		$('[data-disable="'+ data +'"]').find('input:not(.exception), .selectbox, button, textarea').attr('readonly',true);
	}
}
// 정보입력 보유 유무 활성화 비 활성화
	
// Spinner 
function Spin() {
	var Dimmed = '<div class="dimmed on loaderdimmed"></div>';
	var Loader = '<div id="loader"></div>';
	$(Dimmed).insertBefore('.footer');
	$(Loader).insertBefore('.footer');
	var opts = {
	  lines: 10,
	  length: 8,
	  width: 4,
	  radius: 14,
	  corners: 1,
	  rotate: 0,
	  color: '#fff',
	  speed: 1,
	  trail: 60,
	  shadow: false,
	  hwaccel: false,
	  className: 'spinner',
	  zIndex: 2e9,
	  position:'fixed'
	};
	new Spinner(opts).spin(document.getElementById('loader'));
}

function SpinDestory() {
	$('#loader').remove();
	$('.loaderdimmed').remove();
}

//알람 설정
function amList(obj) {
	if ($(obj).parent().next('dd').css('display') == 'none'){
		$(obj).parent().closest('li').addClass('on');
		$(obj).parent().next('dd').slideDown();
		$(obj).attr('aria-expanded', 'true');
	}else{
		$(obj).parent().closest('li').removeClass('on');
		$(obj).parent().next('dd').slideUp();
		$(obj).attr('aria-expanded', 'false');
	}
}

//자주하는 질문
function askList(obj) {
	if ($(obj).next().css('display') == 'none'){
		$('.csrAsk dt').removeClass('on');
		$('.csrAsk dd').slideUp();
		$(obj).addClass('on');
		$(obj).next('dd').slideDown();
		$(obj).attr('aria-expanded','true');
	}else{
		$(obj).removeClass('on');
		$(obj).next('dd').slideUp();
		$(obj).attr('aria-expanded','false');
	}
}

// 약관 예외 처리 [각 항목당 높이 체크 / exception class 제어]
$(window).on('load', function(){
	$('.termsList').not('.single').find('.trems').each(function(i){
		$(this).removeClass('exception').closest('dd').show();
		if ( $(this).closest('li').find('.termsLabel').hasClass('exception') )
		{
			$(this).addClass('exception maxheight');
		}
		objHeight = $(this).find('.inner').outerHeight();
		$(this).closest('dd').hide();
		if ( objHeight <= 150)
		{
			$(this).addClass('exception');
		}
	});
});

//메뉴 닫기
function btnClose(){
	$(".innerSide .layWrap").animate({right: "-100%"}, "slow");
	$('body').removeClass('no_scroll').off('scroll touchmove mousewheel');
	$(".innerSide").attr('aria-hidden','true');
}