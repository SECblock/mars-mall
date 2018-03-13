(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tina = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function addHooks(context, handlers) {
  var isPrepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var result = {};

  var _loop = function _loop(name) {
    result[name] = function handler() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (isPrepend) {
        handlers[name].apply(this, args);
      }
      if (typeof context[name] === 'function') {
        context[name].apply(this, args);
      }
      if (!isPrepend) {
        handlers[name].apply(this, args);
      }
    };
  };

  for (var name in handlers) {
    _loop(name);
  }
  return _extends({}, context, result);
}


var prependHooks = function prependHooks(context, handlers) {
  return addHooks(context, handlers, true);
};

function linkProperties(_ref) {
  var TargetClass = _ref.TargetClass,
      getSourceInstance = _ref.getSourceInstance,
      properties = _ref.properties;

  properties.forEach(function (name) {
    Object.defineProperty(TargetClass.prototype, name, {
      set: function set$$1(value) {
        var context = getSourceInstance(this);
        context[name] = value;
      },
      get: function get$$1() {
        var context = getSourceInstance(this);
        var member = context[name];
        if (typeof member === 'function') {
          return member.bind(context);
        }
        return member;
      }
    });
  });
  return TargetClass;
}

// builtin initial mixin for Tina-Page
function initial() {
  // init data (just for triggering ``compute`` in this moment)
  this.setData();
  this.$log('Initial Mixin', 'Ready');
}
var $initial = {
  attached: initial,
  onLoad: initial

  // builtin log mixin for Tina-Page
};function log() {
  this.$log = this.constructor.log.bind(this.constructor);
  this.$log('Log Mixin', 'Ready');
}
var $log = {
  created: log,
  beforeLoad: log
};

function mapObject(obj) {
  var iteratee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (o) {
    return o;
  };

  var result = {};
  for (var key in obj) {
    result[key] = iteratee(obj[key], key, obj);
  }
  return result;
}



function isEmpty(obj) {
  if (obj == null) {
    return true;
  }
  if (obj.length > 0) {
    return false;
  }
  if (obj.length === 0) {
    return true;
  }
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

function pick(object) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var picked = {};
  keys.forEach(function (key) {
    if (key in object) {
      picked[key] = object[key];
    }
  });
  return picked;
}

function without(input) {
  var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return input.filter(function (x) {
    return exclude.indexOf(x) === -1;
  });
}

function values(object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
}

function fromPairs() {
  var pairs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var object = {};
  pairs.forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return object[key] = value;
  });
  return object;
}

// generate methods
function methods(object) {
  return mapObject(object || {}, function (method, name) {
    return function handler() {
      var context = this.__tina_instance__;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return context[name].apply(context, args);
    };
  });
}

// generate lifecycles
function lifecycles(hooks, getBeforeHookName) {
  return fromPairs(hooks.map(function (origin) {
    var before = getBeforeHookName(origin);
    return [origin, function handler() {
      var context = this.__tina_instance__;
      if (before && context[before]) {
        context[before].apply(context, arguments);
      }
      if (context[origin]) {
        return context[origin].apply(context, arguments);
      }
    }];
  }));
}

// generate properties for wx-Component
function properties(object) {
  function wrap(original) {
    return function observer() {
      var context = this.__tina_instance__;
      // trigger ``compute``
      context.setData();

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (typeof original === 'string') {
        return context[original].apply(context, args);
      }
      if (typeof original === 'function') {
        return original.apply(context, args);
      }
    };
  }

  return mapObject(object || {}, function (rule) {
    if (typeof rule === 'function' || rule === null) {
      return {
        type: rule,
        observer: wrap()
      };
    }
    if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object') {
      return _extends({}, rule, {
        observer: wrap(rule.observer)
      });
    }
  });
}

var globals = {
  App: App,
  Page: Page,
  Component: Component,
  wx: wx
};

var strategies = {
  merge: function merge(source, extra) {
    if (Array.isArray(source)) {
      return source.concat(extra);
    }
    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object') {
      return _extends({}, source, extra);
    }
    return extra;
  }
};

