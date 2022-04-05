app.UserList = Backbone.Collection.extend({
  model: app.User,
  localStorage: new Store("users")
});