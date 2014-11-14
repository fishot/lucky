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

// 格式化字符串
function format(template, json){
    return template.replace(/#\{(.*?)\}/g, function(all, key){
        return json && (key in json) ? json[key] : "";
    });
};