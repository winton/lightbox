var Lightbox = new Class({
  Implements: [ Events, Options ],
	initialize: function() {
	  var options;
	  var overlay;   // Overlay DOM element
	  var indicator; // Indicator DOM element
		
		// Overlay click event
		this.click = function() {
  	  this.hide();
  	  this.fireEvent('click');
  	}.bind(this);
  	
  	// Hide overlay function
  	this.hide = function(dialog, keep_lightbox) {
  		if (!keep_lightbox) overlay.fade('out');
  		if (indicator) indicator.hide();
  		this.fireEvent('hide');
  	};
  	
  	// Indicator show/hide functions
  	this.indicator = {
  	  show: function() {
  	    indicator.setStyle('opacity', 0);
  	    indicator.center();
        (function() { indicator.fade(0.2); }).delay(500);
  	  },
  	  hide: function() { indicator.hide(); }
  	};
  	
  	// Show overlay function
  	this.show = function(dialog) {
  		overlay.expand();
  		overlay.fade(options.opacity);
  		this.fireEvent('show');
  	};
  	
  	// Initializer
	  this.init = function(opts) {
	    window.addEvent('domready', function() {
	      this.options = { color: '#000000', opacity: 0.5 };
  	    this.setOptions(opts);
  	    options = this.options;
  	    
  	    // Create, inject, and style overlay
  	    if (!overlay) {
    		  overlay = this.overlay = new Element('div');
    		  overlay.inject(document.body);
    		  // Add overlay click event
      		overlay.addEvent('click', this.click);
    		}
    		overlay.setStyles({ 'background': options.color, 'opacity': 0, 'position': 'absolute', 'z-index': 1000 });

    		// Create and inject indicator
    		if (options.indicator) {
      		if (!indicator)
      		  indicator = new Element('img').inject(document.body);
    	    indicator.setStyles({ 'z-index': 1001, 'opacity':0 }).setProperty('src', options.indicator);
    	  }
    	  
    	  this.fireEvent('init');
    	}.bind(this));
    	return this;
	  };
		
		// Window onResize event to re-expand overlay
		window.addEvent('resize', function() {
			if (overlay && overlay.getStyle('opacity') > 0) overlay.expand();
		}.bind(this));
	}
});

Element.implement({
  center: function(second) {
    var width 	= this.getSize().x;
    var height 	= this.getSize().y;

    this.setStyles({
      position: 'absolute',
      left: (Window.getWidth()  / 2 - width  / 2) + Window.getScrollLeft() + 'px',
      top:  (Window.getHeight() / 2 - height / 2) + Window.getScrollTop()  + 'px',
      'z-index': 1001
    });
    
    if (this.getStyle('left') < 0) this.setStyle('left',  0);
    if (this.getStyle('top')  < 0) this.setStyle('right', 0);
    
    return this;
  },
  // Expands the element to the window size, and then the scroll size
	expand: function(second) {
		this.setStyles({
			top: 		'0px',
			left: 	'0px',
			width: 	(second ? Window.getScrollWidth()  : Window.getWidth())  + 'px',
			height: (second ? Window.getScrollHeight() : Window.getHeight()) + 'px'
		});
		// We run the method twice so the element is not counted as part
		// of the window if the user is shrinking the browser
		if (!second) this.expand(true);
		return this;
	},
	hide: function() {
    this.setStyle('display', 'none');
    return this;
  },
  show: function() {
    this.setStyle('display', '');
    return this;
  }
});

var Global = Global || {};
Global.lightbox = new Lightbox();