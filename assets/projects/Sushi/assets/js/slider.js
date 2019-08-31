var imgHead = [
			'pic/1.jpg',
			'pic/2.jpg',
			'pic/3.jpg',
		], i=1;
	function csaHead(){

		if(i > (imgHead.length-1)){
			$('fon').animate({'opacity':'0'},200,function(){
				i=1;
				$('fon').css({'background':'url('+imgHead[0]+')'});
				$('fon').css({'background-attachment':'fixed'});
				$('fon').css({'background-size':'cover'});
				$('fon').css({'-o-background-size':'cover'});
				$('fon').css({'-moz-background-size':'cover'});
				$('fon').css({'-webkit-background-size':'cover'});
				$('fon').css({'background-repeat':'none'});
				$('fon').css({'background-position':'center center'});
			});
			$('fon').animate({'opacity':'1'},200);
		}else{
			$('fon').animate({'opacity':'0'},200,function(){
				$('fon').css({'background':'url('+imgHead[i]+')'});
				$('fon').css({'background-attachment':'fixed'});
				$('fon').css({'background-size':'cover'});
				$('fon').css({'-o-background-size':'cover'});
				$('fon').css({'-moz-background-size':'cover'});
				$('fon').css({'-webkit-background-size':'cover'});
				$('fon').css({'background-repeat':'none'});
				$('fon').css({'background-position':'center center'});
				i++;
			});
			$('fon').animate({'opacity':'1'},200);
		}
		
	}
	var intervalCsaHead = setInterval(csaHead,1000);


