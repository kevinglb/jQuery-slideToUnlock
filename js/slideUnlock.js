;(function(){
	var slideUnlock = function(ele,options,successFn) {
		if(!(this instanceof slideUnlock)){
			return new slideUnlock(ele,options,successFn);
		}

		//get the element primarily because the width and height in defaultOptions depend on the element's propterty
		this.ele = this.validEle(ele) ? document.querySelectorAll(ele)[0] : document;
		
		this.defaultOptions = {
			width: parseInt(this.ele.clientWidth),
			height: parseInt(this.ele.clientHeight),
			defaultText: "drag to unlock",
			successText: "success",
			defaultBg: "#FFF",
			successBg: "#78D02E",
			defaultTextColor: "#000",
			successTextColor: "#FFF",
			progressColor: "#78D02E",
			handleColor: "#fefefe",
		};
		/*
			set the callback function on success, combine user's options with the defaultOptions
		*/
		this.successFn = (successFn && this.validFn(successFn)) ? successFn : function(){console.log("unlock succssfully")};
		this.options = (options && this.validObj(options)) ? Object.assign(this.defaultOptions,options) : this.defaultOptions;

		this.text = "";
		this.unlockBar = null;
		this.progressBar = null;
		this.handleBar = null;
		this.unlocked = false;

		this.init();
	};

	slideUnlock.prototype = {
		init: function(){

			let self = this;
			var ele = self.ele,
				options = self.options;
			
			/*
				if the corresponding HTML element doesn't exist, we will create one and append to the target element
			*/	
			self.unlockBar = ele.getElementsByClassName("slide-to-unlock-bg")[0] || self.createBg();
			self.text = ele.getElementsByClassName("slide-to-unlock-text")[0] || self.createText();
			self.progressBar = ele.getElementsByClassName("slide-to-unlock-progress")[0] || self.createProgress();
			self.handleBar = ele.getElementsByClassName("slide-to-unlock-handle")[0] || self.createHandler();

			self.text.innerText  = options.defaultText;

			/*
				set the initial styles and bind events
			*/
			self.setStyle();
            self.bindEvents();
		},
		
		createBg: function() {
			let self = this;

			var bg = document.createElement("div");
				text = document.createElement("span");
			bg.classList.add("slide-to-unlock-bg");

			text.innerText = self.options.defaultText;
			text.classList.add("slide-to-unlock-text");

			bg.appendChild(text);
			//the unlockBar must be the firstChild of the target element based on the css setting
			self.ele.insertBefore(bg, self.ele.firstChild);

			return bg;
		},

		createText: function() {
			let self = this;

			var text = document.createElement("span");
			text.innerText = self.options.defaultText;
			text.classList.add("slide-to-unlock-text");

			self.unlockBar.appendChild(text);

			return text;
		},

		createProgress: function() {
			let self = this;

			var progress = document.createElement("div");
			progress.classList.add("slide-to-unlock-progress");
			self.ele.appendChild(progress);

			return progress;
		},

		createHandler: function() {
			let self = this;

			var handle = document.createElement("div");
			handle.classList.add("slide-to-unlock-handle");
			self.ele.appendChild(handle);

			return handle;
		},

		bindEvents: function(){
			let self = this;
			var startX = null,
				isMob = self.isMobile(),
				maxWidth = self.unlockBar.clientWidth - self.handleBar.clientWidth;
			
			/*
				Compatible events' names for both PC and Mobile devices
			*/
			var events = {
				"touchstart": isMob ? "touchstart" : "mousedown",
				"touchmove": isMob ? "touchmove" : "mousemove",
				"touchend": isMob ? "touchend" : "mouseup",
			};

			/*
				add only touchStart event  at the beginning
			*/		
			if(!self.unlocked){
				self.addEvent(self.handleBar, events["touchstart"], handleTouchStart);
			}	
			
			function handleTouchStart(e){
				e.preventDefault();
				startX = e.clientX || e.originalEvent.touches[0].clientX;
				self.addEvent(document, events["touchmove"],handleTouchMove);
				self.addEvent(document, events["touchend"],handleTouchEnd);
			}

			function handleTouchMove(e){
				e.preventDefault();
				e.stopPropagation();

				var moveX = e.clientX || e.originalEvent.touches[0].clientX;	
				//disable moving to left
				if(moveX < startX){
					self.rmEvent(document, events["touchmove"],handleTouchMove);
					self.rmEvent(document,events["touchend"], handleTouchEnd);
					return;
				}

				var diffX = moveX - startX < maxWidth ? moveX - startX : maxWidth;
				self.handleBar.style.left = diffX + "px";
				self.progressBar.style.width = diffX + 'px';

				/*
					if succeed remove all events
				*/
				if(diffX === maxWidth){
					self.rmEvent(self.handleBar, events["touchstart"],handleTouchStart)
					self.rmEvent(document, events["touchmove"],handleTouchMove);
					self.rmEvent(document, events["touchend"], handleTouchEnd);
					startX = null;
					self.successUnlock();	
				}
				
			}
			
			function handleTouchEnd(e){
				if(!self.unlocked){
					self.animate(self.progressBar,{width:'0'},300);
					self.animate(self.handleBar,{left:'0'},300);
				}
				
				self.rmEvent(document,events["touchmove"], handleTouchMove);
				self.rmEvent(document,events["touchend"], handleTouchEnd);
			}

			function rmAnimation(ele){
				ele.classList.remove("animated");
			}
		},

		successUnlock: function(){
			let self = this;

			self.ele.classList.add("success");
			self.progressBar.style.backgroundColor = self.options.successBg;
            self.text.style.color =  self.options.successTextColor;
            self.text.innerText = self.options.successText;

            self.handleBar = null;
            self.rogressBar = null;
            self.unlockBar = null;
            self.text = "";
            self.unlocked = true;

            /*
				call the callback function in options with a 50ms delay
			*/
            setTimeout(function() {
                self.successFn && self.successFn();
            }, 50);
		},

		addEvent: function(target,event,handler){ 
			target.addEventListener(event, handler);
		},

		rmEvent: function(target,event,handler){
			target.removeEventListener(event, handler);
		},

		setStyle: function() {
			let self = this,
				options = self.options;
			
			self.text.style.color = options.defaultTextColor;
			self.text.style.lineHeight = options.height + 'px';

           	self.unlockBar.style.width = options.width + 'px';
            self.unlockBar.style.height = options.height + 'px';
            self.unlockBar.style.backgroundColor = options.defaultBg;

            self.progressBar.style.backgroundColor = options.progressColor;
            self.progressBar.style.height = options.height - 2 + 'px';

            self.handleBar.style.backgroundColor = options.handleColor;
            self.handleBar.style.height = options.height + 'px';
            self.handleBar.style.width = Math.floor(options.width / 8) + 'px';
		},

		isMobile: function() {
  			var check = false;
  			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  			return check;
		},

		validFn: function(fn) {
			if(typeof fn === "function"){
				return true;
			}else{
				console.log("the parameter is not a function");
			}
		},

		validEle: function(ele,context) {
			if(((context || document).querySelectorAll(ele)).length > 0){
				return true;
			}else{
				console.log("the element doesn't exist");
				return false;
			}
		},

		validObj: function(obj) {
			if(typeof obj === "object"){
				return true;
			}else{
				console.log("the parameter is not a object");
			}
		},	
		
		//determine with transitionend it has
		transitionEnd: function(){
			var t,
            	el = document.createElement("div");
        	var transitions = {
            	"transition"      : "transitionend",
           		"OTransition"     : "oTransitionEnd",
            	"MozTransition"   : "transitionend",
           		"WebkitTransition": "webkitTransitionEnd"
        	};
        	for(t in transitions){
            	if(el.style[t] !== undefined){
                	return transitions[t];
           		}
        	}
		},

		execution: function(ele, key, val ,t) {
			/*
				element,
				style property
				value to achieve
				time
			*/
			let self = this;
			var s = (new Date()).getTime(),
				d = t || 300,
                b = parseInt(ele.style[key]) || 0,
                c = val-b;


            (function(){
               	var t = (new Date()).getTime() - s;
                if(t > d){
                   	t = d;
                    ele.style[key] = tween(t,b,c,d)+'px';
                }
               	
               	ele.style[key] = tween(t,b,c,d)+'px';
                setTimeout(arguments.callee,10);

            })();

            function tween(t,b,c,d){
            	return -c*(t/=d)*(t-2) + b;
            }
		},

		animate: function(ele, style, t){
			/*
				element
				style object(including style property and value)
				time
			*/
			let self = this;
			for(var prop in style){
                self.execution(ele,prop,parseInt(style[prop]),t);
            }
        }

		
	}
		
	
	window.slideUnlock = slideUnlock;
})()