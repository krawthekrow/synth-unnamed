var SynthApp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** ./src/SynthAppEntry.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _SoundUploader = __webpack_require__(/*! reactComponents/SoundUploader.jsx */ 3);
	
	var _SoundUploader2 = _interopRequireDefault(_SoundUploader);
	
	var _SpectrogramCanvas = __webpack_require__(/*! reactComponents/SpectrogramCanvas.jsx */ 4);
	
	var _SpectrogramCanvas2 = _interopRequireDefault(_SpectrogramCanvas);
	
	var _Canvas = __webpack_require__(/*! reactComponents/Canvas.jsx */ 5);
	
	var _Canvas2 = _interopRequireDefault(_Canvas);
	
	var _TestCanvas = __webpack_require__(/*! reactComponents/TestCanvas.jsx */ 7);
	
	var _TestCanvas2 = _interopRequireDefault(_TestCanvas);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _UnitTestsManager = __webpack_require__(/*! tests/UnitTestsManager.js */ 8);
	
	var _UnitTestsManager2 = _interopRequireDefault(_UnitTestsManager);
	
	var _FFTTimingTestManager = __webpack_require__(/*! tests/FFTTimingTestManager.js */ 18);
	
	var _FFTTimingTestManager2 = _interopRequireDefault(_FFTTimingTestManager);
	
	var _GPGPUManager = __webpack_require__(/*! gpgpu/GPGPUManager.js */ 12);
	
	var _GPGPUManager2 = _interopRequireDefault(_GPGPUManager);
	
	var _GPUDFT = __webpack_require__(/*! gpgpu/GPUDFT.js */ 13);
	
	var _GPUDFT2 = _interopRequireDefault(_GPUDFT);
	
	var _GPUFFT = __webpack_require__(/*! gpgpu/GPUFFT.js */ 15);
	
	var _GPUFFT2 = _interopRequireDefault(_GPUFFT);
	
	var _GPUSTFT = __webpack_require__(/*! gpgpu/GPUSTFT.js */ 16);
	
	var _GPUSTFT2 = _interopRequireDefault(_GPUSTFT);
	
	var _SpectrogramKernel = __webpack_require__(/*! engine/SpectrogramKernel.js */ 17);
	
	var _SpectrogramKernel2 = _interopRequireDefault(_SpectrogramKernel);
	
	var _QuadDrawingKernel = __webpack_require__(/*! webgl/QuadDrawingKernel.js */ 21);
	
	var _QuadDrawingKernel2 = _interopRequireDefault(_QuadDrawingKernel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SynthApp = function (_React$Component) {
	    _inherits(SynthApp, _React$Component);
	
	    function SynthApp(props) {
	        _classCallCheck(this, SynthApp);
	
	        var _this = _possibleConstructorReturn(this, (SynthApp.__proto__ || Object.getPrototypeOf(SynthApp)).call(this, props));
	
	        _this.sound = null;
	        _this.webglStateManager = null;
	        _this.CANVAS_DIMS = new _Utils.Dimensions(1800, 1024);
	        return _this;
	    }
	
	    _createClass(SynthApp, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //UnitTestsManager.runAllTests();
	            //FFTTimingTestManager.run();
	            this.webglStateManager = _GPGPUManager2.default.createWebGLStateManager(this.mainCanvas);
	            this.gpgpuManager = new _GPGPUManager2.default(this.webglStateManager);
	        }
	    }, {
	        key: 'handleSoundUpload',
	        value: function handleSoundUpload(data) {
	            var _this2 = this;
	
	            var ctx = new (window.AudioContext || window.webkitAudioContext)();
	            ctx.decodeAudioData(data).then(function (buffer) {
	                _this2.setSound(buffer);
	                //const bufferView = buffer.getChannelData(0);
	                //for(let i = 0; i < buffer.length; i++){
	                //    bufferView[i] /= 6;
	                //}
	                //const source = ctx.createBufferSource();
	                //source.buffer = buffer;
	                //source.connect(ctx.destination);
	                //source.start();
	            });
	        }
	    }, {
	        key: 'setSound',
	        value: function setSound(buffer) {
	            this.sound = buffer;
	            var bufferView = this.sound.getChannelData(0);
	
	            var gpuSTFT = new _GPUSTFT2.default(this.gpgpuManager);
	            var spectrum = gpuSTFT.stft(bufferView, 2048, false, 2048);
	            gpuSTFT.dispose();
	
	            var spectroKernel = new _SpectrogramKernel2.default(this.gpgpuManager);
	            var spectro = spectroKernel.run(spectrum, 5, 2);
	            spectroKernel.dispose();
	            spectrum.dispose(this.gpgpuManager);
	
	            var quadKernel = new _QuadDrawingKernel2.default(this.webglStateManager);
	            quadKernel.run(spectro.tex, new _Utils.Rect(new _Utils.Vector(0, 0), spectro.dims), this.CANVAS_DIMS);
	            quadKernel.dispose();
	
	            this.gpgpuManager.disposeGPUArr(spectro);
	
	            console.log('Done.');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_SoundUploader2.default, { onUpload: function onUpload(data) {
	                        return _this3.handleSoundUpload(data);
	                    } }),
	                _react2.default.createElement('canvas', { key: 'mainCanvas', width: this.CANVAS_DIMS.width, height: this.CANVAS_DIMS.height, ref: function ref(canvas) {
	                        _this3.mainCanvas = canvas;
	                    } }),
	                _react2.default.createElement(_SpectrogramCanvas2.default, { ref: function ref(canvas) {
	                        _this3.spectroCanvas = canvas;
	                    } })
	            );
	        }
	    }]);
	
	    return SynthApp;
	}(_react2.default.Component);
	
	;
	
	function init() {
	    _reactDom2.default.render(_react2.default.createElement(SynthApp, null), document.getElementById('indexContainer'));
	}
	
	module.exports = {
	    init: init
	};

/***/ },
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/*!***********************************************!*\
  !*** ./src/reactComponents/SoundUploader.jsx ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SoundUploader = function (_React$Component) {
	    _inherits(SoundUploader, _React$Component);
	
	    function SoundUploader() {
	        _classCallCheck(this, SoundUploader);
	
	        return _possibleConstructorReturn(this, (SoundUploader.__proto__ || Object.getPrototypeOf(SoundUploader)).apply(this, arguments));
	    }
	
	    _createClass(SoundUploader, [{
	        key: "handleClickUpload",
	        value: function handleClickUpload() {
	            var _this2 = this;
	
	            var file = this.fileInput.files[0];
	            var reader = new FileReader();
	            reader.onload = function (e) {
	                _this2.props.onUpload(e.target.result);
	            };
	            reader.readAsArrayBuffer(file);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;
	
	            return _react2.default.createElement(
	                "div",
	                null,
	                _react2.default.createElement(
	                    "div",
	                    { className: "form-group" },
	                    _react2.default.createElement(
	                        "label",
	                        null,
	                        "Upload sound file",
	                        _react2.default.createElement("input", { type: "file", ref: function ref(input) {
	                                _this3.fileInput = input;
	                            } })
	                    )
	                ),
	                _react2.default.createElement(
	                    "button",
	                    { type: "button", className: "btn btn-default", onClick: function onClick(e) {
	                            _this3.handleClickUpload();
	                        } },
	                    "Upload"
	                )
	            );
	        }
	    }]);
	
	    return SoundUploader;
	}(_react2.default.Component);
	
	;
	SoundUploader.propTypes = {
	    onUpload: _react2.default.PropTypes.func.isRequired
	};
	
	module.exports = SoundUploader;

/***/ },
/* 4 */
/*!***************************************************!*\
  !*** ./src/reactComponents/SpectrogramCanvas.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SpectrogramCanvas = function (_React$Component) {
	    _inherits(SpectrogramCanvas, _React$Component);
	
	    function SpectrogramCanvas() {
	        _classCallCheck(this, SpectrogramCanvas);
	
	        return _possibleConstructorReturn(this, (SpectrogramCanvas.__proto__ || Object.getPrototypeOf(SpectrogramCanvas)).apply(this, arguments));
	    }
	
	    _createClass(SpectrogramCanvas, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.ctx = this.canvas.getContext('2d');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _react2.default.createElement('canvas', { width: '1500', height: '2048', style: {}, ref: function ref(canvas) {
	                    _this2.canvas = canvas;
	                } });
	        }
	    }]);
	
	    return SpectrogramCanvas;
	}(_react2.default.Component);
	
	;
	SpectrogramCanvas.propTypes = {};
	
	module.exports = SpectrogramCanvas;

/***/ },
/* 5 */
/*!****************************************!*\
  !*** ./src/reactComponents/Canvas.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Canvas = function (_React$Component) {
	    _inherits(Canvas, _React$Component);
	
	    function Canvas() {
	        _classCallCheck(this, Canvas);
	
	        return _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).apply(this, arguments));
	    }
	
	    _createClass(Canvas, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.ctx = this.canvas.getContext('2d');
	            if ('onMount' in this.props) {
	                this.props.onMount(this.ctx);
	            }
	            this.ctx.canvas.width = 100;
	            this.ctx.canvas.height = 10;
	            this.ctx.beginPath();
	            this.ctx.rect(0, 0, 100, 10);
	            this.ctx.fillStyle = 'red';
	            this.ctx.fill();
	        }
	    }, {
	        key: 'setDimensions',
	        value: function setDimensions(newDims) {
	            this.canvas.width = newDims.width;
	            this.canvas.height = newDims.height;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _react2.default.createElement('canvas', { width: '1', height: '1', ref: function ref(canvas) {
	                    _this2.canvas = canvas;
	                } });
	        }
	    }]);
	
	    return Canvas;
	}(_react2.default.Component);
	
	;
	Canvas.propTypes = {
	    onMount: _react2.default.PropTypes.func
	};
	
	module.exports = Canvas;

/***/ },
/* 6 */
/*!****************************!*\
  !*** ./src/utils/Utils.js ***!
  \****************************/
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector = function () {
	    function Vector(x, y) {
	        _classCallCheck(this, Vector);
	
	        this.x = x;
	        this.y = y;
	    }
	
	    _createClass(Vector, [{
	        key: "add",
	        value: function add(oVec) {
	            return new Vector(this.x + oVec.x, this.y + oVec.y);
	        }
	    }, {
	        key: "subtract",
	        value: function subtract(oVec) {
	            return new Vector(this.x - oVec.x, this.y - oVec.y);
	        }
	    }, {
	        key: "multiply",
	        value: function multiply(scale) {
	            return new Vector(this.x * scale, this.y * scale);
	        }
	    }, {
	        key: "divide",
	        value: function divide(scale) {
	            return new Vector(this.x / scale, this.y / scale);
	        }
	    }, {
	        key: "equals",
	        value: function equals(oVec) {
	            return this.x == oVec.x && this.y == oVec.y;
	        }
	    }, {
	        key: "floor",
	        value: function floor() {
	            return new Vector(Math.floor(this.x), Math.floor(this.y));
	        }
	    }, {
	        key: "dot",
	        value: function dot(oVec) {
	            return this.x * oVec.x + this.y * oVec.y;
	        }
	    }, {
	        key: "getLength",
	        value: function getLength() {
	            return Math.sqrt(this.dot(this));
	        }
	    }, {
	        key: "getAngle",
	        value: function getAngle() {
	            return Math.atan2(this.y, this.x);
	        }
	    }, {
	        key: "toArray",
	        value: function toArray() {
	            return [this.x, this.y];
	        }
	    }], [{
	        key: "fromPolar",
	        value: function fromPolar(r, phi) {
	            return new Vector(r * Math.cos(phi), r * Math.sin(phi));
	        }
	    }]);
	
	    return Vector;
	}();
	
	;
	
	var Dimensions = function () {
	    function Dimensions(width, height) {
	        _classCallCheck(this, Dimensions);
	
	        this.width = width;
	        this.height = height;
	    }
	
	    _createClass(Dimensions, [{
	        key: "contains",
	        value: function contains(pos) {
	            return isPointInRect(pos, new Rect(new Vector(0, 0), this));
	        }
	    }, {
	        key: "getArea",
	        value: function getArea() {
	            return this.width * this.height;
	        }
	    }, {
	        key: "equals",
	        value: function equals(oDims) {
	            return this.width == oDims.width && this.height == oDims.height;
	        }
	    }, {
	        key: "toArray",
	        value: function toArray() {
	            return [this.width, this.height];
	        }
	    }]);
	
	    return Dimensions;
	}();
	
	;
	
	var Rect = function () {
	    function Rect(pos, dims) {
	        _classCallCheck(this, Rect);
	
	        this.pos = pos;
	        this.dims = dims;
	    }
	
	    _createClass(Rect, [{
	        key: "x",
	        get: function get() {
	            return this.pos.x;
	        }
	    }, {
	        key: "y",
	        get: function get() {
	            return this.pos.y;
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this.dims.width;
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this.dims.height;
	        }
	    }, {
	        key: "left",
	        get: function get() {
	            return this.pos.x;
	        }
	    }, {
	        key: "right",
	        get: function get() {
	            return this.pos.x + this.dims.width;
	        }
	    }, {
	        key: "top",
	        get: function get() {
	            return this.pos.y;
	        }
	    }, {
	        key: "bottom",
	        get: function get() {
	            return this.pos.y + this.dims.height;
	        }
	    }], [{
	        key: "fromBounds",
	        value: function fromBounds(left, right, top, bottom) {
	            return new Rect(new Vector(left, top), new Dimensions(right - left, bottom - top));
	        }
	    }]);
	
	    return Rect;
	}();
	
	;
	
	var Array2D = function () {
	    function Array2D(dims, data) {
	        _classCallCheck(this, Array2D);
	
	        this.dims = dims;
	        this.data = data;
	    }
	
	    _createClass(Array2D, [{
	        key: "getFlatArr",
	        value: function getFlatArr() {
	            return Utils.flatten(this.data);
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this.dims.width;
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this.dims.height;
	        }
	    }]);
	
	    return Array2D;
	}();
	
	;
	
	var MouseButton = function MouseButton() {
	    _classCallCheck(this, MouseButton);
	};
	
	;
	MouseButton.MOUSE_LEFT = 0;
	MouseButton.MOUSE_MIDDLE = 1;
	MouseButton.MOUSE_RIGHT = 2;
	
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
	        key: "isPointInRect",
	        value: function isPointInRect(p, rect) {
	            return p.x >= rect.left && p.x < rect.right && p.y >= rect.top && p.y < rect.bottom;
	        }
	    }, {
	        key: "compute1DArray",
	        value: function compute1DArray(length, func) {
	            return new Array(length).fill(undefined).map(function (unused, i) {
	                return func(i);
	            });
	        }
	    }, {
	        key: "compute2DArray",
	        value: function compute2DArray(dims, func) {
	            return Utils.compute1DArray(dims.height, function (i) {
	                return Utils.compute1DArray(dims.width, function (i2) {
	                    return func(new Vector(i2, i));
	                });
	            });
	        }
	    }, {
	        key: "compute2DArrayAsArray2D",
	        value: function compute2DArrayAsArray2D(dims, func) {
	            return new Array2D(dims, Utils.compute2DArray(dims, func));
	        }
	    }, {
	        key: "flatten",
	        value: function flatten(arr) {
	            var result = [];
	            for (var i = 0; i < arr.length; i++) {
	                for (var i2 = 0; i2 < arr[i].length; i2++) {
	                    result.push(arr[i][i2]);
	                }
	            }
	            return result;
	        }
	    }, {
	        key: "clamp",
	        value: function clamp(num, min, max) {
	            return num <= min ? min : num >= max ? max : num;
	        }
	    }]);
	
	    return Utils;
	}();
	
	;
	Utils.DIRS4 = [new Vector(1, 0), new Vector(0, 1), new Vector(-1, 0), new Vector(0, -1)];
	
	module.exports = {
	    Vector: Vector,
	    Dimensions: Dimensions,
	    Rect: Rect,
	    Array2D: Array2D,
	    MouseButton: MouseButton,
	    Utils: Utils
	};

