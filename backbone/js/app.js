(function() {

var Task = Backbone.Model.extend({
  defaults: {
    title: 'do something!',
    completed: false
  }
});
var Tasks = Backbone.Collection.extend({model:Task});

var TaskView = Backbone.View.extend({
  tagName: 'li',
  initialize: function(){
    this.model.on('destroy',this.remove,this);
    this.model.on('change',this.render,this);
  },
  events: {
    'click .delete' : 'destroy',
    'click .toggle' : 'toggle'
  },
  toggle: function() {
    this.model.set('completed',!this.model.get('completed'));
  },
  destroy: function() {
    if (confirm('are you sure?')) {
      this.model.destroy();
    }
  },
  remove: function() {
    this.$el.remove();
  },
  template: _.template($('#task-template').html()),
  render: function(){
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  }
});
var TasksView = Backbone.View.extend({
  tagName: 'ul',
  render: function(){
    this.collection.each(function(task) {
      var taskView = new TaskView({model:task});
      this.$el.append(taskView.render().el);
    },this);
    return this;
  }
});

var AddTaskView = Backbone.View.extend({
  el: '#addTask',
  events: {
    'submit':'submit'
  },
  submit: function(e) {
    e.preventDrfault();
    var task = new Task({title: $('#title').val()});
  }this.collection.add(task);
});

var tasks = new Tasks([
  {
    title:'task1',
    completed: true
  },
  {
    title:'task2',
  },
  {
    title:'task3',
  }
]);

var tasksView = new TasksView({collection: tasks});
$('#tasks').html(tasksView.render().el);

})();
