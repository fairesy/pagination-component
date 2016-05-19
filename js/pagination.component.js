function Pagination(element){
  this.ee = new EventEmitter();
  this.ul = $(element);
  this.init();
}
Pagination.prototype.init = function(){
  
  this.ul.on("click", "a", $.proxy(this, "._move");
}
Pagination.prototype._move = function(){
  //logic
}
Pagination.prototype.on = function(eventName, fp){
  this.ee.addListener(eventName, fp);
}
Pagination.prototype.off = function(eventName, fp){
  this.ee.removeListener(eventName, fp);
}
