//--------------------------------------------------
//
//  Display
//
//--------------------------------------------------

export default class WebGLinit {

  constructor(){

  	this.gl = null;

  	this.webglInit = this._webglInit.bind(this);

  	this.create_shader = this._create_shader.bind(this);
  	this.create_program = this._create_program.bind(this);
  	this.create_vbo = this._create_vbo.bind(this);

    this.setup();
    this.setEvents();

  }

  setup() {

    // ループスタート
    gb.in.up.loop();

		this.webglInit();
    
  }

  onLoad() {

		window.console.log('onLoad');

  }

  _webglInit() {

		// canvasエレメントを取得
		let c = document.getElementById('canvas');
		c.width = 300;
		c.height = 300;

		// webglコンテキストを取得
		this.gl = c.getContext('webgl') || c.getContext('experimental-webgl');

		// canvasを初期化する色を設定する
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

		// canvasを初期化する際の深度を設定する
		this.gl.clearDepth(1.0);

		// canvasを初期化
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// 頂点シェーダとフラグメントシェーダの生成
		let v_shader = this.create_shader('vs');
		let f_shader = this.create_shader('fs');

		// プログラムオブジェクトの生成とリンク
		let prg = this.create_program(v_shader, f_shader);

		// attributeLocationの取得
		let attLocation = this.gl.getAttribLocation(prg, 'position');

		// attributeの要素数(この場合は xyz の3要素)
		let attStride = 3;

		// モデル(頂点)データ
		let vertex_position = [
			0.0, 1.0, 0.0,
			1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0
		];

		// VBOの生成
		var vbo = this.create_vbo(vertex_position);

		// VBOをバインド
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);

		// attribute属性を有効にする
		this.gl.enableVertexAttribArray(attLocation);

		// attribute属性を登録
		this.gl.vertexAttribPointer(attLocation, attStride, this.gl.FLOAT, false, 0, 0);

		// minMatrix.js を用いた行列関連処理
		// matIVオブジェクトを生成
		var m = new matIV();

		// 各種行列の生成と初期化
		var mMatrix = m.identity(m.create());
		var vMatrix = m.identity(m.create());
		var pMatrix = m.identity(m.create());
		var mvpMatrix = m.identity(m.create());

		// ビュー座標変換行列
		m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);

		// プロジェクション座標変換行列
		m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);

		// 各行列を掛け合わせ座標変換行列を完成させる
		m.multiply(pMatrix, vMatrix, mvpMatrix);
		m.multiply(mvpMatrix, mMatrix, mvpMatrix);

		// uniformLocationの取得
		var uniLocation = this.gl.getUniformLocation(prg, 'mvpMatrix');

		// uniformLocationへ座標変換行列を登録
		this.gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

		// モデルの描画
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

		// コンテキストの再描画
		this.gl.flush();


  }

	_create_shader(id){
		// シェーダを格納する変数
		var shader;

		// HTMLからscriptタグへの参照を取得
		var scriptElement = document.getElementById(id);

		// scriptタグが存在しない場合は抜ける
		if(!scriptElement){return;}

		// scriptタグのtype属性をチェック
		switch(scriptElement.type){

			// 頂点シェーダの場合
			case 'x-shader/x-vertex':
				shader = this.gl.createShader(this.gl.VERTEX_SHADER);
				break;

			// フラグメントシェーダの場合
			case 'x-shader/x-fragment':
				shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
				break;
			default :
				return;
		}

		// 生成されたシェーダにソースを割り当てる
		this.gl.shaderSource(shader, scriptElement.text);

		// シェーダをコンパイルする
		this.gl.compileShader(shader);

		// シェーダが正しくコンパイルされたかチェック
		if(this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)){

			// 成功していたらシェーダを返して終了
			return shader;
		}else{

			// 失敗していたらエラーログをアラートする
			alert(this.gl.getShaderInfoLog(shader));
		}
	}

	_create_program(vs, fs){
		// プログラムオブジェクトの生成
		var program = this.gl.createProgram();

		// プログラムオブジェクトにシェーダを割り当てる
		this.gl.attachShader(program, vs);
		this.gl.attachShader(program, fs);

		// シェーダをリンク
		this.gl.linkProgram(program);

		// シェーダのリンクが正しく行なわれたかチェック
		if(this.gl.getProgramParameter(program, this.gl.LINK_STATUS)){

			// 成功していたらプログラムオブジェクトを有効にする
			this.gl.useProgram(program);

			// プログラムオブジェクトを返して終了
			return program;
		}else{

			// 失敗していたらエラーログをアラートする
			alert(this.gl.getProgramInfoLog(program));
		}
	}

	// VBOを生成する関数
	_create_vbo(data){
		// バッファオブジェクトの生成
		var vbo = this.gl.createBuffer();

		// バッファをバインドする
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);

		// バッファにデータをセット
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

		// バッファのバインドを無効化
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		// 生成した VBO を返して終了
		return vbo;
	}

  static run() {

  }

  setEvents() {

    $(window).on('load', this.onLoad.bind(this));

  }

}