/***/ },
/* 7 */
/*!********************************************!*\
  !*** ./src/reactComponents/TestCanvas.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TestCanvas = function (_React$Component) {
	    _inherits(TestCanvas, _React$Component);
	
	    function TestCanvas() {
	        _classCallCheck(this, TestCanvas);
	
	        return _possibleConstructorReturn(this, (TestCanvas.__proto__ || Object.getPrototypeOf(TestCanvas)).apply(this, arguments));
	    }
	
	    _createClass(TestCanvas, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {}
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            return _react2.default.createElement("canvas", { width: "10", height: "10", style: {}, ref: function ref(canvas) {
	                    _this2.canvas = canvas;
	                } });
	        }
	    }]);
	
	    return TestCanvas;
	}(_react2.default.Component);
	
	;
	TestCanvas.propTypes = {};
	
	module.exports = TestCanvas;

/***/ },
/* 8 */
/*!***************************************!*\
  !*** ./src/tests/UnitTestsManager.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _WebGLStateManager = __webpack_require__(/*! webgl/WebGLStateManager.js */ 9);
	
	var _WebGLStateManager2 = _interopRequireDefault(_WebGLStateManager);
	
	var _GPGPUManager = __webpack_require__(/*! gpgpu/GPGPUManager.js */ 12);
	
	var _GPGPUManager2 = _interopRequireDefault(_GPGPUManager);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _GPUDFT = __webpack_require__(/*! gpgpu/GPUDFT.js */ 13);
	
	var _GPUDFT2 = _interopRequireDefault(_GPUDFT);
	
	var _GPUFFT = __webpack_require__(/*! gpgpu/GPUFFT.js */ 15);
	
	var _GPUFFT2 = _interopRequireDefault(_GPUFFT);
	
	var _GPUSTFT = __webpack_require__(/*! gpgpu/GPUSTFT.js */ 16);
	
	var _GPUSTFT2 = _interopRequireDefault(_GPUSTFT);
	
	var _GPUIFFT = __webpack_require__(/*! gpgpu/GPUIFFT.js */ 23);
	
	var _GPUIFFT2 = _interopRequireDefault(_GPUIFFT);
	
	var _GPUISTFT = __webpack_require__(/*! gpgpu/GPUISTFT.js */ 25);
	
	var _GPUISTFT2 = _interopRequireDefault(_GPUISTFT);
	
	var _SpectrogramKernel = __webpack_require__(/*! engine/SpectrogramKernel.js */ 17);
	
	var _SpectrogramKernel2 = _interopRequireDefault(_SpectrogramKernel);
	
	var _ComplexArray2D = __webpack_require__(/*! gpgpu/ComplexArray2D.js */ 24);
	
	var _ComplexArray2D2 = _interopRequireDefault(_ComplexArray2D);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TestUtils = function () {
	    function TestUtils() {
	        _classCallCheck(this, TestUtils);
	    }
	
	    _createClass(TestUtils, null, [{
	        key: 'compareArrays',
	        value: function compareArrays(arr1, arr2) {
	            var cmpFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TestUtils.defaultEquals;
	
	            //const badIndex = arr1.findIndex((val, i) => !cmpFunc(val, arr2[i]));
	            //if(badIndex != -1){
	            //    console.log(
	            //        badIndex.toString() + ' ' + arr1[badIndex].toString() + ' ' + arr2[badIndex].toString()
	            //    );
	            //}
	            return arr1.length == arr2.length && arr1.every(function (val, i) {
	                return cmpFunc(val, arr2[i]);
	            });
	        }
	    }, {
	        key: 'compareArray2D',
	        value: function compareArray2D(arr1, arr2) {
	            var cmpFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TestUtils.defaultEquals;
	
	            if (!arr1.dims.equals(arr2.dims)) {
	                return false;
	            }
	            for (var i = 0; i < arr1.dims.height; i++) {
	                for (var i2 = 0; i2 < arr1.dims.width; i2++) {
	                    if (!cmpFunc(arr1.data[i][i2], arr2.data[i][i2])) {
	                        //console.log(i.toString() + ' ' + i2.toString() + ' ' + arr1.data[i][i2].toString() + ' ' + arr2.data[i][i2].toString());
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'compareComplexArray2D',
	        value: function compareComplexArray2D(manager, arr1, arr2) {
	            var cmpFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TestUtils.defaultEquals;
	
	            var arrs1 = arr1.getCPUArrs(manager);
	            var arrs2 = arr2.getCPUArrs(manager);
	            return TestUtils.compareArray2D(arrs1[0], arrs2[0], cmpFunc) && TestUtils.compareArray2D(arrs1[1], arrs2[1], cmpFunc);
	        }
	    }, {
	        key: 'defaultEquals',
	        value: function defaultEquals(x, y) {
	            return x == y;
	        }
	    }, {
	        key: 'floatEquals',
	        value: function floatEquals(x, y) {
	            var rtol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-5;
	            var atol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1e-9;
	
	            var absX = Math.abs(x);
	            var absY = Math.abs(y);
	            var diff = Math.abs(x - y);
	            if (x == y) return true;
	            if (x == 0 || y == 0) return diff < atol;
	            return diff < atol || diff / (absX + absY) < rtol;
	        }
	    }, {
	        key: 'processTestResult',
	        value: function processTestResult(testName, assertVal) {
	            //console.log(assertVal);
	            console.log(testName + ': ' + (assertVal ? 'OK' : 'FAILED'));
	            //if(!assertVal) console.log('Test failed: ' + testName);
	        }
	    }]);
	
	    return TestUtils;
	}();
	
	;
	
	var GPGPUUnitTests = function () {
	    function GPGPUUnitTests() {
	        _classCallCheck(this, GPGPUUnitTests);
	    }
	
	    _createClass(GPGPUUnitTests, null, [{
	        key: 'run',
	        value: function run() {
	            var stateManager = _GPGPUManager2.default.createWebGLStateManager();
	            var testDims = new _Utils.Dimensions(5, 6);
	            var randArr = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return Math.random();
	            });
	            var randArr2 = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return Math.random();
	            });
	            var toGPUAndBack = function toGPUAndBack(manager, arr) {
	                var singleChannel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	                var gpuArr = manager.arrToGPUArr(arr, singleChannel);
	                var resArr = manager.gpuArrToArr(gpuArr, singleChannel);
	                manager.disposeGPUArr(gpuArr);
	                return resArr;
	            };
	            (function () {
	                var manager = new _GPGPUManager2.default(stateManager, true);
	                (function () {
	                    var resArr = toGPUAndBack(manager, randArr);
	                    TestUtils.processTestResult('Data transfer (float, single channel)', TestUtils.compareArray2D(randArr, resArr, TestUtils.floatEquals));
	                })();
	                (function () {
	                    var packedRandArr = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                        return [randArr.data[pos.y][pos.x], randArr2.data[pos.y][pos.x], 0, 0];
	                    });
	                    var resArr = toGPUAndBack(manager, packedRandArr, false);
	                    TestUtils.processTestResult('Data transfer (float, multichannel)', TestUtils.compareArray2D(packedRandArr, resArr, function (arr1, arr2) {
	                        return TestUtils.floatEquals(arr1[0], arr2[0]) && TestUtils.floatEquals(arr1[1], arr2[1]);
	                    }));
	                })();
	                manager.dispose();
	            })();
	            (function () {
	                var manager = new _GPGPUManager2.default(stateManager, false);
	                (function () {
	                    var resArr = toGPUAndBack(manager, randArr);
	                    TestUtils.processTestResult('Data transfer (packed)', TestUtils.compareArray2D(randArr, resArr, TestUtils.floatEquals));
	                })();
	                (function () {
	                    var gpuArr1 = manager.arrToGPUArr(randArr);
	                    var gpuArr2 = manager.arrToGPUArr(randArr2);
	                    (function () {
	                        var addKernel = manager.createKernel('gl_FragData[0] = packFloat(\n    unpackFloat(texture2D(uArr1, vCoord)) +\n    unpackFloat(texture2D(uArr2, vCoord))\n);\n', ['uArr1', 'uArr2'], [], 1, _GPGPUManager2.default.PACK_FLOAT_INCLUDE);
	                        var resGPUArr = manager.runKernel(addKernel, [gpuArr1, gpuArr2], testDims)[0];
	                        manager.disposeKernel(addKernel);
	                        var resArr = manager.gpuArrToArr(resGPUArr);
	                        manager.disposeGPUArr(resGPUArr);
	                        var cmpArr = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                            return randArr.data[pos.y][pos.x] + randArr2.data[pos.y][pos.x];
	                        });
	                        TestUtils.processTestResult('Kernel run', TestUtils.compareArray2D(cmpArr, resArr, TestUtils.floatEquals));
	                    })();
	                    (function () {
	                        var addsubKernel = manager.createKernel('gl_FragData[0] = packFloat(\n    unpackFloat(texture2D(uArr1, vCoord)) +\n    unpackFloat(texture2D(uArr2, vCoord))\n);\ngl_FragData[1] = packFloat(\n    unpackFloat(texture2D(uArr1, vCoord)) -\n    unpackFloat(texture2D(uArr2, vCoord))\n);\n', ['uArr1', 'uArr2'], [], 2, _GPGPUManager2.default.PACK_FLOAT_INCLUDE);
	                        var resGPUArrs = manager.runKernel(addsubKernel, [gpuArr1, gpuArr2], testDims);
	                        manager.disposeKernel(addsubKernel);
	                        var resArr1 = manager.gpuArrToArr(resGPUArrs[0]);
	                        var resArr2 = manager.gpuArrToArr(resGPUArrs[1]);
	                        manager.disposeGPUArr(resGPUArrs[0]);
	                        manager.disposeGPUArr(resGPUArrs[1]);
	                        var cmpArr1 = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                            return randArr.data[pos.y][pos.x] + randArr2.data[pos.y][pos.x];
	                        });
	                        var cmpArr2 = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                            return randArr.data[pos.y][pos.x] - randArr2.data[pos.y][pos.x];
	                        });
	                        TestUtils.processTestResult('Kernal multiple outputs', TestUtils.compareArray2D(cmpArr1, resArr1, TestUtils.floatEquals) && TestUtils.compareArray2D(cmpArr2, resArr2, TestUtils.floatEquals));
	                    })();
	                    (function () {
	                        var multKernel = manager.createKernel('gl_FragData[0] = packFloat(\n    unpackFloat(texture2D(uArr, vCoord)) * uMult\n);\n', ['uArr'], [{
	                            type: 'float',
	                            name: 'uMult'
	                        }], 1, _GPGPUManager2.default.PACK_FLOAT_INCLUDE);
	                        var mult = Math.random();
	                        var resGPUArr = manager.runKernel(multKernel, [gpuArr1], testDims, {
	                            uMult: mult
	                        })[0];
	                        manager.disposeKernel(multKernel);
	                        var resArr = manager.gpuArrToArr(resGPUArr);
	                        manager.disposeGPUArr(resGPUArr);
	                        var cmpArr = _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                            return randArr.data[pos.y][pos.x] * mult;
	                        });
	                        TestUtils.processTestResult('Kernel uniform', TestUtils.compareArray2D(cmpArr, resArr, TestUtils.floatEquals));
	                    })();
	                    manager.disposeGPUArr(gpuArr1);
	                    manager.disposeGPUArr(gpuArr2);
	                })();
	                manager.dispose();
	            })();
	            (function () {
	                var manager = new _GPGPUManager2.default(stateManager, true);
	                (function () {
	                    var gpuArr = manager.flatArrToGPUArr(_Utils.Utils.flatten(randArr.data), randArr.dims, 1);
	                    var resArr = manager.gpuArrToArr(gpuArr, true, 1);
	                    manager.disposeGPUArr(gpuArr);
	                    TestUtils.processTestResult('Kernel-based data transfer (float, flat alpha)', TestUtils.compareArray2D(randArr, resArr, TestUtils.floatEquals));
	                })();
	                manager.dispose();
	            })();
	        }
	    }]);
	
	    return GPGPUUnitTests;
	}();
	
	;
	
	var FFTUnitTests = function () {
	    function FFTUnitTests() {
	        _classCallCheck(this, FFTUnitTests);
	    }
	
	    _createClass(FFTUnitTests, null, [{
	        key: 'run',
	        value: function run() {
	            var stateManager = _GPGPUManager2.default.createWebGLStateManager();
	            var manager = new _GPGPUManager2.default(stateManager, false);
	            var managerFloat = new _GPGPUManager2.default(stateManager, true);
	            var testDims = new _Utils.Dimensions(1, 128);
	            var randArr = _ComplexArray2D2.default.fromRealArr(_Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return Math.random();
	            }));
	            var randFloatArr = _ComplexArray2D2.default.fromArrs(_Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return randArr.getCPUArrs()[0].data[pos.y][pos.x];
	            }), _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return 0;
	            }));
	            var gpuDFT = new _GPUDFT2.default(manager);
	            var gpuFFT = new _GPUFFT2.default(manager);
	            var gpuFFTFloat = new _GPUFFT2.default(managerFloat);
	            var gpuIFFT = new _GPUIFFT2.default(managerFloat);
	            var dftArrs = gpuDFT.parallelDFT(randArr);
	            var fftArrs = gpuFFT.parallelFFT(randArr);
	            var fftFloatArrs = gpuFFTFloat.parallelFFT(randFloatArr);
	            var identityArrs = gpuIFFT.parallelIFFT(fftFloatArrs);
	            gpuDFT.dispose();
	            gpuFFT.dispose();
	            gpuFFTFloat.dispose();
	            gpuIFFT.dispose();
	            randArr.dispose(manager);
	            randFloatArr.dispose(managerFloat);
	            TestUtils.processTestResult('GPU FFT vs DFT', TestUtils.compareComplexArray2D(manager, dftArrs, fftArrs, function (x, y) {
	                return TestUtils.floatEquals(x, y, 1e-3, 1e-3);
	            }));
	            var fftCPUArrs = fftArrs.getCPUArrs(manager);
	            var fftFloatCPUArrs = fftFloatArrs.getCPUArrs(managerFloat);
	            TestUtils.processTestResult('GPU FFT packed vs float', TestUtils.compareArray2D(fftCPUArrs[0], fftFloatCPUArrs[0], function (x, y) {
	                return TestUtils.floatEquals(x, y, 1e-3);
	            }) && TestUtils.compareArray2D(fftCPUArrs[1], fftFloatCPUArrs[1], function (x, y) {
	                return TestUtils.floatEquals(x, y, 1e-3);
	            }));
	            TestUtils.processTestResult('GPU FFT-IFFT vs identity', TestUtils.compareComplexArray2D(managerFloat, identityArrs, randFloatArr, function (x, y) {
	                return TestUtils.floatEquals(x / testDims.height, y, 1e-3, 1e-3);
	            }));
	            dftArrs.dispose(manager);
	            fftArrs.dispose(manager);
	            fftFloatArrs.dispose(managerFloat);
	            identityArrs.dispose(managerFloat);
	            manager.dispose();
	            managerFloat.dispose();
	        }
	    }]);
	
	    return FFTUnitTests;
	}();
	
	;
	
	var STFTUnitTests = function () {
	    function STFTUnitTests() {
	        _classCallCheck(this, STFTUnitTests);
	    }
	
	    _createClass(STFTUnitTests, null, [{
	        key: 'manualSTFT',
	        value: function manualSTFT(gpgpuManager, arr, windSz) {
	            var numWind = parseInt(arr.length / (windSz / 2)) - 1;
	            var spectroDims = new _Utils.Dimensions(numWind, windSz / 2);
	            var windFunc = _Utils.Utils.compute1DArray(windSz, function (i) {
	                return 0.5 * (1 - Math.cos(2 * Math.PI * (i * 2 + 1) / (windSz * 2)));
	            });
	            var fftInput = _ComplexArray2D2.default.fromRealArr(_Utils.Utils.compute2DArrayAsArray2D(new _Utils.Dimensions(spectroDims.width, windSz), function (pos) {
	                return arr[pos.x * (windSz / 2) + pos.y] * windFunc[pos.y];
	            }));
	            var gpuFFT = new _GPUFFT2.default(gpgpuManager);
	            var spectrum = gpuFFT.parallelFFT(fftInput);
	            fftInput.dispose(gpgpuManager);
	            gpuFFT.dispose();
	            return spectrum;
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var gpgpuManager = new _GPGPUManager2.default(null, true);
	            var gpuSTFT = new _GPUSTFT2.default(gpgpuManager);
	            var gpuISTFT = new _GPUISTFT2.default(gpgpuManager);
	            var testLength = 128;
	            var windSz = 16;
	            var randArr = _Utils.Utils.compute1DArray(testLength, function (i) {
	                return Math.random();
	            });
	            var resArr = gpuSTFT.stft(randArr, windSz);
	            var identityArr = gpuISTFT.istft(resArr);
	            var manualResArr = STFTUnitTests.manualSTFT(gpgpuManager, randArr, windSz);
	            gpuSTFT.dispose();
	            gpuISTFT.dispose();
	            TestUtils.processTestResult('Manual vs GPU STFT', TestUtils.compareComplexArray2D(gpgpuManager, manualResArr, resArr, function (x, y) {
	                return TestUtils.floatEquals(x, y, 1e-3);
	            }));
	            var slicedIdentityArr = identityArr.slice(windSz / 2, -windSz / 2).map(function (x) {
	                return x / windSz;
	            });
	            var slicedRandArr = randArr.slice(windSz / 2, -windSz / 2);
	            TestUtils.processTestResult('GPU STFT-ISTFT vs identity', TestUtils.compareArrays(slicedIdentityArr, slicedRandArr, function (x, y) {
	                return TestUtils.floatEquals(x, y, 1e-3);
	            }));
	            resArr.dispose(gpgpuManager);
	            manualResArr.dispose(gpgpuManager);
	            gpgpuManager.dispose();
	        }
	    }]);
	
	    return STFTUnitTests;
	}();
	
	;
	
	var SpectrogramUnitTests = function () {
	    function SpectrogramUnitTests() {
	        _classCallCheck(this, SpectrogramUnitTests);
	    }
	
	    _createClass(SpectrogramUnitTests, null, [{
	        key: 'manualSpectrogram',
	        value: function manualSpectrogram(data, magRange, magOffset) {
	            var res = _Utils.Utils.flatten(_Utils.Utils.flatten(_Utils.Utils.compute2DArray(data.dims, function (pos) {
	                return Math.sqrt(Math.pow(data.getCPUArrs()[0].data[pos.y][pos.x], 2) + Math.pow(data.getCPUArrs()[1].data[pos.y][pos.x], 2)) / Math.sqrt(data.dims.height);
	            }).slice(0, data.dims.height / 2)).map(function (mag) {
	                return [_Utils.Utils.clamp(Math.log(mag) / magRange + magOffset, 0, 1), 0, 0, 1];
	            }));
	            return res;
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var testDims = new _Utils.Dimensions(5, 6);
	            var randArr = _ComplexArray2D2.default.fromArrs(_Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return Math.random();
	            }), _Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return Math.random();
	            }));
	            var magRange = 5,
	                magOffset = 1;
	            var expectedArr = SpectrogramUnitTests.manualSpectrogram(randArr, magRange, magOffset);
	            var manager = new _GPGPUManager2.default(null, true);
	            var spectroKernel = new _SpectrogramKernel2.default(manager);
	            var resGPUArr = spectroKernel.run(randArr, magRange, magOffset);
	            spectroKernel.dispose();
	            var resArr = Array.from(manager.gpuArrToFlatArr(resGPUArr, true)).map(function (val) {
	                return val / 255;
	            });
	            manager.disposeGPUArr(resGPUArr);
	            TestUtils.processTestResult('Manual vs GPU spectrogram', TestUtils.compareArrays(expectedArr, resArr, function (x, y) {
	                return TestUtils.floatEquals(x, y, 1e-1);
	            }));
	            manager.dispose();
	        }
	    }]);
	
	    return SpectrogramUnitTests;
	}();
	
	;
	
	var UnitTestsManager = function () {
	    function UnitTestsManager() {
	        _classCallCheck(this, UnitTestsManager);
	    }
	
	    _createClass(UnitTestsManager, null, [{
	        key: 'runAllTests',
	        value: function runAllTests() {
	            GPGPUUnitTests.run();
	            FFTUnitTests.run();
	            STFTUnitTests.run();
	            SpectrogramUnitTests.run();
	        }
	    }]);
	
	    return UnitTestsManager;
	}();
	
	;
	
	module.exports = UnitTestsManager;

