<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8"/>
  <title> 2013保时捷极至体验 </title>
  <script src="js/jquery-1.8.3.min.js" type="text/javascript"></script>
  <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
  <!--[if lt IE 9]><script>for(var a=['section','article','nav','header','footer','aside'],i=0,j=a.length;i<j;++i){document.createElement(a[i]);}</script><![endif]-->
  <!--[if IE 6]>
  <script type="text/javascript">
    seajs.use('uglyFuckIe6' , function( exports ){
      exports.fix('.car');
    });
  </script>
  <![endif]-->
  <link href="./css/base.css" rel="stylesheet" type="text/css" />
  <!--[if IE]>
  <link href="./css/ie.css" rel="stylesheet" type="text/css" />
  <![endif]-->
  
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-40136895-1']);
  _gaq.push(['_setDomainName', 'porsche-event.cn']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

	var $navs = $('#navs .nav');
	
	$navs.hover(function(){
		$(this).animate({'opacity':0.6});
	},function(){
		$(this).animate({'opacity':1});
	});	

</script>
    <script>
		$(document).ready(function(e) {
            			
						
			$("form[name='regform']").submit(
			
			validateForm
			
				);		
        });
		
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};
		
			if(isMobile.any()) {
				document.location = "m";	
			}		
		
		
		function validateForm() {
				
				var err = false;
					
				if($("input[name='f_firstname']").val() == "") {
					err = true;
					$("input[name='f_firstname']").addClass("error");
				} else {
					$("input[name='f_firstname']").removeClass("error");
				}
				if(!validateEmail($("input[name='f_email']").val())) {
					err = true;
					$("input[name='f_email']").addClass("error");
				} else {
					$("input[name='f_email']").removeClass("error");
				}
				if($("input[name='f_mobile']").val() == "") {
					err = true;
					$("input[name='f_mobile']").addClass("error");
				} else {
					$("input[name='f_mobile']").removeClass("error");
				}

				if(!err) {
					$("#err").hide();
					document.regform.submit();
				} else {
					$("#err").show();
				}
				return false;
			}
		
		function validateEmail(email) { 		  
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
        function sharethis(e, t, n, r, i, s, o, u) {
            var a = "",
                f = document.location.toString(),
                l = "";
            r = typeof r == "undefined" || r == null ? "" : r, u = typeof u == "undefined" || u == null ? !0 : u, i = "" + (typeof i != "undefined" && i != null ? i : $('meta[property="og:title"]').attr("content")), i = i != "undefined" ? i : document.title, s = "" + (typeof s != "undefined" && s != null ? s : $('meta[property="og:description"]').attr("content")), s = s != "undefined" ? s : "", o = "" + (typeof o != "undefined" && o != null ? o : $('meta[property="og:image"]').attr("content")), o = o != "undefined" ? o : "", o.indexOf("#CONFIGSTRING#") >= 0 && (o = o.replace("#CONFIGSTRING#", caymanConfig.getConfigString())), f = f.replace(/[\?|&]ws=[^&]*/g, ""), f = f.replace(/[\?|&]pc=[^&]*/g, ""), f = f.replace(/[\?|&]deeplink=[^&]*/g, ""), f = f.replace(/[\?|&]uc=[^&]*/g, ""),  l = f + (f.indexOf(!1) ? "?" : "&") + "c=0" + r, n != "undefinded" && (l = l + "&pc=" + n), a = e;
            if (t = "facebook") a = a.replace(/&#91;/mg, "["), a = a.replace(/&#93;/mg, "]");
            u ? (a = a.replace("#TITLE#", encodeURIComponent(i)), a = a.replace("#TEXT#", encodeURIComponent(s)), a = a.replace("#MEDIA#", encodeURIComponent(o)), a = a.replace("#URL#", encodeURIComponent(l))) : (a = e.replace("#TITLE#", i), a = a.replace("#TEXT#", encodeURIComponent(s)), a = a.replace("#MEDIA#", o), a = a.replace("#URL#", l)),  window.open(a, "share")
        }
	</script>
 <style type="text/css">
 .err { color: #F00; display: none; padding-left: 5px; }
#form { float: right; background: #FFF; width: 427px; height: 357px; color: #7c7c7c; background:url(images/form-bg.jpg) }
#content { float: left; }
#form-wrapper { position: relative; margin: auto; margin-top: 40px; }

footer { position: fixed; bottom: 0px; width: 100%; }
#footer-inner { position: relative; margin: auto; }
#btnSubmit { position: relative; display: block; text-align:center; width: 115px; height: 43px; background:url(images/btn.png); margin-top: 7px; }
#btnSubmit span { display: block; padding-top: 12px; font-size: 16px;}

input[type=text] { background: url(images/input.png) no-repeat; border: 0; width: 262px; height: 31px; padding: 0 10px 0 10px; line-height: 30px; }
input[type=text].error { background: url(images/input.png) no-repeat 0 -31px; }

#err { position: absolute; top: 18px; left: 20px; color: #F00; display: none; }
/*
span > input[type='radio'] {
    opacity: 0;
    width: 0px;	
}

span > input[type='radio'] + label {
    margin: 0;
    clear: none;
    
    padding: 5px 0 4px 18px;

    cursor: pointer;
    
    background: url(images/dot.png) left center no-repeat; 
}

span > input[type='radio']:checked + label {
    background-image: url(images/dot-on.png);
}
*/
 #btn-lang {float: right; padding-right: 20px; }
 </style>
</head>
 <body>
    <div class="wrap">
      <header>
      
      
        <nav>
          <a class="menu menu-home" href="../index.html">首页</a>
          <span class="sep"></span>
          <a class="menu" href="../daily.html">日程安排</a>
          <!--<a class="menu" href="http://fp2013.porsche-event.cn/daily.html">日程安排</a>-->
          <span class="sep"></span>
          <a class="menu" href="../act.html">活动环节</a>
          <!--<a class="menu" href="http://fp2013.porsche-event.cn/act.html">活动环节</a>-->
          <span class="sep"></span>
          <a class="menu" href="../photos.html">精彩图库</a>
          <span class="sep"></span>
          <a class="menu menu-sign menu-sign-sel" href="./">在线报名</a>
        </nav>
        <a href="http://fp2013.porsche-event.cn/index.html"><img class="logo" src="./images/logo.png" ></a>
      </header>
      <div class="main">
        <section>
          <!-- logs -->
          <div id="form-wrapper">
            <div id="content" style="width: 490px; color: #7c7c7c;"> 保时捷极至体验，再次来到中国，带来全方位的保时捷品牌展示。在这里，你可以感受保时捷的历史与辉煌。每位预约参与的来宾都将在现场收到一枚 RFID 腕带，让您在微博上轻松分享属于您的保时捷时刻。<br/><br/>
            <span style="color: #ed1b23; font-size: 26px; font-weight:bold;"><img src="images/h1.jpg" width="242" height="28"></span><br/><br/><br/><br/><br/><br/><br/><br/>
            
            </div>
            <div id="form">
              <form id="regform" name="regform" method="get" action="http://182.255.24.198/porsche/process.php">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="55" align="left" valign="middle" style="font-size: 16px;"><span style="padding-left: 22px;">请填写个人资料</span>
                    <div id="btn-lang"><a href="index-en.php">English</a></div></td>
                  </tr>
                  <tr>
                    <td height="246" align="left" valign="middle"><table cellpadding="0" cellspacing="0" style="margin-left:22px; color:#FFF;">
                      <tr>
                        <td>姓名: </td>
                        <td width="20"></td>
                        <td><input type="text" name="f_firstname" /></td>
                        <td><span id="err_firstname" class="err">请填写您的名字</span></td>
                      </tr>
                      <tr>
                        <td height="10"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>性别: </td>
                        <td width="20"></td>
                        <td><span><input id="f_sex_1" name="f_sex" type="radio" value="m" checked>
                          <label for="f_sex_1">男性</label></span>
                          <span><input id="f_sex_2" type="radio" name="f_sex" value="f">
                          <label for="f_sex_2">女性</label></span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td height="10"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>电子邮件: </td>
                        <td width="20"></td>
                        <td><input type="text" name="f_email" /></td>
                        <td><span id="err_email" class="err">请您填写您邮箱地址</span></td>
                      </tr>
                      <tr>
                        <td height="10"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><p>手机号码: </p></td>
                        <td width="20"></td>
                        <td><input type="text" name="f_mobile" /></td>
                        <td><span id="err_mobile" class="err">请您填写您的手机号码</span></td>
                      </tr>
                      <tr>
                        <td height="10"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td align="left" valign="top">参与活动:</td>
                        <td width="20"></td>
                        <td><span><input id="f_location_1" name="f_location" type="radio" value="sh" checked>
                          <label for="f_location_1">上海，2013年6月16日</label></span><br>
                          <span><input id="f_location_2" name="f_location" type="radio" value="bj">
                          <label for="f_location_2">北京，2013年6月30日</label></span></td>
                        <td><span id="err_location" class="err">请选择至少一个地点</span></td>
                        </td>
                      <tr>
                        <td height="5"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td align="right"></td>
                        <td></td>
                        </td>
                    </table>
                    
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="position: relative;">
                    <div style="position:relative;">
                    	<div id="err">请填写正确资料</div>
                    </div>
                    
                    <a id="btnSubmit" href="javascript:void(0)" onclick="validateForm()"><span>提 交</span></a> 
                    <input name="input" type="image" width="1" height="1" src="images/t.png"></td>
                  </tr>
                </table>
              </form>
            </div>
            
            <div style="clear: both"></div>
          </div>
          <!-- cars -->
          <!-- navs -->
          <div class="car-wrap">
            <div class="cars">
              <div class="car car1" jq-effect="delay:500;duration:500;from:120%r;easing:easeInOutCubic" ></div>
              <div class="car car2" jq-effect="delay:1000;duration:600;from:120%r;easing:easeInOutCubic" ></div>
              <div class="car car3" jq-effect="delay:700;duration:700;from:120%r;easing:easeInOutCubic"></div>
              <div class="car car4" jq-effect="delay:1200;duration:800;from:120%r;easing:easeInOutCubic"></div>
            </div>
            <div class="navs">
              <div class="nav nav1" jq-effect="delay:1200;duration:200;effect:fadeLeft"></div>
              <div class="nav nav2" jq-effect="delay:1200;duration:400;effect:fadeLeft"></div>
              <div class="nav nav3" jq-effect="delay:1200;duration:600;effect:fadeLeft"></div>
              <div class="nav nav4" jq-effect="delay:1200;duration:800;effect:fadeLeft"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <footer>
      <div class="footer-inner clearfix">
        <div class="copyright">
          <div class="copy-name"><a target="_blank" href="http://www.porsche.com/china/">保时捷中国</a><em class="angle"></em></div>
          <div>&copy;2013 <a target="_blank" href="http://www.porsche.com/china/">保时捷中国</a><a target="_blank" href="http://www.porsche.com/china/zh/legal-notice/">法律公告</a></div>
        </div>
        <div class="share-btns share-btns" id="share-btns">
          <div class="share1 share_btn">
              <div class="share_li">
                  <h3>推荐  </h3>
                  <a class="a1" id="sharefriend" href="mailto:"><span>电子邮件</span></a>
                  <a class="a2" href="javascript:sharethis('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3a%2f%2ffp2013.porsche-event.cn%2f&amp;title=%232013+保时捷极至体验%23','qqspace',1);"><span>QQ 空间</span></a>
                  <a class="a3" href="javascript:sharethis('http://v.t.sina.com.cn/share/share.php?title=%25232013+保时捷极至体验%2523&amp;url=http%3a%2f%2ffp2013.porsche-event.cn%2f&amp;pic=http%3a%2f%2ffp2013.porsche-event.cn%2fshare.jpg','sina',1);"><span>新浪微博</span></a>
                  <a class="a4" href="javascript:sharethis('http://v.t.qq.com/share/share.php?title=%232013+保时捷极至体验%23&amp;amp;pic=http%3a%2f%2ffp2013.porsche-event.cn%2fshare.jpg','tecent',1);"><span>腾讯微博</span></a>
                  <a class="a5" href="javascript:sharethis('http://share.renren.com/share/buttonshare.do?link=http%3a%2f%2ffp2013.porsche-event.cn%2f&amp;amp;title=%232013+保时捷极至体验%23','renren',1);"><span>人人</span></a>
                  <a class="a6" href="javascript:sharethis('http://www.kaixin001.com/repaste/share.php?rtitle=Fascination+Porsche+2013&amp;rurl=http%3a%2f%2ffp2013.porsche-event.cn%2f&amp;rcontent=%232013+保时捷极至体验%23','kaixin',1);"><span>开心网</span></a>
                  <a class="a7" href="javascript:sharethis('http://t.sohu.com/third/post.jsp?&amp;url=http%3a%2f%2ffp2013.porsche-event.cn%2f&amp;title=%232013+保时捷极至体验%23','sohu',1);"><span>搜狐微博</span></a>
                  <a class="a8" href="javascript:sharethis('http://cang.baidu.com/do/add?it=2013+%e4%bf%9d%e6%97%b6%e6%8d%b7%e6%9e%81%e8%87%b3%e4%bd%93%e9%aa%8c&amp;iu=http%3a%2f%2ffp2013.porsche-event.cn%2f&amp;fr=ien#nw=1','baidu',1);"><span>百度</span></a>
                  <a class="a9" href="javascript:sharethis('http://shuqian.qq.com/post?jumpback=1&amp;title=%232013+保时捷极至体验%23&amp;uri=http%3a%2f%2ffp2013.porsche-event.cn%2f','qq',1);"><span>QQ 书签</span></a>
              </div>
          </div>
          <a class="share2 share_btn" target="_blank" href="http://e.weibo.com/porschechina"></a>
        </div>
      </div>
    </footer>
    <script type="text/javascript">
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        document.write('<iframe src="http://2980862.fls.doubleclick.net/activityi;src=2980862;type=2013_909;cat=pvomi743;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
    </script>
    <noscript>
        <iframe src="http://2980862.fls.doubleclick.net/activityi;src=2980862;type=2013_909;cat=pvomi743;ord=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
    </noscript>
    <script type="text/javascript">
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        document.write('<iframe src="http://2980862.fls.doubleclick.net/activityi;src=2980862;type=2013_909;cat=uvicr579;ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
    </script>
    <noscript>
        <iframe src="http://2980862.fls.doubleclick.net/activityi;src=2980862;type=2013_909;cat=uvicr579;ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
    </noscript>
 </body>
</html>