var Basic = function () {
  function Basic() {
    classCallCheck(this, Basic);
  }

  createClass(Basic, [{
    key: 'setData',
    value: function setData(newer) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var next = _extends({}, this.data, newer);
      if (typeof this.compute === 'function') {
        next = _extends({}, next, this.compute(next));
      }
      next = diff(next, this.data);
      this.constructor.log('setData', next);
      if (isEmpty(next)) {
        return callback();
      }
      this.$source.setData(next, callback);
    }
  }, {
    key: 'data',
    set: function set$$1(value) {
      throw new Error('Not allowed to set ``data``, use ``setData(data, [callback])`` instead.');
    },
    get: function get$$1() {
      throw new Error('class Basic doesnot have a ``data`` atttribute, please implement the ``data`` getter in the child-class.');
    }
  }], [{
    key: 'mixin',
    value: function mixin(_mixin) {
      this.mixins.push(_mixin);
    }

    // utilty function for mixin

  }, {
    key: 'mix',
    value: function mix(options, mixins) {
      var _this = this;

      if (Array.isArray(mixins)) {
        return mixins.reduce(function (memory, mixin) {
          return _this.mix(memory, mixin);
        }, options);
      }
      if (typeof mixins === 'function') {
        return this.mix(options, mixins(options, this));
      }

      var mixin = mixins;
      return _extends({}, options, mapObject(mixin, function (extra, key) {
        return strategies.merge(options[key], extra);
      }));
    }
  }, {
    key: 'log',
    value: function log(behavior, data) {
      if (this.debug) {
        console.log('[Tina.' + this.name + '] - ' + behavior + (data ? ': ' : ''), data);
      }
    }
  }]);
  return Basic;
}();

Basic.debug = false;
Basic.mixins = [];


function diff(newer, older) {
  var result = {};
  for (var key in newer) {
    if (newer[key] !== older[key]) {
      result[key] = newer[key];
    }
  }
  return result;
}

var MINA_PAGE_OPTIONS = ['data', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll'];
var MINA_PAGE_HOOKS = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll'];
var MINA_PAGE_METHODS = ['setData'];
var MINA_PAGE_ATTRIBUTES = ['data', 'route'];

var ADDON_BEFORE_HOOKS = {
  'onLoad': 'beforeLoad'
};
var OVERWRITED_METHODS = ['setData'];
var OVERWRITED_ATTRIBUTES = ['data'];

var PAGE_HOOKS = [].concat(MINA_PAGE_HOOKS, toConsumableArray(values(ADDON_BEFORE_HOOKS)));

var PAGE_INITIAL_OPTIONS = _extends({
  mixins: [],
  data: {},
  compute: function compute() {}
}, fromPairs(PAGE_HOOKS.map(function (name) {
  return [name, []];
})), {
  methods: {}
});

var BUILTIN_MIXINS = [$log, $initial];

var Page$1 = function (_Basic) {
  inherits(Page, _Basic);
  createClass(Page, null, [{
    key: 'define',
    value: function define() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // use mixins
      options = this.mix(PAGE_INITIAL_OPTIONS, [].concat(BUILTIN_MIXINS, toConsumableArray(this.mixins), toConsumableArray(options.mixins || []), [options]));

      // create wx-Page options
      var page = _extends({}, methods(options.methods), lifecycles(MINA_PAGE_HOOKS, function (name) {
        return ADDON_BEFORE_HOOKS[name];
      }));

      // creating Tina-Page on **wx-Page** loaded.
      // !important: this hook is added to wx-Page directly, but not Tina-Page
      page = prependHooks(page, {
        onLoad: function onLoad() {
          var instance = new Page({ options: options, $source: this });
          // create bi-direction links
          this.__tina_instance__ = instance;
          instance.$source = this;
        }
      });

      // apply wx-Page options
      new globals.Page(_extends({}, pick(options, without(MINA_PAGE_OPTIONS, MINA_PAGE_HOOKS)), page));
    }
  }]);

  function Page(_ref) {
    var _ret;

    var _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options,
        $source = _ref.$source;
    classCallCheck(this, Page);

    // creating Tina-Page members
    var _this = possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

    var members = _extends({
      compute: options.compute || function () {
        return {};
      }
    }, options.methods, mapObject(pick(options, PAGE_HOOKS), function (hook, name) {
      return function () {
        var _this2 = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        hook.forEach(function (h) {
          return h.apply(_this2, args);
        });
      };
    }));
    // apply members into instance
    for (var name in members) {
      _this[name] = members[name];
    }

    return _ret = _this, possibleConstructorReturn(_this, _ret);
  }

  createClass(Page, [{
    key: 'data',
    get: function get$$1() {
      return this.$source.data;
    }
  }]);
  return Page;
}(Basic);

