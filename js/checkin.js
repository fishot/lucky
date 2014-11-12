$(function(){

    function format(template, json){
        return template.replace(/#\{(.*?)\}/g, function(all, key){
            return json && (key in json) ? json[key] : "";
        });
    };

    // localStorage 简单封装
    var store = {
        'size' : function(){
            return localStorage.length;
        },
        'get' : function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        'set' : function(key, value){
            localStorage.setItem(key, JSON.stringify(value));
        },
        'key' : function(index) {
            return localStorage.key(index);
        },
        'remove' : function(key) {
            localStorage.removeItem(key);
        },
        'clear' : function(){
            localStorage.clear();
        }
    };

    // 数据载入
    var load_donators = function(text_content){
        var lines = text_content.split("\r\n");
        var FORMAT = "姓名,邮件,昵称"; // 数据格式
        if(lines.length < 1 || lines[0].trim() != FORMAT){
            console.error("文件格式错误");
        }
        var donator_emails = []
        for(var i = 1; i < lines.length; i++){
            var parts = lines[i].trim().split(",");
            var email = parts[1] && parts[1].trim();
            if(email && email != ""){
                donator_emails.push(email);
            }
        }
        store.set("checkin_donator_emails", donator_emails.join("|"));
    };

    var load_sponsors = function(text_content){
        var lines = text_content.split("\r\n");
        var FORMAT = "手机号,来源,计划参会城市"; // 数据格式
        if(lines.length < 1 || lines[0].trim() != FORMAT){
            console.error("文件格式错误");
        }
        for(var i = 1; i < lines.length; i++){
            var parts = lines[i].trim().split(",");
            var ticket = {
                'number' : parts[0], // phone number as check-in number
                'tickets' : "1 x 赞助商赠票",
                'name' : parts[1],  // 来源作为用户名
                'email' : parts[0], // phone number as email
                'type' : 'sponsor',
                'checked' : 0,
            };
            var number = ticket['number'] && ticket['number'].trim();
            if(number && number != ""){
                store.set("checkin_ticket_" + number, ticket);
            }
        }
    };

    var load_tickets = function(text_content){
        var lines = text_content.split("\r\n");
        var FORMAT = "签到码,门票,姓名,Email"; // 数据格式
        if(lines.length < 1 || lines[0].trim() != FORMAT){
            console.error("文件格式错误");
        }
        for(var i = 1; i < lines.length; i++){
            var parts = lines[i].trim().split(",");
            var ticket = {
                'number' : parts[0],
                'tickets' : parts[1],
                'name' : parts[2],
                'email' : parts[3],
                'type' : 'normal',
                'checked' : 0,
            };
            var number = ticket['number'] && ticket['number'].trim();
            if(number && number != ""){
                store.set("checkin_ticket_" + number, ticket);
            }
        }
    };

    var export_checkin = function(){

    };

    var read_file = function(file, load_data_function){
        if(!file) return;
        var reader = new FileReader();
        var filename = file.name;
        if (/text\/\w+/.test(file.type)) {
            reader.onload = function() {
                load_data_function(this.result);
            };
            reader.readAsText(file);
            console.log("processed " + filename);
        }
    };

    var show_checkin_result = function(msg, msg_type){
        $("#checkin-info").removeClass("success error").addClass(msg_type).html(msg);
    };

    $("#import-donators").change(function() { read_file(this.files[0], load_donators); });
    $("#import-tickets").change(function() { read_file(this.files[0], load_tickets); });
    $("#import-sponsors").change(function() { read_file(this.files[0], load_sponsors); });
    $("#dashboard-switch").click(function() {
        $(".dashboard").toggle("hide");
    });
    $("#checkin-btn").click(function(){
        var number = $("#checkin-number").val().trim();
        if(number == "") {
            show_checkin_result("请输入签到码（赞助商赠票使用手机号作为签到码）", "error");
            return ;
        }
        var ticket = store.get("checkin_ticket_" + number);
        if(ticket){
            var emails = store.get("checkin_donator_emails");
            var text = format("#{name}(#{email})<br/>#{tickets}", {
                'name' : ticket['name'],
                'email' : ticket['email'],
                'tickets' : ticket['tickets'],
            });
            if(emails.search(ticket['email'].trim()) > -1){
                text += "<br/>个人赞助者！";
            }
            ticket['checked'] = 1
            store.set("checkin_ticket_" + number, ticket);
            show_checkin_result(text, "success");
        }else{
            show_checkin_result("无效签到码", "error");
        }
    });
    $("#export-checked").click(function(){
        var length = store.size();
        var lines = [];
        for(var i = 0; i < length; i++){
            var key = store.key(i);
            if(key.search("checkin_ticket_") != 0){
                continue;
            }
            var ticket = store.get(key);
            if(ticket['checked'] == 0) {
                continue;
            }
            var name = ticket['name'] && ticket['name'].trim();
            var email = ticket['email'] && ticket['email'].trim();
            if(name && email){
                lines.push(name + "," + email);
            }
        }
        console.log(lines)
        var blob = new Blob([lines.join("\r\n")], {
            "type" : "text/plain;charset=utf-8",
        });
        var url = URL.createObjectURL(blob);
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false);
        $("<a>").attr("href", url).attr("download",
            "checked.txt")[0].dispatchEvent(event);
        URL.revokeObjectURL(url);
    });
    $(".fake-import-btn").click(function(){
        $($(this).attr("data-target")).click();
    });
});