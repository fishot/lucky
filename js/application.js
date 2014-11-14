var Status = {
  // just a normal guy
  NORMAL: 0,
  // lucky guy
  LUCKY: 1,
  // lucky guy, but he has leaved
  LUCKY_BUT_LEAVED: 2,
};

var status_to_string = function(status){
  switch (status) {
  case Status.NORMAL:
    return '-';
  case Status.LUCKY:
    return '中奖';
  case Status.LUCKY_BUT_LEAVED:
    return '离开';
  }
}

var lucky = (function(){
    this.speed = 50;
    this.intervalID;
    this.localdata = "";
    this.luckyindex = 0;
    this.luckyname = "开始抽奖";

    this.init = function(data){
        this.localdata = data;
        $("#lucky-name").text(this.luckyname);
        this.bindUI();
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
        $("#lucky-list").append('<span>'+luckyname+";</span>");

        this.localdata.splice(this.luckyindex, 1);
    };

    this.bindUI = function(){
        var go = function(){
            if(trigger.data("action") == "start") {
                trigger.data("action", "stop").html(text_stop);
                startRolling();
            } else {
                trigger.data("action", "start").html(text_start);
                stopRolling();
            }
        }
        var trigger = $("#go");
        var text_start = trigger.data("text-start");
        var text_stop = trigger.data("text-stop");
        trigger.html(text_start).click("click", function(){
            go();
            trigger.blur();
        });
        $(document).keydown(function(e){
            if(e.which == 32){
                go();
            }
        });
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
	});
    $("#lucky-list").on("dblclick", "span", function(){
        var $self = $(this);
        $(this).removeClass("red");
    });
});
