var contextPath = "";
var menuTree="";
var menuTitle="";

//SNS 공유
function sendSns(sns, url, txt)
{
    var o;
    var _url = encodeURIComponent(url);
    var _txt = encodeURIComponent(txt);
    var _br  = encodeURIComponent('\r\n');

    switch(sns)
    {
        case 'facebook':
            o = {
                method:'popup',
                url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
            };
            break;

        case 'twitter':
            o = {
                method:'popup',
                url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
            };
            break;
            /*
        case 'me2day':
            o = {
                method:'popup',
                url:'http://me2day.net/posts/new?new_post[body]=' + _txt + _br + _url + '&new_post[tags]=epiloum'
            };
            break;

        case 'kakaotalk':
            o = {
                method:'web2app',
                param:'sendurl?msg=' + _txt + '&url=' + _url + '&type=link&apiver=2.0.1&appver=2.0&appid=dev.epiloum.net&appname=' + encodeURIComponent('Epiloum 개발노트'),
                a_store:'itms-apps://itunes.apple.com/app/id362057947?mt=8',
                g_store:'market://details?id=com.kakao.talk',
                a_proto:'kakaolink://',
                g_proto:'scheme=kakaolink;package=com.kakao.talk'
            };
            break;

        case 'kakaostory':
            o = {
                method:'web2app',
                param:'posting?post=' + _txt + _br + _url + '&apiver=1.0&appver=2.0&appid=dev.epiloum.net&appname=' + encodeURIComponent('Epiloum 개발노트'),
                a_store:'itms-apps://itunes.apple.com/app/id486244601?mt=8',
                g_store:'market://details?id=com.kakao.story',
                a_proto:'storylink://',
                g_proto:'scheme=kakaolink;package=com.kakao.story'
            };
            break;

        case 'band':
            o = {
                method:'web2app',
                param:'create/post?text=' + _txt + _br + _url,
                a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
                g_store:'market://details?id=com.nhn.android.band',
                a_proto:'bandapp://',
                g_proto:'scheme=bandapp;package=com.nhn.android.band'
            };
            break;
            */
        default:
            alert('지원하지 않는 SNS입니다.');
            return false;
    }

    window.open(o.url);

    /*
    switch(o.method)
    {
        case 'popup':
            window.open(o.url);
            break;

        case 'web2app':
            if(navigator.userAgent.match(/android/i))
            {
                // Android
                setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
            }
            else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i))
            {
                // Apple
                setTimeout(function(){ location.href = o.a_store; }, 200);
                setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
            }
            else
            {
                alert('이 기능은 모바일에서만 사용할 수 있습니다.');
            }
            break;
    }
    */
}


//코드 팝업
function fn_codeList(num){
	//window.open(contextPath+"/Pop/codePop.do?num="+num, "codePopup","top=100, left="+200+", width="+950+", height="+450+", toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0");
}

//주소 팝업(리턴 받을 우편번호ID, 주소ID)
function fn_juSoPopup(reZip, reAddr){
	//window.open(contextPath+"/sbmsPop/jusoPop.do?reZip="+reZip+"&reAddr="+reAddr, "juSoPopup", "top=100, left="+200+", width="+920+", height="+700+", toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0");
}

