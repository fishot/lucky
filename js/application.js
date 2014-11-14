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

var listShow = function(id) {
    $("#lucky-list .isShow").removeClass("isShow").addClass("hidden");
    $(id).removeClass("hidden").addClass("isShow");
}



var lucky = (function(){
    this.speed = 50;
    this.intervalID;
    this.localdata = "";
    this.luckyindex = 0;
    this.luckyname = "开始抽奖";
    this.luckylist = []

    this.init = function(data){
        this.localdata = data;
        store.set("lucky_guy", this.luckylist);
        $("#lucky-name").text(this.luckyname);
        this._bindUI();
    };

    this.rolling = function(){
            var i = rand(this.localdata.length+1);
            var name = this.localdata[i-1];

            this.luckyindex = i-1;
            this.luckyname = name;

            showname = name.split(",")
            $("#lucky-name").text(showname[0]+","+showname[1]);
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
        $("#lucky-list .isShow").append('<span>'+luckyname+";</span>");
        console.log(luckyname,this.luckyname)
        var ranking = $("#lucky-list .isShow").attr("id")
        this.luckylist.push(this.luckyname + "," + ranking)
        store.set("lucky_guy", this.luckylist);
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

	$("#lucky-list").on("click" ,"span", function(){
		var $self = $(this);
		$(this).addClass("red")
	});

    $("#lucky-list").on("dblclick", "span", function(){
        var $self = $(this);
        $(this).removeClass("red");
    });

    $("#exportlucky").on("click",function(){
        exportdata = store.get("lucky_guy")
        var blob = new Blob([exportdata.join("\r\n")], {
            "type" : "text/plain;charset=utf-8",
        });
        var url = URL.createObjectURL(blob);
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false);
        $("<a>").attr("href", url).attr("download",
            "luckyguys.txt")[0].dispatchEvent(event);
        URL.revokeObjectURL(url);
    });

});

