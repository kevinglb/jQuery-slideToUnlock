拖动（滑动）解锁js
# jQuery-slideToUnlock

###slideToUnlock.js(依赖jQuery)
####使用方法：

    /* HTML Code */
    <div class="slideToUnlock bar"></div>
    
    <script type="text/javascript">
     $(".slideToUnlock").slideToUnlock(); //默认
    
     $(".slideToUnlock").slideToUnlock({
	    width: 300,  //宽度 默认为元素宽度
        height: 50,	  //高度 默认为元素高度
        defaultText: "向右解锁", //显示文字 默认为"drag to unlock" 
        successText: "解锁成功", //成功的显示文字 默认为"success"
        defaultBg: "#FFF",  //显示背景颜色 默认为#FFF
        successBg: "#78D02E",  //解锁成功背景颜色 默认为#78D02E
        defaultTextColor: "#000", //默认显示文字颜色 默认为#000
        successTextColor: "#FFF", //成功解锁显示文字颜色 默认为#FFF
        progressColor: "#78D02E",	//解锁中进度背景颜色 默认为#78D02E
        handleColor: "#fefefe", //解锁Bar背景颜色 默认为#fefefe
        successFn: function(){} //解锁成功后的调用函数
       });
    </script>

###slideUnlock.js(不依赖jQuery)
####使用方法：

  
    <div class="slideUnlock bar">
	    <div class="slide-to-unlock-bg ">
		    <span class="slide-to-unlock-text"></span>
		</div>
		<div class="slide-to-unlock-handle"></div>
	</div>
	  /*
    	HMTL Code可以按照上面方式
    	也可以不写内容（不推荐），如下
    */
    <div class="slideUnlock bar"></div>
    
    <script type="text/javascript">
    	var slideUnlock = slideUnlock(".slideUnlock"); //默认
    
    	var slideUnlock = slideUnlock(".slideUnlock"，{
    		width: 300,  //宽度 默认为元素宽度
    		height: 50,	  //高度 默认为元素高度
    		defaultText: "向右解锁", //显示文字 默认为"drag to unlock" 
    		successText: "解锁成功", //成功的显示文字 默认为"success"
    		defaultBg: "#FFF",  //显示背景颜色 默认为#FFF
    		successBg: "#78D02E",  //解锁成功背景颜色 默认为#78D02E
    		defaultTextColor: "#000", //默认显示文字颜色 默认为#000
    		successTextColor: "#FFF", //成功解锁显示文字颜色 默认为#FFF
    		progressColor: "#78D02E",	//解锁中进度背景颜色 默认为#78D02E
    		handleColor: "#fefefe", //解锁Bar背景颜色 默认为#fefefe
    		successFn: function(){} //解锁成功后的调用函数
    	});
    </script>
jQuery-slideToUnlock

slideToUnlock.js(依赖jQuery)

使用方法：

/* HTML Code */
<div class="slideToUnlock bar"></div>

<script type="text/javascript">
 $(".slideToUnlock").slideToUnlock(); //默认

 $(".slideToUnlock").slideToUnlock({
    width: 300,  //宽度 默认为元素宽度
    height: 50,   //高度 默认为元素高度
    defaultText: "向右解锁", //显示文字 默认为"drag to unlock" 
    successText: "解锁成功", //成功的显示文字 默认为"success"
    defaultBg: "#FFF",  //显示背景颜色 默认为#FFF
    successBg: "#78D02E",  //解锁成功背景颜色 默认为#78D02E
    defaultTextColor: "#000", //默认显示文字颜色 默认为#000
    successTextColor: "#FFF", //成功解锁显示文字颜色 默认为#FFF
    progressColor: "#78D02E",   //解锁中进度背景颜色 默认为#78D02E
    handleColor: "#fefefe", //解锁Bar背景颜色 默认为#fefefe
    successFn: function(){} //解锁成功后的调用函数
   });
</script>
slideUnlock.js(不依赖jQuery)

使用方法：

<div class="slideUnlock bar">
    <div class="slide-to-unlock-bg ">
        <span class="slide-to-unlock-text"></span>
    </div>
    <div class="slide-to-unlock-handle"></div>
</div>
  /*
    HMTL Code可以按照上面方式
    也可以不写内容（不推荐），如下
*/
<div class="slideUnlock bar"></div>

<script type="text/javascript">
    var slideUnlock = slideUnlock(".slideUnlock"); //默认

    var slideUnlock = slideUnlock(".slideUnlock"，{
        width: 300,  //宽度 默认为元素宽度
        height: 50,   //高度 默认为元素高度
        defaultText: "向右解锁", //显示文字 默认为"drag to unlock" 
        successText: "解锁成功", //成功的显示文字 默认为"success"
        defaultBg: "#FFF",  //显示背景颜色 默认为#FFF
        successBg: "#78D02E",  //解锁成功背景颜色 默认为#78D02E
        defaultTextColor: "#000", //默认显示文字颜色 默认为#000
        successTextColor: "#FFF", //成功解锁显示文字颜色 默认为#FFF
        progressColor: "#78D02E",   //解锁中进度背景颜色 默认为#78D02E
        handleColor: "#fefefe", //解锁Bar背景颜色 默认为#fefefe
        successFn: function(){} //解锁成功后的调用函数
    });
</script>
       

Find document
Flex
Hello!
Title

