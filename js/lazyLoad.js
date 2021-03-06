;(function($){
	$.fn.picLazyLoad=function(settings){
            var $this = $(this),
                _winScrollTop =0,
                _winHeight = $(window).height();

             settings=$.extend({
             	threshold:0,//提前加载高度
             	placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
             },settings||{});
             

              // 执行懒加载图片
              lazyLoadPic();

              $(window).scroll(function(){
              	  _winScrollTop = $(window).scrollTop();
              	  lazyLoadPic();
              });

              function lazyLoadPic(){
              	$this.each(function(index,value){
              		var $self = $(this);
              		if($self.is('img')){
              			if($self.attr('data-original')){
              				var _offsetTop = $self.offset().top;
              				if( (_offsetTop - settings.threshold) <= (_winHeight+_winScrollTop)){
              					$self.attr('src',$self.attr('data-original'));
              					$self.removeAttr('data-original');
              				}
              			}
              		}else{//如果是背景图
                        if($self.attr('data-original')){
                        	//默认占位图片
                            if($self.css('background-image') === 'none'){
                            	$self.css('background-image','url('+settings.placeholder+')');
                            }
                            var _offsetTop = $self.offset().top;
                            if((_offsetTop - settings.threshold) <= (_winHeight+_winScrollTop)){
                            		   $self.css('background-image','url('+$self.attr('data-original')+')');
                                       $self.removeAttr('data-original');
                            }
                        }
              		}
              	});
              }
	};
})(jQuery);