/***/ },
/* 9 */
/*!****************************************!*\
  !*** ./src/webgl/WebGLStateManager.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _QuadDrawingUtils = __webpack_require__(/*! webgl/QuadDrawingUtils.js */ 10);
	
	var _QuadDrawingUtils2 = _interopRequireDefault(_QuadDrawingUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WebGLStateManager = function () {
	    function WebGLStateManager(ctx) {
	        _classCallCheck(this, WebGLStateManager);
	
	        this.ctx = ctx;
	        this.numAttribsEnabled = 0;
	        this.lazyQuadPosBuff = null;
	        this.lazyQuadIndexBuff = null;
	    }
	
	    _createClass(WebGLStateManager, [{
	        key: 'getQuadPosBuff',
	        value: function getQuadPosBuff() {
	            if (this.lazyQuadPosBuff == null) this.lazyQuadPosBuff = this.createStaticArrBuff(this.ctx.ARRAY_BUFFER, _QuadDrawingUtils2.default.QUAD_POS_ARR);
	            return this.lazyQuadPosBuff;
	        }
	    }, {
	        key: 'getQuadIndexBuff',
	        value: function getQuadIndexBuff() {
	            if (this.lazyQuadIndexBuff == null) this.lazyQuadIndexBuff = this.createStaticArrBuff(this.ctx.ELEMENT_ARRAY_BUFFER, _QuadDrawingUtils2.default.QUAD_INDEX_ARR);
	            return this.lazyQuadIndexBuff;
	        }
	    }, {
	        key: 'createStaticArrBuff',
	        value: function createStaticArrBuff(type, contents) {
	            var buff = this.ctx.createBuffer();
	            this.ctx.bindBuffer(type, buff);
	            this.ctx.bufferData(type, contents, this.ctx.STATIC_DRAW);
	            return buff;
	        }
	    }, {
	        key: 'enableAttribs',
	        value: function enableAttribs(numAttribs) {
	            while (this.numAttribsEnabled > numAttribs) {
	                this.numAttribsEnabled--;
	                this.ctx.disableVertexAttribArray(this.numAttribsEnabled);
	            }
	            while (this.numAttribsEnabled < numAttribs) {
	                this.ctx.enableVertexAttribArray(this.numAttribsEnabled);
	                this.numAttribsEnabled++;
	            }
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            if (this.lazyQuadPosBuff != null) this.ctx.deleteBuffer(this.lazyQuadPosBuff);
	            if (this.lazyQuadIndexBuff != null) this.ctx.deleteBuffer(this.lazyQuadIndexBuff);
	        }
	    }]);
	
	    return WebGLStateManager;
	}();
	
	;
	
	module.exports = WebGLStateManager;

/***/ },
/* 10 */
/*!***************************************!*\
  !*** ./src/webgl/QuadDrawingUtils.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _ShaderUtils = __webpack_require__(/*! webgl/ShaderUtils.js */ 11);
	
	var _ShaderUtils2 = _interopRequireDefault(_ShaderUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var QuadDrawingUtils = function () {
	    function QuadDrawingUtils() {
	        _classCallCheck(this, QuadDrawingUtils);
	    }
	
	    _createClass(QuadDrawingUtils, null, [{
	        key: 'createVertShaderSrc',
	        value: function createVertShaderSrc() {
	            var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	            var dynamicDims = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var dynamicPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var coordSystem = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : QuadDrawingUtils.TEX_COORD_SYSTEM.img;
	
	            if (dynamicDims) transforms.push(QuadDrawingUtils.TRANSFORMS.scale);
	            if (dynamicPos) transforms.push(QuadDrawingUtils.TRANSFORMS.translate);
	            var res = 'precision highp float;\n\nattribute vec2 aPos;\n\n' + (dynamicDims ? 'uniform vec2 uScale;\n' : '') + (dynamicPos ? 'uniform vec2 uTranslate;\n' : '') + '\nvarying vec2 vCoord;\n\nvoid main(){\n    vec2 pos = aPos;\n' + transforms.map(function (line) {
	                return '    ' + line;
	            }).join('\n') + '\n    vec2 glPos = vec2(pos.x * 2.0 - 1.0, pos.y * 2.0 - 1.0);\n    gl_Position = vec4(glPos, 0.0, 1.0);\n    ' + coordSystem + '\n}';
	            return res;
	        }
	    }, {
	        key: 'createDirectDrawFragShaderSrc',
	        value: function createDirectDrawFragShaderSrc() {
	            var res = 'precision highp float;\nprecision highp sampler2D;\n\nuniform sampler2D uImg;\n\nvarying vec2 vCoord;\n\nvoid main(){\n    gl_FragData[0] = texture2D(uImg, vCoord);\n}\n';
	            return res;
	        }
	    }, {
	        key: 'createQuadArray',
	        value: function createQuadArray(rect) {
	            return new Float32Array([rect.left, rect.bottom, rect.left, rect.top, rect.right, rect.top, rect.right, rect.bottom]);
	        }
	    }]);
	
	    return QuadDrawingUtils;
	}();
	
	;
	QuadDrawingUtils.TRANSFORMS = {
	    flipX: 'pos.x = 1.0 - pos.x;',
	    flipY: 'pos.y = 1.0 - pos.y;',
	    scale: 'pos = pos * uScale;',
	    translate: 'pos = pos + uTranslate;'
	};
	QuadDrawingUtils.TEX_COORD_SYSTEM = {
	    gl: 'vCoord = glPos;',
	    img: 'vCoord = aPos;'
	};
	QuadDrawingUtils.QUAD_POS_ARR = QuadDrawingUtils.createQuadArray(_Utils.Rect.fromBounds(0, 1, 0, 1));
	QuadDrawingUtils.QUAD_INDEX_ARR = new Uint16Array([0, 1, 2, 0, 2, 3]);
	QuadDrawingUtils.QUAD_NUM_VERT = 6;
	
	module.exports = QuadDrawingUtils;

/***/ },
/* 11 */
/*!**********************************!*\
  !*** ./src/webgl/ShaderUtils.js ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WebGLProgramInfo = function WebGLProgramInfo(program, vertShader, fragShader) {
	    _classCallCheck(this, WebGLProgramInfo);
	
	    this.program = program;
	    this.vertShader = vertShader;
	    this.fragShader = fragShader;
	};
	
	;
	
	var ShaderUtils = function () {
	    function ShaderUtils() {
	        _classCallCheck(this, ShaderUtils);
	    }
	
	    _createClass(ShaderUtils, null, [{
	        key: 'compileShader',
	        value: function compileShader(ctx, src, type) {
	            var shader = ctx.createShader(type);
	            ctx.shaderSource(shader, src);
	            ctx.compileShader(shader);
	            if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
	                console.log(src);
	                throw 'Shader compile error: ' + ctx.getShaderInfoLog(shader);
	            }
	            return shader;
	        }
	    }, {
	        key: 'createProgram',
	        value: function createProgram(ctx, vertSrc, fragSrc) {
	            var program = ctx.createProgram();
	            var vertShader = ShaderUtils.compileShader(ctx, vertSrc, ctx.VERTEX_SHADER);
	            var fragShader = ShaderUtils.compileShader(ctx, fragSrc, ctx.FRAGMENT_SHADER);
	            ctx.attachShader(program, vertShader);
	            ctx.attachShader(program, fragShader);
	            ctx.linkProgram(program);
	            return new WebGLProgramInfo(program, vertShader, fragShader);
	        }
	    }, {
	        key: 'registerTextures',
	        value: function registerTextures(ctx, program, texNames) {
	            texNames.forEach(function (texName, i) {
	                var texLoc = ctx.getUniformLocation(program, texName);
	                ctx.uniform1i(texLoc, i);
	            });
	        }
	    }, {
	        key: 'registerVectorUniform',
	        value: function registerVectorUniform(ctx, program, uniformName, val) {
	            var uniformLoc = ctx.getUniformLocation(program, uniformName);
	            ctx.uniform2fv(uniformLoc, val.toArray());
	        }
	    }, {
	        key: 'setVertAttrib',
	        value: function setVertAttrib(ctx, program, attribName, itemSize, buff) {
	            var attrib = ctx.getAttribLocation(program, attribName);
	            ctx.bindBuffer(ctx.ARRAY_BUFFER, buff);
	            ctx.vertexAttribPointer(attrib, itemSize, ctx.FLOAT, false, 0, 0);
	        }
	    }, {
	        key: 'bindTextures',
	        value: function bindTextures(ctx, textures) {
	            textures.forEach(function (texture, i) {
	                ctx.activeTexture(ctx['TEXTURE' + i.toString()]);
	                ctx.bindTexture(ctx.TEXTURE_2D, texture);
	            });
	        }
	    }, {
	        key: 'disposeProgram',
	        value: function disposeProgram(ctx, programInfo) {
	            ctx.detachShader(programInfo.program, programInfo.vertShader);
	            ctx.detachShader(programInfo.program, programInfo.fragShader);
	            ctx.deleteShader(programInfo.vertShader);
	            ctx.deleteShader(programInfo.fragShader);
	            ctx.deleteProgram(programInfo.program);
	        }
	    }]);
	
	    return ShaderUtils;
	}();
	
	;
	
	module.exports = ShaderUtils;

/***/ },
/* 12 */
/*!***********************************!*\
  !*** ./src/gpgpu/GPGPUManager.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShaderUtils = __webpack_require__(/*! webgl/ShaderUtils.js */ 11);
	
	var _ShaderUtils2 = _interopRequireDefault(_ShaderUtils);
	
	var _QuadDrawingUtils = __webpack_require__(/*! webgl/QuadDrawingUtils.js */ 10);
	
	var _QuadDrawingUtils2 = _interopRequireDefault(_QuadDrawingUtils);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _WebGLStateManager = __webpack_require__(/*! webgl/WebGLStateManager.js */ 9);
	
	var _WebGLStateManager2 = _interopRequireDefault(_WebGLStateManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GPUArray = function GPUArray(dims, tex) {
	    _classCallCheck(this, GPUArray);
	
	    this.dims = dims;
	    this.tex = tex;
	};
	
	;
	
	var GPGPUKernel = function () {
	    function GPGPUKernel(programInfo) {
	        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	        var numOutputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
	        _classCallCheck(this, GPGPUKernel);
	
	        this.programInfo = programInfo;
	        this.params = params;
	        this.numOutputs = numOutputs;
	    }
	
	    _createClass(GPGPUKernel, [{
	        key: 'program',
	        get: function get() {
	            return this.programInfo.program;
	        }
	    }]);
	
	    return GPGPUKernel;
	}();
	
	;
	
	var GPGPUManager = function () {
	    function GPGPUManager() {
	        var stateManager = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	        var useFloat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	        _classCallCheck(this, GPGPUManager);
	
	        this.embeddedStateManager = stateManager == null;
	        if (this.embeddedStateManager) {
	            stateManager = GPGPUManager.createWebGLStateManager();
	        }
	        this.stateManager = stateManager;
	        this.useFloat = useFloat;
	
	        this.extDB = this.ctx.getExtension('WEBGL_draw_buffers');
	        if (this.useFloat) {
	            this.ctx.getExtension('OES_texture_float');
	        }
	    }
	
	    _createClass(GPGPUManager, [{
	        key: 'createComputeTexture',
	        value: function createComputeTexture(dims) {
	            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ctx.FLOAT;
	            var contents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	            var format = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.ctx.RGBA;
	
	            var tex = this.ctx.createTexture();
	            this.ctx.bindTexture(this.ctx.TEXTURE_2D, tex);
	            this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_MIN_FILTER, this.ctx.NEAREST);
	            this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_MAG_FILTER, this.ctx.NEAREST);
	            this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_WRAP_S, this.ctx.CLAMP_TO_EDGE);
	            this.ctx.texParameteri(this.ctx.TEXTURE_2D, this.ctx.TEXTURE_WRAP_T, this.ctx.CLAMP_TO_EDGE);
	            this.ctx.texImage2D(this.ctx.TEXTURE_2D, 0, format, dims.width, dims.height, 0, format, type, contents);
	            return tex;
	        }
	    }, {
	        key: 'createFBO',
	        value: function createFBO(textures) {
	            var _this = this;
	
	            var fbo = this.ctx.createFramebuffer();
	            this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, fbo);
	            if (textures.length > 1) {
	                this.extDB.drawBuffersWEBGL(_Utils.Utils.compute1DArray(textures.length, function (i) {
	                    return _this.extDB['COLOR_ATTACHMENT' + i.toString() + '_WEBGL'];
	                }));
	                textures.forEach(function (tex, i) {
	                    _this.ctx.framebufferTexture2D(_this.ctx.FRAMEBUFFER, _this.extDB['COLOR_ATTACHMENT' + i.toString() + '_WEBGL'], _this.ctx.TEXTURE_2D, tex, 0);
	                });
	            } else {
	                this.ctx.framebufferTexture2D(this.ctx.FRAMEBUFFER, this.ctx.COLOR_ATTACHMENT0, this.ctx.TEXTURE_2D, textures[0], 0);
	            }
	            if (this.ctx.checkFramebufferStatus(this.ctx.FRAMEBUFFER) != this.ctx.FRAMEBUFFER_COMPLETE) {
	                throw 'GL_FRAMEBUFFER_COMPLETE failed.';
	            }
	            return fbo;
	        }
	    }, {
	        key: 'registerUniforms',
	        value: function registerUniforms(program, uniforms, vals) {
	            var _this2 = this;
	
	            uniforms.forEach(function (uniform) {
	                var uniformLoc = _this2.ctx.getUniformLocation(program, uniform.name);
	                if (uniform.type == 'int') {
	                    _this2.ctx.uniform1i(uniformLoc, vals[uniform.name]);
	                } else if (uniform.type == 'float') {
	                    _this2.ctx.uniform1f(uniformLoc, vals[uniform.name]);
	                } else if (/^ivec[2-4]$/g.test(uniform.type)) {
	                    _this2.ctx['uniform' + uniform.type[4].toString() + 'iv'](uniformLoc, new Int32Array(vals[uniform.name]));
	                } else if (/^vec[2-4]$/g.test(uniform.type)) {
	                    _this2.ctx['uniform' + uniform.type[3].toString() + 'fv'](uniformLoc, new Float32Array(vals[uniform.name]));
	                }
	            });
	        }
	    }, {
	        key: 'drawQuad',
	        value: function drawQuad(program) {
	            this.ctx.useProgram(program);
	            this.stateManager.enableAttribs(1);
	            this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.quadIndexBuff);
	            this.ctx.drawElements(this.ctx.TRIANGLE_STRIP, _QuadDrawingUtils2.default.QUAD_NUM_VERT, this.ctx.UNSIGNED_SHORT, 0);
	        }
	    }, {
	        key: 'disposeGPUArr',
	        value: function disposeGPUArr(gpuArr) {
	            this.ctx.deleteTexture(gpuArr.tex);
	        }
	    }, {
	        key: 'numChannelsToFormat',
	        value: function numChannelsToFormat(numChannels) {
	            if (numChannels === 1) return this.ctx.ALPHA;else if (numChannels === 2) throw 'WebGL 1.0 does not support RG textures.';else if (numChannels === 3) return this.ctx.RGB;else if (numChannels === 4) return this.ctx.RGBA;else throw 'Unsupported number of channels.';
	        }
	    }, {
	        key: 'flatArrToGPUArr',
	        value: function flatArrToGPUArr(arr, dims) {
	            var numChannels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
	
	            if (!this.useFloat && numChannels != 4) throw 'Packed float arrays require 4 channels.';
	            var format = this.numChannelsToFormat(numChannels);
	            var floatArr = new Float32Array(arr);
	            return new GPUArray(dims, this.createComputeTexture(dims, this.useFloat ? this.ctx.FLOAT : this.ctx.UNSIGNED_BYTE, this.useFloat ? floatArr : new Uint8Array(floatArr.buffer), format));
	        }
	    }, {
	        key: 'arrToGPUArr',
	        value: function arrToGPUArr(arr) {
	            var singleChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	            if (!this.useFloat && !singleChannel) throw 'Cannot pack multiple packed float channels.';
	            var pixelFlatArr = _Utils.Utils.flatten(arr.data);
	            var flatArr = this.useFloat ? _Utils.Utils.flatten(singleChannel ? pixelFlatArr.map(function (val) {
	                return [val, 0, 0, 0];
	            }) : pixelFlatArr) : pixelFlatArr;
	            return this.flatArrToGPUArr(flatArr, arr.dims);
	        }
	    }, {
	        key: 'gpuArrToFlatArr',
	        value: function gpuArrToFlatArr(gpuArr) {
	            var overrideFloat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var fbo = this.createFBO([gpuArr.tex]);
	            this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, fbo);
	            var buffLen = gpuArr.dims.getArea() * 4;
	            var buff = this.useFloat && !overrideFloat ? new Float32Array(buffLen) : new Uint8Array(buffLen);
	            this.ctx.readPixels(0, 0, gpuArr.dims.width, gpuArr.dims.height, this.ctx.RGBA, this.useFloat && !overrideFloat ? this.ctx.FLOAT : this.ctx.UNSIGNED_BYTE, buff);
	            this.ctx.deleteFramebuffer(fbo);
	            return this.useFloat ? buff : new Float32Array(buff.buffer);
	        }
	    }, {
	        key: 'gpuArrToArr',
	        value: function gpuArrToArr(gpuArr) {
	            var singleChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	            var _this3 = this;
	
	            var numTexChannels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
	            var overrideFloat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	            if (!this.useFloat && !singleChannel) throw 'Cannot pack multiple packed float channels.';
	            if (!this.useFloat && numTexChannels != 4) throw 'Packed float arrays require 4 channels.';
	            var copyArr = numTexChannels != 4;
	            if (copyArr) gpuArr = this.copyGPUArr(gpuArr, numTexChannels, 4);
	            var flatArr = this.gpuArrToFlatArr(gpuArr, overrideFloat);
	            if (copyArr) this.disposeGPUArr(gpuArr);
	            var arrData = _Utils.Utils.compute2DArray(gpuArr.dims, function (pos) {
	                var offset = pos.y * gpuArr.dims.width + pos.x;
	                return _this3.useFloat ? singleChannel ? flatArr[offset * 4] : flatArr.slice(offset * 4, (offset + 1) * 4) : flatArr[offset];
	            });
	            return new _Utils.Array2D(gpuArr.dims, arrData);
	        }
	    }, {
	        key: 'createCopyKernel',
	        value: function createCopyKernel() {
	            var srcNumChannels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
	            var destNumChannels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : srcNumChannels;
	
	            if (!this.useFloat && (srcNumChannels != 4 || destNumChannels != 4)) throw 'Packed float arrays require 4 channels.';
	            var extractCode = null,
	                placeCode = null;
	            if (srcNumChannels == 1) extractCode = 'vec4(texture2D(uArr, vCoord).a, 0.0, 0.0, 0.0)';else if (srcNumChannels === 2) throw 'WebGL 1.0 does not support RG textures.';else if (srcNumChannels === 3 || srcNumChannels === 4) extractCode = 'texture2D(uArr, vCoord)';else throw 'Unsupported number of channels.';
	            if (destNumChannels == 1) placeCode = 'vec4(0.0, 0.0, 0.0, data.r)';else if (destNumChannels === 2) throw 'WebGL 1.0 does not support RG textures.';else if (destNumChannels === 3 || destNumChannels == 4) placeCode = 'data';else throw 'Unsupported number of channels.';
	            return this.createKernel('vec4 data = ' + extractCode + ';\ngl_FragData[0] = ' + placeCode + ';\n', ['uArr'], [], 1);
	        }
	    }, {
	        key: 'copyGPUArr',
	        value: function copyGPUArr(gpuArr) {
	            var srcNumChannels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
	            var destNumChannels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : srcNumChannels;
	
	            var copyKernel = this.createCopyKernel(srcNumChannels, destNumChannels);
	            var resGPUArr = this.runKernel(copyKernel, [gpuArr], gpuArr.dims)[0];
	            this.disposeKernel(copyKernel);
	            return resGPUArr;
	        }
	    }, {
	        key: 'disposeProgram',
	        value: function disposeProgram(programInfo) {
	            this.ctx.detachShader(programInfo.program, programInfo.vertShader);
	            this.ctx.detachShader(programInfo.program, programInfo.fragShader);
	            this.ctx.deleteShader(programInfo.vertShader);
	            this.ctx.deleteShader(programInfo.fragShader);
	            this.ctx.deleteProgram(programInfo.program);
	        }
	    }, {
	        key: 'createKernel',
	        value: function createKernel(computeFunc, inputNames) {
	            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	            var numOutputs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	            var includeSrc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
	
	            var uniforms = [].concat(params, inputNames.map(function (inputName) {
	                return {
	                    type: 'sampler2D',
	                    name: inputName
	                };
	            }), [{
	                type: 'ivec2',
	                name: 'uDims'
	            }]);
	            var vertShaderSrc = GPGPUManager.createVertShaderSrc();
	            var fragShaderSrc = GPGPUManager.createFragShaderSrc(computeFunc.trim().split('\n').map(function (line) {
	                return '    ' + line;
	            }).join('\n') + '\n', uniforms, includeSrc, numOutputs > 1);
	            var programInfo = _ShaderUtils2.default.createProgram(this.ctx, vertShaderSrc, fragShaderSrc);
	            var program = programInfo.program;
	
	            this.ctx.useProgram(program);
	            _ShaderUtils2.default.setVertAttrib(this.ctx, program, 'aPos', 2, this.quadPosBuff);
	            _ShaderUtils2.default.registerTextures(this.ctx, program, inputNames);
	            return new GPGPUKernel(programInfo, params, numOutputs);
	        }
	    }, {
	        key: 'runKernel',
	        value: function runKernel(kernel, inputArrs, outputDims) {
	            var paramVals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	            var _this4 = this;
	
	            var colorOutput = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	            var drawDirect = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
	
	            this.ctx.useProgram(kernel.program);
	            this.registerUniforms(kernel.program, kernel.params, paramVals);
	            this.registerUniforms(kernel.program, [{
	                name: 'uDims',
	                type: 'ivec2'
	            }], {
	                uDims: outputDims.toArray()
	            });
	
	            var outputTextures = _Utils.Utils.compute1DArray(kernel.numOutputs, function (i) {
	                return _this4.createComputeTexture(outputDims, _this4.useFloat && !colorOutput ? _this4.ctx.FLOAT : _this4.ctx.UNSIGNED_BYTE);
	            });
	
	            var fbo = drawDirect ? null : this.createFBO(outputTextures);
	            this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, fbo);
	
	            _ShaderUtils2.default.bindTextures(this.ctx, inputArrs.map(function (gpuArr) {
	                return gpuArr.tex;
	            }));
	
	            this.ctx.viewport(0, 0, outputDims.width, outputDims.height);
	            this.drawQuad(kernel.program);
	
	            if (fbo != null) this.ctx.deleteFramebuffer(fbo);
	
	            return outputTextures.map(function (tex) {
	                return new GPUArray(outputDims, tex);
	            });
	        }
	    }, {
	        key: 'disposeKernel',
	        value: function disposeKernel(kernel) {
	            _ShaderUtils2.default.disposeProgram(this.ctx, kernel.programInfo);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            if (this.embeddedStateManager) this.stateManager.dispose();
	        }
	    }, {
	        key: 'ctx',
	        get: function get() {
	            return this.stateManager.ctx;
	        }
	    }, {
	        key: 'quadPosBuff',
	        get: function get() {
	            return this.stateManager.getQuadPosBuff();
	        }
	    }, {
	        key: 'quadIndexBuff',
	        get: function get() {
	            return this.stateManager.getQuadIndexBuff();
	        }
	    }], [{
	        key: 'createGPGPUCanvasContext',
	        value: function createGPGPUCanvasContext() {
	            var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	            if (canvas == null) {
	                canvas = document.createElement('canvas');
	                canvas.width = 1;
	                canvas.height = 1;
	            }
	            var options = {
	                depth: false,
	                antialias: false
	            };
	            return canvas.getContext('webgl', options) || canvas.getContext('webgl-experimental', options);
	        }
	    }, {
	        key: 'createWebGLStateManager',
	        value: function createWebGLStateManager() {
	            var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	            return new _WebGLStateManager2.default(this.createGPGPUCanvasContext(canvas));
	        }
	    }]);
	
	    return GPGPUManager;
	}();
	
	;
	
	// Credit: https://gist.github.com/TooTallNate/4750953
	GPGPUManager.ENDIANNESS = function () {
	    var b = new ArrayBuffer(4);
	    var a = new Uint32Array(b);
	    var c = new Uint8Array(b);
	    a[0] = 0xdeadbeef;
	    if (c[0] == 0xef) return 'LE';
	    if (c[0] == 0xde) return 'BE';
	    throw new Error('unknown endianness');
	}();
	
	GPGPUManager.createVertShaderSrc = function () {
	    var drawDirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    return _QuadDrawingUtils2.default.createVertShaderSrc(drawDirect ? [_QuadDrawingUtils2.default.TRANSFORMS.flipY] : []);
	};
	
	///
	/// Adapted from gpu.js
	/// http://gpu.rocks/
	///
	/// GPU Accelerated JavaScript
	///
	/// @version 0.0.0
	/// @date    Mon Jul 04 2016 00:47:07 GMT+0800 (SGT)
	///
	/// @license MIT
	/// The MIT License
	///
	/// Copyright (c) 2016 Fazli Sapuan, Matthew Saw, Eugene Cheah and Julia Low
	///
	/// Permission is hereby granted, free of charge, to any person obtaining a copy
	/// of this software and associated documentation files (the "Software"), to deal
	/// in the Software without restriction, including without limitation the rights
	/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	/// copies of the Software, and to permit persons to whom the Software is
	/// furnished to do so, subject to the following conditions:
	///
	/// The above copyright notice and this permission notice shall be included in
	/// all copies or substantial portions of the Software.
	///
	/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	/// THE SOFTWARE.
	///
	
	GPGPUManager.PACK_FLOAT_INCLUDE = 'float round(float x) {\n    return floor(x + 0.5);\n}\n\nvec2 integerMod(vec2 x, float y) {\n    vec2 res = floor(mod(x, y));\n    return res * step(1.0 - floor(y), -res);\n}\n\nfloat integerMod(float x, float y) {\n    float res = floor(mod(x, y));\n    return res * (res > floor(y) - 1.0 ? 0.0 : 1.0);\n}\n\nconst vec2 MAGIC_VEC = vec2(1.0, -256.0);\nconst vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);\nconst vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536\nfloat unpackFloat(vec4 rgba) {\n' + (GPGPUManager.ENDIANNESS == 'LE' ? '' : '    rgba.rgba = rgba.abgr;\n') + '    rgba *= 255.0;\n    vec2 gte128;\n    gte128.x = rgba.b >= 128.0 ? 1.0 : 0.0;\n    gte128.y = rgba.a >= 128.0 ? 1.0 : 0.0;\n    float exponent = 2.0 * rgba.a - 127.0 + dot(gte128, MAGIC_VEC);\n    float res = exp2(round(exponent));\n    rgba.b = rgba.b - 128.0 * gte128.x;\n    res = dot(rgba, SCALE_FACTOR) * exp2(round(exponent-23.0)) + res;\n    res *= gte128.y * -2.0 + 1.0;\n    return res;\n}\n\nvec4 packFloat(float f) {\n    float F = abs(f);\n    float sign = f < 0.0 ? 1.0 : 0.0;\n    float exponent = floor(log2(F));\n    float mantissa = (exp2(-exponent) * F);\n    // exponent += floor(log2(mantissa));\n    vec4 rgba = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;\n    rgba.rg = integerMod(rgba.rg, 256.0);\n    rgba.b = integerMod(rgba.b, 128.0);\n    rgba.a = exponent*0.5 + 63.5;\n    rgba.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;\n    rgba = floor(rgba);\n    rgba *= 0.003921569; // 1/255\n' + (GPGPUManager.ENDIANNESS == 'LE' ? '' : '    rgba.rgba = rgba.abgr;\n') + '    return rgba;\n}\n\n';
	
	GPGPUManager.createFragShaderSrc = function (computeFunc, uniforms) {
	    var includeSrc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    var useDrawBuffers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	    return [useDrawBuffers ? '#extension GL_EXT_draw_buffers: require\n' : '', 'precision highp float;\nprecision highp sampler2D;\n\n'].concat(_toConsumableArray(uniforms.map(function (uniform) {
	        return 'uniform ' + uniform.type + ' ' + uniform.name + ';\n';
	    })), ['\nvarying vec2 vCoord;\n\nvec4 arrGet(sampler2D arr, ivec2 id, ivec2 dims){\n    return texture2D(arr, (vec2(id) + vec2(0.5)) / vec2(dims));\n}\n\n', includeSrc, 'void main(){\n    ivec2 threadId = ivec2(vCoord * vec2(uDims));\n', computeFunc, '}\n']).join('');
	};
	
	module.exports = GPGPUManager;

