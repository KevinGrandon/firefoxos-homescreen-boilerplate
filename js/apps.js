(function() {

	// Apps container
	var parent = document.getElementById('apps');

	var iconMap = new WeakMap();

	/**
	 * Returns an icon for an element.
	 * The element should have an entry point and origin in it's dataset.
	 */
	function getIconByElement(element) {
		var identifier = element.dataset.identifier;
		return FxosApps.get(identifier);
	}

	/**
	 * Renders the icon to the container.
	 */
	function render(icon) {
		var tile = document.createElement('div');
		tile.className = 'tile';
		tile.style.backgroundImage = 'url(' + icon.icon + ')';

		parent.appendChild(tile);
		iconMap.set(tile, icon);
	}

	/**
	 * Fetch all apps and render them.
	 */
	FxosApps.all().then(icons => {
		icons.forEach(render);
	});

	/**
	 * Add an event listener to launch the app on click.
	 */
	window.addEventListener('click', function(e) {
		iconMap.get(e.target).launch();
	});

}());
