"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Button = _interopRequireDefault(require("./Button"));

var _Input = _interopRequireDefault(require("./Input"));

var _Label = _interopRequireDefault(require("./Label"));

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("./Select"));

var _Tag = _interopRequireDefault(require("./Tag"));

var _Upload = _interopRequireDefault(require("./Upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var style = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap'
  },
  insertTitle: {
    fontSize: '14px',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  sourceList: {
    margin: '10px 10px 10px 0',
    border: '1px dashed rgb(217, 217, 217)',
    borderRadius: '4px'
  },
  configTitle: {
    display: 'block',
    fontSize: '14px',
    margin: '10px 0',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  warnInfo: {
    display: 'inline-block',
    width: '100%',
    margin: '5px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#f04134'
  }
};
var linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9,_-](\?)?)*)*$/i;
var timeoutInstance = null;

var UploadModal = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(UploadModal, _React$PureComponent);

  var _super = _createSuper(UploadModal);

  function UploadModal() {
    var _this;

    _classCallCheck(this, UploadModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      sources: [],
      currentSource: '',
      width: '100%',
      height: 'auto',
      controls: 'true',
      autoplay: 'false',
      muted: 'false',
      loop: 'false',
      poster: '',
      name: '',
      author: '',
      errorMsg: '',
      errorMsgVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "updateCurrentSource", function (e) {
      _this.setState({
        currentSource: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addSource", function () {
      var _this$state = _this.state,
          sources = _this$state.sources,
          currentSource = _this$state.currentSource;
      var newsources = sources.concat([currentSource]);

      if (currentSource === '') {
        _this.showErrorMsg('链接不能为空');
      } else if (!linkRegx.test(currentSource)) {
        _this.showErrorMsg('非法的链接');
      } else if (sources.indexOf(currentSource) !== -1) {
        _this.showErrorMsg('链接已存在');
      } else {
        _this.setState({
          sources: newsources,
          currentSource: ''
        }, function () {
          _this.props.onChange && _this.props.onChange(_this.generateHtml());
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeSource", function (index) {
      var sourcesCopy = _this.state.sources.concat([]);

      sourcesCopy.splice(index, 1);

      _this.setState({
        sources: sourcesCopy
      }, function () {
        _this.props.onChange && _this.props.onChange(_this.generateHtml());
      });
    });

    _defineProperty(_assertThisInitialized(_this), "upload", function (e) {
      var upload = _this.props.upload;
      if (!upload) return;
      upload(e).then(function (url) {
        _this.setState({
          currentSource: url
        }, function () {
          _this.addSource();
        });
      })["catch"](function (e) {
        e.constructor === Error ? _this.showErrorMsg(e.message) : _this.showErrorMsg(e);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showErrorMsg", function (msg) {
      _this.setState({
        errorMsg: msg,
        errorMsgVisible: true
      });

      clearTimeout(timeoutInstance);
      timeoutInstance = setTimeout(function () {
        _this.setState({
          errorMsg: '',
          errorMsgVisible: false
        });
      }, 10000);
    });

    _defineProperty(_assertThisInitialized(_this), "getFileType", function (fileUrl, mediaType) {
      var type = fileUrl.match(/\.(\w+)$/, 'i');
      return type ? type[1].toLowerCase() : 'mp4';
    });

    _defineProperty(_assertThisInitialized(_this), "generateHtml", function () {
      var _this$state2 = _this.state,
          sources = _this$state2.sources,
          width = _this$state2.width,
          height = _this$state2.height,
          controls = _this$state2.controls,
          autoplay = _this$state2.autoplay,
          muted = _this$state2.muted,
          loop = _this$state2.loop;
      var len = sources.length;

      if (len > 0) {
        var html = '';
        var attr = '';
        attr += controls === 'false' ? '' : ' controls="true" ';
        attr += autoplay === 'false' ? '' : ' autoplay="true" ';
        attr += loop === 'false' ? '' : ' loop="true" ';
        attr += muted === 'false' ? '' : ' muted ';

        if (len === 1) {
          html = "<video src=\"".concat(sources[0], "\" width=\"").concat(width, "\" height=\"").concat(height, "\" ").concat(attr, ">\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E</video>");
        } else {
          html = "<video width=\"".concat(width, "\" height=\"").concat(height, "\" ").concat(attr, ">");
          sources.forEach(function (source) {
            html += "<source src=".concat(source, " type=\"video/").concat(_this.getFileType(source, 'video'), "\"}>");
          });
          html += '你的浏览器不支持 video 标签</video>';
        }

        return html + '<p></p>';
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_this), "changeConfig", function (e, type) {
      console.log('change config');
      var value = e.target.value;
      var boolType = ['controls', 'autoplay', 'muted', 'loop'];

      if (type === 'width' || type === 'height') {
        if (isNaN(parseInt(value))) {
          value = parseInt(value);
        }
      } else if (boolType.indexOf(type) !== -1) {
        value = !!value;
      }

      _this.setState(_defineProperty({}, type, value), function () {
        _this.props.onChange && _this.props.onChange(_this.generateHtml());
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSourceList", function () {
      var sources = _this.state.sources;

      if (sources.length > 0) {
        var list = sources.map(function (source, index) {
          console.log(source, index);
          return /*#__PURE__*/_react["default"].createElement(_Tag["default"], {
            key: index,
            skey: index,
            value: source,
            onRemove: function onRemove() {
              return _this.removeSource(index);
            }
          });
        });
        return list;
      } else {
        return /*#__PURE__*/_react["default"].createElement("span", {
          style: style.warnInfo
        }, "\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u94FE\u63A5");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderVideoConfig", function () {
      var _this$state3 = _this.state,
          width = _this$state3.width,
          height = _this$state3.height,
          controls = _this$state3.controls,
          autoplay = _this$state3.autoplay,
          muted = _this$state3.muted,
          loop = _this$state3.loop;
      return /*#__PURE__*/_react["default"].createElement("form", {
        style: style.paramsConfig
      }, /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        name: "width"
      }, /*#__PURE__*/_react["default"].createElement(_Input["default"], {
        type: "text",
        defaultValue: width,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'width');
        }
      })), /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        name: "height"
      }, /*#__PURE__*/_react["default"].createElement(_Input["default"], {
        type: "text",
        defaultValue: height,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'height');
        }
      })), /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        name: "controls"
      }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
        defaultValue: controls,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'controls');
        }
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "true"
      }, "true"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "false"
      }, "false"))), /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        name: "autoplay"
      }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
        defaultValue: autoplay,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'autoplay');
        }
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "true"
      }, "true"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "false"
      }, "false"))), /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        name: "muted"
      }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
        defaultValue: muted,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'muted');
        }
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "true"
      }, "true"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "false"
      }, "false"))), /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        name: "loop"
      }, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
        defaultValue: loop,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'loop');
        }
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "true"
      }, "true"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "false"
      }, "false"))));
    });

    return _this;
  }

  _createClass(UploadModal, [{
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          currentSource = _this$state4.currentSource,
          sources = _this$state4.sources,
          errorMsg = _this$state4.errorMsg,
          errorMsgVisible = _this$state4.errorMsgVisible;
      var progress = this.props.progress;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
        style: style.insertTitle
      }, "\u63D2\u5165\u94FE\u63A5"), /*#__PURE__*/_react["default"].createElement(_Input["default"], {
        style: {
          width: '300px'
        },
        type: "text",
        defaultValue: currentSource,
        onChange: this.updateCurrentSource
      }), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        onClick: this.addSource
      }, "\u6DFB\u52A0"), /*#__PURE__*/_react["default"].createElement(_Upload["default"], {
        onChange: this.upload
      })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
        style: _objectSpread(_objectSpread({}, style.warnInfo), {}, {
          display: progress && progress !== -1 ? 'block' : 'none'
        })
      }, progress, "%"), /*#__PURE__*/_react["default"].createElement("span", {
        style: _objectSpread(_objectSpread({}, style.warnInfo), {}, {
          display: errorMsgVisible ? 'block' : 'none'
        })
      }, errorMsg)), /*#__PURE__*/_react["default"].createElement("div", {
        style: style.sourceList
      }, this.renderSourceList()), sources.length > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
        style: style.configTitle
      }, "\u53C2\u6570\u914D\u7F6E"), this.renderVideoConfig(), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          textAlign: 'center',
          padding: '20px 10px 0 10px'
        }
      }, /*#__PURE__*/_react["default"].createElement("video", {
        src: sources[0],
        controls: "controls",
        style: {
          width: '100%',
          height: '250px',
          backgroundColor: '#000'
        }
      }, "\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E"))) : null);
    }
  }]);

  return UploadModal;
}(_react["default"].PureComponent);

var _default = UploadModal;
exports["default"] = _default;