/***/ },
/* 13 */
/*!*****************************!*\
  !*** ./src/gpgpu/GPUDFT.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GPGPUComplexIncludes = __webpack_require__(/*! gpgpu/GPGPUComplexIncludes.js */ 14);
	
	var _GPGPUComplexIncludes2 = _interopRequireDefault(_GPGPUComplexIncludes);
	
	var _GPGPUManager = __webpack_require__(/*! gpgpu/GPGPUManager.js */ 12);
	
	var _GPGPUManager2 = _interopRequireDefault(_GPGPUManager);
	
	var _ComplexArray2D = __webpack_require__(/*! gpgpu/ComplexArray2D.js */ 24);
	
	var _ComplexArray2D2 = _interopRequireDefault(_ComplexArray2D);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GPUDFT = function () {
	    function GPUDFT(manager) {
	        _classCallCheck(this, GPUDFT);
	
	        if (manager.useFloat) {
	            throw 'GPUDFT does not support floating point textures yet.';
	        }
	        this.manager = manager;
	        this.dftKernel = manager.createKernel('vec2 res = vec2(0.0, 0.0);\nfor(int i = 0; i < 4096; i++){\n    if(i >= uDims.y) break;\n    res += unpackFloat(arrGet(uArr, ivec2(threadId.x, i), uDims)) *\n        complexExp(vec2(0.0, -2.0 * PI * float(threadId.y) * float(i) / float(uDims.y)));\n}\ngl_FragData[0] = packFloat(res.x);\ngl_FragData[1] = packFloat(res.y);\n', ['uArr'], [], 2, _GPGPUManager2.default.PACK_FLOAT_INCLUDE + _GPGPUComplexIncludes2.default.PI + _GPGPUComplexIncludes2.default.LIB);
	    }
	
	    _createClass(GPUDFT, [{
	        key: 'parallelDFT',
	        value: function parallelDFT(arr) {
	            var gpuArr = arr.getGPUArrs(this.manager)[0];
	            var resGPUArrs = this.manager.runKernel(this.dftKernel, [gpuArr], arr.dims);
	            return _ComplexArray2D2.default.fromGPUArrs(resGPUArrs[0], resGPUArrs[1]);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.dftKernel);
	        }
	    }]);
	
	    return GPUDFT;
	}();
	
	;
	
	module.exports = GPUDFT;

