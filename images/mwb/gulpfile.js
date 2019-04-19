var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var cssmin = require("gulp-cssmin");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");


// 拷贝php文件
gulp.task("php1", function(){
    return gulp.src("./src/inc/**/*.php")
        .pipe( gulp.dest('./dist/inc/') )
        .pipe( browserSync.reload({ stream:true }) );
});

gulp.task("php2", function(){
    return gulp.src("./src/api/**/*.php")
        .pipe( gulp.dest('./dist/api/') )
        .pipe( browserSync.reload({ stream:true }) );
});


// 1. 拷贝并格式化css
gulp.task("css", function(){
    return gulp.src("./src/css/**/*.css")
        .pipe( cssmin() )
        .pipe( gulp.dest('./dist/css/') )
        .pipe( browserSync.reload({ stream:true }) );
});

// 2. 压缩拷贝图片
gulp.task("img", function(){
    return gulp.src("./src/images/**/*.{jpg,png,gif,ico}")
        .pipe( imagemin() )
        .pipe( gulp.dest("./dist/images/") )
        .pipe( browserSync.reload({ stream:true }) );        
});

// 3. 拷贝js
gulp.task("js",function(){
    return gulp.src('./src/js/**/*.js')
        .pipe( uglify() )
        .pipe( gulp.dest('./dist/js/') )
        .pipe( browserSync.reload({ stream:true }) );
});


// 4. 编译sacc
gulp.task("sass", function(){
    return gulp.src("./src/scss/**/*.scss")
        .pipe( sass({
            outputStyle: "expanded"  // 配置输出方式, 默认为: nested
        }) )
        .pipe( autoprefixer() )
        .pipe( gulp.dest("./dist/css/") )
        .pipe( browserSync.reload({ stream: true }) );
});

// 5. 拷贝html
gulp.task("html",function(){
    return gulp.src('./src/*.html')
        .pipe( gulp.dest('./dist/') )
        .pipe( browserSync.reload({ stream:true }) );
});


// 6. 开启监听，热刷新浏览器
gulp.task('watch',function(){
    browserSync.init({  
        port: 8000,  
        server: {  
            baseDir: ['dist'],
            index:"groupBooking.html"
        }  
    }); 
    gulp.watch("./src/css/**/*.css",gulp.series('css'));
    // gulp.watch("./src/images/**/*.{jpg, png, gif, ico}",gulp.series('img'));
    gulp.watch("./src/js/**/*.js",gulp.series('js'));
    gulp.watch("./src/scss/**/*.scss",gulp.series('sass'));
    gulp.watch("./src/*.html",gulp.series('html'));
    gulp.watch("./src/inc/**/*.php",gulp.series('php1'));
    gulp.watch("./src/api/**/*.php",gulp.series('php2'));
});

// 运行的入口
gulp.task("default",gulp.series('css', 'js', 'sass', 'html', 'php1', 'php2', 'watch'));//删除了img