AFRAME.registerComponent('gesture-detector', {
  schema: {
    element: {default: ''},
  },

  init: function () {
    this.targetElement = this.data.element && document.querySelector(this.data.element) || this.el;
    this.internalState = {
      previousState: null,
    };
    this.emitGestureEvent = this.emitGestureEvent.bind(this);

    this.targetElement.addEventListener('mousedown', this.emitGestureEvent);
    this.targetElement.addEventListener('touchstart', this.emitGestureEvent);
  },

  remove: function () {
    this.targetElement.removeEventListener('mousedown', this.emitGestureEvent);
    this.targetElement.removeEventListener('touchstart', this.emitGestureEvent);
  },

  emitGestureEvent: function (event) {
    this.el.emit('click');
  },
});