/***/ },
/* 14 */
/*!*******************************************!*\
  !*** ./src/gpgpu/GPGPUComplexIncludes.js ***!
  \*******************************************/
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GPGPUComplexIncludes = function GPGPUComplexIncludes() {
	    _classCallCheck(this, GPGPUComplexIncludes);
	};
	
	;
	GPGPUComplexIncludes.PI = "const float PI = 3.1415926535897932384626433832795;\n\n";
	GPGPUComplexIncludes.LIB = "vec2 complexMult(vec2 a, vec2 b){\n    return vec2(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);\n}\n\nvec2 complexDiv(vec2 a, vec2 b){\n    float divisor = dot(b, b);\n    return vec2(dot(a, b), a.y * b.x - a.x * b.y) / divisor;\n}\n\nvec2 complexPow(vec2 a, vec2 b){\n    float r = length(a), phi = atan(a.y, a.x);\n    float newR = pow(r, b.x) * exp(-b.y * phi);\n    float newPhi = b.y * log(r) + b.x * phi;\n    return newR * vec2(cos(newPhi), sin(newPhi));\n}\n\nvec2 complexExp(vec2 b){\n    return exp(b.x) * vec2(cos(b.y), sin(b.y));\n}\n\nvec2 complexLog(vec2 x){\n    return vec2(log(length(x)), atan(x.y, x.x));\n}\n\n";
	
	module.exports = GPGPUComplexIncludes;

