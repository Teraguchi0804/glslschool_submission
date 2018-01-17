/**
 * fileOverview:
 * Project:
 * File: DisplayDistort
 * Date: 17/12/27
 * Author: Teraguchi
 */

import Distort from '../visual/Distort';

'use strict';

export default class DisplayDistort {

	constructor() {

		this.distort = new Distort();

		this.setup();
		this.setEvents();

	}

	setup() {

		this.distort.init();

	}

	onLoad() {


	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}