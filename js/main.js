import HeaderModule from './modules/HeaderModule.js';
import AosModule from './modules/AosModule.js';
import CounterModule from './modules/CounterModule.js';
import LightGalleryModule from './modules/LightGalleryModule.js';
import MfpModule from './modules/MfpModule.js';
import SwiperModule from './modules/SwiperModule.js';
import TabModule from './modules/TabModule.js';
import FlatPickrModule from './modules/FlatPickrModule.js';

jQuery(document).ready(function ($) {
	AosModule();
	HeaderModule();
	CounterModule();
	LightGalleryModule();
	MfpModule();
	SwiperModule();
	TabModule();
	FlatPickrModule();
});