/***/ },
/* 15 */
/*!*****************************!*\
  !*** ./src/gpgpu/GPUFFT.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GPGPUComplexIncludes = __webpack_require__(/*! gpgpu/GPGPUComplexIncludes.js */ 14);
	
	var _GPGPUComplexIncludes2 = _interopRequireDefault(_GPGPUComplexIncludes);
	
	var _GPGPUManager = __webpack_require__(/*! gpgpu/GPGPUManager.js */ 12);
	
	var _GPGPUManager2 = _interopRequireDefault(_GPGPUManager);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _ComplexArray2D = __webpack_require__(/*! gpgpu/ComplexArray2D.js */ 24);
	
	var _ComplexArray2D2 = _interopRequireDefault(_ComplexArray2D);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	
	With reference to Understanding the FFT Algorithm by Jake Vanderplas
	Source: https://jakevdp.github.io/blog/2013/08/28/understanding-the-fft/
	License: BSD
	
	*/
	
	var GPUFFTPacked = function () {
	    function GPUFFTPacked(manager) {
	        _classCallCheck(this, GPUFFTPacked);
	
	        this.manager = manager;
	        this.zeroKernel = this.manager.createKernel('gl_FragData[0] = packFloat(0.0);\n', [], [], 1, _GPGPUManager2.default.PACK_FLOAT_INCLUDE);
	        this.fftKernel = this.manager.createKernel('//factor of two cancels out for 2PI and period\nvec2 twiddle = complexExp(vec2(0.0,\n    -PI * float(threadId.y) / float(uButterflyWidth)\n));\nint column = threadId.y / uButterflyWidth;\nint row = threadId.y - column * uButterflyWidth;\nint refIndex1 = (column / 2) * uButterflyWidth + row;\nivec2 refPos1 = ivec2(threadId.x, refIndex1);\nint refIndex2 = refIndex1 + uDims.y / 2;\nivec2 refPos2 = ivec2(threadId.x, refIndex2);\nvec2 ref1 = vec2(\n    unpackFloat(arrGet(uReal, refPos1, uDims)),\n    unpackFloat(arrGet(uImg, refPos1, uDims))\n);\nvec2 ref2 = vec2(\n    unpackFloat(arrGet(uReal, refPos2, uDims)),\n    unpackFloat(arrGet(uImg, refPos2, uDims))\n);\nvec2 res = ref1 + complexMult(twiddle, ref2);\ngl_FragData[0] = packFloat(res.x);\ngl_FragData[1] = packFloat(res.y);\n', ['uReal', 'uImg'], [{
	            type: 'int',
	            name: 'uButterflyWidth'
	        }], 2, _GPGPUManager2.default.PACK_FLOAT_INCLUDE + _GPGPUComplexIncludes2.default.PI + _GPGPUComplexIncludes2.default.LIB);
	    }
	
	    _createClass(GPUFFTPacked, [{
	        key: 'parallelFFT',
	        value: function parallelFFT(arr) {
	            var fftWidth = arr.dims.height;
	            if ((fftWidth & fftWidth - 1) != 0) {
	                throw 'Cannot do FFT on non-power of two width.';
	            }
	            var realArr = arr.getGPUArrs(this.manager)[0];
	            var imgArr = arr.getGPUArrs(this.manager)[1];
	            var generateImgArr = imgArr == null;
	            if (generateImgArr) imgArr = this.manager.runKernel(this.zeroKernel, [], arr.dims)[0];
	            for (var butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2) {
	                var stepResGPUArrs = this.manager.runKernel(this.fftKernel, [realArr, imgArr], arr.dims, {
	                    uButterflyWidth: butterflyWidth
	                });
	                if (butterflyWidth == 1 && generateImgArr) {
	                    this.manager.disposeGPUArr(imgArr);
	                }
	                if (butterflyWidth != 1) {
	                    this.manager.disposeGPUArr(realArr);
	                    this.manager.disposeGPUArr(imgArr);
	                }
	                realArr = stepResGPUArrs[0];
	                imgArr = stepResGPUArrs[1];
	            }
	            return _ComplexArray2D2.default.fromGPUArrs(realArr, imgArr);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.zeroKernel);
	            this.manager.disposeKernel(this.fftKernel);
	        }
	    }]);
	
	    return GPUFFTPacked;
	}();
	
	;
	
	var GPUFFTFloat = function () {
	    function GPUFFTFloat(manager) {
	        _classCallCheck(this, GPUFFTFloat);
	
	        this.manager = manager;
	        this.fftKernel = this.manager.createKernel('//factor of two cancels out for 2PI and period\nvec2 twiddle = complexExp(vec2(0.0,\n    -PI * float(threadId.y) / float(uButterflyWidth)\n));\nint column = threadId.y / uButterflyWidth;\nint row = threadId.y - column * uButterflyWidth;\nint refIndex1 = (column / 2) * uButterflyWidth + row;\nivec2 refPos1 = ivec2(threadId.x, refIndex1);\nint refIndex2 = refIndex1 + uDims.y / 2;\nivec2 refPos2 = ivec2(threadId.x, refIndex2);\n// Note: not setting initial imaginary part to zero\n// unless tests fail somewhere.\nvec2 ref1 = arrGet(uArr, refPos1, uDims).ar;\nvec2 ref2 = arrGet(uArr, refPos2, uDims).ar;\nvec2 res = ref1 + complexMult(twiddle, ref2);\ngl_FragData[0] = vec4(res.y, 0.0, 0.0, res.x);\n', ['uArr'], [{
	            type: 'int',
	            name: 'uButterflyWidth'
	        }], 1, _GPGPUComplexIncludes2.default.PI + _GPGPUComplexIncludes2.default.LIB);
	    }
	
	    _createClass(GPUFFTFloat, [{
	        key: 'parallelFFT',
	        value: function parallelFFT(arr) {
	            var fftWidth = arr.dims.height;
	            if ((fftWidth & fftWidth - 1) != 0) {
	                throw 'Cannot do FFT on non-power of two width.';
	            }
	            var stepArr = arr.getGPUArr(this.manager);
	            for (var butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2) {
	                var stepResGPUArr = this.manager.runKernel(this.fftKernel, [stepArr], arr.dims, {
	                    uButterflyWidth: butterflyWidth
	                });
	                if (butterflyWidth != 1) {
	                    this.manager.disposeGPUArr(stepArr);
	                }
	                stepArr = stepResGPUArr[0];
	            }
	            return _ComplexArray2D2.default.fromGPUArr(stepArr);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.fftKernel);
	        }
	    }]);
	
	    return GPUFFTFloat;
	}();
	
	;
	
	var GPUFFT = function () {
	    function GPUFFT(manager) {
	        _classCallCheck(this, GPUFFT);
	
	        this.fftManager = manager.useFloat ? new GPUFFTFloat(manager) : new GPUFFTPacked(manager);
	    }
	
	    _createClass(GPUFFT, [{
	        key: 'parallelFFT',
	        value: function parallelFFT(arr) {
	            return this.fftManager.parallelFFT(arr);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.fftManager.dispose();
	        }
	    }]);
	
	    return GPUFFT;
	}();
	
	;
	
	module.exports = GPUFFT;

