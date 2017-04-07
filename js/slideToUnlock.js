;(function($,window){
	var slideToUnlock = function(ele,options){
		this.$container = ele,
		this.defaultOptions = {
			width: this.$container.width() - 4,
			height: this.$container.height() - 4,
			defaultText: "drag to unlock",
			successText: "success",
			defaultBg: "#FFF",
			successBg: "#78D02E",
			defaultTextColor: "#000",
			successTextColor: "#FFF",
			progressColor: "#78D02E",
			handleColor: "#fefefe",
			successFn: function(){
				console.log("unlock successfully");
			}
		};
		this.$text = "";
		this.$unlockBar = null;
		this.$progressBar = null;
		this.handleBar = null;

		this.options = Object.assign(this.defaultOptions,options);		
		this.unlocked = false;
	
		this.init();
		console.log(this.defaultOptions);

	};

	slideToUnlock.prototype = {
		init: function(){
			var self = this;
			var $container = self.$container,
				options = self.options;
			var template = '<div class="slide-to-unlock-bg"><span class="slide-to-unlock-text">' +options.defaultText +'</span></div><div class="slide-to-unlock-progress"></div><div class="slide-to-unlock-handle"></div>';
			$container.html(template);

			self.$text = $container.find(".slide-to-unlock-text");
			self.$unlockBar = $container.find(".slide-to-unlock-bg");
			self.$progressBar = $container.find(".slide-to-unlock-progress");
			self.$handleBar = $container.find(".slide-to-unlock-handle");

			self.$text.css({
                "line-height": options.height + 'px',
                "font-size": Math.floor(options.height / 3),
                "color": options.textColor
            });

           self.$unlockBar.css({
                "width": options.width + 'px',
                "height": options.height + 'px',
                "background-color": options.defaultBg,
            });

            self.$progressBar.css({
                "background-color": options.progressColor,
                "height": options.height - 2 + 'px'
            });

            self.$handleBar.css({
                "background-color": options.handleColor,
                "height": (options.height - 0) + 'px',
                "lineHeight": (options.height - 0) + 'px',
                "width": (Math.floor(options.width / 8)) + 'px',
            });

            self.bindEvents();
		},

		bindEvents: function(){
			var self = this;
			var startX = null;
			var isMob = self.isMobile();
			console.log(isMob);
			var maxWidth = self.$unlockBar.width() - self.$handleBar.width();
			
			/*
				兼容PC和MOB的点击事件
			*/
			var events = {
				"touchstart": isMob ? "touchstart" : "mousedown",
				"touchmove": isMob ? "touchmove" : "mousemove",
				"touchend": isMob ? "touchend" : "mouseup",
			};


			/*
				开始只绑定touchstart的事件
			*/			
			self.$handleBar.on(events["touchstart"],null,handleTouchStart);
		
			function handleTouchStart(e){
				startX = e.clientX || e.originalEvent.touches[0].clientX;
				$(document).on(events["touchmove"],null,handleTouchMove);
				$(document).on(events["touchend"],null,handleTouchEnd);
			}

			function handleTouchMove(e){
				var moveX = e.clientX || e.originalEvent.touches[0].clientX,
					diffX = moveX - startX < maxWidth ? moveX - startX : maxWidth;
				self.$handleBar.css({
                    left: diffX
                });
				self.$progressBar.width(diffX);
				if(diffX == maxWidth){
					$(document).off(events["touchmove"],null,handleTouchMove);
					startX = null;
					self.successUnlock();	
				}
				e.preventDefault();
			}
			
			function handleTouchEnd(e){
				if(!self.unlocked){
					self.$progressBar.animate({
                        width: 0
                    }, 250,"linear");
                    self.$handleBar.animate({
                        left: 0
                    }, 250,"linear");
				}
				$(document).off(events["touchmove"], null, handleTouchMove);
				$(document).off(events["touchend"], null, handleTouchEnd);
			}
		},

		successUnlock: function(){
			var self = this;
			
			self.$progressBar.css({"background-color": self.options.successBg,});
            self.$text.css({color: self.options.successTextColor});
            self.$text.text(self.options.successText);

            self.$handleBar = null;
            self.$progressBar = null;
            self.$unlockBar = null;
            self.$text = "";
            self.unlocked = true;
            setTimeout(function() {
                self.options.successFn && self.options.successFn();
            }, 50);
		},

		isMobile: function() {
  			var check = false;
  			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  			return check;
		}
	};

	$.fn.extend({
        slideToUnlock: function(options) {
            $.each(this, function(i, el) {
    			var $el = $(el);
    			$el.data(new slideToUnlock($el, options));
            });
        }
    });
})(jQuery,window)