angular.module('app')

.directive('ngClassCallback', function ngClassCallback($animate, $parse) {

  return {
    restrict: 'A',
    compile: compile
  };

  function compile(element, attributes) {
    // Expression that will be evaluated for each animation event/phase
    var callback = $parse(attributes.ngClassCallback);
    return postLink;
    function postLink(scope, element) {
      // Start $animate service listening for class changes
      $animate.on('addClass', element, addClassListener);
      $animate.on('removeClass', element, removeClassListener);
      $animate.on('setClass', element, setClassListener);
      // Stop $animate service listening for class changes
      scope.$on('$destroy', function() {
        $animate.off('addClass', element, addClassListener);
        $animate.off('removeClass', element, removeClassListener);
        $animate.off('setClass', element, setClassListener);
      });
      function addClassListener(animatingElement, phase) {
        animationEventListener('addClass', animatingElement, phase);
      }
      function removeClassListener(animatingElement, phase) {
        animationEventListener('removeClass', animatingElement, phase);
      }
      function setClassListener(animatingElement, phase) {
        animationEventListener('setClass', animatingElement, phase);
      }
      // Expose $animate event and phase (start, close)
      function animationEventListener(animationEvent, animatingElement, phase) {
        scope.$apply(function() {
          // Fire callback only if the animating element is the directive element.
          // Otherwise, animating children of this element also fire the callback.
          if (animatingElement === element) {
            callback(scope, { $event: animationEvent, $phase: phase });
          }
        });
      }
    }
  }

});
