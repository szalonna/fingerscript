// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var Bitmap, Clearing, Close, Color, Endline, Kernel, Open, Skeleton, Yns, bitmap, onMessageReceived, redraw, sendMessage, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    _this = this;

  Kernel = (function() {
    function Kernel() {}

    Kernel.prototype.kernel = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

    Kernel.prototype.execute = function(data, id) {
      var kern, row, x, y, _i, _j, _ref, _ref1;
      kern = this.kernel[id];
      for (x = _i = 0, _ref = kern.length; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
        row = kern[x];
        for (y = _j = 0, _ref1 = row.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          if (data[x][y] > -1 && row[y] > -1) {
            if (data[x][y] !== row[y]) {
              return false;
            }
          }
        }
      }
      return true;
    };

    Kernel.prototype.executeAll = function(data) {
      var i, _i, _ref;
      for (i = _i = 0, _ref = this.kernel.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.execute(data, i)) {
          return true;
        }
      }
      return false;
    };

    return Kernel;

  })();

  Skeleton = (function(_super) {
    __extends(Skeleton, _super);

    function Skeleton() {
      _ref = Skeleton.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Skeleton.prototype.kernel = [[[0, 0, 0], [-1, 1, -1], [1, 1, 1]], [[1, -1, 0], [1, 1, 0], [1, -1, 0]], [[1, 1, 1], [-1, 1, -1], [0, 0, 0]], [[0, -1, 1], [0, 1, 1], [0, -1, 1]], [[-1, 0, 0], [1, 1, 0], [1, 1, -1]], [[1, 1, -1], [1, 1, 0], [-1, 0, 0]], [[-1, 1, 1], [0, 1, 1], [0, 0, -1]], [[0, 0, -1], [0, 1, 1], [-1, 1, 1]]];

    return Skeleton;

  })(Kernel);

  Yns = (function(_super) {
    __extends(Yns, _super);

    function Yns() {
      _ref1 = Yns.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Yns.prototype.kernel = [[[-1, 1, 0], [0, 1, 1], [-1, 1, 0]], [[-1, 0, -1], [1, 1, 1], [0, 1, 0]], [[0, 1, -1], [1, 1, 0], [0, 1, -1]], [[0, 1, 0], [1, 1, 1], [-1, 0, -1]], [[0, 1, 0], [1, 1, 1], [0, 1, 0]], [[1, 0, 1], [0, 1, 0], [1, 0, 1]], [[1, 0, -1], [0, 1, 1], [-1, 1, -1]], [[-1, 0, 1], [1, 1, 0], [-1, 1, -1]], [[-1, 1, -1], [1, 1, 0], [-1, 0, 1]], [[-1, 1, -1], [0, 1, 1], [1, 0, -1]], [[1, 0, 1], [0, 1, -1], [1, -1, -1]], [[1, 0, 1], [-1, 1, 0], [-1, -1, 1]], [[-1, -1, 1], [-1, 1, 0], [1, 0, 1]], [[1, -1, -1], [0, 1, -1], [1, 0, 1]]];

    return Yns;

  })(Kernel);

  Endline = (function(_super) {
    __extends(Endline, _super);

    function Endline() {
      _ref2 = Endline.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Endline.prototype.kernel = [[[-1, 1, -1], [0, 1, 0], [0, 0, 0]], [[0, -1, 1], [0, 1, -1], [0, 0, 0]], [[0, 0, -1], [0, 1, 1], [0, 0, -1]], [[0, 0, 0], [0, 1, -1], [0, -1, 1]], [[0, 0, 0], [0, 1, 0], [-1, 1, -1]], [[0, 0, 0], [-1, 1, 0], [1, -1, 0]], [[-1, 0, 0], [1, 1, 0], [-1, 0, 0]], [[1, -1, 0], [-1, 1, 0], [0, 0, 0]]];

    return Endline;

  })(Kernel);

  Close = (function(_super) {
    __extends(Close, _super);

    function Close() {
      _ref3 = Close.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Close.prototype.kernel = [[[1, -1, -1], [-1, 0, -1], [-1, -1, -1]], [[-1, 1, -1], [-1, 0, -1], [-1, -1, -1]], [[-1, -1, 1], [-1, 0, -1], [-1, -1, -1]], [[-1, -1, -1], [-1, 0, 1], [-1, -1, -1]], [[-1, -1, -1], [-1, 0, -1], [-1, -1, 1]], [[-1, -1, -1], [-1, 0, -1], [-1, 1, -1]], [[-1, -1, -1], [-1, 0, -1], [1, -1, -1]], [[-1, -1, -1], [1, 0, -1], [-1, -1, -1]]];

    return Close;

  })(Kernel);

  Open = (function(_super) {
    __extends(Open, _super);

    function Open() {
      _ref4 = Open.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Open.prototype.kernel = [[[0, -1, -1], [-1, 1, -1], [-1, -1, -1]], [[-1, 0, -1], [-1, 1, -1], [-1, -1, -1]], [[-1, -1, 0], [-1, 1, -1], [-1, -1, -1]], [[-1, -1, -1], [-1, 1, 0], [-1, -1, -1]], [[-1, -1, -1], [-1, 1, -1], [-1, -1, 0]], [[-1, -1, -1], [-1, 1, -1], [-1, 0, -1]], [[-1, -1, -1], [-1, 1, -1], [0, -1, -1]], [[-1, -1, -1], [0, 1, -1], [-1, -1, -1]]];

    return Open;

  })(Kernel);

  Clearing = (function(_super) {
    __extends(Clearing, _super);

    function Clearing() {
      _ref5 = Clearing.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    Clearing.prototype.kernel = [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]];

    return Clearing;

  })(Kernel);

  Color = (function() {
    function Color(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      if (this.a === 0) {
        this.r = 255;
        this.g = 255;
        this.b = 255;
      }
      return;
    }

    Color.prototype.getRGBA = function() {
      var item;
      return item = {
        r: this.r,
        g: this.g,
        b: this.b,
        a: this.a
      };
    };

    Color.prototype.getLuminance = function() {
      return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
    };

    return Color;

  })();

  Bitmap = (function() {
    function Bitmap(width, height, data, limit) {
      var i, row, x, y, _i, _j, _ref6, _ref7;
      this.width = width;
      this.height = height;
      this.data = data;
      this.limit = limit != null ? limit : 128;
      this.open = __bind(this.open, this);
      this.close = __bind(this.close, this);
      this.mark = __bind(this.mark, this);
      this._markParts = __bind(this._markParts, this);
      this.skeleton = __bind(this.skeleton, this);
      this._applyKern = __bind(this._applyKern, this);
      this.getSubData = __bind(this.getSubData, this);
      this.bitmapFromMatrix = __bind(this.bitmapFromMatrix, this);
      this.binarize = __bind(this.binarize, this);
      this.getBitmapData = __bind(this.getBitmapData, this);
      this.getPartData = __bind(this.getPartData, this);
      this.getPixel = __bind(this.getPixel, this);
      this.pixels = [];
      for (x = _i = 0, _ref6 = this.width; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
        row = [];
        for (y = _j = 0, _ref7 = this.height; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
          i = (x + y * this.width) * 4;
          row.push(new Color(this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]));
        }
        this.pixels.push(row);
      }
    }

    Bitmap.prototype.checkCoords = function(x, y) {
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Bitmap.prototype.getPixel = function(x, y) {
      if (this.checkCoords(x, y)) {
        return this.pixels[x][y];
      } else {
        return void 0;
      }
    };

    Bitmap.prototype.getPartData = function(x, y) {
      if (this.checkCoords(x, y)) {
        return this.matrix[x][y];
      } else {
        return -1;
      }
    };

    Bitmap.prototype.getBitmapData = function() {
      var data, rgba, x, y, _i, _j, _ref6, _ref7;
      data = [];
      for (y = _i = 0, _ref6 = this.height; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; y = 0 <= _ref6 ? ++_i : --_i) {
        for (x = _j = 0, _ref7 = this.width; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; x = 0 <= _ref7 ? ++_j : --_j) {
          rgba = (this.getPixel(x, y)).getRGBA();
          data.push(rgba.r);
          data.push(rgba.g);
          data.push(rgba.b);
          data.push(rgba.a);
        }
      }
      return data;
    };

    Bitmap.prototype.binarize = function() {
      var luminance, pixel, row, value, x, y, _i, _j, _ref6, _ref7;
      this.matrix = [];
      for (x = _i = 0, _ref6 = this.pixels.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
        row = [];
        for (y = _j = 0, _ref7 = this.pixels[x].length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
          pixel = this.pixels[x][y];
          luminance = pixel.getLuminance();
          value = pixel.a === 0 ? 255 : luminance < this.limit ? 0 : 255;
          this.pixels[x][y] = new Color(value, value, value, 255);
          row.push(value === 255 ? 0 : 1);
        }
        this.matrix.push(row);
      }
    };

    Bitmap.prototype.bitmapFromMatrix = function() {
      var orow, row, value, x, y, _i, _j, _ref6, _ref7, _results;
      this.pixels = [];
      _results = [];
      for (x = _i = 0, _ref6 = this.matrix.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
        orow = this.matrix[x];
        row = [];
        for (y = _j = 0, _ref7 = orow.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
          value = orow[y] === 1 ? 0 : 255;
          row.push(new Color(value, value, value, 255));
        }
        _results.push(this.pixels.push(row));
      }
      return _results;
    };

    Bitmap.prototype.getSubData = function(x, y, mx, my) {
      var data, lx, ly, row, _i, _j;
      if (mx == null) {
        mx = 1;
      }
      if (my == null) {
        my = 1;
      }
      data = [];
      for (lx = _i = -mx; -mx <= mx ? _i <= mx : _i >= mx; lx = -mx <= mx ? ++_i : --_i) {
        row = [];
        for (ly = _j = -my; -my <= my ? _j <= my : _j >= my; ly = -my <= my ? ++_j : --_j) {
          row.push(this.getPartData(x + lx, y + ly));
        }
        data.push(row);
      }
      return data;
    };

    Bitmap.prototype._applyKern = function(k, id, appval) {
      var data, i, newmatrix, nrow, otherval, row, v, x, y, _i, _j, _ref6, _ref7;
      if (appval == null) {
        appval = 1;
      }
      otherval = appval === 1 ? 0 : 1;
      newmatrix = [];
      for (x = _i = 0, _ref6 = this.matrix.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
        row = this.matrix[x];
        nrow = [];
        for (y = _j = 0, _ref7 = row.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
          i = true;
          if (row[y] === appval) {
            data = this.getSubData(x, y);
            i = k.execute(data, id);
          }
          v = i ? row[y] : otherval;
          nrow.push(v);
        }
        newmatrix.push(nrow);
      }
      return newmatrix;
    };

    Bitmap.prototype.skeleton = function() {
      var changed, di, i, id, k, newmatrix, row, w, x, y, _i, _j, _k, _l, _m, _n, _o, _p, _q, _ref10, _ref11, _ref12, _ref13, _ref6, _ref7, _ref8, _ref9;
      k = new Skeleton();
      changed = true;
      id = 0;
      w = 5;
      while (changed) {
        newmatrix = this._applyKern(k, id);
        changed = false;
        i = 0;
        di = 0;
        for (x = _i = 0, _ref6 = newmatrix.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
          for (y = _j = 0, _ref7 = newmatrix[x].length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
            if (newmatrix[x][y] === 1) {
              this.matrix[x][y] = 0;
              changed = true;
              w = 5;
            }
          }
        }
        if (!changed && w > 0) {
          changed = true;
          w--;
        }
        id = id === k.kernel.length - 1 ? 0 : id + 1;
      }
      k = new Endline();
      for (i = _k = 0; _k < 5; i = ++_k) {
        for (id = _l = 0, _ref8 = k.kernel.length; 0 <= _ref8 ? _l < _ref8 : _l > _ref8; id = 0 <= _ref8 ? ++_l : --_l) {
          newmatrix = this._applyKern(k, id);
          for (x = _m = 0, _ref9 = newmatrix.length; 0 <= _ref9 ? _m < _ref9 : _m > _ref9; x = 0 <= _ref9 ? ++_m : --_m) {
            row = newmatrix[x];
            for (y = _n = 0, _ref10 = row.length; 0 <= _ref10 ? _n < _ref10 : _n > _ref10; y = 0 <= _ref10 ? ++_n : --_n) {
              if (newmatrix[x][y] === 1) {
                this.matrix[x][y] = 0;
              }
            }
          }
        }
      }
      k = new Clearing();
      for (id = _o = 0, _ref11 = k.kernel.length; 0 <= _ref11 ? _o < _ref11 : _o > _ref11; id = 0 <= _ref11 ? ++_o : --_o) {
        newmatrix = this._applyKern(k, id);
        for (x = _p = 0, _ref12 = newmatrix.length; 0 <= _ref12 ? _p < _ref12 : _p > _ref12; x = 0 <= _ref12 ? ++_p : --_p) {
          row = newmatrix[x];
          for (y = _q = 0, _ref13 = row.length; 0 <= _ref13 ? _q < _ref13 : _q > _ref13; y = 0 <= _ref13 ? ++_q : --_q) {
            if (newmatrix[x][y] === 1) {
              this.matrix[x][y] = 0;
            }
          }
        }
      }
      return this.bitmapFromMatrix();
    };

    Bitmap.prototype._markParts = function(k, color) {
      var cx, cy, i, item, lx, ly, marks, points, x, y, _i, _j, _k, _l, _m, _ref6, _ref7, _ref8;
      points = [];
      for (i = _i = 0, _ref6 = k.kernel.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; i = 0 <= _ref6 ? ++_i : --_i) {
        marks = this._applyKern(k, i);
        for (x = _j = 0, _ref7 = marks.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; x = 0 <= _ref7 ? ++_j : --_j) {
          for (y = _k = 0, _ref8 = marks[x].length; 0 <= _ref8 ? _k < _ref8 : _k > _ref8; y = 0 <= _ref8 ? ++_k : --_k) {
            if (marks[x][y] === 1) {
              item = {
                x: x,
                y: y
              };
              points.push(item);
              for (lx = _l = -2; _l <= 2; lx = ++_l) {
                for (ly = _m = -2; _m <= 2; ly = ++_m) {
                  if (!(Math.abs(lx) + Math.abs(ly) === 4)) {
                    cx = x + lx;
                    cy = y + ly;
                    if (this.checkCoords(cx, cy)) {
                      this.pixels[cx][cy] = color;
                    }
                  }
                }
              }
            }
          }
        }
      }
      return points;
    };

    Bitmap.prototype.mark = function() {
      var item;
      this.ndl = this._markParts(new Endline(), new Color(0, 0, 255, 255));
      this.yns = this._markParts(new Yns(), new Color(255, 0, 0, 255));
      item = {
        ndl: this.ndl,
        yns: this.yns
      };
      return sendMessage(item, "points");
    };

    Bitmap.prototype.close = function() {
      var data, k, m, nr, row, val, x, y, _i, _j, _ref6, _ref7;
      k = new Close();
      m = [];
      for (x = _i = 0, _ref6 = this.matrix.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
        row = this.matrix[x];
        nr = [];
        for (y = _j = 0, _ref7 = row.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
          if (row[y] === 0) {
            data = this.getSubData(x, y);
            val = k.executeAll(data) ? 1 : 0;
            nr.push(val);
          } else {
            nr.push(1);
          }
        }
        m.push(nr);
      }
      this.matrix = m;
      return this.bitmapFromMatrix();
    };

    Bitmap.prototype.open = function() {
      var data, k, m, nr, row, val, x, y, _i, _j, _ref6, _ref7;
      k = new Open();
      m = [];
      for (x = _i = 0, _ref6 = this.matrix.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; x = 0 <= _ref6 ? ++_i : --_i) {
        row = this.matrix[x];
        nr = [];
        for (y = _j = 0, _ref7 = row.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; y = 0 <= _ref7 ? ++_j : --_j) {
          if (row[y] === 1) {
            data = this.getSubData(x, y);
            val = k.executeAll(data) ? 0 : 1;
            nr.push(val);
          } else {
            nr.push(0);
          }
        }
        m.push(nr);
      }
      this.matrix = m;
      return this.bitmapFromMatrix();
    };

    return Bitmap;

  })();

  sendMessage = function(message, type) {
    var m;
    if (type == null) {
      type = "message";
    }
    m = {
      "type": type,
      "message": message
    };
    postMessage(JSON.stringify(m));
  };

  var console = (function (s) {
    var method;
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var c = {};
    while (length--) {
        method = methods[length];

        c[method] = (function(){
        	var t = method;
        	return function(m){
	        	s(m, t);
        	}
        })();
    };
    return c;
})(sendMessage);

  bitmap = void 0;

  redraw = function() {
    var item;
    item = {
      width: bitmap.width,
      height: bitmap.height,
      pixels: bitmap.getBitmapData()
    };
    return sendMessage(item, "redraw");
  };

  onMessageReceived = function(msg) {
    var data, i, parsed, _i, _ref6;
    parsed = JSON.parse(msg.data);
    switch (parsed.type) {
      case "init":
        console.group("init");
        data = [];
        for (i = _i = 0, _ref6 = (parsed.data.width * parsed.data.height * 4) - 1; 0 <= _ref6 ? _i <= _ref6 : _i >= _ref6; i = 0 <= _ref6 ? ++_i : --_i) {
          data.push(parsed.data.data[i]);
        }
        bitmap = new Bitmap(parsed.data.width, parsed.data.height, data);
        break;
      case "getbitmap":
        console.group("getbitmap");
        bitmap.bitmapFromMatrix();
        redraw();
        break;
      case "binarize":
        console.group("binarizing");
        bitmap.binarize();
        redraw();
        break;
      case "skeleton":
        console.group("skeleton");
        bitmap.skeleton();
        redraw();
        break;
      case "erode":
        console.group("erode");
        bitmap.erode();
        redraw();
        break;
      case "close":
        console.group("close");
        bitmap.close();
        redraw();
        break;
      case "open":
        console.group("open");
        bitmap.open();
        redraw();
        break;
      case "mark":
        console.group("mark");
        bitmap.mark();
        redraw();
        break;
      default:
        console.group("Unidentified request");
        console.log(parsed);
    }
    console.log("--- \"Ladies and gentlemen, worker has left the building.\" ---");
    console.groupEnd();
  };

  this.addEventListener('message', onMessageReceived, false);

}).call(this);
