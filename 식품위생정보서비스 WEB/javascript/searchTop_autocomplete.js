
	//설정값
	var dq_searchForm = document.baseForm;
	var dq_searchTextbox = dq_searchForm.searchTopTerm;
	var dq_resultDivID = "autoTop_complete";               //자동완성레이어 ID
	var dq_resultDivID2 = "vizCloud";               //자동완성레이어 ID
	var dq_hStartTag = "<span class=\"sr_key_point\">";                    //하이라이팅 시작 테그
	var dq_hEndTag = "</span>";                     //하이라이팅 끝 테그
	var dq_bgColor = "#f8f8f8;";                  //선택빽그라운드색
	var dq_intervalTime = 500;                   //자동완성 입력대기 시간
	
	//고정값
	var dq_acResult = new Object();              //결과값
	var dq_acLine = 0;                           //자동완성 키워드 선택  위치(순번)	
	var dq_searchResultList = "";                //자동완성결과리스트	
	var dq_searchResultList_spot = "";           //자동완성결과리스트	
	var dq_searchKeyword = "";	                 //검색어(한영변환안된)
	var dq_ajaxReqObj = "";                      //ajax request object

	var dq_keyStatus = 1;                        //키상태구분값
	var dq_acuse = 1;                            //자동완성사용여부
	var dq_engFlag = 1;                          //자동완성한영변환체크
	var dq_acDisplayFlag = 0;                    //자동완성 display 여부
	var dq_acArrowFlag = 0;                      //마우스이벤트용 flag	
	var dq_acArrowOpenFlag = 0;                  //마우스이벤트용 flag
	var dq_acFormFlag = 0;                       //마우스이벤트용 flag
	var dq_acListFlag = 0;                       //자동완성 레이어 펼쳐진 상태 여부
	var dq_browserType = dqc_getBrowserType();	 //브라우져타입
	var dq_keywordBak = "";                      //키워드빽업
	var dq_keywordOld = "";                      //키워드빽업
	dq_keywordBak = dq_keywordOld = dq_searchTextbox.value;
	//엔터체크
	function dq_handleEnter(event)
	{		
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode; 

		if (keyCode == 13)
		{
			//검색스크립트
			return false;
		}	
		else
		{
			return true;
		}	
	}
	
	//마우스클릭시검색
	function dq_keywordSearch(keyword)
	{
		fn_searchTop();
	}
	
	//입력값 체크 - setTextbox
	function dq_setTextbox(flag, ev) 
	{		

		if($("#btn_auto")!= null && $("#btn_auto")!=undefined)	{
			if($("#btn_auto").is("visible")) {
				$("#btn_auto").hide();
				$("#btn_auto").html("자동완성 펼치기");
			} else {
				$("#btn_auto").show();
				$("#btn_auto").html("");
			}
		}
		
		var _event; 
		var key;
		dq_stateChange();
		switch(dq_browserType)
		{
			case 1 : // IE
				_event = window.event;				
				key = _event.keyCode;
				break;
			case 2 : // Netscape
				key = ev.which;
				break;
			case 3 : // IE8
				_event = window.event;				
				key = _event.keyCode;
				break;
			default :
				key = _event.keyCode;
				break;
		}
		//console.log(dq_browserType + " "  +key);
		if(dq_keyStatus == 1 && flag && key != 13) {
			
			dq_keyStatus = 2;	
		}
	}
		
	//자동완성레이어 상태변경 - wd
	function dq_stateChange() 
	{				
		dq_searchTextbox.onclick = dq_acDisplayView;
		dq_searchTextbox.onblur = dq_acDisplayCheck;
		document.body.onclick = dq_acDisplayCheck;			
	}
	
	//자동완성레이어 보여 주기 - req_ipc
	function dq_acDisplayView() 
 	{ 
		dq_acDisplayFlag = 1;
		dq_acFormFlag = 0;
		dq_reqAcResultShow();
 	}

	//자동완성레이어 감추기전  체크 - dis_p
 	function dq_acDisplayCheck() 
 	{
		if(dq_acDisplayFlag) 
		{ 
			dq_acDisplayFlag=0;			
			return ;
		} 
			
		if(dq_acArrowFlag)		
			return;
				
	
		if(dq_acFormFlag)
			return;
		
		dq_acDisplayHide();
	}
 	
 	//자동완성레이어 감추기 - ac_hide
 	function dq_acDisplayHide()
 	{  		
 		var resultDiv = document.getElementById(dq_resultDivID);
 		var resultDiv2 = document.getElementById(dq_resultDivID2);
 		
		if(resultDiv.style.display == "none") {
			return ;
		}
		if(resultDiv2.style.display == "none") {
			return ;
		}
		
		
		dq_setDisplayStyle(0);
		dq_acListFlag = 0;
		dq_acLine = 0;
	}
 	
 	//자동완성레이어 display style 설정 - popup_ac
 	function dq_setDisplayStyle(type)
 	{	 		
 		var resultDiv = document.getElementById(dq_resultDivID);
 		var resultDiv2 = document.getElementById(dq_resultDivID2);

 		if(type==0)
		{
			resultDiv.style.display = "none";
			resultDiv2.style.display = "none";
//			dq_switchImage(0);
		}
		else if(type==1)
		{
			resultDiv.style.display = "block";
			resultDiv2.style.display = "block";
//			dq_switchImage(1);
		}
		else if(type==2)
		{
			resultDiv.style.display = "none";
			resultDiv2.style.display = "none";
//			dq_switchImage(1);
		}		
 	}
 	
 	//자동완성 결과 보기 요청 - req_ac2
 	function dq_reqAcResultShow() 
	{		
 		//console.log("dq_reqAcResultShow()");
 		var resultDiv = document.getElementById(dq_resultDivID);
 		
		if(dq_searchTextbox.value == "" || dq_acuse == 0)
			return ;
			
	 	if(dq_acListFlag && dq_acDisplayFlag)
	 	{ 
	 		
	 		dq_acDisplayHide();
			return;
		} 
	 	
		var o = dq_getAcResult();
	 
		if(o && o[1][0] != "") 
	 		dq_acResultShow(o[0], o[1] , o[2]);
	 	else
	 		dq_reqSearch();
 	}
 	
 	//자동완성 결과 object 리턴 - get_cc
 	function dq_getAcResult()
 	{ 
		var ke = dqc_trimSpace(dq_searchTextbox.value);
	 	return typeof(dq_acResult[ke])=="undefined" ? null : dq_acResult[ke];
 	} 
 	
 	//자동완성 결과 object 생성 - set_cc
 	function dq_setAcResult(aq, al , al2)
 	{
 		dq_acResult[aq] = new Array(aq, al , al2);
 	}
 	
 	//자동완성 결과 보기 - ac_show
 	function dq_acResultShow(aq, al , al2)
 	{
		if(aq != dqc_trimSpace(dq_searchTextbox.value))
			dq_engFlag = 1;
 		else
			if(aq && aq != "" && aq != dqc_trimSpace(dq_searchTextbox.value)) 			
				return ;
	 	dq_searchKeyword = aq;
	 	dq_searchResultList = al;
	 	dq_searchResultList_spot = al2;
	 	dq_printAcResult();
								
	 	if(dq_searchResultList.length){
	 		dq_acListFlag = 1;
	 	} else{
	 		dq_acListFlag = 0;
	 	}
	 	if(dq_searchResultList_spot.length){
	 		dq_acListFlag = 1;
	 	} else{
	 		dq_acListFlag = 0;
	 	}
	 	
	 	
	 	if(dq_acListFlag)
	 	{ 
	 		dq_setAcPos(0);
			
			if(dq_browserType == 1)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewIE;
			else if(dq_browserType == 2)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewFF;
			else if(dq_browserType == 3)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewIE8;
		} 
	} 
 	
 	//자동완성결과 라인 위치 지정 - set_acpos
 	function dq_setAcPos(v)
 	{
 		dq_acLine = v;
		setTimeout('dq_setAcLineBgColor();', 10);
 	}
 	
 	//자동완성레이어에 결과 출력 - print_ac
 	function dq_printAcResult() 
 	{ 
 		var resultDiv = document.getElementById(dq_resultDivID);
 		var resultDiv2 = document.getElementById(dq_resultDivID2);
 			 				 		 		
		if(dq_searchResultList[0] == ""){
			resultDiv.innerHTML = dq_getAcNoResultList();
			resultDiv2.innerHTML = dq_getAcNoResultList_spot();
		}
	 	else{
	 		resultDiv.innerHTML = dq_getAcResultList();
			resultDiv2.innerHTML = dq_getAcResultList_spot();
	 	}
	 			 	
		dq_setDisplayStyle(1); //자동완성창 보여줌.
	 	
	 	setTimeout('dq_setAcLineBgColor();', 10); 		
 	}
 	
 	//자동완성 키워드 라인의 백그라운드색 설정 - set_ahl
 	function dq_setAcLineBgColor()
 	{
 		var o1, o2, qs_ac_len;
 		
		if(!dq_acListFlag)
			return;
		
		qs_ac_len = dq_searchResultList.length;
	 	for(var i=0;i<qs_ac_len;i++)
	 	{
			o1 = document.getElementById('dq_ac' + (i+1));
			
			if(o1 != null)
			{			
				if((i+1) == dq_acLine){
					//o1.style.backgroundColor = dq_bgColor;
					$("#dq_ac"+ (i+1)).css("backgroundColor" , dq_bgColor);
				}else{
					//o1.style.backgroundColor = '';
					$("#dq_ac"+ (i+1)).css("backgroundColor" , "");
				}
			}
		}
 	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE) - ackhl
 	function dq_acKeywordTextViewIE()
	{
		var e = window.event;
		var ac, acq;
		var resultDiv = document.getElementById(dq_resultDivID);
		var qs_ac_len = dq_searchResultList.length;
		
	 	if(e.keyCode==39)
	 		dq_reqAcResultShow();	 	 
	 	
	 	if(e.keyCode==40 || (e.keyCode==9 && !e.shiftKey))
	 	{
		 	if(!dq_acListFlag)
		 	{
				dq_reqAcResultShow();
			 	return;
			}
			
			if(dq_acLine < qs_ac_len)
			{
				if(dq_acLine == 0)
					dq_keywordBak = dq_searchTextbox.value;
				
				dq_acLine++;
						 
			 	ac = eval('dq_ac' + dq_acLine);
			 	acq = eval('dq_acq' + dq_acLine);
			 	dq_keywordOld = dq_searchTextbox.value = acq.outerText;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
		 	}
	 	}
	 	
	 	if(dq_acListFlag && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey)))
	 	{		 			 	
			if(!dq_acListFlag) 
				return;
		 
		 	if(dq_acLine <= 1)
		 	{ 
		 			
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	} 
		 	else
		 	{
				dq_acLine--;
							
			 	ac = eval('dq_ac' + dq_acLine);
			 	acq = eval('dq_acq' + dq_acLine);
			 	dq_keywordOld = dq_searchTextbox.value = acq.outerText;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
			}
		}
	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE) - ackhl
 	function dq_acKeywordTextViewIE8()
	{
		var e = window.event;
		var ac, acq;
		var resultDiv = document.getElementById(dq_resultDivID);
		var qs_ac_len = dq_searchResultList.length;
		
	 	if(e.keyCode==39)
	 		dq_reqAcResultShow();	 	 
	 	
	 	if(e.keyCode==40 || (e.keyCode==9 && !e.shiftKey))
	 	{
		 	if(!dq_acListFlag)
		 	{
				dq_reqAcResultShow();
			 	return;
			}
			
			if(dq_acLine < qs_ac_len)
			{
				if(dq_acLine == 0)
					dq_keywordBak = dq_searchTextbox.value;
				
				dq_acLine++;
						 
			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);
			 	
			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
		 	}
	 	}
	 	
	 	if(dq_acListFlag && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey)))
	 	{		 			 	
			if(!dq_acListFlag) 
				return;
		 
		 	if(dq_acLine <= 1)
		 	{ 
		 			
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	} 
		 	else
		 	{
				dq_acLine--;
							
			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);
			 	
			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
			}
		}
	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE외 브라우져) - ackhl_ff
 	function dq_acKeywordTextViewFF(fireFoxEvent)
	{		
		var ac, acq;
		var resultDiv = document.getElementById(resultDiv);
		var qs_ac_len = dq_searchResultList.length;
		
	 	if(fireFoxEvent.keyCode==39)
	 		dq_reqAcResultShow();
	 		 
	 	if(fireFoxEvent.keyCode==40 || fireFoxEvent.keyCode==9)
	 	{			
		 	if(!dq_acListFlag)
		 	{
		 		dq_reqAcResultShow();
			 	return;
			}
			
			if(dq_acLine < qs_ac_len)
			{ 
				if(dq_acLine == 0) 
					dq_keywordBak = dq_searchTextbox.value;
					
				dq_acLine++;
						 
			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);
			 	
			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	fireFoxEvent.preventDefault();
		 	}
	 	}
	 	
	 	if(dq_acListFlag && (fireFoxEvent.keyCode==38 || fireFoxEvent.keyCode==9))
	 	{
			if(!dq_acListFlag) 
				return;
		 
		 	if(dq_acLine <= 1)
		 	{ 
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	} 
		 	else
		 	{
		 		dq_acLine-- ;
			 
			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);
			 	
			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	dq_searchTextbox.focus() ;
			 	dq_setAcLineBgColor() ;
			 	fireFoxEvent.preventDefault();
			}
		}						
	}
 	
 	//검색요청 - reqAc
 	function dq_reqSearch() 
 	{	 
 		var sv;
		var ke = dqc_trimSpace(dq_searchTextbox.value);

		ke = ke.replace(/ /g, "%20");
		
		while(ke.indexOf("\\") != -1)
			ke = ke.replace(/ /g, "%20").replace("\\", "");
		
		while(ke.indexOf("\'") != -1)
			ke = ke.replace(/ /g, "%20").replace("\'", "");
	 
	 	if(ke == "")
	 	{ 
	 		dq_acDisplayHide();
			return;
		} 
					
	 	sv = "/portal/search/searchAutoComplete.do?q=" + escape(encodeURIComponent(ke));
	 	dq_ajaxReqObj = dqc_getXMLHTTP();
	 	
	 	if(dq_ajaxReqObj)
	 	{ 		 		
			dq_ajaxReqObj.open("GET", sv, true);
		 	dq_ajaxReqObj.onreadystatechange = dq_acShow;
	 	} 
	 
	 	try
	 	{		 	
			dq_ajaxReqObj.send(null);
	 	}
	 	catch(e)
	 	{		
			return 0;
		} 
	}
 
 	//자동완성 결과 보기 - showAC
 	function dq_acShow() 
 	{	
 		
		if(dq_acuse == 1)
	 	{	
			
			
			if(dq_ajaxReqObj.readyState==4 && dq_ajaxReqObj.responseText && dq_ajaxReqObj.status==200)
			{					
				eval(dq_ajaxReqObj.responseText);
				
				dq_setAcResult(dq_searchKeyword, dq_searchResultList , dq_searchResultList_spot);
				dq_acResultShow(dq_searchKeyword, dq_searchResultList , dq_searchResultList_spot);
			}
	 	}
	 	else
	 	{
	 	
	 		dq_setDisplayStyle(2);
	 	}
 	}
 	
 	//선택키워드저장 - set_acinput
 	function dq_setAcInput(keyword) 
 	{	 		
		if(!dq_acListFlag) 
			return;				
		
	 	dq_keywordOld = dq_searchTextbox.value = keyword;		 			 	
	 	dq_searchTextbox.focus();
	 	dq_acDisplayHide();		 
 	}
 	
 	//기능끄기 버튼을 눌렀을때 - ac_off
	function dq_acOff() 
	{		
		if(dq_searchTextbox.value == "")
			dq_setDisplayStyle(0);
		else
			dq_acDisplayHide();
	
		dq_acuse = 0;
 	}

	//화살표클릭 - show_ac
	function dq_acArrow()
	{			
		var resultDiv = document.getElementById(dq_resultDivID);
		var resultDiv2 = document.getElementById(dq_resultDivID2);
		
		if(dq_acuse == 0)
		{
			dq_keywordOld = "";
			dq_acuse = 1;		
			
			if(dq_searchTextbox.value == "")			
				resultDiv.innerHTML = dq_getAcOnNoKeyword();
				resultDiv2.innerHTML = dq_getAcNoKeyword();
		}
		else
		{
			if(dq_searchTextbox.value == "")
				resultDiv.innerHTML = dq_getAcNoKeyword();						
				resultDiv2.innerHTML = dq_getAcNoKeyword();						
		}
		
		if(dq_searchTextbox.value == "" && (resultDiv.style.display == "block" && resultDiv2.style.display == "block")){
			dq_setDisplayStyle(0);
		} else{
			dq_setDisplayStyle(1);
		}
		dq_acDisplayView();
		dq_searchTextbox.focus();
		dq_wi();
		
		document.body.onclick=null;
	}
	
	//검색어입력창의 자동완성 화살표를 위, 아래로 변경한다. - switch_image	
