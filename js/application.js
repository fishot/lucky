 var data =  [ 'C001,123@gmail.com','C002,asd123@gmail.com','C003,7772@gmail.com','C004,asd123@gmail.com,','C005','C006,asd123@gmail.com','C007,asd123@gmail.com','C008','C009',"B001,asd123@gmail.com","B002","B003","B004,asd123@gmail.com","B005","B006",
        "A001,123@gmail.com","A002,123@gmail.com","A003,asd123@gmail.com","A004,7772@gmail.com","A005","A006,asd123@gmail.com","A007","A008,asd123@gmail.com","A009","张三,asd123@gmail.com","李四,asd123@gmail.com","王五","孙六"]

var lucky = (function(){

    this.speed = 50;
    this.intervalID;
    this.localdata;

    this.luckyindex = 0;
    this.luckyname = "开始抽奖";

    this.init = function(data){
        this.localdata = data
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
        $("#lucky-list").append('<a>'+luckyname+"</a>");

        this.localdata.splice(this.luckyindex, 1);
    }

    this._bindUI = function(){

        // bind button
        var trigger = document.querySelector('#go')
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
            };
        };

        // bind keydown
        document.addEventListener('keydown', function(ev) {
            if (ev.keyCode == '32') {
              go()
            }
            else if (ev.keyCode == '27') {
              that.moveLucky()
            }
        }, false);
    };

    return this
})();

$(function(){
    lucky.init(data)
})
