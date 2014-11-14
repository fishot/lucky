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

//@ http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};