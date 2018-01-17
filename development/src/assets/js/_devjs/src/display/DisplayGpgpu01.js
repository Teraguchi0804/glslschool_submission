/**
 * fileOverview:
 * Project:
 * File: DisplayGpgpu01
 * Date: 18/01/10
 * Author: Teraguchi
 */

import gpgpu01 from '../visual/gpgpu01';

'use strict';

export default class DisplayGpgpu01 {

	constructor() {

		this.Gpgpu01 = new gpgpu01();

		this.setup();
		this.setEvents();

	}

	setup() {

		this.Gpgpu01.init();

	}

	onLoad() {


	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}