// link the rest of wx-Component attributes and methods to Tina-Component


Page$1.mixins = [];
linkProperties({
  TargetClass: Page$1,
  getSourceInstance: function getSourceInstance(context) {
    return context.$source;
  },

  properties: [].concat(toConsumableArray(without(MINA_PAGE_ATTRIBUTES, OVERWRITED_ATTRIBUTES)), toConsumableArray(without(MINA_PAGE_METHODS, OVERWRITED_METHODS)))
});

var MINA_COMPONENT_OPTIONS = ['properties', 'data', 'methods', 'behaviors', 'created', 'attached', 'ready', 'moved', 'detached', 'relations', 'options'];
var MINA_COMPONENT_HOOKS = ['created', 'attached', 'ready', 'moved', 'detached'];
var MINA_COMPONENT_METHODS = ['setData', 'hasBehavior', 'triggerEvent', 'createSelectorQuery', 'selectComponent', 'selectAllComponents', 'getRelationNodes'];
var MINA_COMPONENT_ATTRIBUTES = ['is', 'id', 'dataset', 'data'];

var ADDON_BEFORE_HOOKS$1 = {};
var OVERWRITED_METHODS$1 = ['setData'];
var OVERWRITED_ATTRIBUTES$1 = ['data'];

var COMPONENT_HOOKS = [].concat(MINA_COMPONENT_HOOKS, toConsumableArray(values(ADDON_BEFORE_HOOKS$1)));

var COMPONENT_INITIAL_OPTIONS = _extends({
  mixins: [],
  behaviors: [],
  properties: {},
  data: {},
  compute: function compute() {}
}, fromPairs(COMPONENT_HOOKS.map(function (name) {
  return [name, []];
})), {
  methods: {},
  relations: {},
  options: {}
});

var BUILTIN_MIXINS$1 = [$log, $initial];

var Component$1 = function (_Basic) {
  inherits(Component, _Basic);
  createClass(Component, null, [{
    key: 'define',
    value: function define() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // use mixins
      options = this.mix(COMPONENT_INITIAL_OPTIONS, [].concat(BUILTIN_MIXINS$1, toConsumableArray(this.mixins), toConsumableArray(options.mixins || []), [options]));

      // create wx-Component options
      var component = _extends({
        properties: properties(options.properties),
        methods: methods(options.methods)
      }, lifecycles(MINA_COMPONENT_HOOKS, function (name) {
        return ADDON_BEFORE_HOOKS$1[name];
      }));

      // creating Tina-Component on **wx-Component** created.
      // !important: this hook is added to wx-Component directly, but not Tina-Component
      component = prependHooks(component, {
        created: function created() {
          var instance = new Component({ options: options, $source: this });
          // create bi-direction links
          this.__tina_instance__ = instance;
          instance.$source = this;
        }
      });

      // apply wx-Component options
      new globals.Component(_extends({}, pick(options, without(MINA_COMPONENT_OPTIONS, MINA_COMPONENT_HOOKS)), component));
    }
  }]);

  function Component(_ref) {
    var _ret;

    var _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options,
        $source = _ref.$source;
    classCallCheck(this, Component);

    // creating Tina-Component members
    var _this = possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    var members = _extends({
      compute: options.compute || function () {
        return {};
      }
    }, options.methods, mapObject(pick(options, COMPONENT_HOOKS), function (hook, name) {
      return function () {
        var _this2 = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        hook.forEach(function (h) {
          return h.apply(_this2, args);
        });
      };
    }));
    // apply members into instance
    for (var name in members) {
      _this[name] = members[name];
    }

    return _ret = _this, possibleConstructorReturn(_this, _ret);
  }

  createClass(Component, [{
    key: 'data',
    get: function get$$1() {
      return this.$source.data;
    }
  }]);
  return Component;
}(Basic);

// link the rest of wx-Component attributes and methods to Tina-Component


Component$1.mixins = [];
linkProperties({
  TargetClass: Component$1,
  getSourceInstance: function getSourceInstance(context) {
    return context.$source;
  },

  properties: [].concat(toConsumableArray(without(MINA_COMPONENT_ATTRIBUTES, OVERWRITED_ATTRIBUTES$1)), toConsumableArray(without(MINA_COMPONENT_METHODS, OVERWRITED_METHODS$1)))
});

exports.Page = Page$1;
exports.Component = Component$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
