##animate-scroll

Plugin Name: jQuery Animation Scroll Plugin  
Plugin Description: animate-scroll is a mobile friendly Viewport triggered animation jQuery Plugin using greensock.  
Copyright (C) 2014  Jason Paul Lusk (Jason@jasonlusk.com)  
Author: Jason Lusk  
Author URI: JasonLusk.com  
GIT URI: https://github.com/mpalpha/animate-scroll.git  

####DEMO <a href="http://www.jasonlusk.com/scroll" target="_blank">http://www.jasonlusk.com/scroll</a>

Requirements:  
  jQuery.js v1.10.1+ from www.jquery.com.  
  TweenMax.js 1.10.2+, TimelineMax.js v1.10.2+, EasePack.js v1.9.3+ from www.greensock.com.  
  
Initialize:  
    $(document).animateScroll();  
    
Example html:  
    &lt;p data-animate-scroll='{  
      "scaleX": "1.5",  
      "scaleY": "1.5",  
      "x": "-10",  
      "y": "-10",  
      "rotation": "-3",  
      "alpha": "1",  
      "easingType": "Cubic.easeOut",  
      "duration": "1"  
      }'&gt;test&lt;/p&gt;  
    
