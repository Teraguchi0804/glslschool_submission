import gulp from "gulp";
import plumber from "gulp-plumber";
import concat from 'gulp-concat';
import PATH from '../../config';

// ------------------------------------------------------------
//  library
// ------------------------------------------------------------
gulp.task('concatJSLibs', ()=>{

    var src = [
                // PATH.dev.devjs + 'libs/modernizr.js',
                PATH.dev.devjs + 'libs/jquery.js',
                // PATH.dev.devjs + 'libs/jquery.pjax.js',
                // PATH.dev.devjs + 'libs/jquery.mousewheel.js',
                // PATH.dev.devjs + 'libs/lodash.js',
                // PATH.dev.devjs + 'libs/getusermedia-commented.js',
                // PATH.dev.devjs + 'libs/hashchangeEvent.js',

                PATH.dev.devjs + 'libs/TweenMax.min.js',
                // PATH.dev.devjs + 'libs/DrawSVGPlugin.min.js',
                // PATH.dev.devjs + 'libs/snap.svg.min.js',

                PATH.dev.devjs + 'libs/pixi.min.js',
                PATH.dev.devjs + 'libs/minMatrix.js',

                PATH.dev.devjs + 'libs/three.min.js',
                PATH.dev.devjs + 'libs/GPUComputationRenderer.js',
                PATH.dev.devjs + 'libs/loaders/OBJLoader.js',
                PATH.dev.devjs + 'libs/Stats.js',
                PATH.dev.devjs + 'libs/dat.gui.min.js',

                PATH.dev.devjs + 'libs/ua-parser.min.js'
              ]

    gulp.src(src)
        .pipe(plumber())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(PATH.dev.js + 'common/'));

});