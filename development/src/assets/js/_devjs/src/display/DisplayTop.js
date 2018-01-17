/**
 * fileOverview:
 * Project:
 * File: DisplayTop
 * Date: 17/9/23
 * Author: Teraguchi
 */

'use strict';

export default class DisplayTop {

	constructor() {

		this.setup();
		this.setEvents();

	}

	setup() {

	}

	onLoad() {


	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}