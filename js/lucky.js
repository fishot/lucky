var lucky = (function(){
    this.trigger = undefined;
    this.trigger_start_text = "按空格开始";
    this.trigger_stop_text = "按空格停止";

    this.roller = undefined;
    this.roller_id = undefined;
    this.roller_speed = 50;
    this.roller_on = false;

    this.checked_guys = undefined;
    this.shuffled_guys = undefined;
    this.lucky_guys = [];

    this.init = function(){
        var self = this;
        self.roller = $("#lucky-name");
        self.trigger = $("#go").html(self.trigger_start_text);
        self.checked_guys = store.get("checked_guys");
        if(!checked_guys) {
            self.roller.text("尚未导入签到人员名单, 导入后刷新本页");
            return ;
        } else {
            self.shuffled_guys = shuffle(shuffle(self.checked_guys));
        }

        self.trigger.click(function(){
            self.toggle();
        });
        $(document).keydown(function(e){
            if(e.which == 32) self.toggle(); // 监听空格键
        });
    };

    this.rolling = function(){
        var i = rand(this.shuffled_guys.length+1);
        var name = this.shuffled_guys[i-1];
        this.roller.text(name);
    };

    this.toggle = function(){
        if(this.roller_on){
            // change to stop
            this.roller_on = false;
            clearInterval(this.roller_id);
            this.trigger.html(this.trigger_stop_text);
            // show the lucky guy
            var lucky_guy = this.shuffled_guys.pop();
            this.lucky_guys.push(lucky_guy);
            this.roller.text(lucky_guy);
            // update the lucky guys
            var lucky_list = $("#lucky-list").empty();
            $.each(this.lucky_guys, function(i, v){
                lucky_list.append($('<span>'+v+";</span>"));
            });
        }else{
            // change to start
            this.roller_on = true;
            this.roller_id = setInterval(this.rolling, this.roller_speed);
            this.trigger.html(this.trigger_start_text);
        }
        this.trigger.blur();
    };

    return this;
})();

$(function(){
    $(".sponsors .unslider").unslider({
        speed: 500,
        delay: 3000
    });
    $("#lucky-list").on("click" ,"span", function(){
        $(this).addClass("red")
    }).on("dblclick", "span", function(){
        $(this).removeClass("red");
    });
    lucky.init();
});
