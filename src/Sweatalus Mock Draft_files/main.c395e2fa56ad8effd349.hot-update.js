webpackHotUpdate("main",{

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/*! exports provided: firebaseApp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firebaseApp", function() { return firebaseApp; });
/* harmony import */ var re_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! re-base */ "./node_modules/re-base/index.js");
/* harmony import */ var re_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(re_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);


var firebaseApp = firebase__WEBPACK_IMPORTED_MODULE_1___default.a.initializeApp({
  apiKey: 'AIzaSyB8zX55zSbxsyWNl_Nio1QHOANIK5U5T6k',
  authDomain: 'sweatalus-mock-draft.firebaseapp.com',
  databaseURL: 'https://sweatalus-mock-draft.firebaseio.com'
});
var base = re_base__WEBPACK_IMPORTED_MODULE_0___default.a.createClass(firebaseApp.database());

/* harmony default export */ __webpack_exports__["default"] = (base);

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Header */ "./src/components/Header.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Settings */ "./src/components/Settings.js");
/* harmony import */ var _CurrentStatus__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CurrentStatus */ "./src/components/CurrentStatus.js");
/* harmony import */ var _PlayerList__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./PlayerList */ "./src/components/PlayerList.js");
/* harmony import */ var _Managers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Managers */ "./src/components/Managers.js");
/* harmony import */ var _ManagerNames__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ManagerNames */ "./src/components/ManagerNames.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../base */ "./src/base.js");









var _jsxFileName = "/Users/Jess/DEV/PERSONAL_PROJECTS/mock_draft_tool/mock-draft-tool/src/components/App.js";

/* eslint-disable no-unused-vars */












var App = /*#__PURE__*/function (_React$Component) {
  Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(App, _React$Component);

  var _super = Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_8__["default"])(App);

  function App(props) {
    var _this;

    Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, App);

    _this = _super.call(this, props);
    _this.getData = _this.getData.bind(Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));

    _this.updateManagerNames = function (key, updatedManagerName) {
      var managerNames = Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__["default"])({}, _this.state.managerData.name);

      managerNames[key] = updatedManagerName;

      _this.setState({
        managerData: {
          name: updatedManagerName
        }
      });
    };

    _this.state = {
      data: [],
      userSettings: {},
      showComponent: {
        settings: true,
        managerNames: false
      },
      managerData: {}
    };
    _this.handleSettingsChange = _this.handleSettingsChange.bind(Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    _this.hideSettings = _this.hideSettings.bind(Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    return _this;
  }

  Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var params = this.props.match.params;
      var localStorageRef = localStorage.getItem(params.draftName);

      if (localStorageRef) {
        this.setState({
          userSettings: JSON.parse(localStorageRef)
        });
      }

      this.ref = _base__WEBPACK_IMPORTED_MODULE_19__["default"].syncState("".concat(params.draftName, "/fishes"), {
        context: this,
        state: 'fishes'
      });
      this.getCsvData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      localStorage.setItem(this.props.match.params.draftName, JSON.stringify(this.state.userSettings));
    }
  }, {
    key: "handleSettingsChange",
    value: function handleSettingsChange(settings) {
      this.setState({
        userSettings: settings
      });
    }
  }, {
    key: "hideSettings",
    value: function hideSettings() {
      this.setState({
        showComponent: {
          settings: false,
          managerNames: true
        }
      });
    }
  }, {
    key: "getData",
    value: function getData(result) {
      this.setState({
        data: result.data
      });
    }
  }, {
    key: "getCsvData",
    value: function () {
      var _getCsvData = Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        var csvData;
        return _Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_helpers__WEBPACK_IMPORTED_MODULE_18__["fetchCsv"])();

              case 2:
                csvData = _context.sent;
                _context.t0 = papaparse__WEBPACK_IMPORTED_MODULE_10___default.a;
                _context.t1 = csvData;
                _context.t2 = this.getData;
                _context.t3 = {
                  complete: _context.t2,
                  header: true,

                  transformHeader(h) {
                    return h.toLowerCase();
                  }

                };

                _context.t0.parse.call(_context.t0, _context.t1, _context.t3);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCsvData() {
        return _getCsvData.apply(this, arguments);
      }

      return getCsvData;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "mock-draft",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 7
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_12__["default"], {
        title: "Sweatalus",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 9
        }
      }), this.state.showComponent.settings && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Settings__WEBPACK_IMPORTED_MODULE_13__["default"], {
        onSettingsChange: this.handleSettingsChange,
        hideSettings: this.hideSettings,
        showManagerNames: this.showManagerNames,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 11
        }
      }), this.state.showComponent.managerNames && this.state.showComponent.settings === false && Object(_Users_Jess_DEV_PERSONAL_PROJECTS_mock_draft_tool_mock_draft_tool_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(Array(parseInt(this.state.userSettings.managers, 10))).map(function (e, i) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_ManagerNames__WEBPACK_IMPORTED_MODULE_17__["default"], {
          key: i,
          index: i,
          managerNamesData: _this2.state.managerData,
          onManagerNamesChange: _this2.handleManagerNamesChange,
          hideManagerNames: _this2.hideManagerNames,
          updateManagerNames: _this2.updateManagerNames,
          __self: _this2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99,
            columnNumber: 13
          }
        });
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_CurrentStatus__WEBPACK_IMPORTED_MODULE_14__["default"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 9
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_PlayerList__WEBPACK_IMPORTED_MODULE_15__["default"], {
        data: this.state.data,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 9
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Managers__WEBPACK_IMPORTED_MODULE_16__["default"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 9
        }
      }));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);

App.propTypes = {
  match: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

})
//# sourceMappingURL=main.c395e2fa56ad8effd349.hot-update.js.map