//	function dq_switchImage(type)
//	{			
		
//		var arrow_obj = document.getElementById("btn_auto").style.background;	
//		alert(arrow_obj.length + " : "  + arrow_obj);
//		var former_part = arrow_obj.substring(0,arrow_obj.length-17);
		
//		if(type==0)
//		{
//			//document.getElementById("btn_auto").style.background = former_part+"dn.gif) no-repeat";
//			$("#btn_auto").removeClass('on');
//			document.getElementById("btn_auto").title = "자동완성 펼치기";
//			
//			
//		}
//		else if(type==1)
//		{		
//			$("#btn_auto").addClass('on');	
//			//document.getElementById("btn_auto").style.background = former_part+"up.gif) no-repeat";
//			document.getElementById("btn_auto").title = "자동완성 닫기";
//		}
//		
// 	}
	
	//자동완성 레이어 mouse on
	function dq_setMouseon() 
 	{ 		
	 	dq_acFormFlag = 1;
 	}

	//자동완성 레이어 mouse out
 	function dq_setMouseoff()
 	{		
	 	dq_acFormFlag = 0;		
		dq_searchTextbox.focus();
 	}
 	
 	//자동완성 결과 코드 - get_aclist
 	function dq_getAcResultList()
 	{ 	 		 	
 		// 자동완성 사용 변수
// 		var keyword = "";
 		var keywordOrign = "";
 		var keyword = "";
 		var keywordLength = 0;
 		var lenValue = 40;
 		var text = "";
 		var count = 0;

 		var pos = 0;
 		var result = "";
 		
 		
 		if(dq_searchResultList != null && dq_searchResultList.length > 0){
 			text += "<ul class=\"search_ls_word\" id=\"ark\">" ;
			 
		 	for(var i=0;i<dq_searchResultList.length;i++)
		 	{
		 		result = dq_searchResultList[i].split("|");
		 		keyword = keywordOrign = result[0];
				count = result[1];
				keywordLength = dqc_strlen(keywordOrign);
				
				if(keywordLength > lenValue)
					keyword = dqc_substring(keywordOrign, 0, lenValue) + "..";
				 
				if(dq_engFlag == 0)
					pos = keywordOrign.toLowerCase().indexOf(dq_searchTextbox.value.toLowerCase());
				else if(dq_engFlag == 1)
					pos = keywordOrign.toLowerCase().indexOf(dq_searchKeyword.toLowerCase());
			
				if(pos >= 0)
				{
					if(pos == 0)
					{
						if(dq_engFlag == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
						else if(dq_engFlag == 1)
							keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
					}
					else if(pos == keywordOrign.length - 1)
					{
						if(dq_engFlag == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
						else if(dq_engFlag == 1)
							keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);													
					}												
					else
					{						
						if(dq_engFlag == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
						else if(dq_engFlag == 1)
							keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
					}
				}	
				text += "<li><a id='dq_ac" + (i+1) + "' onmouseover=\"dq_setAcPos('" + (i+1) + "')\" onFocus=\"dq_setAcPos('" + (i+1) + "');\" onmouseout=\"dq_setAcPos(0);\"  onBlur=\"dq_setAcPos(0);\" onclick=\"dq_setAcInput('" + keywordOrign + "');dq_keywordSearch('" + keywordOrign + "');\" onkeypress=\"dq_setAcInput('" + keywordOrign + "');\">";
				text +=  keyword + "<input type=\"hidden\" id=\"dq_acqHidden" + (i+1) + "\" value=\"" + keywordOrign + "\"/>";				 					 				 	
				text += "<span class='sr_key_point' id='dq_acq" + (i+1) + "' style='display:none'>" + keywordOrign + "</span></a></li>";
		 	}
		 	text += " </ul>";
		 	
	 	}
	 	return text;
	}
 	
 	//spot 검색 결과 코드 - get_aclist
 	function dq_getAcResultList_spot()
 	{
 		
 		// spot 검색 사용변수
 		var text = "";
 		var tempText = "";
 		var keyword = "";
 		var lenValue = 60;
 		var keywordLength = 0;
 		var pos = 0;
 		
 		if(dq_searchResultList_spot != null && dq_searchResultList_spot.length > 0){
 			
// 			text += "<dl class=\"search_ls_spot\">";
 			
 			for(var i=0;i<dq_searchResultList_spot.length;i++)
		 	{
 				if(i == 0 || i == 9 || i == 18 || i == 27 || i == 36){
 					var titl = dq_searchResultList_spot[i];
 					
 					titl = keywordOrign = dq_searchResultList_spot[i];
 					keywordLength = dqc_strlen(keywordOrign);
 					
 					if(keywordLength > lenValue)
 						titl = dqc_substring(keywordOrign, 0, lenValue) + "..";
 					 
 					if(dq_engFlag == 0)
 						pos = keywordOrign.toLowerCase().indexOf(dq_searchTextbox.value.toLowerCase());
 					else if(dq_engFlag == 1)
 						pos = keywordOrign.toLowerCase().indexOf(dq_searchKeyword.toLowerCase());
 				
 					if(pos >= 0)
 					{
 						if(pos == 0)
 						{
 							if(dq_engFlag == 0)
 								titl = dqc_highlight(titl, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
 							else if(dq_engFlag == 1)
 								titl = dqc_highlight(titl, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
 						}
 						else if(pos == keywordOrign.length - 1)
 						{
 							if(dq_engFlag == 0)
 								titl = dqc_highlight(titl, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
 							else if(dq_engFlag == 1)
 								titl = dqc_highlight(titl, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);													
 						}												
 						else
 						{						
 							if(dq_engFlag == 0)
 								titl = dqc_highlight(titl, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
 							else if(dq_engFlag == 1)
 								titl = dqc_highlight (titl, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
 						}
 					}
 					
 				}
 				if(i == 1 || i == 10 || i == 19 || i == 28 || i == 37){
 					var bdt = dq_searchResultList_spot[i];
 					
 					bdt = keywordOrign = dq_searchResultList_spot[i];
 					keywordLength = dqc_strlen(keywordOrign);
 					
 					if(keywordLength > lenValue)
 						bdt = dqc_substring(keywordOrign, 0, lenValue) + "..";
 					 
 					if(dq_engFlag == 0)
 						pos = keywordOrign.toLowerCase().indexOf(dq_searchTextbox.value.toLowerCase());
 					else if(dq_engFlag == 1)
 						pos = keywordOrign.toLowerCase().indexOf(dq_searchKeyword.toLowerCase());
 				
 					if(pos >= 0)
 					{
 						if(pos == 0)
 						{
 							if(dq_engFlag == 0)
 								bdt = dqc_highlight(bdt, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
 							else if(dq_engFlag == 1)
 								bdt = dqc_highlight(bdt, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
 						}
 						else if(pos == keywordOrign.length - 1)
 						{
 							if(dq_engFlag == 0)
 								bdt = dqc_highlight(bdt, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
 							else if(dq_engFlag == 1)
 								bdt = dqc_highlight(bdt, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);													
 						}												
 						else
 						{						
 							if(dq_engFlag == 0)
 								bdt = dqc_highlight(bdt, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
 							else if(dq_engFlag == 1)
 								bdt = dqc_highlight (bdt, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
 						}
 					}	
 				}
				if(i == 2 || i == 11 || i == 20 || i == 29 || i == 38){
					var sys_dvs_cd = dq_searchResultList_spot[i];			
				}
				if(i == 3 || i == 12 || i == 21 || i == 30 || i == 39){
					var menu_no = dq_searchResultList_spot[i];	
				}
				if(i == 4 || i == 13 || i == 22 || i == 31 || i == 40){
					var bbs_no = dq_searchResultList_spot[i];	
				}
				if(i == 5 || i == 14 || i == 23 || i == 32 || i == 41){
					var file_path = dq_searchResultList_spot[i];	
				}
				if(i == 6 || i == 15 || i == 24 || i == 33 || i == 42){
					var physic_file_nm = dq_searchResultList_spot[i];	
				}
				if(i == 7 || i == 16 || i == 25 || i == 34 || i == 43){
					var ntctxt_no = dq_searchResultList_spot[i];	
				}
				if(i == 8 || i == 17 || i == 26 || i == 35 || i == 44){
					var menu_grp = dq_searchResultList_spot[i];
//					text += "<dl class=\"search_ls_spot\"><dt><a href=/"+sys_dvs_cd+"/board/boardDetail.do?menu_no="+menu_no+"&bbs_no="+bbs_no+"&ntctxt_no="+ntctxt_no+"&menu_grp="+menu_grp+">";
//	 				text += "<img src="+file_path+physic_file_nm+" width=96px; height=64px;></a></dt> ";
//	 				text += "<dd><a href=/"+sys_dvs_cd+"/board/boardDetail.do?menu_no="+menu_no+"&bbs_no="+bbs_no+"&ntctxt_no="+ntctxt_no+"&menu_grp="+menu_grp+">"+titl+"</a></dd><dd><a href=/"+sys_dvs_cd+"/board/boardDetail.do?menu_no="+menu_no+"&bbs_no="+bbs_no+"&ntctxt_no="+ntctxt_no+"&menu_grp="+menu_grp+">"+bdt+"</a></dd> </dl>" ;
					if(physic_file_nm != ""){
		 				text += "<a href=/"+sys_dvs_cd+"/board/boardDetail.do?menu_no="+menu_no+"&bbs_no="+bbs_no+"&ntctxt_no="+ntctxt_no+"&menu_grp="+menu_grp+">";
		 				text += "<dl class=\"search_ls_spot\"><dt><img src="+file_path+"/"+physic_file_nm+" width=96px; height=64px;></dt>";
		 				text += "<dd>"+titl+"</dd><dd>"+bdt+"</dd></dl></a>" ;
					}else{
						text += "<a href=/"+sys_dvs_cd+"/board/boardDetail.do?menu_no="+menu_no+"&bbs_no="+bbs_no+"&ntctxt_no="+ntctxt_no+"&menu_grp="+menu_grp+">";
		 				text += "<dl class=\"search_ls_spot\"><dt><img src='/img/common/icon-video.png' width=96px; height=64px;></dt>";
		 				text += "<dd>"+titl+"</dd><dd>"+bdt+"</dd></dl></a>" ;
					}
				}
		 	}
// 			text +="</dl>";
		}
	 	return text;
	}
 	
 	//자동완성 결과 없는 경우 - get_ac0
 	function dq_getAcNoResultList() 
 	{ 	 		
 		var text = "";
 		var ment = "검색어가 없습니다.";
	 	
 		text += " <div class='auto_result auto_left'><ul>";
 		text += "	<li><a href=\"#\">";													
 		text += ment;
 		text += "	</a></li></ul>";
 		text += " </div>";
 		//text += " <div class='auto_footer'><a href='javascript:dq_acOff();' class='auto_off'>자동완성 끄기</a></div>";
 		//text += " </div>";
 		text += " <span id=dq_acq1 style='display:none'></span>";
	 	
	 	return text;
 	}
 	
 	//스팟검색 결과 없는 경우 - get_ac0
 	function dq_getAcNoResultList_spot() 
 	{ 	 		
 		var text = "";
 		var ment = "검색결과가 없습니다.";
	 	
 		text += " <div class='auto_result auto_left'><ul>";
 		text += "	<li><a href=\"#\">";													
 		text += ment;
 		text += "	</a></li></ul>";
 		text += " </div>";
 		//text += " <div class='auto_footer'><a href='javascript:dq_acOff();' class='auto_off'>자동완성 끄기</a></div>";
 		//text += " </div>";
 		text += " <span id=dq_acq1 style='display:none'></span>";
	 	
	 	return text;
 	}
 	
 	//자동완성 키워드 없는 경우
 	function dq_getAcNoKeyword() 
 	{ 	 		
 		var text = "";
 		var ment = "자동완성 기능";
	 	
 		text += " <div class='auto_result auto_left'><ul>";
 		text += "	<li><a href=\"#\">";													
 		text += ment;
 		text += "	</a></li></ul>";
 		//text += " </div>";
 		//text += " <div class='auto_footer'><a href='javascript:dq_acOff();' class='auto_off'>자동완성 끄기</a></div>";
 		text += " </div>";
 		text += " <span id=dq_acq1 style='display:none'></span>";
	 	
	 	return text;
 	}
 	
 	//자동완성 복구시 키워드 없는 경우
 	function dq_getAcOnNoKeyword() 
 	{ 	 		
 		var text = "";
 		var ment = "활성화 되었습니다.";
	 	
 		text += " <div class='auto_result auto_left'><ul>";
 		text += "	<li><a href=\"#\">";													
 		text += ment;
 		text += "	</a></li></ul>";
 		//text += " </div>";
 		//text += " <div class='auto_footer'><a href='javascript:dq_acOff();' class='auto_off'>자동완성 끄기</a></div>";
 		text += " </div>";
 		text += " <span id=dq_acq1 style='display:none'></span>";
	 	
	 	return text;
 	}

 	//검색박스 키워드 처리 루프 - wi()
 	function dq_wi() 
 	{	 		
 		
 		if(dq_acuse==0)
			return;
		
		var keyword = dq_searchTextbox.value;
	 	if(keyword == "" && keyword != dq_keywordOld)
	 		dq_acDisplayHide();
	 	
		if(keyword != "" && keyword != dq_keywordOld && dq_keyStatus != 1)
		{
			var o = null;
			
			o = dq_getAcResult();
			if(o && o[1][0] != "") 
				dq_acResultShow(o[0], o[1] , o[2]);
			else
				dq_reqSearch();
		}
		
		dq_keywordOld = keyword;		
		setTimeout("dq_wi()", dq_intervalTime);
 	}
 	
	setTimeout("dq_wi()", dq_intervalTime);
