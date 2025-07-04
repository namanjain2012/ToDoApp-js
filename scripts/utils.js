export function init(){
    var c=0;
    return function(){
        c++;
        return c;
    }
}