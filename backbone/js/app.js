(function(){

// Model

var Task = Backbone.Model.extend({
  defaults: {
    title: "do something!",
    completed: false
  }
});

var task = new Task();

// view

var TaskView = Backbone.View.extend({
  tagName: 'li',
  events: {
    "click .command": "sayHello"
  },
  sayHello: function(){
    alert('hallo!');
  },
  //className: 'liClass',
  //id: 'liid'
  template: _.template( $('#task-template').html()),
  render: function() {
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  }
});
var taskView = new TaskView({model : task});
console.log(taskView.render().el);
$('body').append(taskView.render().el);
// console.log(taskView.$el)
//$でjqueryのメソッドになる
})();
