/**
 * fileOverview:
 * Project:
 * File: Display3DCarousel
 * Date: 18/01/02
 * Author: Teraguchi
 */

import Carousel from '../visual/Carousel';

'use strict';

export default class Display3DCarousel {

	constructor() {

		this.carousel = new Carousel();

		this.setup();
		this.setEvents();

	}

	setup() {

		this.carousel.init();

	}

	onLoad() {


	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}