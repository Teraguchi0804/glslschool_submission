import gulp from "gulp";
import plumber from "gulp-plumber";
// import jsdoc from "gulp-jsdoc";
import PATH from '../../config';

// プロジェクト情報
var infos = {
    name: "cafe242", // プロジェクト名
    version: "1.0.0", // バージョン
    licenses: 'soy',
};
// HTMLのテンプレート設定
var template = {
    path: "ink-docstrap", // テンプレートプラグイン「ink-docstrap」を使用する
    systemName: "starbucks", // プロジェクト名 ページタイトル・ヘッダーの左上に表示されます
    // HTMLのスタイルテーマ
    // cerulean, cosmo, cyborg, darkly, flatly, journal, lumen, paper, readable, sandstone, simplex, slate, spacelab, superhero, united, yetiの中から選べます
    theme: "flatly",
    linenums: true // ソースコードに行番号を表示するかどうか
};
// オプション
var options = {
    outputSourceFiles: true // ソースコードを記述したHTMLを生成するかどうか
};

// gulp.task("jsdoc", ()=>{
  
//     // 書き出されるindex.htmlに「README.md」を埋め込む
//     gulp.src([ PATH.jsDoc_src, "README.md"])
//         .pipe(jsdoc.parser(infos))
//         .pipe(jsdoc.generator( PATH.jsDoc_dist, template, options))

// });