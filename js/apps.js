(function() {

	// Hidden manifest roles that we do not show
	var HIDDEN_ROLES = ['system', 'keyboard', 'homescreen'];

	// Apps container
	var parent = document.getElementById('apps');

	// List of all application icons
	var icons = [];

	/**
	 * Represents a single app icon on the homepage.
	 */
	function Icon(app, entryPoint) {
		this.app = app;
		this.entryPoint = entryPoint;
	}

	Icon.prototype = {

		get name() {
			return this.descriptor.name;
		},

		get icon() {
			if (!this.descriptor.icons) {
				return '';
			}
			return this.descriptor.icons['60'];
		},

		get descriptor() {
			if (this.entryPoint) {
				return this.app.manifest.entry_points[this.entryPoint];
			}
			return this.app.manifest;
		},

		/**
		 * Renders the icon to the container.
		 */
		render: function() {
			if (!this.icon) {
				return;
			}

			var tile = document.createElement('div');
			tile.className = 'tile';
			tile.dataset.origin = this.app.origin;
			if (this.entryPoint) {
				tile.dataset.entryPoint = this.entryPoint;
			}
			tile.style.backgroundImage = 'url(' + this.app.origin + this.icon + ')';

			parent.appendChild(tile);
		},

		/**
		 * Launches the application for this icon.
		 */
		launch: function() {
			if (this.entryPoint) {
				this.app.launch(this.entryPoint);
			} else {
				this.app.launch();
			}
		}
	};

	/**
	 * Creates icons for an app based on hidden roles and entry points.
	 */
	function makeIcons(app) {
		if (HIDDEN_ROLES.indexOf(app.manifest.role) !== -1) {
			return;
		}

		if (app.manifest.entry_points) {
			for (var i in app.manifest.entry_points) {
				icons.push(new Icon(app, i));
			}
		} else {
			icons.push(new Icon(app));
		}
	}

	/**
	 * Returns an icon for an element.
	 * The element should have an entry point and origin in it's dataset.
	 */
	function getIconByElement(element) {
		var elEntryPoint = element.dataset.entryPoint;
		var elOrigin = element.dataset.origin;

		for (var i = 0, iLen = icons.length; i < iLen; i++) {
			var icon = icons[i];
			if (icon.entryPoint === elEntryPoint && icon.app.origin === elOrigin) {
				return icon;
			}
		}
	}

	/**
	 * Fetch all apps and render them.
	 */
	navigator.mozApps.mgmt.getAll().onsuccess = function(event) {
		event.target.result.forEach(makeIcons);
		icons.forEach(function(icon) {
			icon.render();
		});
	};

	/**
	 * Add an event listener to launch the app on click.
	 */
	window.addEventListener('click', function(e) {
		var container = e.target
		var icon = getIconByElement(container);
		icon.launch();
	});

}());
