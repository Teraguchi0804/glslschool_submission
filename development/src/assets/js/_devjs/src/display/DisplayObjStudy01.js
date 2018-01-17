/**
 * fileOverview:
 * Project:
 * File: DisplayObjStudy01
 * Date: 18/01/13
 * Author: Teraguchi
 */

import ObjStudy01 from '../visual/ObjStudy01';

'use strict';

export default class DisplayObjStudy01 {

	constructor() {

		this.objStudy01 = new ObjStudy01();

		this.setup();
		this.setEvents();

	}

	setup() {

		this.objStudy01.init();

	}

	onLoad() {


	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}