/***/ },
/* 16 */
/*!******************************!*\
  !*** ./src/gpgpu/GPUSTFT.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GPUFFT = __webpack_require__(/*! gpgpu/GPUFFT.js */ 15);
	
	var _GPUFFT2 = _interopRequireDefault(_GPUFFT);
	
	var _GPGPUComplexIncludes = __webpack_require__(/*! gpgpu/GPGPUComplexIncludes.js */ 14);
	
	var _GPGPUComplexIncludes2 = _interopRequireDefault(_GPGPUComplexIncludes);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _ComplexArray2D = __webpack_require__(/*! gpgpu/ComplexArray2D.js */ 24);
	
	var _ComplexArray2D2 = _interopRequireDefault(_ComplexArray2D);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GPUSTFT = function () {
	    function GPUSTFT(manager) {
	        _classCallCheck(this, GPUSTFT);
	
	        if (!manager.useFloat) {
	            throw 'GPUSTFT only supports floating-point textures.';
	        }
	        this.manager = manager;
	        this.fftManager = new _GPUFFT2.default(this.manager);
	        this.windowKernel = this.manager.createKernel('float windVal = 0.5 * (1.0 - cos(2.0 * PI * float(threadId.y * 2 + 1) / float(uDims.y * 2)));\nint arrIndex = threadId.x * uDims.y / 2 + threadId.y;\nfloat res = windVal * arrGet(uArr, ivec2(\n    int(mod(float(arrIndex), float(uSrcDims.x))),\n    arrIndex / uSrcDims.x\n), uSrcDims).a;\ngl_FragData[0] = vec4(0.0, 0.0, 0.0, res);\n', ['uArr'], [{
	            type: 'ivec2',
	            name: 'uSrcDims'
	        }], 1, _GPGPUComplexIncludes2.default.PI);
	    }
	
	    _createClass(GPUSTFT, [{
	        key: 'stft',
	        value: function stft(arr) {
	            var windSz = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;
	            var fromGPUArr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var wrapWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : windSz / 2;
	
	            if (!fromGPUArr && arr.length % wrapWidth != 0) {
	                var paddedArr = new Float32Array(Math.floor(arr.length / wrapWidth + 1) * wrapWidth);
	                paddedArr.set(arr);
	                arr = paddedArr;
	            }
	            var gpuArrDims = fromGPUArr ? arr.dims : new _Utils.Dimensions(wrapWidth, arr.length / wrapWidth);
	            var gpuArr = fromGPUArr ? arr : this.manager.flatArrToGPUArr(arr, gpuArrDims, 1);
	            var fftInputArr = _ComplexArray2D2.default.fromGPUArr(this.manager.runKernel(this.windowKernel, [gpuArr], new _Utils.Dimensions(arr.length / (windSz / 2) - 1, windSz), {
	                uSrcDims: gpuArrDims.toArray()
	            })[0]);
	            if (!fromGPUArr) this.manager.disposeGPUArr(gpuArr);
	            var resGPUArr = this.fftManager.parallelFFT(fftInputArr);
	            fftInputArr.dispose(this.manager);
	            return resGPUArr;
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.windowKernel);
	            this.fftManager.dispose();
	        }
	    }]);
	
	    return GPUSTFT;
	}();
	
	;
	GPUSTFT.DEFAULT_WRAP_WIDTH = 2048;
	
	module.exports = GPUSTFT;

/***/ },
/* 17 */
/*!*****************************************!*\
  !*** ./src/engine/SpectrogramKernel.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GPUSTFT = __webpack_require__(/*! gpgpu/GPUSTFT.js */ 16);
	
	var _GPUSTFT2 = _interopRequireDefault(_GPUSTFT);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SpectrogramKernel = function () {
	    function SpectrogramKernel(manager) {
	        _classCallCheck(this, SpectrogramKernel);
	
	        this.manager = manager;
	        this.postprocessKernel = SpectrogramKernel.createPostprocessKernel(this.manager);
	    }
	
	    _createClass(SpectrogramKernel, [{
	        key: 'run',
	        value: function run(data, magRange, magOffset) {
	            var resGPUArr = this.manager.runKernel(this.postprocessKernel, [data.getGPUArr(this.manager)], new _Utils.Dimensions(data.dims.width, data.dims.height / 2), {
	                magRange: magRange,
	                magOffset: magOffset
	            }, true)[0];
	            return resGPUArr;
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.postprocessKernel);
	        }
	    }, {
	        key: 'ctx',
	        get: function get() {
	            return this.manager.ctx;
	        }
	    }], [{
	        key: 'createPostprocessKernel',
	        value: function createPostprocessKernel(manager) {
	            return manager.createKernel('float mag = length(arrGet(uArr, threadId, ivec2(uDims.x, uDims.y * 2)).ar) / sqrt(float(uDims.y * 2));\ngl_FragData[0] = vec4(\n    log(mag) / magRange + magOffset,\n    0.0, 0.0, 1.0\n);\n', ['uArr'], [{
	                type: 'float',
	                name: 'magRange'
	            }, {
	                type: 'float',
	                name: 'magOffset'
	            }], 1, '');
	        }
	    }]);
	
	    return SpectrogramKernel;
	}();
	
	;
	
	module.exports = SpectrogramKernel;

/***/ },
/* 18 */
/*!*******************************************!*\
  !*** ./src/tests/FFTTimingTestManager.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _WebGLStateManager = __webpack_require__(/*! webgl/WebGLStateManager.js */ 9);
	
	var _WebGLStateManager2 = _interopRequireDefault(_WebGLStateManager);
	
	var _GPGPUManager = __webpack_require__(/*! gpgpu/GPGPUManager.js */ 12);
	
	var _GPGPUManager2 = _interopRequireDefault(_GPGPUManager);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _EventLoop = __webpack_require__(/*! utils/EventLoop.js */ 19);
	
	var _EventLoop2 = _interopRequireDefault(_EventLoop);
	
	var _GPUDFT = __webpack_require__(/*! gpgpu/GPUDFT.js */ 13);
	
	var _GPUDFT2 = _interopRequireDefault(_GPUDFT);
	
	var _GPUFFT = __webpack_require__(/*! gpgpu/GPUFFT.js */ 15);
	
	var _GPUFFT2 = _interopRequireDefault(_GPUFFT);
	
	var _ComplexArray2D = __webpack_require__(/*! gpgpu/ComplexArray2D.js */ 24);
	
	var _ComplexArray2D2 = _interopRequireDefault(_ComplexArray2D);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FFTTimingTestManager = function () {
	    function FFTTimingTestManager() {
	        _classCallCheck(this, FFTTimingTestManager);
	    }
	
	    _createClass(FFTTimingTestManager, null, [{
	        key: 'run',
	        value: function run() {
	            var stateManager = _GPGPUManager2.default.createWebGLStateManager();
	            var manager = new _GPGPUManager2.default(stateManager, false);
	            var managerFloat = new _GPGPUManager2.default(stateManager, true);
	            var testDims = new _Utils.Dimensions(500, 2048);
	            var randArr1 = _ComplexArray2D2.default.fromRealArr(_Utils.Utils.compute2DArrayAsArray2D(testDims, function (pos) {
	                return Math.random();
	            }));
	            var randArr2 = _ComplexArray2D2.default.fromRealArr(randArr1.getCPUArrs()[0]);
	            var randArr3 = _ComplexArray2D2.default.fromRealArr(randArr2.getCPUArrs()[0]);
	            var gpuDFT = new _GPUDFT2.default(manager);
	            var gpuFFT = new _GPUFFT2.default(manager);
	            var gpuFFTFloat = new _GPUFFT2.default(managerFloat);
	            var eventLoop = new _EventLoop2.default();
	            var dftTime = 0,
	                fftTime = 0,
	                fftFloatTime = 0;
	            eventLoop.addTask(function () {
	                randArr1.getGPUArrs(manager);
	                manager.ctx.finish();
	                var startTime = performance.now();
	                var dftArr = gpuDFT.parallelDFT(randArr1, true);
	                manager.ctx.finish();
	                var endTime = performance.now();
	                dftTime = endTime - startTime;
	                dftArr.dispose(manager);
	                randArr1.dispose(manager);
	            });
	            eventLoop.addTask(function () {
	                randArr2.getGPUArrs(manager);
	                manager.ctx.finish();
	                var startTime = performance.now();
	                var fftArr = gpuFFT.parallelFFT(randArr2, true);
	                manager.ctx.finish();
	                var endTime = performance.now();
	                fftTime = endTime - startTime;
	                fftArr.dispose(manager);
	                randArr2.dispose(manager);
	            });
	            eventLoop.addTask(function () {
	                randArr3.getGPUArrs(managerFloat);
	                managerFloat.ctx.finish();
	                var startTime = performance.now();
	                var fftFloatArr = gpuFFTFloat.parallelFFT(randArr3, true);
	                managerFloat.ctx.finish();
	                var endTime = performance.now();
	                fftFloatTime = endTime - startTime;
	                fftFloatArr.dispose(managerFloat);
	                randArr3.dispose(managerFloat);
	            });
	            eventLoop.addTask(function () {
	                gpuDFT.dispose();
	                gpuFFT.dispose();
	                gpuFFTFloat.dispose();
	                console.log('DFT: ' + Math.floor(dftTime).toString() + 'ms; FFT (packed): ' + Math.floor(fftTime).toString() + 'ms; FFT (float): ' + Math.floor(fftFloatTime).toString() + 'ms.');
	                manager.dispose();
	                managerFloat.dispose();
	            });
	            eventLoop.start();
	        }
	    }]);
	
	    return FFTTimingTestManager;
	}();
	
	;
	
	module.exports = FFTTimingTestManager;

/***/ },
/* 19 */
/*!********************************!*\
  !*** ./src/utils/EventLoop.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Queue = __webpack_require__(/*! utils/Queue.js */ 20);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventLoopTask = function EventLoopTask(run) {
	    var checkValid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var invalidCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	    _classCallCheck(this, EventLoopTask);
	
	    if (checkValid == null) {
	        checkValid = function checkValid() {
	            return true;
	        };
	    }
	    if (invalidCallback == null) {
	        invalidCallback = function invalidCallback() {};
	    }
	    this.run = run;
	    this.checkValid = checkValid;
	    this.invalidCallback = invalidCallback;
	};
	
	;
	
	var EventLoop = function () {
	    function EventLoop() {
	        var _this = this;
	
	        var updateFunc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	        _classCallCheck(this, EventLoop);
	
	        this.tasks = new _Queue2.default();
	        this.enabled = false;
	        this.updateFunc = updateFunc;
	        this.loopFunc = function () {
	            if (!_this.enabled) return;
	            if (_this.updateFunc != null) {
	                _this.updateFunc();
	            }
	            while (!_this.tasks.isEmpty()) {
	                var task = _this.tasks.pop();
	                if (task.checkValid()) {
	                    task.run();
	                    break;
	                }
	            }
	            window.requestAnimationFrame(_this.loopFunc);
	        };
	    }
	
	    _createClass(EventLoop, [{
	        key: 'start',
	        value: function start() {
	            this.enabled = true;
	            if (this.loop == null) {
	                window.requestAnimationFrame(this.loopFunc);
	            }
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.enabled = false;
	        }
	    }, {
	        key: 'addTask',
	        value: function addTask(callback) {
	            var checkValid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	            var invalidCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	            this.tasks.push(new EventLoopTask(callback, checkValid, invalidCallback));
	        }
	    }]);
	
	    return EventLoop;
	}();
	
	;
	
	module.exports = EventLoop;

/***/ },
/* 20 */
/*!****************************!*\
  !*** ./src/utils/Queue.js ***!
  \****************************/
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	
	With reference to Queue.js
	
	A function to represent a queue
	
	Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
	the terms of the CC0 1.0 Universal legal code:
	
	http://creativecommons.org/publicdomain/zero/1.0/legalcode
	
	*/
	
	var Queue = function () {
	    function Queue() {
	        _classCallCheck(this, Queue);
	
	        this.arr = [];
	        this.offset = 0;
	    }
	
	    _createClass(Queue, [{
	        key: 'getLength',
	        value: function getLength() {
	            return this.arr.length - this.offset;
	        }
	    }, {
	        key: 'isEmpty',
	        value: function isEmpty() {
	            return this.arr.length == 0;
	        }
	    }, {
	        key: 'push',
	        value: function push(val) {
	            this.arr.push(val);
	        }
	    }, {
	        key: 'pop',
	        value: function pop() {
	            if (this.arr.length == 0) {
	                throw 'Cannot pop from empty queue.';
	            }
	            var res = this.arr[this.offset];
	            this.offset++;
	            if (this.offset * 2 >= this.arr.length) {
	                this.arr = this.arr.slice(this.offset);
	                this.offset = 0;
	            }
	            return res;
	        }
	    }]);
	
	    return Queue;
	}();
	
	;
	
	module.exports = Queue;

