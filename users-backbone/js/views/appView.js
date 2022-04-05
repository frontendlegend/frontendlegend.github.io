app.AppView = Backbone.View.extend({
  el: "#app",
  initialize: function() {
    this.rows = this.el.querySelector("#rows");
    this.nameInput = this.el.querySelector("#name");
    this.nameError = this.el.querySelector("#nameError");
    this.phoneInput = this.el.querySelector("#phone");
    this.phoneError = this.el.querySelector("#phoneError");
    this.addBtn = this.el.querySelector("#add");
    app.userList.on("add", this.addAll, this);
    app.userList.fetch();
  },
  events: {
    "click #add": "createUser",
    "input #name": "checkName",
    "input #phone": "checkPhone",
  },
  checkName: function() {
    return validateName(this.nameInput, this.nameError);
  },
  checkPhone: function() {
    return validatePhone(this.phoneInput, this.phoneError);
  },
  addOne: function(user) {
    var view = new app.UserRowView({ model: user });
    this.rows.append(view.render().el);
  },
  addAll: function() {
    this.rows.innerHTML = "";
    app.userList.each(this.addOne, this);
  },
  createUser: function() {
    const nameIsValid = this.checkName();
    const phoneIsValid = this.checkPhone();
    if (!nameIsValid || !phoneIsValid) return;

    app.userList.create(this.newUser());
    this.nameInput.value = "";
    this.phoneInput.value = "";
  },
  newUser: function() {
    return {
      name: this.nameInput.value.trim(),
      phone: this.phoneInput.value.trim(),
    }
  }
});