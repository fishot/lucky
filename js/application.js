
var lucky = (function(){

    this.speed = 50;
    this.intervalID;
    this.localdata = "";

    this.luckyindex = 0;
    this.luckyname = "开始抽奖";

    this.init = function(data){
        this.localdata = data;
        $("#lucky-name").text(this.luckyname);

        this._bindUI();
    };

    this.rolling = function(){

            var i = rand(this.localdata.length+1);
            var name = this.localdata[i-1];

            this.luckyindex = i-1;
            this.luckyname = name;

            $("#lucky-name").text(name);
    };

    this.startRolling = function(){
        
        this.intervalID = setInterval(this.rolling, this.speed);
    };

    this.stopRolling = function(){
        clearInterval(this.intervalID);
        this.showLucky();
    };

    this.showLucky = function(){
        var luckyname = $("#lucky-name").text();
        $("#lucky-list").append('<span>'+luckyname+"</span>");

        this.localdata.splice(this.luckyindex, 1);
    };

    this._bindUI = function(){

        // bind button
        var trigger = document.querySelector('#go');
        trigger.innerHTML = trigger.getAttribute('data-text-start');
        trigger.addEventListener('click', go, false);

        function go() {
            if (trigger.getAttribute('data-action') === 'start') {
              trigger.setAttribute('data-action', 'stop');
              trigger.innerHTML = trigger.getAttribute('data-text-stop');
              startRolling();
            }
            else {
              trigger.setAttribute('data-action', 'start');
              trigger.innerHTML = trigger.getAttribute('data-text-start');
              stopRolling();
            }
        }

        // bind keydown
        document.addEventListener('keydown', function(ev) {
            if (ev.keyCode == '32') {
              go();
            }
            else if (ev.keyCode == '27') {
              that.moveLucky();
            }
        }, false);
    };

    return this;
})();

$(function(){
    lucky.init(data);
	$(".sponsors .unslider").unslider({
        speed: 500,
        delay: 3000
    });
	//点击变色
	$("#lucky-list").on("click" ,"span", function(){
		var $self = $(this);
		$(this).addClass("red")
/*				.siblings().removeClass("red");*/
	});
    $("#lucky-list").on("dblclick", "span", function(){
        var $self = $(this);
        $(this).removeClass("red");
    });
    /*$("#diamond").unslider({
		complete: function(){
		}
	});
    $("#platinum").unslider();
    $("#gold").unslider();
    $("#silver").unslider();
    $("#bronze").unslider();
    $("#partner").unslider();*/
    
    

});
/*$('#gold').carousel({
        showSurrounding: true 
        //是否显示周围的区域，不设置则默认为false，个别需要显示旁边元素显示美化效果的需求时用到，如百度相册首页就有这样的效果
        ,reverse:true //自动动画方向，不设置则默认为向右（false），设置为true则相反
        ,interval: 1 //自动播放的间隔时间（秒），不设置则默认是5（秒）
        ,speed: 0.2 //滚动一次需要的时间(秒)，不设置则默认是0.6（秒）
        ,indicatorPosition: 'top' //指示器（小圆点）的位置（top，bottom），不设置则默认是bottom
        ,indicatorAlign: 'right' //指示器水平位置（left，center，right），不设置则默认是center
    });*/