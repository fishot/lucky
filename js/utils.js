// Math.floor(Math.random()*n+1)
// The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
// See: http://www.msc.cornell.edu/~houle/javascript/randomizer.html
rnd.today = new Date();
rnd.seed = rnd.today.getTime();

function rnd() {
  rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
  return rnd.seed / (233280.0);
};

function rand(number) {
  return Math.ceil(rnd() * number);
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

// 格式化字符串
function format(template, json){
    return template.replace(/#\{(.*?)\}/g, function(all, key){
        return json && (key in json) ? json[key] : "";
    });
};