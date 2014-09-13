(function() {

	// Apps container
	var parent = document.getElementById('apps');

	var iconMap = new WeakMap();

	/**
	 * Renders the icon to the container.
	 */
	function render(icon) {
		var tile = document.createElement('div');
		tile.className = 'tile';
		tile.style.background = 'url(' + icon.icon + ') center/90% no-repeat';

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
	window.addEventListener('click', e => {
		iconMap.get(e.target).launch();
	});

}());
