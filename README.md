## animate-scroll

Plugin Name: jQuery Animation Scroll Plugin  
Plugin Description: animate-scroll is a mobile friendly viewport triggered animation plugin for jQuery using greensock.  
Copyright (C) 2014  Jason Paul Lusk (Jason@jasonlusk.com)  
Author: Jason Lusk  
Author URI: http://JasonLusk.com  
GIT URI: https://github.com/mpalpha/animate-scroll.git  
Tip: https://cash.me/$JasonLusk

#### DEMO <a href="http://www.jasonlusk.com/scroll" target="_blank">http://www.jasonlusk.com/scroll</a>

##### Requirements:  
  jQuery.js v1.10.1+ from www.jquery.com.  
  TweenMax.js 1.10.2+, TimelineMax.js v1.10.2+, EasePack.js v1.9.3+ from www.greensock.com. 

##### Install:
```Batchfile
    bower i mpalpha/animate-scroll
```

##### Initialize:  
```javascript
    $(document).animateScroll();  
```

##### Configure:
Available Options|Default value|Description
-------------|-------------|-------------
transformPerspective|1000|Parent transform perspective
lazyLoad|false|Lazy load images (experimental)
animateAll|false|Animate elements outside of viewport?
reverse|true|Allow elements reverse animation state?
transformOrigin|'50% 50%'|Transform origin X/Y position
x|0|Horizontal offset in px
y|0|Vertical offset in px
scaleX|1|Scale X position
scaleY|1|Scale Y position
rotation|0|Rotation in degrees
rotationX|0|Rotation X position
rotationY|0|Rotation X position
alpha|0.9|Opacity from 0.0-1
delay|0|Animation delay
z|0.1|Z position
force3D|true|Force 3D hardware
easingType|'Back.easeInOut'|Animation easing type
duration|0.3|Animation diration in seconds

##### Implement:  
```html
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
```

##### Events (Optional):

Type|Example
-------------|-------------
play|`$('.my-animated-element').trigger('play');`
reverse|`$('.my-animated-element').trigger('reverse');`
check|`$('.my-animated-element').trigger('check');`