//공백일 경우
function fn_empty(id, content){
	fn_replaceSpace(id);
	if($(id).val() == "" || typeof($(id).val()) == "undefined"){//공백여부
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//앞뒤공백제거
function fn_replaceSpace(id){
	if($(id).length > 0){
		$(id).val($(id).val().replace(/(^\s*)|(\s*$)/g,""));//앞뒤 공백제거
	}
}

//특수문자제거
function fn_replaceSpecialChar(id){
	if($(id).length > 0){
		$(id).val($(id).val().replace(/[~#$^&*\=+|:;?"<>']/gi,""));		//특수문자제거
		$(id).val($(id).val().replace("\\",""));						//원표시 삭제
		$(id).val($(id).val().replace("replace",""));					//replace
		$(id).val($(id).val().replace("iframe",""));					//iframe
		$(id).val($(id).val().replace("script",""));					//script
	}
}

//앞뒤공백, 특수문자 동시제거
function fn_replace(id){
	//try{
	if($(id).val() != null && $(id).val() != ""){
		$(id).val($(id).val().replace(/(^\s*)|(\s*$)/g,""));			//앞뒤 공백제거
		$(id).val($(id).val().replace(/[~#$^&*=+|:;?"<>']/gi,""));		//특수문자제거
		$(id).val($(id).val().replace("replace",""));					//replace
		$(id).val($(id).val().replace("\\",""));						//원표시 삭제
		$(id).val($(id).val().replace("iframe",""));					//iframe
		$(id).val($(id).val().replace("script",""));					//script
	}
	//}catch(Exception){

	//}
}

//XSS 방어
function fn_defenseXSS(id){
	$(id).val( $.trim($(id).val()) );	//trim

	if($(id).val() != null && $(id).val() != ""){
		$(id).val($(id).val().replace(/[~#$^&*=+|:;?"<>']/gi,""));		//특수문자제거
		$(id).val($(id).val().replace("replace",""));					//replace
		$(id).val($(id).val().replace("\\",""));						//원표시 삭제
	}
}


//달력 정규식 체크
function fn_calendar(id, content){
//	var reg = /^(19[0-9][0-9]|20[0-2][0-9]|203[0-7])(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
	var minYear = '1900';		//최소년도
	var maxYear = '2100';		//최대년도

	if(!fn_isDate($(id).val(), minYear, maxYear)){
		$(id).focus();
		alert(content);
	    return false;
	}else{
		return true;
	}
}

//날짜 유효성 체크
function fn_isDate(dateStr, minYear, maxYear) {
	var reg = /^([0-9]{8})$/;		//숫자 8자리 체크

	if(reg.test(dateStr) == false){
		return false;
	}

	var year = Number(dateStr.substr(0, 4));
	var month = Number(dateStr.substr(4, 2));
	var day = Number(dateStr.substr(6, 2));

	if(year < minYear || year > maxYear){
		return false;
	}

	if(month < 1 || month > 12){
		return false;
	}

	if(day < 1 || day > 31){
		return false;
	}

	if((month == 4 || month == 6 || month == 9 || month == 11) && day == 31){
		return false;
	}

	if(month == 2){
		var isLeap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));

		if(day > 29 || (day == 29 && !isLeap)){
			return false;
		}
	}

	return true;
}

//날짜 유효성 체크(주민등록번호 형식)
function fn_isDateSix(dateStr, minYear, maxYear) {
	var reg = /^([0-9]{6})$/;		//숫자 8자리 체크

	if(reg.test(dateStr) == false){
		return false;
	}

	var year = Number(dateStr.substr(0, 2));
	var month = Number(dateStr.substr(2, 2));
	var day = Number(dateStr.substr(4, 2));

	if(year < minYear || year > maxYear){
		return false;
	}

	if(month < 1 || month > 12){
		return false;
	}

	if(day < 1 || day > 31){
		return false;
	}

	if((month == 4 || month == 6 || month == 9 || month == 11) && day == 31){
		return false;
	}

	if(month == 2){
		var isLeap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));

		if(day > 29 || (day == 29 && !isLeap)){
			return false;
		}
	}

	return true;
}

//달력 정규식 체크(월)
function fn_calendar_yyyymm(id, content){
	var reg = /^[12][0-9]{3}(0[1-9]|1[0-2])$/;

	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
	    return false;
	}else{
		return true;
	}
}


//한글로만(띄어쓰기 불가능)
function fn_hangl(id, content){
	var reg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣+]*$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//한글로만(띄어쓰기 가능)
function fn_hanglSpace(id, content){
	var reg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣+]*$/;
	if(reg.test($(id).val().replace(/(\s*)/g,"")) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//한글제외(띄어쓰기 가능)
function fn_hanglNotSpace(id, content){
	var reg = /^[^(ㄱ-ㅎ|ㅏ-ㅣ|가-힣)+]*$/;
	if(reg.test($(id).val().replace(/(\s*)/g,"")) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//숫자로만
function fn_num(id, content){
	var reg = /^[0-9+]*$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//금액만
function fn_cash(id, content){
	var reg = /^[1-9][0-9+]*$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//금액만(0포함)
function fn_cash_zero(id, content){
	var reg = /^[0-9][0-9+]*$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//퍼센트(소수점 두자리)
function fn_percent(id, content){
	var reg = /(^(100)(\.[0]{0,2})?$)|(^([0-9]{1,2})(\.[0-9]{0,2})?$)/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//이메일 정규식
function fn_email(id, content){
	var reg = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//전화번호&핸드폰 정규식
function fn_phonNumer(id, content){
	var reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//핸드폰 정규식(-없을 때)
function fn_phonNumer2(id, content){
	var reg = /^(01[016789]{1}[0-9]{7,8})$/;
	if(reg.test($(id).val()) == false) {
		alert(content);
		$(id).focus();
		return false;
	}else{
		return true;
	}
}

//우편번호
function fn_zipCode(id, content){
	var reg = /^[1-9][0-9]{2}-[0-9]{3}$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//영어로만(뛰어쓰기 불가능)
function fn_eng(id, content){
	var reg = /^[A-Za-z+]*$/;
	if(reg.test($(id).val()) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//영어로만(뛰어쓰기 가능)
function fn_engSpace(id, content){
	var reg = /^[A-Za-z+]*$/;
	if(reg.test($(id).val().replace(/(\s*)/g,"")) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}
}

//영어와 숫자로만
function fn_engnum(id, content){
	var reg = /^[A-Za-z0-9+]*$/;
	if(reg.test($(id).val().replace(/(\s*)/g,"")) == false) {
		$(id).focus();
		alert(content);
		return false;
	}else{
		return true;
	}

}

//문자열 제한
//예제:onKeyUp=SUchkLengthObj('10', this) 10자이내로 name의 값을 가져와서 정의한다.
function SUchkLengthObj(maxLen, obj, msg) {
	var str;
	var cntHan;

	if(obj == '[object HTMLInputElement]' || obj == '[object]' || '[object HTMLTextAreaElement]') {
		str = obj.value;
	} else {
		str = obj;
	}

	cntHan = (escape(str) + "%u").match(/%u/g).length - 1;  //문자열내 한글자의 길이

	// match : 해당하는 값을 포함하는 배열을 리턴
	// /g : 전역으로 찾기
	// +"%u" : match함수의 특성상 포함하지 않으면 null을 리턴하므로 "%u"를 더해주고 length-1을 한다

	if(maxLen < (str.length + cntHan)){

		if(msg != '' && typeof(msg) != 'undefined'){
			alert(msg);
		}else{
			alert("총 영문 "+ maxLen+"자, 한글 " + parseInt(maxLen/2) + "자 까지 보내실수 있습니다.");
		}


		// 입력한 값을 maxLen 길이로 자르기
		while(maxLen < str.length + cntHan){

			str = str.substring(0, str.length-1);
			cntHan = (escape(str)+"%u").match(/%u/g).length-1;
		}
		obj.value = str;
		obj.focus();
	}
}

function fn_ckeckSize(id, content){
	var size = 0;
	var str = $(id).val();

	for (var i = 0; i < str.length; i++) {
	    if (escape(str.charAt(i)).length == 6) {
	    	size++;
	    }
	    size++;
	}
	return size;
}


function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++){
	  x.src=x.oSrc;
  }
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function fn_addComma(num) {
	num = String(num).replace(/,/g, '');
	if (num.search(/(\d{4,})(\.\d+)?$/) < 0)
	    return num;

	var n1 = RegExp.$1;
	var n2 = RegExp.$2;
	var arr = new Array();

	while (n1.search(/(.+)(\d{3})$/) == 0) {
	    n1 = RegExp.$1;
	    arr.unshift(RegExp.$2);
	}
	arr.unshift(n1);

	return arr.join(',') + n2;
}

//숫자를 3자리 단위로 콤마를 찍어준다.
function fn_comma(id, value) {
	//만약 값이 0 이라면 기존에 추가한 컬럼의 값을 합계로 더한다.
	if(null!=value){
		$(id).val(addComma(value));
	}
}

//콤마 제거
function fn_replceComma(id, value) {
	if(null!=value){
		var reg = /^[0-9+]*$/;
		if(reg.test(String(value).replace(/,/g, '')) == true) {
			$(id).val(String(value).replace(/,/g, ''));
		}
	}
}


/**
 * 특정 날짜에서 이전,이후 날짜 구하기
 * @param baseDay : 오늘 날짜 '' 값, 특정일자 : YYYYMMDD 형식 날짜
 * @param dDay	  : +,- 일수
 * @return		  : YYYYMMDD 형식 날짜
 */
function fn_getPlusMinusDate(baseDay, dDay) {
	var date = "";
	var month = "";
	if(baseDay != ''){
		date = new Date(baseDay.substr(0,4),parseInt(baseDay.substr(4,2))-1,baseDay.substr(6,2));
		date.setDate(date.getDate()+dDay);
		month = (date.getMonth()+1<10)?"0"+(date.getMonth()+1):date.getMonth()+1;
	}else{
		date = new Date();
		date.setDate(date.getDate()+dDay);
		month = (date.getMonth()+1<10)?"0"+(date.getMonth()+1):date.getMonth()+1;
	}
    var day = (date.getDate()<10)?"0"+date.getDate():date.getDate();
    var returnDay = date.getFullYear()+""+month+""+day;

    return returnDay;
}

/**
 * 기능 단추를 눌렀을 때 로딩 상태 표현
 * @param btn
 * @param disable
 */
function startLoading(btn, disable) {
	$(btn).append('<img src="/img/loadingSmall.gif" style="margin:-3px 0 0 4px"/>').css({cursor: 'wait'});

	if (disable)
		$(btn).attr('disabled', true);
	else {
		$(btn).unbind('click').attr('onclick', function() { return false; });
	}
}

/**
 * startLoading으로 처리한 상태 해제
 * @param btn
 */
function endLoading(btn) {
	$(btn).css({cursor:'', color:''}).attr('disabled', false).find('img').remove();
}

/**
 * 기능 단추를 눌렀을 때 화며 전체에 로딩 상태 표현
 */
function sLoading() {

	var d = document;

	var height = d.body.scrollHeight > d.documentElement.scrollHeight ? d.body.scrollHeight : d.documentElement.scrollHeight;
	//var width = d.body.scrollWidth > d.documentElement.scrollWidth ? d.body.scrollWidth : d.documentElement.scrollWidth;
	$('#divWait').css("height", height);
	$('#divWait').css("display", "block");

	var divWait = document.getElementById("divWait");
	$('#waitImg').css("margin-top", (divWait.offsetHeight/2 - 43*2));
//	$('#waitImg').css("padding-right", "20%");

}

/**
 * sLoading으로 처리한 상태 해제
 */
function sClose() {
	$('#divWait').css("display", "none");
}

/**
 * 로그인이 필요한 팝업창 열기
 * @param a
 * @param width
 * @param height
 * @returns {Boolean}
 */
function openMembershipLink(a, width, height) {
	var href = a.href;

	$.post('/portal/member/memberToken.do', function(data) {
		if (data == null)
			location.href = '로그인 페이지'; // TODO 로그인 페이지 주소로 수정!

		var prefix = href.indexOf('?') > 0 ? '&' : '?';
		var w = window.open(href + prefix + '_memberId=' + data.memberId + '&_token=' + data.token,
				'width=' + width + ',height=' + height + ',resizable=yes');
		if (w == null) {
			alert('팝업 차단을 해제하셔야 팝업 페이지를 열 수 있습니다.');
		}
	}, 'json');

	return false;
}

/**
 * 변수를 입력받아 정의되어 있지 않거나 null 이면 Html 공백문자를 리턴
 * @param val
 * @returns {String}
 */
function nvl(val){

	if(val == '' || val == 'undefined' || typeof val == 'undefined'){
		return '';
	}else{
		return val;
	}
}

/**
 * 변수를 입력받아 정의되어 있지 않거나 null 이면 str문자를 리턴
 * @param val
 * @returns {String}
 */
function nvlToStr(val, str){

	if(val == '' || val == 'undefined' || typeof val == 'undefined'){
		return str;
	}else{
		return val;
	}
}

/**
 * html ID와 data를 입력받아 해당 data에 맞게 html를 변경해준다.
 * @param id
 * @param data
 * @returns {String}
 */
function innerHtmlMaker(id, data){
 	var strReturn = $(id).html().replace(/\{(\w+)\}/g, function($0, $1) {
 		return String(data[$1]) || '';
 	});

 	return strReturn;
}

/**
 * tag split
 */
function fn_tagSplit(str){
	var rtnstr="";

	if(str != ''){
		var strspl = str.split(',');
		for(var i in strspl){
			if(i == 0){
				rtnstr += '<a href="#">'+strspl[i].trim()+'</a>';
			}else{
				rtnstr += ', <a href="#">'+strspl[i].trim()+'</a>';
			}
		}
	}else{
		rtnstr = "등록된 태그정보가 없습니다.";
	}

	return rtnstr;
}

/**
 * Input Element 중 Submit 시에 값을 전송하지 않도록 처리한다.
 * @param formId: Target Form Id
 */
function fn_removeFormInputElementsForId(formId) {
	$('#'+formId+' :input').each(function(){
		if (fn_hasRequiredClassForObject(this) == false) {
			$(this).attr('name', '');
		}
	});
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element에 'required-value' 클래스 추가
 * @param id: Element Id
 */
function fn_addRequiredClassForId(id) {
	fn_addRequiredClassForSelector('#'+id);
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element에 'required-value' 클래스 추가
 * @param selector: Element's jQuery Selector
 */
function fn_addRequiredClassForSelector(selector) {
	fn_addRequiredClassForObject($(selector));
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element에 'required-value' 클래스 추가
 * @param selector: Element's jQuery Object
 */
function fn_addRequiredClassForObject(object) {
	if (fn_hasRequiredClassForObject(object) == false) {
		$(object).addClass('required-value');
	}
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element에서 'required-value' 클래스 제거
 * @param id: Element Id
 */
function fn_removeRequiredClassForId(id) {
	fn_removeRequiredClassForSelector('#'+id);
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element에서 'required-value' 클래스 제거
 * @param selector: Element's jQuery Selector
 */
function fn_removeRequiredClassForSelector(selector) {
	fn_removeRequiredClassForObject($(selector));
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element에서 'required-value' 클래스 제거
 * @param selector: Element's jQuery Object
 */
function fn_removeRequiredClassForObject(object) {
	$(object).removeClass('required-value');
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element 여부
 * @param id: Element Id
 */
function fn_hasRequiredClassForId(id) {
	return fn_hasRequiredClassForSelector('#'+id);
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element 여부
 * @param selector: Element's jQuery Selector
 */
function fn_hasRequiredClassForSelector(selector) {
	return fn_hasRequiredClassForObject($(selector));
}

/**
 * Submit 시에 값을 전송하지 않도록 처리해야하는 Element 여부
 * @param selector: Element's jQuery Object
 */
function fn_hasRequiredClassForObject(object) {
	var hasClass = false;
	hasClass = $(object).hasClass('required-value');
	return hasClass;
}

/**
 * 퓨젼차트 맵 옵션 묶음 객체
 */
fusionchartsMapsData = {
		getDefaultOption : function(){
			return {
				"theme" : "fint",
				"formatNumberScale" : "0",
				"numberSuffix" : "M",
				"showLabels" : "1",
				"baseFont" : "NanumGothic",
				"baseFontSize" : "12",
				"showBorder" : "1",
				"borderThickness" : "1",
				"fillColor" : "#48dad2",
				"entityFillHoverColor" : "#cccccc"
			};
		}
		, getDefaultData : function(){
			return [
				{"id" : "10", "displayValue" : "부산광역시"},
				{"id" : "11", "displayValue" : "서울특별시"},
				{"id" : "12", "displayValue" : "인천광역시"},
				{"id" : "15", "displayValue" : "대구광역시"},
				{"id" : "18", "displayValue" : "광주광역시"},
				{"id" : "19", "displayValue" : "대전광역시"},
				{"id" : "01", "displayValue" : "제주특별자치도"},
				{"id" : "03", "displayValue" : "전라북도"},
				{"id" : "05", "displayValue" : "충청북도"},
				{"id" : "06", "displayValue" : "강원도"},
				{"id" : "13", "displayValue" : "경기도"},
				{"id" : "14", "displayValue" : "경상북도"},
				{"id" : "16", "displayValue" : "전라남도"},
				{"id" : "17", "displayValue" : "충청남도"},
				{"id" : "20", "displayValue" : "경상남도"},
				{"id" : "21", "displayValue" : "울산광역시"}
			];
		}
		, getShortLabelData : function(){
			return [
				{"id" : "10", "displayValue" : "부산"},
				{"id" : "11", "displayValue" : "서울"},
				{"id" : "12", "displayValue" : "인천"},
				{"id" : "15", "displayValue" : "대구"},
				{"id" : "18", "displayValue" : "광주"},
				{"id" : "19", "displayValue" : "대전"},
				{"id" : "01", "displayValue" : "제주"},
				{"id" : "03", "displayValue" : "전북"},
				{"id" : "05", "displayValue" : "충북"},
				{"id" : "06", "displayValue" : "강원"},
				{"id" : "13", "displayValue" : "경기"},
				{"id" : "14", "displayValue" : "경북"},
				{"id" : "16", "displayValue" : "전남"},
				{"id" : "17", "displayValue" : "충남"},
				{"id" : "20", "displayValue" : "경남"},
				{"id" : "21", "displayValue" : "울산"}
			];
		}
		, getnoLabelData : function(){
			return [
				{"id" : "10", "displayValue" : ""},
				{"id" : "11", "displayValue" : ""},
				{"id" : "12", "displayValue" : ""},
				{"id" : "15", "displayValue" : ""},
				{"id" : "18", "displayValue" : ""},
				{"id" : "19", "displayValue" : ""},
				{"id" : "01", "displayValue" : ""},
				{"id" : "03", "displayValue" : ""},
				{"id" : "05", "displayValue" : ""},
				{"id" : "06", "displayValue" : ""},
				{"id" : "13", "displayValue" : ""},
				{"id" : "14", "displayValue" : ""},
				{"id" : "16", "displayValue" : ""},
				{"id" : "17", "displayValue" : ""},
				{"id" : "20", "displayValue" : ""},
				{"id" : "21", "displayValue" : ""}
			];
		}
};

//문자열중 숫자만 반환
function fn_getNumberOnly(num){
    var ret = '';
    num = nvl(num);

    for (var i=0; i<num.length; i++) {
        var c = num.charAt(i);
        if (c >= '0' && c <= '9')  ret += c;
    }
    return  ret;
}

//로딩이벤트 - fancybox 사용
(function($){

	$.loading= function() {
		$('body').prepend('<div class="overlay"></div>');
	};

	$.disable = function() {
		$.fancybox.showLoading();
		$('.overlay').css({'position': 'absolute', 'width': $(document).width(), 'height': $(document).height(), 'background': 'black', 'z-index': 5000}).fadeTo(0, 0.5);
		$('.overlay').show();
	};

	$.enable = function() {
		$.fancybox.hideLoading();
		$('.overlay').hide();
	};
})(jQuery);

//YYYYMMDD 를 YYYY.MM.DD 로 반환
function fn_repalaceDateFormat(dateStr){
	dateStr = nvl(dateStr);

	if(dateStr != '' && dateStr.length == 8){
		return dateStr.substring(0, 4) + '.' + dateStr.substring(4, 6) + '.' + dateStr.substring(6, 8);

	}else{
		return '';
	}
}

// 천단위 콤마 적용
function formatNumber(number) {
	return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,");
}

//
function copyToClipboardWithURL(url) {
   var IE = (document.all) ? true : false;
   if (IE) {
	   window.clipboardData.setData("Text", url);
	   alert("이 글의 주소가 클립보드에 복사되었습니다.");
   }
   else {
	   temp = prompt("Ctrl+C를 눌러 이 글의 주소를 클립보드로 복사하세요.", url);
   }
}


// 비어있는 엘리먼트 제거
function removeEmptyElement(selector) {
	$(selector).each(function(){
		var childHtml = $(this).html();
		if (!childHtml || childHtml == undefined || $.trim(childHtml) == "" || $.trim(childHtml) == '&nbsp;') {
			$(this).remove();
		}
	});
}

//날짜 format YYYYMMDD TO YYYY.MM.DD
function formatDate(date, delimiter){
	if((date = nvl(date)) != '')
		return date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1'+delimiter+'$2'+delimiter+'$3');
	else
		return date;
}

//코덱스 파일 다운로드
function fn_codexFileDonw(contextPath, filePath, fileName, logicFileName, ecm_file_no){
	//var fileDownUrl = '/upload/mig/codex_bak/data/hubweb/portalweb/hubfiles/codex/';
	var fileDownUrl = filePath;
	var form = $('<form/>', {method: 'POST', action: contextPath+'/common/downloadAttchdFile.do'});
	//form.append($('<input/>', {type: 'hidden', name: 'filePath', value: fileDownUrl+filePath}));
	form.append($('<input/>', {type: 'hidden', name: 'filePath', value: fileDownUrl}));
	form.append($('<input/>', {type: 'hidden', name: 'fileName', value: fileName}));
	form.append($('<input/>', {type: 'hidden', name: 'orgFileName', value: encodeURIComponent(logicFileName)}));
	form.append($('<input/>', {type: 'hidden', name: 'ecm_file_no', value: ecm_file_no}));
	$(document.body).append(form);

	form.submit();
}

function fn_codexFileDonwNew(fileName, logicFileName, ecm_file_no){
	var fileDownUrl = '/upload/mig/codex';

	var form = $('<form/>', {method: 'POST', action: '/common/downloadAttchdFile.do'});
	form.append($('<input/>', {type: 'hidden', name: 'filePath', value: fileDownUrl}));
	form.append($('<input/>', {type: 'hidden', name: 'fileName', value: fileName}));
	form.append($('<input/>', {type: 'hidden', name: 'orgFileName', value: encodeURIComponent(logicFileName)}));
	form.append($('<input/>', {type: 'hidden', name: 'ecm_file_no', value: ecm_file_no}));
	$(document.body).append(form);

	form.submit();
}

function fn_codexFileDonwStandard(filePath, fileName, logicFileName, ecm_file_no){
	var form = $('<form/>', {method: 'POST', action: '/common/downloadAttchdFile.do'});
	form.append($('<input/>', {type: 'hidden', name: 'filePath', value: filePath}));
	form.append($('<input/>', {type: 'hidden', name: 'fileName', value: fileName}));
	form.append($('<input/>', {type: 'hidden', name: 'orgFileName', value: encodeURIComponent(logicFileName)}));
	form.append($('<input/>', {type: 'hidden', name: 'ecm_file_no', value: ecm_file_no}));
	$(document.body).append(form);

	form.submit();
}

function fn_codexFileDonwActive(filePath, fileName, logicFileName, ecm_file_no){
	var form = $('<form/>', {method: 'POST', action: '/common/downloadAttchdFile.do'});
	form.append($('<input/>', {type: 'hidden', name: 'filePath', value: filePath}));
	form.append($('<input/>', {type: 'hidden', name: 'fileName', value: fileName}));
	form.append($('<input/>', {type: 'hidden', name: 'orgFileName', value: encodeURIComponent(logicFileName)}));
	form.append($('<input/>', {type: 'hidden', name: 'ecm_file_no', value: ecm_file_no}));
	$(document.body).append(form);

	form.submit();
}

var MobileUA = ( function () {
	var ua = navigator.userAgent.toLowerCase();
	var mua = {
			IOS: /ipod|iphone|ipad/.test(ua),                                //iOS
			IPHONE: /iphone/.test(ua),                                        //iPhone
			IPAD: /ipad/.test(ua),                                            //iPad
			ANDROID: /android/.test(ua),                                    //Android Device
			WINDOWS: /windows/.test(ua),                                    //Windows Device
			TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),    //Touch Device
			MOBILE: /mobile/.test(ua),                                        //Mobile Device (iPad 포함)
			IE: /msie/.test(ua),
			AND_4_1: /android 4.1/.test(ua),
			ANDROID_TABLET: false,                                            //Android Tablet
			WINDOWS_TABLET: false,                                            //Windows Tablet
			TABLET: false,                                                    //Tablet (iPad, Android, Windows)
			SMART_PHONE: false                                                //Smart Phone (iPhone, Android)
	};

	mua.ANDROID_IE = mua.AND_4_1 || mua.IE;
	mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
	mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
	mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
	mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;
	mua.TABLET_PHONE = mua.MOBILE || mua.TABLET;

	return mua;
}());




$(document).ready(function(){

	$('#wrap').append('<span class="line_top"></span>');
 	// header 스크롤
	var HEADER = (function(){
		var $target = $('.area_header'),
			$easing1 = 'easeOutQuad',
			$easing2 = 'easeInQuad',
			$topBtn = $('.btn_top_1 a'),
			$top,
			$hei = $( window ).height(),
			$winWidth = $( window ).width(),
			$footer = $('.area_footer').height(),
			$max = $('#wrap').height();
		if ($winWidth > 1019 ){
			if (MobileUA.TABLET) {
				var $mLeft = $winWidth / 2 - 44;
				$topBtn.css({ top : $hei - 70 , marginLeft : $mLeft });
			} else {
				$topBtn.css({ top : $hei - 70 });
			}
		} else {
			$topBtn.css({ top : 'auto' });
		}
		$( window ).bind('scroll',function(){
			$top = $( window ).scrollTop(),
			$hei = $( window ).height() + $top - 70,
			$winWidth = $( window ).width();
			if ( $top != 0 ){
				$topBtn.css('display','block');
			} else {
				$topBtn.css('display','none');
			}
			if ($winWidth > 1019 ){
				if ($hei > $max && !$('.ul_pr_history_1').length) {
					$hei = $max - 70;
				}
				$topBtn.stop().animate({ top : $hei });
			}
			if ( $winWidth > 560 ){
				if ( $top > 5 ) {
					$target.stop().animate({ top : '0' },300,$easing2);
				} else {
					$target.stop().animate({ top : '0' },300,$easing1);
				}
			};
		});
		$topBtn.bind('click',function(){
			$('body, html').animate({ scrollTop : 0 });
			return false;
		});
	}());
	// gnb
	var GNB = (function(){
		var $winWidth = $( window ).width(),
			$target = $('#ul_gnb_1 li'),
			$link = $('#ul_gnb_1 > li > a'),
			$bg = $('.bg_header_1'),
			$snb = $('.box_gnb_1'),
			$array = [],
			$flag = false,
			$easing1 = 'easeOutQuad',
			$easing2 = 'easeInQuad';
			// tbl용 변수
		var $window = $( window ).width(),
			$tblTemp = 'off';
		// gnb 높이값 설정
		gnbHeight()
		function gnbHeight(){
			$array = [];
			$bg.removeClass('on').css('height','0');
			$snb.each(function(){
				var $this = $(this);
				$winWidth = $( window ).width();
				if ( $winWidth > 801 ){
				$this.css({visibility : 'hidden' , maxHeight :  'none' }); //180524
				$array.push($this.height());
				$this.css({visibility : 'visible' , maxHeight :  '0' });
			} else if ( $winWidth <= 1019 ){
				$array.push($this.height());
				$this.css({visibility : 'visible' , minHeight :  'auto' });
			}
			});
		}
		// 웹용 gnb
		$(document).on('mouseenter focus','#ul_gnb_1:not(.ul_gnb_mo_1) > li > a',viewMenu);
		$(document).on('mouseleave blur','#ul_gnb_1:not(.ul_gnb_mo_1) > li > a',hideMenu);
		$(document).on('mouseover focus','.box_gnb_1:not(.ul_gnb_mo_2)',viewMenu1);
		$(document).on('mouseover focus','.bg_header_1:not(.ul_gnb_mo_2)',viewMenu1);/* 20190326_배경영역오버시에도서브메뉴보이도록추가 */
		$(document).on('mouseout blur','.box_gnb_1:not(.ul_gnb_mo_2)',hideMenu);
		$(document).on('mouseout blur','.bg_header_1:not(.ul_gnb_mo_2)',hideMenu);/* 20190326_배경영역아웃시에도서브메뉴사라지도록추가 */
		$('.btn_gnb_close a').bind('click',function(){
			hideMenu();
		});
		function viewMenu(){
			var $this = $(this),
				$target = $this.parent(),
				$all_target = $('#ul_gnb_1 > li'),
				$all_box = $('.box_gnb_1'),
				$index = $target.index(),
				$box = $this.next('.box_gnb_1');
			boxHeight($index);
			$all_target.removeClass('on');
			$target.addClass('on');
			$bg.addClass('on').stop().animate({ height : $array[$index]},300,$easing1);
			flag = false;
		};
		function hideMenu(){
			flag = true;
			setTimeout(check,100);
		};
		function viewMenu1(){
			flag = false;
			setTimeout(check,100);
		};
		function check(){
			if (flag){
				$snb.stop().animate({ maxHeight : 0},300,$easing2);
				$bg.stop().removeClass('on').animate({ height : 0 },300,$easing2);
				$target.removeClass('on');
			}
		}
		function boxHeight(idx){
			 var $this = $('#ul_gnb_1 > li'),
				$target = $this.find('.box_gnb_1');
			$target.stop().css('maxHeight','0');
			$this.eq(idx).find('.box_gnb_1').stop().animate({ maxHeight : $array[idx]},300,$easing2);
		}

		
		
		
		// 타블렛 1뎁스 링크 제거
		$(document).on('click','#ul_gnb_1.ul_gnb_ta_1 > li > a',function(){
			return false;
		});
		// 모바일 사이즈 class 추가
		webGnb();
		$( window ).bind('resize',function(e){
			clearTimeout(resizeEvt);
			var resizeEvt = setTimeout(function() {
				$window = $( window ).width();
				webGnb();
				gnbHeight();
				moPazing($window);
		//		startResize($window);
			}, 50);
		});
		

		function webGnb(){
			$winWidth = $( window ).width();
			if ( $winWidth <= 1199 && $winWidth > 1019 ){
				$webGnb.removeClass().addClass('ul_gnb_ta_1');
			} else if ( $winWidth <= 1019 ){
				$webGnb.removeClass('ul_gnb_ta_1').addClass('ul_gnb_mo_1');
				$snb.addClass('ul_gnb_mo_2');
			} else {
				$webGnb.removeClass();
				$webGnb.children('li').removeClass('on');
				$snb.removeClass('ul_gnb_mo_2');
			}
		}
			
		// table type1 일반형태 및 tbody에 th 있는경우
		if ($('.tbl').length){
			startResize($window);
		}
		function startResize(width){
			$window = width;
			if ($window <= 560 ) {
				replaceTd(560);
			} else {
				replaceTd(800);
			}
		}
	}());

	// 즐겨찾기 레이어
	$('.btnBmark > a').on('click', function(){
		if($(this).hasClass('btnClose')){
			$(this).removeClass('btnClose');
			$('.btnBmark .layerBmark').stop().slideUp('fast');
		} else {
			$(this).addClass('btnClose');
			$('.btnBmark .layerBmark').stop().slideDown('fast');
		}
	});
	$('.btnBmark a.btnClose2').click(function(){
		$('.btnBmark .layerBmark').stop().slideUp('fast');
		$('.btnBmark > a.btnClose').removeClass('btnClose');
	});

	// 즐겨찾기 탭
	var tbmenu = "rice";
	$('#'+tbmenu).addClass('on');

	$('.t1').show();
	$('#top5_m .t1_m').show();

	$('#tabs li a').on('click',function(){
	 // alert('');
		index = $(this).parent().index() + 1;
		$('#tabs li a').removeClass('active')
		$('.tabscontents').hide();
		$('.t'+ index).fadeIn();
		$(this).addClass('active');
	});

	$('#tabs_m li a').on('click',function(){
		 // alert('');
		index = $(this).parent().index() + 1;
		$('#tabs_m li a').removeClass('active')
		$('#top5_m .tabscontents_m').hide();
		$('#top5_m .t'+ index+'_m').fadeIn();
		$(this).addClass('active');
	});

	$(".relate-site .title").on("click",function(){
		event.preventDefault();
		$(this).parent().toggleClass("active");
	});

});

function fn_skip(){
	return;
}

//gnb
function gnbJs(){
	var $dep1 = $('#gnbMenu .dep1');
	var $dep2 = $('#gnbMenu .dep2');
	var $hasChild = $('#gnbMenu .dep2 .col > li > a');
	var $dep3 = $('#gnbMenu .dep3');

	$dep1.click(function(){
		$dep1.not($(this)).removeClass('on');
		$dep1.parent().not($(this).parent()).removeClass('sub-over');
		$dep1.siblings('.gnb_close').hide();
		$dep2.not($(this).parent().find('.dep2')).fadeOut('fast');

		if(!$dep1.hasClass('on')){
			$(this).addClass('on');
			$(this).parent().addClass('sub-over');
			$(this).siblings('.gnb_close').show();
			slideDown = setTimeout(function() {
				$('.sub-over').find('.dep2').fadeIn('fast');
			}, 100);

			$('.gnb_bg').stop().animate({"height":$(this).next().height()+25},{ duration:300, easing:"easeOutExpo" });
			$('.gnb_bg').addClass('over');
			return false;

		} else {
			$(this).removeClass('on');
			$(this).parent().removeClass('sub-over');
			$('.gnb_close').hide();
			$dep2.fadeOut('fast');

			slideUp = setTimeout(function() {
				$('.gnb_bg').stop().animate({"height":"0"},{ duration:300, easing:"easeOutExpo" });
				$('.gnb_bg').removeClass('over');
			}, 100);
			return false;

		}
	});

	$('.gnb_close').click(function(){
		$(this).hide();
		$(this).siblings('.dep1').attr('tabindex', 0).focus();
		$('#gnbMenu .dep1').removeClass('on');
		$dep2.fadeOut('fast');
		slideUp = setTimeout(function() {
			$('.gnb_bg').stop().animate({"height":"0"},{ duration:300, easing:"easeOutExpo" });
			$('.gnb_bg').removeClass('over');
		}, 100);
		return false;
	});

	$hasChild.bind("mouseover focusin", function () {
		$dep3.hide();
		$hasChild.removeClass('select');
		if($(this).hasClass('has_child')){

			$(this).parent().find('.dep3').show();
			$(this).addClass('select');
		} else{
			//$dep3.hide();
			$dep3.show();
			$hasChild.removeClass('select');
		}
	});
	
	function gnbReset(){
		slideUp = setTimeout(function() {
			$('.gnb_bg').stop().animate({"height":"0"},{ duration:200, easing:"easeOutExpo" });//181205
			$('.gnb_bg').removeClass('over');
		}, 100);
		$dep1.removeClass('on');
		$dep1.parent().removeClass('sub-over');
		$dep2.fadeOut('fast');
	}

	$("#header .cola, #dBody, #dMBody, footer, .allMenu_ui, .totalSearch_ui, .totalSearch_ui .btn_search, .mainSlider_ui").click(function(){
		if($dep2.is(':visible')){
			gnbReset();
		}
	});
	
	/*메뉴 영역외 클릭시 닫힘*/
	$('body').click(function(e){
		
		var container = $('#gnbMenu, .gnb_bg');
		if(!container.is(e.target) && container.has(e.target).length === 0){
			gnbReset();
			$('.gnb_close').hide();
		}
	});
}


$(function(){
	gnbJs();

});

function hisoffSetCookie(){
	var cName = "hisoffCookieTerm";
	var cTerm = $("#hisoff").val();
	var cValue = cTerm;
	var cDay = 1;
	var eDate = 1;
	var start = document.cookie.indexOf(cName);
	
	if(cValue == "기능끄기"){
		cValue = "기능켜기";
	}else{
		cValue = "기능끄기";
	}
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + "=" + escape(cValue) + "; path=/";		// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	
	if(typeof cDay != "undefined"){
		cookies += ";expires=" + expire.toGMTString() + ";";
	}
	document.cookie = cookies;
	
	if(hisoffGetCookie("hisoffCookieTerm").length != 0){
		var cookie = hisoffGetCookie("hisoffCookieTerm");
		if(cookie == "기능끄기"){
			$("#hisoff").text(cookie);
			$(".search_latest .search_ls_alert").hide();
			$(".search_latest #mykeyword").show();
		}else{
			$("#hisoff").text(cookie);
			$(".search_latest #mykeyword").hide();
			$(".search_latest .search_ls_alert").show();
		}
		$("#hisoff").val(cookie);
	}else{
		$("#hisoff").text('기능켜기');
		$("#hisoff").val('기능켜기')
		$("#mykeyword").hide();
		$(".search_ls_alert").show();
	}
}

function hisoffGetCookie(cName){
	cName = cName + "=";
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = "";
	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(";" , start);
		if(end == -1){
			end = cookieData.length;
		}
		cValue = cookieData.substring(start , end);
	}
//	alert("unescape(cValue) : " + unescape(cValue));
	return unescape(cValue);
}


//setCookie 설정
function setSearchCookie(keyword){

	var cName = "cookieTerm";
	var cTerm = keyword;
	var cValue = cTerm;
	var cDay = 1;
	var eDate = 1;
	var start = document.cookie.indexOf(cName);
	
	if(start != -1){
		var tempArray = getSearchCookie("cookieTerm").split(",");
		for(var i in tempArray){
			if(i == 9){
				break;
			}
			if(tempArray[i] == cTerm){
				return;
			}
			if(tempArray[i] != ""){
				cValue = cValue + "," + tempArray[i];
			}
		}
	}
	
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + "=" + escape(cValue) + "; path=/";		// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	
	if(typeof cDay != "undefined"){
		cookies += ";expires=" + expire.toGMTString() + ";";
	}
	document.cookie = cookies;
}
//getCookie 설정
function getSearchCookie(cName){
//	alert("cName : " + cName);
	cName = cName + "=";
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = "";
	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(";" , start);
		if(end == -1){
			end = cookieData.length;
		}
		cValue = cookieData.substring(start , end);
	}
	return unescape(cValue);
} 

//cookieView 설정
function SearchCookieView(){
	// 켜기를 클릭 하면 기능끄기를 쿠키에 저장
	if(hisoffGetCookie("hisoffCookieTerm").length != 0){
		var cookie = hisoffGetCookie("hisoffCookieTerm");
		if(cookie == "기능끄기"){
			$("#hisoff").text(cookie);
			$(".search_latest .search_ls_alert").hide();
			$(".search_latest #mykeyword").show();
		}else{
			$("#hisoff").text(cookie);
			$(".search_latest #mykeyword").hide();
			$(".search_latest .search_ls_alert").show();
		}
		$("#hisoff").val(cookie);
	}else{
		$("#hisoff").text('기능켜기');
		$("#hisoff").val('기능켜기')
		$("#mykeyword").hide();
		$(".search_ls_alert").show();
	}
	
	if(getSearchCookie("cookieTerm").length != 0){
		var cookie ="";
		var tempArray = getSearchCookie("cookieTerm").split(",");
		$("#resent_search > ul").html("");
		$("#mykeyword > ul").html("");
		for(var i in tempArray){
			if(tempArray[i].length > 19){
				var tempString = tempArray[i].substring(0,19) + "...";
				cookie = '<li><a href="#;return" false;" onclick="termClick(\''+tempArray[i]+'\'); return false;">'+tempString+'</a><a href="#" onclick="oneCookieDelete(\''+i+'\');return false;" class="del_btn"><span>삭제</span></a></li>'
			}else{
				cookie = '<li><a href="#;return" false;" onclick="termClick(\''+tempArray[i]+'\'); return false;">'+tempArray[i]+'</a><a href="#" onclick="oneCookieDelete(\''+i+'\');return false;" class="del_btn"><span>삭제</span></a></li>'
			}
			$(cookie).appendTo("#resent_search > ul");
			$(cookie).appendTo("#mykeyword > ul");
//			$("#hisoff").val(tempArray[0]);
		}
	}else{
		$("#resent_search > ul").html("");
		$("#mykeyword > ul").html("");
	}
}
//전체 쿠키 삭제
function cookieDelete(){
	var cName = "cookieTerm";
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() -1);
	document.cookie = cName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
	SearchCookieView();
}

//선택 쿠키 삭제
function oneCookieDelete(cNum){
	var cName = "cookieTerm";
	var eDate = 1;
	var start = document.cookie.indexOf(cName);
	var cValue = "";
	if(start != -1){
		var tempArray = getSearchCookie(cName).split(",");
		for(var i in tempArray){
			if (i != cNum){
				cValue = cValue + tempArray[i] + ",";
			}
		}
	}
	cValue = cValue.substring(0,cValue.length-1);
	var expire = new Date();
	expire.setDate(expire.getDate() + 1);
	cookies = cName + "=" + escape(cValue) + "; path=/";
	if(typeof cDay != "undefined"){
		cookies += ";expires=" + expire.toGMTString() + ";";
	}
		document.cookie = cookies;
		SearchCookieView();
} 





//modal
jQuery(function($){
	var modalNum = 1;
	function modalClose($modal){
		$modal.css('display','none');

		$jumpTarget = $('.'+$modal.data('prevarea'));
		$jumpTarget.focus();
	}

	$('*[jq-action=modal], *[data-jq=modal]').click(function(e){		
		e.preventDefault();
		var $tobj;
		var $prevpos = $(this); //클릭한 위치 기억
		if($(this).attr('href')) $tobj = $($(this).attr('href'));

		//클릭위치 기억
		var modalPrevCheck = 'modal_prevchk'+modalNum;
		$prevpos.addClass(modalPrevCheck);

		$tobj.attr('tabindex','0');
		$tobj.data('prevarea',modalPrevCheck);

		if(!$tobj){
			$tobj = $($(this).data('target'));
		}
		$tobj.css('display','block');
		$tobj.focus();
	});

	$('.lay_modal').click(function(){
			modalClose($(this));
	});

	$('.lay_modal_container').click(function(e){
		e.stopPropagation();
	});

	$('.lay_modal_close').click(function(e){
		e.preventDefault();
		modalClose($(this).closest('.lay_modal'));
	});

	$('.lay_modal_close').focus(function(){
		$(".lay_modal_container").append("<a href='javascript:void(0);' class='linkAppend'></a>");
		$(".linkAppend").focus(function(){
			$(".lay_modal_container").attr("tabindex", 0).focus();
			$(".linkAppend").remove();
		});
	});



	// $(document).keyup(function(e) {
	// 	if (e.keyCode == 27) modalClose($(this).closest('.lay_modal'));
	// });
	//modalClose()
});

//화면 확대 축소 기능

var nowZoom = 100;

function zoomOut(){ //화면크기축소
	nowZoom = nowZoom - 10;

	if(nowZoom <= 70) nowZoom = 70; //화면크기 최대 축소율 70%
	zooms();
}

function zoomIn(){ //화면크기확대
	nowZoom = nowZoom + 20;

	if(nowZoom >=200) nowZoom = 200; //화면크기 최대 확대율 200%
	zooms();
}


function zoomReset(){	//원래 화면크기로 되돌아가기
	nowZoom = 100;
	zooms();
}


function zooms(){
	document.body.style.zoom = nowZoom + '%';

	if(nowZoom == 70){
		alert ("더 이상 축소할 수 없습니다."); //화면 축소율이 70% 이하일 경우 경고창
	}

	if(nowZoom == 200){
		alert ("더 이상 확대할 수 없습니다."); //화면 확대율이 200% 이상일 경우 경고창
	}
}

$(document).ready(function() {
	$('.health .btn-toggle').click(function() {
		if ($(this).parent().next().css('display') == "none") {
			$('.btn-toggle').removeClass("active");
			$('.btn-toggle').parent().next().hide();
			$(this).parent().next().show();
			$(this).addClass("active");
			$(this).text("닫기");
		} else {
			$(this).parent().next().hide();
			$(this).text("열기");
		}
	});

	$('.ox-text-type-01').click(function() {
		$('.ox-text-type-01').next().hide();
		$(this).next().show();
	});
});

