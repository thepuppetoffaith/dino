AFRAME.registerComponent("gesture-detector", {
  schema: {
    element: { default: "" }
  },
  init: function () {
    this.targetElement = this.data.element && document.querySelector(this.data.element);
    if (!this.targetElement) {
      this.targetElement = this.el;
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.targetElement.addEventListener("click", this.handleClick);
    this.targetElement.addEventListener("touchstart", this.handleTouchStart);
    this.targetElement.addEventListener("touchmove", this.handleTouchMove);
    this.targetElement.addEventListener("touchend", this.handleTouchEnd);
  },
  remove: function () {
    this.targetElement.removeEventListener("click", this.handleClick);
    this.targetElement.removeEventListener("touchstart", this.handleTouchStart);
    this.targetElement.removeEventListener("touchmove", this.handleTouchMove);
    this.targetElement.removeEventListener("touchend", this.handleTouchEnd);
  },
  handleClick: function (event) {
    this.el.emit("gesture-click", { event: event });
  },
  handleTouchStart: function (event) {
    this.touchStart = event.touches;
    if (event.touches.length == 1) {
      this.initialX = event.touches[0].clientX;
      this.initialY = event.touches[0].clientY;
    }
  },
  handleTouchMove: function (event) {
    if (!this.touchStart) return;

    const dx = event.touches[0].clientX - this.initialX;
    const dy = event.touches[0].clientY - this.initialY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      this.el.emit("gesture-drag", { dx, dy });
    }
  },
  handleTouchEnd: function () {
    this.touchStart = null;
  }
});
