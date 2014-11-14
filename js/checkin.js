$(function(){
    var show_checkin_result = function(msg, msg_type){
        $("#checkin-info").removeClass("success error").addClass(msg_type).html(msg);
    };
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
    $("#clean-btn").click(function(){
        $("#checkin-number").val("")
    });
});