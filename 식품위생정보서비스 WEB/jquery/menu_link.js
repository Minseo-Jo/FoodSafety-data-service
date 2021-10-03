/*
Original Code
http://software.khu.ac.kr/html_2018/js/menuLink.js
*/


function menuLink(fName,mNum,sNum,tNum){
	/*
	fName : �대뜑紐�
	mNum : ��硫붾돱踰덊샇
	sNum : �쒕툕硫붾돱踰덊샇
	tNum : 3李⑤찓�� 踰덊샇
	*/
	if(fName != "board"){
		if(sNum!="" && tNum!=""){
			subFile = sNum+"_"+tNum+".php";
		}else{
			subFile = sNum+".php";
		}
		url = "/html_2018/"+fName+"/"+subFile;
	}else{
		
		if(sNum!="" && tNum!=""){
			bName = mNum+"_"+sNum+"_"+tNum;
		}else{
			bName = mNum+"_"+sNum;
		}
		url = g5_url+"/bbs/board.php?bo_table="+bName;
	}
	
	if(url!=""){
		location.href = url;
	}
}

function menuLink_form(fName,mNum,sNum,tNum) {
	if(fName == "board"){
		if(sNum!="" && tNum!=""){
			bName = mNum+"_"+sNum+"_"+tNum;
		}else{
			bName = mNum+"_"+sNum;
		}
		url = g5_url+"/bbs/write.php?bo_table="+bName;
	}
	if(url!=""){
		location.href = url;
	}
}

function setURL(obj) {
	if( obj.value != '' ) {
		window.open(obj.value,'','');
	}
}

function setURL2(obj) {
	if( obj != '' ) {
		window.open(obj,'','');
	}
}
