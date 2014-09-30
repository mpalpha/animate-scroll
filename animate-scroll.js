/*
Plugin Name: jQuery Animation Scroll Plugin
Plugin Description: animate-scroll is a Viewport triggered animation utility.
Copyright (C) 2014  Jason Paul Lusk (Jason@jasonlusk.com)
Author: Jason Lusk
Author URI: JasonLusk.com
GIT URI: https://github.com/mpalpha/animate-scroll.git
Requirements: 
  jQuery.js v1.10.1+ from jquery.com.
  TweenMax.js 1.10.2+, TimelineMax.js v1.10.2+, EasePack.js v1.9.3+ from www.greensock.com.
Initialize:
  $(document).animateScroll();
Example html:
  <p data-animate-scroll='{
    "scaleX": "1.5",
    "scaleY": "1.5",
    "x": "-10",
    "y": "-10",
    "rotation": "-3",
    "alpha": "1",
    "easingType": "Cubic.easeOut",
    "duration": "1"
    }'>test</p>
 */
(function($, window, document) {
    'use strict';
    var $window = $(window),
        //init scroll-event only once for better performance -> save target-data first in arrays
        animations = [],
        throttle = null,
        animateScroll = {
            bind: function(el, options) {
                $window.on('scroll resize orientationchange touchend gestureend', function(e) {
                    throttle = !!throttle ? null: setTimeout(function() {
                        animateScroll.inview(e.type != 'scroll', el);
                        throttle = null;
                    }, 250);
                });
                $(el).on('reverse play', function(evt) {
                    var $this = $(this),
                        $timeline = $this.data('tween'),
                        action;
                    // animate target object based on viewport check event
                    if (!!$timeline && evt.type != action) {
                        if (!options.animateAll && evt.type == 'play') {
                            $timeline.progress(1, true);
                        }
                        $timeline[evt.type]();
                        action = evt.type;
                    }
                });
            },
            check: function(target) {
                // is stored original element position centered within the viewport
                var tObj = $(target),
                    vTop = $window.scrollTop(),
                    vBottom = vTop + $window.height(),
                    elTop = tObj.data('originalOffset').top,
                    elBottom = elTop + parseInt(tObj.data('originalSize').height);
                return (vTop < elBottom && elBottom < vBottom) || (vTop < elTop && elTop < vBottom) ? 'reverse' : 'play';
            },
            update: function($this, $timeline) {
                var $progress = $timeline.progress();
                $timeline.progress(0, true);
                // update saved offset and size
                $this.data({
                    'originalOffset': $this.offset(),
                    'originalSize': {
                        width: $this.width(),
                        height: $this.height()
                    }
                })
                    .promise()
                    .done(function() {
                        $timeline
                            .play($progress);
                    });

            },
            inview: function(resize, el) {
                animations.each(function() {
                    var $this = $(this),
                        $timeline = $this.data('tween');;
                    if (!!$this.data('tween')) {
                        if (!!resize) {
                            $timeline
                                .pause();
                            animateScroll.update($this, $timeline);
                        }
                        // trigger animation event
                        $this
                            .trigger(animateScroll.check(this));
                    }
                });
            },
            init: function(animations) {
                // function to initialize plugin and pass custom variables from html5 data attributes
                animations.each(function() {
                    var $el = $(this);
                    $el
                        .animateScroll($el.data('animate-scroll'));
                })
                    .promise()
                    .done(function() {
                        animateScroll.inview();
                    });
            },
            setup: function($this, $parent, options) {
                // setup parent element perspective
                TweenMax.set($parent, {
                    transformPerspective: options.transformPerspective,
                    onComplete: function() {
                        $parent
                            .css({
                                'perspective': options.transformPerspective
                            });
                    }
                });
                $this
                    .css({
                        "-webkit-transform": "translate3D(0,0,1px)"
                    })
                    .data({
                        'originalOffset': $this.offset(),
                        'originalSize': {
                            width: $this.width(),
                            height: $this.height()
                        },
                        'tween': new TimelineMax({
                            paused: true,
                            reversed: true
                        })
                            .to($this, options.duration, {
                                x: options.x,
                                y: options.y,
                                scaleX: options.scaleX,
                                scaleY: options.scaleY,
                                rotation: options.rotation,
                                autoAlpha: options.alpha,
                                ease: options.easingType,
                                transformStyle: 'preserve-3d',
                                rotationX: options.rotationX,
                                rotationY: options.rotationY,
                                transformOrigin: options.transformOrigin,
                                z: options.z,
                                force3D: true,
                                delay: options.delay,
                                onComplete: function() {
                                    animateScroll
                                        .bind($this, options);
                                }

                            }).progress(1, false)
                    })
                    .promise()
                    .done(function() {
                        $this
                            .trigger('scroll');
                    });
            }
        };

    $.fn.animateScroll = function(options) {
        //set up default options
        var defaults = {
            lazyLoad: false, // lazy load images test
            animateAll: false, // animate elements outside of viewport
            x: 0, // Horizontal offset in px
            y: 0, // Vertical offset in px
            rotation: 0, // Rotation in degrees
            alpha: 0.9, // Opacity from 0.0-1
            easingType: 'Back.easeInOut', // Animation easing Type
            duration: 0.3, // Animation diration in seconds
            transformPerspective: 1000,
            transformOrigin: '50% 50%',
            scaleX: 1,
            scaleY: 1,
            rotationX: 0,
            rotationY: 0,
            delay: 0,
            z: 0.1
        };

        //vars
        var options = $.extend({}, defaults, options);
        if (this[0] != document) {

            this.each(function(index) {
                var $this = $(this),
                    $parent = $this.parent();
                if (options.lazyLoad && $this.is('img')) {
                    $this.on('load', function() {
                        animateScroll
                            .setup($this, $parent, options);
                    });
                } else {
                    animateScroll
                        .setup($this, $parent, options);
                }
            });
        } else {
            animations = $('[data-animate-scroll]');
            animateScroll
                .init(animations);
        }
    }
})(jQuery, window, document);
