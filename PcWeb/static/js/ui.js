$(function(){
	
	/* ==============================
	 * common
	 * ============================== */

	 effectTime = 500;

	//datepicker
	if($('.inputBox.calendar').length > 0){
		$( '.inputBox.calendar > .inp' ).datepicker({
			closeText: '닫기',
			prevText: '이전 달',
			nextText: '다음 달',
			currentText: '오늘',			
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			changeMonth: true,
      		changeYear: true,
      		yearSuffix: '년',
			beforeShow: function(i) {
				if ( $(i).attr('readonly') )
				{
					return false;
				}
			}
		});
	}

	$('.inputBox.calendar > .inp').keyup(function(e){
		if (!(e.keyCode >= 37 && e.keyCode <=40)) {
			var v = $(this).val();
			$(this).val(v.replace(/[^a-z0-9]/gi,''));
		}
		if ((e.keyCode == 13)) {
			$(this).datepicker('show');
		}
	});

	$( '.inputBox.calendar > .inp' ).off('focus').click(function(){
		$(this).datepicker('show');
	});

	// lnb
	$('.lnbList a').each(function(){
		$(this).on('mouseenter focus', function(){
			$(this).parents('li').siblings().removeClass('on');
			$(this).parents('li').addClass('on');
			$(this).closest('.lnbList').addClass('open');
		});
	});

	$('.lnbList > li').each(function(){
		$('a:first, a:last', this).on('blur', function(){
			$(this).parents('li').removeClass('on');
			$(this).closest('.lnbList').removeClass('open');
		});
	});

	$('.lnbList').on('mouseleave', function(){
		$(this).removeClass('open');
		$('.lnbList > li').removeClass('on');
	});

	// Location
	homeLocation();

	//footer
	/*
	$(".fmList a").on("mouseenter focus",function(){
		$(this).parents(".fmList").addClass("open");
	});

	$(".fmList").on("mouseleave",function(){
		$(this).removeClass("open");
	});
	
	$(".fmList a:first, .fmList a:last").on("blur",function(){
		$(this).parents(".fmList").removeClass("open");
	});
	*/


	// 챗봇 위치
	$(window).on('scroll', function(){
		var Top = $(document).scrollTop();
		var bodyH = $('body').height();
		var windowH = $(window).height();
		var fix = bodyH - windowH;
		if (Top > fix)
		{
			$('.chatBotBtn').addClass('fix');
		} else {
			$('.chatBotBtn').removeClass('fix');
		}
	});

	
	/* ==============================
	 * gnb 
	 * ============================== */

	var Dimmed = '<div class="dimmed"></div>';
	$('.gnbOpen').on('click', function(){
		$('.lnb').addClass('on');
		$('.gnbWrap').stop(true).slideDown(500);
		$(Dimmed).insertBefore('#footer');
		setTimeout(function(){
			$('.dimmed').addClass('on');
			//$('.gnbList').find('a').first().focus();
		}, 100);
	});

	$('.gnbClose').on('click', function(){
		$('.gnbWrap').stop(true).slideUp(500);
		$('.dimmed').removeClass('on');
		setTimeout(function(){
			$('.dimmed').remove();
			$('.lnb').removeClass('on');
			$('.gnbOpen').focus();
		}, 500);
	});

	/* ==============================
	 * main 
	 * ============================== */

	// 메인 상단 베터 
	$(function(){
		// topbanner close
		$('.topBanner').find('.topBannerClose').on('click', function(){
			$('.topBanner').slideUp('500');
			$('#nomore').prop("checked") ? setCookie("no_tb", "y", "1") : setCookie("no_tb", 0, 0);
		});

		$('.nonomore').on('click', function(){
			$('#nonono').prop("checked") ? setCookie("no_tbb", "y", "1") : setCookie("no_tbb", 0, 0);
			$('.nononoClose').click();
		});

		// cookie
		(function checkCookie() {
			if (getCookie("no_tb") != "")
			{
				$('.topBanner').remove();
			}

			if (getCookie("no_tbb") != "")
			{
				$('.mainEventPop').remove();
			}
		})();
	});

	$(".mainLnbList a:first, .mainLnbList a:last").on("focus",function(){
		if ( !$('.mainLnbOpen').hasClass('on') )
		{
			mainLnbOpen();
		}
	});

	$('.mainLnbLink:not(:first)').each(function(){
		$(this).find('a:first').on('focus', function(){
			mainLnbOpen();
		});
	});

	$('.mainLnbLink:not(:last)').each(function(){
		$(this).find('a:last').on('focus', function(){
			mainLnbOpen();
		});
	});

	//Main Key Visual
	if ( $('.mainBannerBx > .item').length > 1 )
	{
		var MBXSlider = $('.mainBannerBx').bxSlider({
			auto: true,
			autoControls: true,
			pause:6000,
			onSliderLoad:function(){
				$('.mainBannerBx').find('.bx-clone').find('a').prop('tabindex','-1');
			}
		});

		$('.mainBannerBx a').focusin(function(){
			MBXSlider.stopAuto();
		});
	}

	//Main Notice Bxslider
	if ( $('.mainNoticeList > li').length > 1 )
	{
		var MNXSlider = $('.mainNoticeList').bxSlider({
			mode: 'vertical',
			minSlides:1,
			slideMargin:0,
			auto: true,
			moveSlides:1,
			autoControls: true,
			pause:6000,
			pager:false
		});

		$('.mainNoticeList a').focusin(function(){
			MNXSlider.stopAuto();
		});
	}

	if ( $('.bxSlider2 > li').length > 1 )
	{
		var BX2Slider = $('.bxSlider2').bxSlider({
			mode: 'fade',
			auto: true,
			autoControls: true,
			pause:6000,
			onSlideBefore: function($slideElement, oldIndex, newIndex) {
				$('.bxSlider2').children('li').eq(oldIndex).addClass('on');
				$('.bxSlider2').children('li').eq(newIndex).css('left','100%');
				$('.bxSlider2').children('li').eq(newIndex).animate({
					'left':0
				});
			},
			onSlideAfter: function($slideElement, oldIndex, newIndex) {
				$('.bxSlider2').children('li').eq(oldIndex).removeClass('on');
			}
		});

		$('.bxSlider2 a').focusin(function(){
			BX2Slider.stopAuto();
		});
	}


	/* ==============================
	 * content 
	 * ============================== */

	if ( $('.bxSlider > li').length > 1 )
	{
		$('.bxSlider').bxSlider({
			auto: true,
			autoControls: true,
			pause:6000
		});
	}

	// 공지사항
	if ( $('.bxSlider3 > li').length > 3 )
	{
		var BX3Slider = $('.bxSlider3').bxSlider({
		//$('.bxSlider3').bxSlider({
			minSlides:3,
			maxSlides:3,
			slideMargin:20,
			slideWidth:330,
			moveSlides:1,
			pager:false,
			onSliderLoad:function(){
				$('.bxSlider3').find('.bx-clone').find('a').prop('tabindex','-1');
			}
		});

		$('.bxSlider3 a').focusin(function(){
			BX3Slider.stopAuto();
		});
	}

	// slideList
	var SlideTit = $('.slideList1').find('.tit');
	$(SlideTit).on('click', function(){
		if ( $(this).next('.slideCont').css('display') == 'none')
		{
			$(this).addClass('on').attr('title','확장됨');
			$(this).next('.slideCont').stop(true, true).slideDown(effectTime);
			if ($(this).next('.slideCont').find('.trems').length > 0)
			{
				$(this).next('.slideCont').find('.trems').prop('tabindex','0');
			}
		} else {
			$(this).removeClass('on').attr('title','축소됨');
			$(this).next('.slideCont').stop(true, true).slideUp(effectTime);
			if ($(this).next('.slideCont').find('.trems').length > 0)
			{
				$(this).next('.slideCont').find('.trems').removeAttr('tabindex');
			}
		}
	});

	$('.slideList2 dd').hide();
	$('.slideList2 dt').click(function(){
		$(this).next('dd').toggle();
	});

	// slideList3 slide Open Close
	$('.listOpen').on('click', function(){
		$(this).closest('li').addClass('on').find('dd').stop(true, true).slideDown(effectTime);
		$(this).closest('li').find('dt').attr('title','확장됨');
		$(this).closest('li').find('.controlBtns').addClass('on');
		
	});

	$('.listClose').on('click', function(){
		$(this).closest('li').removeClass('on').find('dd').stop(true, true).slideUp(effectTime);
		$(this).closest('li').find('dt').attr('title','축소됨');
		$(this).closest('li').find('.controlBtns').removeClass('on');
	});

	// terms
	// 전체 동의
	var Allchk = $('.termsLabel.all').find('input');
	var termsList = $('.termsList').find('a');
	var termsListEtc = $('.termsListTwo').find('a');
	var termsListClick = $('.termsList').find('.termsLabel').not('.all').find('label');

	// 약관동의 상태값
	// 약관 내용 동의 체크 박스 - 리스트 하단 체크박스
	var dataConfirm = 0;
	// 동의 체크 리스트 상태 - 체크박스
	var dataListChk = 0;
	// 동의 체크 리스트 상태 - 스크롤
	var dataList = 0;	

	$(Allchk).on('change', function(){
		if (Allchk.prop('checked')) {
			$(this).closest('.termsList').find('.termsLabel').addClass('on').find('input').prop('checked',true);
			$(this).closest('.termsList').find('.termsLabel').not('.all').find('label').html('동의 완료');
			$(this).closest('.termsList').find('li').addClass('on fix');
			$(this).closest('.termsList').find('dd').stop(true, true).slideDown(effectTime);
			$(this).closest('.termsList').find('.agreeTit').parent('a').attr('title','확장됨');
			$(this).closest('.termsList').find('.trems').prop('tabindex','0');
			dataListChk = 1;
		} else {
			$(this).closest('.termsList').find('.termsLabel').removeClass('on').find('input').prop('checked',false);
			$(this).closest('.termsList').find('.termsLabel').not('.all').find('label').html('동의 하기');
			$(this).closest('.termsList').find('li').removeClass('on fix');
			$(this).closest('.termsList').find('dd').stop(true, true).slideUp(effectTime);
			$(this).closest('.termsList').find('.agreeTit').parent('a').attr('title','축소됨');
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
				$(this).attr('title','확장됨');
				$(this).closest('li').addClass('on').find('dd').slideDown(effectTime);
				$(this).closest('li').find('.trems').prop('tabindex','0');
			}
			else {
				$(this).attr('title','축소됨');
				$(this).closest('li').removeClass('on').find('dd').slideUp(effectTime);
				$(this).closest('li').find('.trems').removeAttr('tabindex');
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
				$(this).closest('li').find('.agreeTit').parent('a').attr('title','확장됨');
				$(this).closest('li').find('.trems').prop('tabindex','0');
				termsLabelLng = $(this).closest('.termsList').find('.termsLabel').not('.termsLabel.exception, .termsLabel.all').length;
				termsLabeldoneLng = $(this).closest('.termsList').find('.termsLabel.on').not('.termsLabel.exception, .termsLabel.all').length;
				termsLabelLngAll = $(this).closest('.termsList').find('.termsLabel').not('.termsLabel.all').length;
				termsLabeldoneLngAll = $(this).closest('.termsList').find('.termsLabel.on').not('.termsLabel.all').length;

				if (termsLabelLng <= termsLabeldoneLng)
				{
					dataListChk = 1;

					// 추가 된 기능
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
					// 추가 된 기능

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
			}
			else {
				$(this).closest('.termsLabel').removeClass('on');
				$(this).next('label').html('동의 하기');
				$(this).closest('li').removeClass('on fix').find('.trems').removeClass('done');
				$(this).closest('li').find('dd').stop(true, true).slideUp(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('title','축소됨');
				$(this).closest('li').find('.trems').removeClass('done').scrollTop(0).removeAttr('tabindex');
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
				$(this).attr('title','확장됨');
				$(this).closest('li').addClass('on').find('dd').slideDown(effectTime);
				$(this).closest('li').find('.trems').prop('tabindex','0');
			}
			else {
				$(this).attr('title','축소됨');
				$(this).closest('li').removeClass('on').find('dd').slideUp(effectTime);
				$(this).closest('li').find('.trems').removeAttr('tabindex');
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
				$(this).closest('li').find('.agreeTit').parent('a').attr('title','확장됨');
				$(this).closest('li').find('.trems').prop('tabindex','0');
			}
			else {
				$(this).closest('.termsLabel').removeClass('on');
				$(this).next('label').html('동의 하기');
				$(this).closest('li').removeClass('on fix').find('.trems').removeClass('done');
				$(this).closest('li').find('dd').stop(true, true).slideUp(effectTime);
				$(this).closest('li').find('.agreeTit').parent('a').attr('title','축소됨');
				$(this).closest('li').find('.trems').removeClass('done').scrollTop(0).removeAttr('tabindex');
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
	var agreeList = $('.chkList').find('a');
	var wordYes = '예';
	var wordNo = '아니오';

	$(agreeAllchk).on('change', function(){
		if (agreeAllchk.prop('checked')) {
			$('.chkList > li').addClass('on');
			$('.chkList').find('input').prop('checked',true);
		} else {
			$('.chkList > li').removeClass('on');
			$('.chkList').find('input').prop('checked',false);
		}
	});

	// 동의 리스트 개별 label
	var agreeListInp = $('.chkList').find('.agreeLabel').not('.all').find('input');
	$(agreeListInp).each(function(){
		$(this).on('change', function(){
			if ( $(this).prop('checked')) {
				$(this).closest('li').addClass('on');
				agreelistLng = $('.chkList > li').length;
				agreelistLngOn = $('.chkList > .on').length;
				if ((agreelistLng - 1) == agreelistLngOn)
				{
					$(this).closest('.chkList').find('.agreeAll').find('input').click();
				}
			} else {
				$(this).closest('li').removeClass('on');
				agreelistLng = $('.chkList > li').length;
				agreelistLngOn = $('.chkList > .on').length;
				if ((agreelistLng - 2) != agreelistLngOn)
				{
					$(this).closest('.chkList').find('.agreeAll').find('input').prop('checked',false);
					$(this).closest('.chkList').find('.agreeAll').removeClass('on');
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

	$(document).on('click', '.btnToolTip', function(){
		if ( $(this).hasClass('on') )
		{
			$('.toolTip').css('z-index','2');
			$('.btnToolTip').attr('title','축소됨');
			$('.btnToolTip').removeClass('on');
		} else {
			$('.toolTip').css('z-index','2');
			$(this).closest('.toolTip').css('z-index','3');
			$('.btnToolTip').removeClass('on');
			$('.btnToolTip').attr('title','축소됨');
			$(this).attr('title','확장됨');
			$(this).addClass('on');
			$(this).next('.toolTipContent').find('.btnToolTipClose').focus();
		}
	});

	$(document).on('click', '.btnToolTipClose', function(){
		$('.toolTip').css('z-index','2');
		$('.btnToolTip').removeClass('on');
		$(this).closest('.toolTip').find('.btnToolTip').focus().attr('title','축소됨');
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
	
//script ready
});

// Location fix
$(window).on('load', function(){
	if ($('.locationWrap').length > 0)
	{
		locationOffset = $('.locationWrap').offset();
		locationHehight = $('.locationWrap').outerHeight();
		$(window).scroll(function(){
			winTop = $(window).scrollTop();
			if ( winTop > locationOffset.top)
			{
				$('.locationWrap').addClass('fix');
				$('#container').css('padding-top',(locationHehight + 74));
			} else {
				$('.locationWrap').removeClass('fix');
				$('#container').css('padding-top','74px');
			}
		});
	}
});
// functions

function homeLocation() {
	$('.locationNav a').on('mouseenter focus', function(){
		$(this).parents('li').addClass('open');
	});
		
	$('.locationNav > li').on('mouseleave', function(){
		$(this).removeClass('open');
	});

	$('.locationNav > li').each(function(){
		$('a:first, a:last', this).on('blur', function(){
			$(this).parents('li').removeClass('open');
		});
	});
}

// main lnb functions
var mainLnbClick = function(){
	var mainLnbBtn = $('.mainLnbList').find('button');
	$(mainLnbBtn).on('click', function(){
		$('.mainLnbOpen').click();
	});
};
$(document).ready(mainLnbClick);

function mainLnbEvent(e) {
	if ( $(e).hasClass('on') )
	{
		mainLnbClose();
	} else {
		mainLnbOpen();
	}
}

function mainLnbOpen() {
	$('.mainLnbOpen').addClass('on').children('span').text('닫기');
	var mainLnbheight = $('.mainLnb').addClass('on').outerHeight();
	$('.mainLnb').removeClass('on').animate({
		height : ( mainLnbheight == $('.mainLnb') ? 100 : mainLnbheight )
	}, effectTime);
}

function mainLnbClose() {
	$('.mainLnbOpen').removeClass('on').children('span').text('전체보기');
	$('.mainLnb').stop(true, true).animate({
		'height':"359px"
	}, effectTime, function(){
		$('.mainLnb').attr('style','');
	});
}
// main lnb functions


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

// 스크래핑 on off 스크립트
function onoff(e) {
	if ( $(e).hasClass('on') )
	{
		$(e).removeClass('on').find('.blind').text('선택');
	} else {
		$(e).addClass('on').siblings().removeClass('on').find('.blind').text('선택');;
		$(e).find('.blind').text('선택 해제');
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
}

// 숫자 한글 표기
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
		$(event).closest('td').find('.blTxt4').remove();

	} else {
		$(event).closest('td').find('.blTxt4').remove();
		$(event).closest('td').append(caution1);
	}

	// 한도 체크
	if (vRe > Max)
	{
		$(event).closest('td').find('.blTxt4').remove();
		$(event).closest('td').append(caution2);
	} else if (vRe < Min)
	{
		$(event).closest('td').find('.blTxt4').remove();
		$(event).closest('td').append(caution3);
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
		$('[data-popup="'+ targeted_pop_class +'"]').fadeIn(350);
		e.preventDefault();
	});
	//------CLOSE
	$('[data-popup-close]').on('click',function(e){
		var targeted_pop_class = $(this).attr('data-popup-close');
		$('[data-popup="'+ targeted_pop_class +'"]').fadeOut(350);
		e.preventDefault();
	});
});


function layerPopOut(e) {
	$(e).closest('.popUp').fadeOut(350);
}

// 채무조정 확인서 확인 버튼
function txtBtn(e) {
	$(e).hide();
	$(e).next('.value').addClass('on');;
}

// 쿠키 functions
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
// 쿠키 functions

// 변제 계획안 전체 선택
function chkLineAll(e) {
	if ( $(e).is(':checked') ) {
		$(e).next('label').text('전체해제');
		$('.viewChkList').find('input').prop('checked',true);
		$('.lineWrap').css('display','block');
		$('.planList').css('display','block').children('li').css('display','block');
		for (var i = 0; i < 4 ;i++ )
		{
			lines = 'line' + (i + 1);
			$('.lineWrap').find('[data-line="'+ lines +'"]').css('display','table-cell');
		}
	} else {
		$(e).next('label').text('전체선택');
		$('.viewChkList').find('input').prop('checked',false);
		$('.lineWrap').css('display','none');
		$('.planList').css('display','none').children('li').css('display','none');
		for (var i = 0; i < 4 ;i++ )
		{
			lines = 'line' + (i + 1);
			$('.lineWrap').find('[data-line="'+ lines +'"]').css('display','none');
		}
	}
}

// 변제 계획안 개별 선택
function chkLine(e) {
	if ( $(e).is(':checked') ) {
		line = $(e).data('line');
		if ( $('.lineWrap').css('display') == 'none' )
		{
			$('.lineWrap').css('display','block');
			for (var i = 0; i < 4 ;i++ )
			{
				lines = 'line' + (i + 1);
				$('.lineWrap').find('[data-line="'+ lines +'"]').css('display','none');
			}
			$('.lineWrap').find('[data-line="'+ line +'"]').css('display','table-cell');
			$('.planList').css('display','block').children('li').css('display','none');
			$('.planList').find('[data-text="'+ line +'"]').css('display','block')

		} else {
			$('.lineWrap').find('[data-line="'+ line +'"]').css('display','table-cell');
			$('.planList').find('[data-text="'+ line +'"]').css('display','block')
		}

		// 체크박스 체크 상태 확인
		checkboxLng = $('.viewChkList').find('input:checkbox').length;
		checkedLng = $('.viewChkList').find('input:checkbox:checked').length;
		if (checkedLng == checkboxLng)
		{
			$('#viewTblAll').prop('checked',true).next('label').text('전체해제');
		}
	} else {
		line = $(e).data('line');
		$('.lineWrap').find('[data-line="'+ line +'"]').css('display','none');
		$('.planList').find('[data-text="'+ line +'"]').css('display','none')

		// 체크박스 체크 상태 확인
		checkboxLng = $('.viewChkList').find('input:checkbox').length;
		checkedLng = $('.viewChkList').find('input:checkbox:checked').length;
		if (checkedLng == 0)
		{
			$('.lineWrap').css('display','none');
			$('.planList').css('display','none').children('li').css('display','none');
			for (var i = 0; i < 4 ;i++ )
			{
				lines = 'line' + (i + 1);
				$('.lineWrap').find('[data-line="'+ lines +'"]').css('display','none');
			}
		}
		if (checkedLng != checkboxLng)
		{
			$('#viewTblAll').prop('checked',false).next('label').text('전체선택');
		}
	}
}

// 서민 금융 상품
function itemcalc(e) {
	if ( $(e).is(':checked') ) {
		$(e).closest('.itemCalc').addClass('on');
		$(e).closest('.itemCalc').find('.activeLabel').find('.blind').text(' 신청 비활성화');
	} else {
		$(e).closest('.itemCalc').removeClass('on');
		$(e).closest('.itemCalc').find('.activeLabel').find('.blind').text(' 신청 활성화');
	}
}


// Spinner 
function Spin() {
	var Dimmed = '<div class="dimmed on loaderdimmed"></div>';
	var Loader = '<div id="loader"></div>';
	$(Dimmed).insertBefore('#footer');
	$(Loader).insertBefore('#footer');
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

// tab
$(function(){
	$('#tabMenu').each(function(){
		var $active, $content, $links = $(this).find('a');
		var $first = $('#tabMenu li:first a').attr('href');
		$active = $($links.filter('[href="'+$first+'"]'));
		$active.parent().addClass('on');
		$content = $($active.attr('href'));
		$content.show();
	});

	$('#tabMenu li').click(function(){
		$('#tabMenu li').removeClass('on');
		$(this).addClass('on');
		$('.tabCon').hide();
		var selected_tab = $(this).find('a').attr('href');
		var starting = selected_tab.indexOf('#');
		var sub = selected_tab.substring(starting);
		$(sub).fadeIn();
		return false;
	});
});

//input file
$(function(){
	var $fileBox = null;
	$(function(){
		init();
	});
	function init(){
		$fileBox = $('.inpFile');
		fileLoad();
	}
	function fileLoad(){
		$.each($fileBox, function(idx){
			var $this = $fileBox.eq(idx),
			$btnUpload = $this.find('[type="file"]'),
			$label = $this.find('.file-label');
			$btnUpload.on('change', function(){
				var $target = $(this),
				fileName = $target.val();
				$fileText = $target.siblings('.file-name');
				$fileText.val(fileName);
			});
			$btnUpload.on('focusin focusout', function(e){
				e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus');
			});
		});
	}
});

// Q&A 자주하는 질문
function qnaClick(e) {
	if ($(e).parent().next('dd').css('display') == 'none'){
		$('.qnaList dd').slideUp(300);
		$('.qnaList dt').removeClass('on');
		$(e).parent().next('dd').slideDown(500);
		$(e).parent().addClass('on');
	}else{
		$(e).parent().next('dd').slideUp(300);
		$(e).parent().removeClass('on');
	}
}

$(window).on('load', function(){
	$('.termsList, .termsListTwo').not('.single').find('.trems').each(function(i){
		$(this).removeClass('exception').closest('dd').show();
		if ( $(this).closest('li').find('.termsLabel').hasClass('exception') )
		{
			$(this).addClass('exception maxheight');
		}
		objHeight = $(this).find('.inner').outerHeight();
		$(this).closest('dd').hide();
		if ( objHeight <= 312)
		{
			$(this).addClass('exception');
		}
	});
});