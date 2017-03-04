'use strict';

/**
 * Created by lucasnascimento on 3/3/17.
 */

var gutil = require('gulp-util');

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  'use strict';

  return function (err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
