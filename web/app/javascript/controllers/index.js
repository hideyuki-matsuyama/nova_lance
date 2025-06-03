// web/app/javascript/controllers/index.js
import { Application } from "@hotwired/stimulus";

// Stimulusアプリケーションインスタンスの初期化
const application = Application.start();

// Stimulusのデバッグモード (開発中は true でも良いですが、本番ビルドでは false が適切)
application.debug = false; // DockerfileのRAILS_ENVが"production"なのでfalseで良い
window.Stimulus = application; // オプション: グローバルに公開する場合

// このディレクトリ (app/javascript/controllers) 以下の
// *_controller.js という名前のファイルを自動的にロードし、
// Stimulusアプリケーションに登録します。
// stimulus-rails gem がこの自動ロードの仕組みを提供しているはずです。
// もし "controllers" という名前のフォルダを自動で読まない場合は、
// Rails 7.1以降の stimulus-rails では以下のように明示的にロードパスと対象を指定できます。
// import { eagerLoadControllersFrom } from "@rails/stimulus-importmap-autoloader" // これはimportmap用
//
// jsbundling-rails + stimulus-rails の場合、
// Railsアプリケーションの初期化時に stimulus_load_path を設定することで
// esbuildがバンドルしたJS内でStimulusがコントローラを見つけられるようにするか、
// あるいは `bin/rails stimulus:manifest:update` でこのファイルに
// 各コントローラのimportとregister文が自動生成されるはずです。
//
// **まずは、eagerLoadControllersFrom や stimulus-loading のimportは削除し、
//    このファイルは上記の Application.start() までで一旦試してみてください。**
//    `stimulus:manifest:update` を実行していれば、その結果がここに反映されます。

export { application };