/***/ },
/* 21 */
/*!****************************************!*\
  !*** ./src/webgl/QuadDrawingKernel.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _QuadDrawingUtils = __webpack_require__(/*! webgl/QuadDrawingUtils.js */ 10);
	
	var _QuadDrawingUtils2 = _interopRequireDefault(_QuadDrawingUtils);
	
	var _ShaderUtils = __webpack_require__(/*! webgl/ShaderUtils.js */ 11);
	
	var _ShaderUtils2 = _interopRequireDefault(_ShaderUtils);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var QuadDrawingKernel = function () {
	    function QuadDrawingKernel(stateManager) {
	        _classCallCheck(this, QuadDrawingKernel);
	
	        this.stateManager = stateManager;
	        var vertShaderSrc = _QuadDrawingUtils2.default.createVertShaderSrc([_QuadDrawingUtils2.default.TRANSFORMS.flipY], true, true);
	        var fragShaderSrc = _QuadDrawingUtils2.default.createDirectDrawFragShaderSrc();
	        var programInfo = _ShaderUtils2.default.createProgram(this.ctx, vertShaderSrc, fragShaderSrc);
	        var program = programInfo.program;
	
	        this.ctx.useProgram(program);
	        _ShaderUtils2.default.setVertAttrib(this.ctx, program, 'aPos', 2, this.stateManager.getQuadPosBuff());
	        _ShaderUtils2.default.registerTextures(this.ctx, program, ['uImg']);
	
	        this.programInfo = programInfo;
	    }
	
	    _createClass(QuadDrawingKernel, [{
	        key: 'run',
	        value: function run(tex, boundingRect, canvasDims) {
	            this.ctx.useProgram(this.program);
	            _ShaderUtils2.default.registerVectorUniform(this.ctx, this.program, 'uScale', new _Utils.Vector(boundingRect.width / canvasDims.width, boundingRect.height / canvasDims.height));
	            _ShaderUtils2.default.registerVectorUniform(this.ctx, this.program, 'uTransform', new _Utils.Vector(boundingRect.x / canvasDims.width, boundingRect.y / canvasDims.height));
	            this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, null);
	            _ShaderUtils2.default.bindTextures(this.ctx, [tex]);
	
	            this.ctx.viewport(0, 0, canvasDims.width, canvasDims.height);
	            this.stateManager.enableAttribs(1);
	            this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.stateManager.getQuadIndexBuff());
	            this.ctx.drawElements(this.ctx.TRIANGLE_STRIP, _QuadDrawingUtils2.default.QUAD_NUM_VERT, this.ctx.UNSIGNED_SHORT, 0);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            _ShaderUtils2.default.disposeProgram(this.ctx, this.programInfo);
	        }
	    }, {
	        key: 'ctx',
	        get: function get() {
	            return this.stateManager.ctx;
	        }
	    }, {
	        key: 'program',
	        get: function get() {
	            return this.programInfo.program;
	        }
	    }]);
	
	    return QuadDrawingKernel;
	}();
	
	;
	
	module.exports = QuadDrawingKernel;

/***/ },
/* 22 */,
/* 23 */
/*!******************************!*\
  !*** ./src/gpgpu/GPUIFFT.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GPGPUComplexIncludes = __webpack_require__(/*! gpgpu/GPGPUComplexIncludes.js */ 14);
	
	var _GPGPUComplexIncludes2 = _interopRequireDefault(_GPGPUComplexIncludes);
	
	var _GPGPUManager = __webpack_require__(/*! gpgpu/GPGPUManager.js */ 12);
	
	var _GPGPUManager2 = _interopRequireDefault(_GPGPUManager);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	var _ComplexArray2D = __webpack_require__(/*! gpgpu/ComplexArray2D.js */ 24);
	
	var _ComplexArray2D2 = _interopRequireDefault(_ComplexArray2D);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GPUIFFT = function () {
	    function GPUIFFT(manager) {
	        _classCallCheck(this, GPUIFFT);
	
	        if (!manager.useFloat) {
	            throw 'GPUIFFT only supports floating-point textures.';
	        }
	        this.manager = manager;
	        this.fftKernel = this.manager.createKernel('//factor of two cancels out for 2PI and period\nvec2 twiddle = complexExp(vec2(0.0,\n    PI * float(threadId.y) / float(uButterflyWidth)\n));\nint column = threadId.y / uButterflyWidth;\nint row = threadId.y - column * uButterflyWidth;\nint refIndex1 = (column / 2) * uButterflyWidth + row;\nivec2 refPos1 = ivec2(threadId.x, refIndex1);\nint refIndex2 = refIndex1 + uDims.y / 2;\nivec2 refPos2 = ivec2(threadId.x, refIndex2);\n// Note: not setting initial imaginary part to zero\n// unless tests fail somewhere.\nvec2 ref1 = arrGet(uArr, refPos1, uDims).ar;\nvec2 ref2 = arrGet(uArr, refPos2, uDims).ar;\nvec2 res = ref1 + complexMult(twiddle, ref2);\ngl_FragData[0] = vec4(res.y, 0.0, 0.0, res.x);\n', ['uArr'], [{
	            type: 'int',
	            name: 'uButterflyWidth'
	        }], 1, _GPGPUComplexIncludes2.default.PI + _GPGPUComplexIncludes2.default.LIB);
	    }
	
	    _createClass(GPUIFFT, [{
	        key: 'parallelIFFT',
	        value: function parallelIFFT(arr) {
	            var fftWidth = arr.dims.height;
	            if ((fftWidth & fftWidth - 1) != 0) {
	                throw 'Cannot do FFT on non-power of two width.';
	            }
	            var stepArr = arr.getGPUArr(this.manager);
	            for (var butterflyWidth = 1; butterflyWidth < fftWidth; butterflyWidth *= 2) {
	                var stepResGPUArr = this.manager.runKernel(this.fftKernel, [stepArr], arr.dims, {
	                    uButterflyWidth: butterflyWidth
	                });
	                if (butterflyWidth != 1) {
	                    this.manager.disposeGPUArr(stepArr);
	                }
	                stepArr = stepResGPUArr[0];
	            }
	            return _ComplexArray2D2.default.fromGPUArr(stepArr);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.fftKernel);
	        }
	    }]);
	
	    return GPUIFFT;
	}();
	
	;
	
	module.exports = GPUIFFT;

/***/ },
/* 24 */
/*!*************************************!*\
  !*** ./src/gpgpu/ComplexArray2D.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ComplexArray2D = function () {
	    function ComplexArray2D() {
	        var cpuArrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	        var gpuArrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	        _classCallCheck(this, ComplexArray2D);
	
	        this.cpuArrs = cpuArrs;
	        this.gpuArrs = gpuArrs;
	    }
	
	    _createClass(ComplexArray2D, [{
	        key: 'getCPUArrs',
	        value: function getCPUArrs(manager) {
	            var _this = this;
	
	            if (this.cpuArrs == null) {
	                if (manager.useFloat) {
	                    (function () {
	                        var arr2D = manager.gpuArrToArr(_this.gpuArrs[0], false);
	                        _this.cpuArrs = [_Utils.Utils.compute2DArrayAsArray2D(arr2D.dims, function (pos) {
	                            return arr2D.data[pos.y][pos.x][3];
	                        }), _Utils.Utils.compute2DArrayAsArray2D(arr2D.dims, function (pos) {
	                            return arr2D.data[pos.y][pos.x][0];
	                        })];
	                    })();
	                } else {
	                    this.cpuArrs = [manager.gpuArrToArr(this.gpuArrs[0]), this.gpuArrs[1] == null ? null : manager.gpuArrToArr(this.gpuArrs[1])];
	                }
	            }
	            return this.cpuArrs;
	        }
	    }, {
	        key: 'getGPUArrs',
	        value: function getGPUArrs(manager) {
	            var _this2 = this;
	
	            if (this.gpuArrs == null) {
	                if (manager.useFloat) {
	                    if (this.cpuArrs[1] == null) {
	                        this.gpuArrs = [manager.flatArrToGPUArr(_Utils.Utils.flatten(this.cpuArrs[0].data), this.dims, 1)];
	                    } else {
	                        this.gpuArrs = [manager.arrToGPUArr(_Utils.Utils.compute2DArrayAsArray2D(this.dims, function (pos) {
	                            return [_this2.cpuArrs[1].data[pos.y][pos.x], 0, 0, _this2.cpuArrs[0].data[pos.y][pos.x]];
	                        }), false)];
	                    }
	                } else {
	                    this.gpuArrs = [manager.arrToGPUArr(this.cpuArrs[0]), this.cpuArrs[1] == null ? null : manager.arrToGPUArr(this.cpuArrs[1])];
	                }
	            }
	            return this.gpuArrs;
	        }
	    }, {
	        key: 'getGPUArr',
	        value: function getGPUArr(manager) {
	            return this.getGPUArrs(manager)[0];
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose(manager) {
	            if (this.gpuArrs != null) {
	                this.gpuArrs.map(function (gpuArr) {
	                    if (gpuArr != null) manager.disposeGPUArr(gpuArr);
	                });
	            }
	        }
	    }, {
	        key: 'dims',
	        get: function get() {
	            return this.cpuArrs == null ? this.gpuArrs[0].dims : this.cpuArrs[0].dims;
	        }
	    }], [{
	        key: 'fromRealArr',
	        value: function fromRealArr(arr) {
	            return new ComplexArray2D([arr, null]);
	        }
	    }, {
	        key: 'fromArrs',
	        value: function fromArrs(realArr, imgArr) {
	            return new ComplexArray2D([realArr, imgArr]);
	        }
	    }, {
	        key: 'fromGPUArr',
	        value: function fromGPUArr(gpuArr) {
	            return new ComplexArray2D(null, [gpuArr]);
	        }
	    }, {
	        key: 'fromGPUArrs',
	        value: function fromGPUArrs(realGPUArr, imgGPUArr) {
	            return new ComplexArray2D(null, [realGPUArr, imgGPUArr]);
	        }
	    }]);
	
	    return ComplexArray2D;
	}();
	
	module.exports = ComplexArray2D;

/***/ },
/* 25 */
/*!*******************************!*\
  !*** ./src/gpgpu/GPUISTFT.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GPUIFFT = __webpack_require__(/*! gpgpu/GPUIFFT.js */ 23);
	
	var _GPUIFFT2 = _interopRequireDefault(_GPUIFFT);
	
	var _GPGPUComplexIncludes = __webpack_require__(/*! gpgpu/GPGPUComplexIncludes.js */ 14);
	
	var _GPGPUComplexIncludes2 = _interopRequireDefault(_GPGPUComplexIncludes);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GPUISTFT = function () {
	    function GPUISTFT(manager) {
	        _classCallCheck(this, GPUISTFT);
	
	        if (!manager.useFloat) {
	            throw 'GPUSTFT only supports floating-point textures.';
	        }
	        this.manager = manager;
	        this.fftManager = new _GPUIFFT2.default(this.manager);
	        this.windowKernel = this.manager.createKernel('int arrIndex = threadId.y * uDims.x + threadId.x;\nint halfWindSz = uSrcDims.y / 2;\nint chunkIndex = arrIndex / halfWindSz;\nint offset = int(mod(float(arrIndex), float(halfWindSz)));\nivec2 ref1 = ivec2(chunkIndex, offset);\nivec2 ref2 = ivec2(chunkIndex - 1, offset + halfWindSz);\nfloat res = ((ref1.x < uSrcDims.x) ? arrGet(uArr, ref1, uSrcDims).a : 0.0) +\n    ((ref2.x >= 0) ? arrGet(uArr, ref2, uSrcDims).a : 0.0);\ngl_FragData[0] = vec4(res, 0.0, 0.0, 0.0);\n', ['uArr'], [{
	            type: 'ivec2',
	            name: 'uSrcDims'
	        }], 1, _GPGPUComplexIncludes2.default.PI);
	    }
	
	    _createClass(GPUISTFT, [{
	        key: 'istft',
	        value: function istft(arr) {
	            var toGPUArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var wrapWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2048;
	
	            var windowedArr = this.fftManager.parallelIFFT(arr);
	            var windSz = windowedArr.dims.height;
	            var resArrLength = windSz / 2 * (windowedArr.dims.width + 1);
	            var resGPUArr = this.manager.runKernel(this.windowKernel, [windowedArr.getGPUArr(this.manager)], new _Utils.Dimensions(wrapWidth, Math.ceil(resArrLength / wrapWidth)), {
	                uSrcDims: windowedArr.dims.toArray()
	            })[0];
	            windowedArr.dispose(this.manager);
	            if (toGPUArr) return resGPUArr;else {
	                var resPixelArr = this.manager.gpuArrToFlatArr(resGPUArr);
	                this.manager.disposeGPUArr(resGPUArr);
	                var resArr = [];
	                for (var i = 0; i < resArrLength; i++) {
	                    resArr.push(resPixelArr[i * 4]);
	                }
	                return resArr;
	            }
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.manager.disposeKernel(this.windowKernel);
	            this.fftManager.dispose();
	        }
	    }]);
	
	    return GPUISTFT;
	}();
	
	;
	
	module.exports = GPUISTFT;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map