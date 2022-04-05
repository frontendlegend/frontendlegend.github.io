app.UserRowView = Backbone.View.extend({
  tagName: "tr",
  template: _.template(document.getElementById("row-template").innerHTML),
  render: function() {
    this.el.innerHTML = this.template(this.model.toJSON());
    this.nameInput = this.el.querySelector(".nameInput");
    this.nameError = this.el.querySelector(".nameError");
    this.phoneInput = this.el.querySelector(".phoneInput");
    this.phoneError = this.el.querySelector(".phoneError");
    return this;
  },
  initialize: function() {
    this.model.on("change", this.render, this);
    this.model.on("destroy", this.remove, this);
  },
  events: {
    "click .editBtn": "edit",
    "click .saveBtn": "save",
    "click .removeBtn": "destroy",
    "input .nameInput": "checkName",
    "input .phoneInput": "checkPhone",
  },
  checkName: function() {
    return validateName(this.nameInput, this.nameError);
  },
  checkPhone: function() {
    return validatePhone(this.phoneInput, this.phoneError);
  },
  edit: function() {
    this.el.classList.add("editing");
  },
  save: function() {
    const nameIsValid = this.checkName();
    const phoneIsValid = this.checkPhone();
    if (!nameIsValid || !phoneIsValid) return;

    const name = this.nameInput.value.trim();
    const phone = this.phoneInput.value.trim();
    this.model.save({ name, phone });
    this.el.classList.remove("editing");
  },
  destroy: function() {
    this.model.destroy();
  }
});