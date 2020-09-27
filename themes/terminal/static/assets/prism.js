!(function (e) {
  var t = {};
  function n(a) {
    if (t[a]) return t[a].exports;
    var i = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (n.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            a,
            i,
            function (t) {
              return e[t];
            }.bind(null, i),
          );
      return a;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 3));
})([
  ,
  ,
  ,
  function (e, t, n) {
    (function (t) {
      var a = (function (e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i,
          n = 0,
          a = {
            manual: e.Prism && e.Prism.manual,
            disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
            util: {
              encode: function (e) {
                return e instanceof i
                  ? new i(e.type, a.util.encode(e.content), e.alias)
                  : Array.isArray(e)
                  ? e.map(a.util.encode)
                  : e
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/\u00a0/g, " ");
              },
              type: function (e) {
                return Object.prototype.toString.call(e).slice(8, -1);
              },
              objId: function (e) {
                return e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id;
              },
              clone: function e(t, n) {
                var i,
                  r,
                  o = a.util.type(t);
                switch (((n = n || {}), o)) {
                  case "Object":
                    if (((r = a.util.objId(t)), n[r])) return n[r];
                    for (var s in ((i = {}), (n[r] = i), t))
                      t.hasOwnProperty(s) && (i[s] = e(t[s], n));
                    return i;
                  case "Array":
                    return (
                      (r = a.util.objId(t)),
                      n[r]
                        ? n[r]
                        : ((i = []),
                          (n[r] = i),
                          t.forEach(function (t, a) {
                            i[a] = e(t, n);
                          }),
                          i)
                    );
                  default:
                    return t;
                }
              },
            },
            languages: {
              extend: function (e, t) {
                var n = a.util.clone(a.languages[e]);
                for (var i in t) n[i] = t[i];
                return n;
              },
              insertBefore: function (e, t, n, i) {
                var r = (i = i || a.languages)[e],
                  o = {};
                for (var s in r)
                  if (r.hasOwnProperty(s)) {
                    if (s == t) for (var l in n) n.hasOwnProperty(l) && (o[l] = n[l]);
                    n.hasOwnProperty(s) || (o[s] = r[s]);
                  }
                var d = i[e];
                return (
                  (i[e] = o),
                  a.languages.DFS(a.languages, function (t, n) {
                    n === d && t != e && (this[t] = o);
                  }),
                  o
                );
              },
              DFS: function e(t, n, i, r) {
                r = r || {};
                var o = a.util.objId;
                for (var s in t)
                  if (t.hasOwnProperty(s)) {
                    n.call(t, s, t[s], i || s);
                    var l = t[s],
                      d = a.util.type(l);
                    "Object" !== d || r[o(l)]
                      ? "Array" !== d || r[o(l)] || ((r[o(l)] = !0), e(l, n, s, r))
                      : ((r[o(l)] = !0), e(l, n, null, r));
                  }
              },
            },
            plugins: {},
            highlightAll: function (e, t) {
              a.highlightAllUnder(document, e, t);
            },
            highlightAllUnder: function (e, t, n) {
              var i = {
                callback: n,
                selector:
                  'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
              };
              a.hooks.run("before-highlightall", i);
              for (var r, o = i.elements || e.querySelectorAll(i.selector), s = 0; (r = o[s++]); )
                a.highlightElement(r, !0 === t, i.callback);
            },
            highlightElement: function (n, i, r) {
              for (var o, s, l = n; l && !t.test(l.className); ) l = l.parentNode;
              l && ((o = (l.className.match(t) || [, ""])[1].toLowerCase()), (s = a.languages[o])),
                (n.className = n.className.replace(t, "").replace(/\s+/g, " ") + " language-" + o),
                n.parentNode &&
                  ((l = n.parentNode),
                  /pre/i.test(l.nodeName) &&
                    (l.className =
                      l.className.replace(t, "").replace(/\s+/g, " ") + " language-" + o));
              var d = { element: n, language: o, grammar: s, code: n.textContent },
                c = function (e) {
                  (d.highlightedCode = e),
                    a.hooks.run("before-insert", d),
                    (d.element.innerHTML = d.highlightedCode),
                    a.hooks.run("after-highlight", d),
                    a.hooks.run("complete", d),
                    r && r.call(d.element);
                };
              if ((a.hooks.run("before-sanity-check", d), d.code))
                if ((a.hooks.run("before-highlight", d), d.grammar))
                  if (i && e.Worker) {
                    var u = new Worker(a.filename);
                    (u.onmessage = function (e) {
                      c(e.data);
                    }),
                      u.postMessage(
                        JSON.stringify({ language: d.language, code: d.code, immediateClose: !0 }),
                      );
                  } else c(a.highlight(d.code, d.grammar, d.language));
                else c(a.util.encode(d.code));
              else a.hooks.run("complete", d);
            },
            highlight: function (e, t, n) {
              var r = { code: e, grammar: t, language: n };
              return (
                a.hooks.run("before-tokenize", r),
                (r.tokens = a.tokenize(r.code, r.grammar)),
                a.hooks.run("after-tokenize", r),
                i.stringify(a.util.encode(r.tokens), r.language)
              );
            },
            matchGrammar: function (e, t, n, r, o, s, l) {
              for (var d in n)
                if (n.hasOwnProperty(d) && n[d]) {
                  if (d == l) return;
                  var c = n[d];
                  c = "Array" === a.util.type(c) ? c : [c];
                  for (var u = 0; u < c.length; ++u) {
                    var p = c[u],
                      g = p.inside,
                      f = !!p.lookbehind,
                      m = !!p.greedy,
                      b = 0,
                      h = p.alias;
                    if (m && !p.pattern.global) {
                      var v = p.pattern.toString().match(/[imuy]*$/)[0];
                      p.pattern = RegExp(p.pattern.source, v + "g");
                    }
                    p = p.pattern || p;
                    for (var y = r, w = o; y < t.length; w += t[y].length, ++y) {
                      var k = t[y];
                      if (t.length > e.length) return;
                      if (!(k instanceof i)) {
                        if (m && y != t.length - 1) {
                          if (((p.lastIndex = w), !(_ = p.exec(e)))) break;
                          for (
                            var S = _.index + (f ? _[1].length : 0),
                              x = _.index + _[0].length,
                              E = y,
                              A = w,
                              T = t.length;
                            E < T && (A < x || (!t[E].type && !t[E - 1].greedy));
                            ++E
                          )
                            (A += t[E].length) <= S && (++y, (w = A));
                          if (t[y] instanceof i) continue;
                          (C = E - y), (k = e.slice(w, A)), (_.index -= w);
                        } else {
                          p.lastIndex = 0;
                          var _ = p.exec(k),
                            C = 1;
                        }
                        if (_) {
                          f && (b = _[1] ? _[1].length : 0),
                            (x = (S = _.index + b) + (_ = _[0].slice(b)).length);
                          var N = k.slice(0, S),
                            I = k.slice(x),
                            L = [y, C];
                          N && (++y, (w += N.length), L.push(N));
                          var R = new i(d, g ? a.tokenize(_, g) : _, h, _, m);
                          if (
                            (L.push(R),
                            I && L.push(I),
                            Array.prototype.splice.apply(t, L),
                            1 != C && a.matchGrammar(e, t, n, y, w, !0, d),
                            s)
                          )
                            break;
                        } else if (s) break;
                      }
                    }
                  }
                }
            },
            tokenize: function (e, t) {
              var n = [e],
                i = t.rest;
              if (i) {
                for (var r in i) t[r] = i[r];
                delete t.rest;
              }
              return a.matchGrammar(e, n, t, 0, 0, !1), n;
            },
            hooks: {
              all: {},
              add: function (e, t) {
                var n = a.hooks.all;
                (n[e] = n[e] || []), n[e].push(t);
              },
              run: function (e, t) {
                var n = a.hooks.all[e];
                if (n && n.length) for (var i, r = 0; (i = n[r++]); ) i(t);
              },
            },
            Token: i,
          };
        function i(e, t, n, a, i) {
          (this.type = e),
            (this.content = t),
            (this.alias = n),
            (this.length = 0 | (a || "").length),
            (this.greedy = !!i);
        }
        if (
          ((e.Prism = a),
          (i.stringify = function (e, t, n) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e))
              return e
                .map(function (n) {
                  return i.stringify(n, t, e);
                })
                .join("");
            var r = {
              type: e.type,
              content: i.stringify(e.content, t, n),
              tag: "span",
              classes: ["token", e.type],
              attributes: {},
              language: t,
              parent: n,
            };
            if (e.alias) {
              var o = Array.isArray(e.alias) ? e.alias : [e.alias];
              Array.prototype.push.apply(r.classes, o);
            }
            a.hooks.run("wrap", r);
            var s = Object.keys(r.attributes)
              .map(function (e) {
                return e + '="' + (r.attributes[e] || "").replace(/"/g, "&quot;") + '"';
              })
              .join(" ");
            return (
              "<" +
              r.tag +
              ' class="' +
              r.classes.join(" ") +
              '"' +
              (s ? " " + s : "") +
              ">" +
              r.content +
              "</" +
              r.tag +
              ">"
            );
          }),
          !e.document)
        )
          return (
            e.addEventListener &&
              (a.disableWorkerMessageHandler ||
                e.addEventListener(
                  "message",
                  function (t) {
                    var n = JSON.parse(t.data),
                      i = n.language,
                      r = n.code,
                      o = n.immediateClose;
                    e.postMessage(a.highlight(r, a.languages[i], i)), o && e.close();
                  },
                  !1,
                )),
            a
          );
        var r =
          document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return (
          r &&
            ((a.filename = r.src),
            a.manual ||
              r.hasAttribute("data-manual") ||
              ("loading" !== document.readyState
                ? window.requestAnimationFrame
                  ? window.requestAnimationFrame(a.highlightAll)
                  : window.setTimeout(a.highlightAll, 16)
                : document.addEventListener("DOMContentLoaded", a.highlightAll))),
          a
        );
      })(
        "undefined" != typeof window
          ? window
          : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
          ? self
          : {},
      );
      e.exports && (e.exports = a),
        void 0 !== t && (t.Prism = a),
        (a.languages.markup = {
          comment: /<!--[\s\S]*?-->/,
          prolog: /<\?[\s\S]+?\?>/,
          doctype: /<!DOCTYPE[\s\S]+?>/i,
          cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
          tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
            greedy: !0,
            inside: {
              tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
              },
              "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] },
              },
              punctuation: /\/?>/,
              "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
            },
          },
          entity: /&#?[\da-z]{1,8};/i,
        }),
        (a.languages.markup.tag.inside["attr-value"].inside.entity = a.languages.markup.entity),
        a.hooks.add("wrap", function (e) {
          "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
        }),
        Object.defineProperty(a.languages.markup.tag, "addInlined", {
          value: function (e, t) {
            var n = {};
            (n["language-" + t] = {
              pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
              lookbehind: !0,
              inside: a.languages[t],
            }),
              (n.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var i = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: n } };
            i["language-" + t] = { pattern: /[\s\S]+/, inside: a.languages[t] };
            var r = {};
            (r[e] = {
              pattern: RegExp(
                "(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(
                  /__/g,
                  e,
                ),
                "i",
              ),
              lookbehind: !0,
              greedy: !0,
              inside: i,
            }),
              a.languages.insertBefore("markup", "cdata", r);
          },
        }),
        (a.languages.xml = a.languages.extend("markup", {})),
        (a.languages.html = a.languages.markup),
        (a.languages.mathml = a.languages.markup),
        (a.languages.svg = a.languages.markup),
        (function (e) {
          var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
          (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: { pattern: /@[\w-]+?[\s\S]*?(?:;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
            url: RegExp("url\\((?:" + t.source + "|.*?)\\)", "i"),
            selector: RegExp("[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"),
            string: { pattern: t, greedy: !0 },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/,
          }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
          var n = e.languages.markup;
          n &&
            (n.tag.addInlined("style", "css"),
            e.languages.insertBefore(
              "inside",
              "attr-value",
              {
                "style-attr": {
                  pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                  inside: {
                    "attr-name": { pattern: /^\s*style/i, inside: n.tag.inside },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    "attr-value": { pattern: /.+/i, inside: e.languages.css },
                  },
                  alias: "language-css",
                },
              },
              n.tag,
            ));
        })(a),
        (a.languages.clike = {
          comment: [
            { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
          ],
          string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          "class-name": {
            pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
          },
          keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
          boolean: /\b(?:true|false)\b/,
          function: /\w+(?=\()/,
          number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (a.languages.javascript = a.languages.extend("clike", {
          "class-name": [
            a.languages.clike["class-name"],
            {
              pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
              lookbehind: !0,
            },
          ],
          keyword: [
            { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
            {
              pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0,
            },
          ],
          number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
          function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
        })),
        (a.languages.javascript[
          "class-name"
        ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
        a.languages.insertBefore("javascript", "keyword", {
          regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
            lookbehind: !0,
            greedy: !0,
          },
          "function-variable": {
            pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
            alias: "function",
          },
          parameter: [
            {
              pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
            {
              pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
              inside: a.languages.javascript,
            },
            {
              pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
            {
              pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
              lookbehind: !0,
              inside: a.languages.javascript,
            },
          ],
          constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
        }),
        a.languages.insertBefore("javascript", "string", {
          "template-string": {
            pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
            greedy: !0,
            inside: {
              interpolation: {
                pattern: /\${[^}]+}/,
                inside: {
                  "interpolation-punctuation": { pattern: /^\${|}$/, alias: "punctuation" },
                  rest: a.languages.javascript,
                },
              },
              string: /[\s\S]+/,
            },
          },
        }),
        a.languages.markup && a.languages.markup.tag.addInlined("script", "javascript"),
        (a.languages.js = a.languages.javascript),
        (a.languages.actionscript = a.languages.extend("javascript", {
          keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
          operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/,
        })),
        (a.languages.actionscript["class-name"].alias = "function"),
        a.languages.markup &&
          a.languages.insertBefore("actionscript", "string", {
            xml: {
              pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
              lookbehind: !0,
              inside: { rest: a.languages.markup },
            },
          }),
        (a.languages.apacheconf = {
          comment: /#.*/,
          "directive-inline": {
            pattern: /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
            lookbehind: !0,
            alias: "property",
          },
          "directive-block": {
            pattern: /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b *.*>/i,
            inside: {
              "directive-block": {
                pattern: /^<\/?\w+/,
                inside: { punctuation: /^<\/?/ },
                alias: "tag",
              },
              "directive-block-parameter": {
                pattern: /.*[^>]/,
                inside: {
                  punctuation: /:/,
                  string: {
                    pattern: /("|').*\1/,
                    inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
                  },
                },
                alias: "attr-value",
              },
              punctuation: />/,
            },
            alias: "tag",
          },
          "directive-flags": { pattern: /\[(?:\w,?)+\]/, alias: "keyword" },
          string: { pattern: /("|').*\1/, inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ } },
          variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
          regex: /\^?.*\$|\^.*\$?/,
        }),
        (a.languages.applescript = {
          comment: [/\(\*(?:\(\*[\s\S]*?\*\)|[\s\S])*?\*\)/, /--.+/, /#.+/],
          string: /"(?:\\.|[^"\\\r\n])*"/,
          number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?\b/i,
          operator: [
            /[&=≠≤≥*+\-\/÷^]|[<>]=?/,
            /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/,
          ],
          keyword: /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
          class: {
            pattern: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,
            alias: "builtin",
          },
          punctuation: /[{}():,¬«»《》]/,
        }),
        (a.languages.c = a.languages.extend("clike", {
          "class-name": { pattern: /(\b(?:enum|struct)\s+)\w+/, lookbehind: !0 },
          keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
          operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
          number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
        })),
        a.languages.insertBefore("c", "string", {
          macro: {
            pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
            lookbehind: !0,
            alias: "property",
            inside: {
              string: { pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/, lookbehind: !0 },
              directive: {
                pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                lookbehind: !0,
                alias: "keyword",
              },
            },
          },
          constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
        }),
        delete a.languages.c.boolean,
        (a.languages.csharp = a.languages.extend("clike", {
          keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
          string: [
            { pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
            { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/, greedy: !0 },
          ],
          "class-name": [
            { pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/, inside: { punctuation: /\./ } },
            { pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/, lookbehind: !0, inside: { punctuation: /\./ } },
            {
              pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
              lookbehind: !0,
              inside: { punctuation: /\./ },
            },
            {
              pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
              lookbehind: !0,
              inside: { punctuation: /\./ },
            },
          ],
          number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
          operator: />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
          punctuation: /\?\.?|::|[{}[\];(),.:]/,
        })),
        a.languages.insertBefore("csharp", "class-name", {
          "generic-method": {
            pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
            inside: {
              function: /^\w+/,
              "class-name": { pattern: /\b[A-Z]\w*(?:\.\w+)*\b/, inside: { punctuation: /\./ } },
              keyword: a.languages.csharp.keyword,
              punctuation: /[<>(),.:]/,
            },
          },
          preprocessor: {
            pattern: /(^\s*)#.*/m,
            lookbehind: !0,
            alias: "property",
            inside: {
              directive: {
                pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                lookbehind: !0,
                alias: "keyword",
              },
            },
          },
        }),
        (a.languages.dotnet = a.languages.csharp),
        (function (e) {
          var t = {
            variable: [
              {
                pattern: /\$?\(\([\s\S]+?\)\)/,
                inside: {
                  variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
                  number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                  operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                  punctuation: /\(\(?|\)\)?|,|;/,
                },
              },
              {
                pattern: /\$\([^)]+\)|`[^`]+`/,
                greedy: !0,
                inside: { variable: /^\$\(|^`|\)$|`$/ },
              },
              /\$(?:[\w#?*!@]+|\{[^}]+\})/i,
            ],
          };
          e.languages.bash = {
            shebang: { pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/, alias: "important" },
            comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
            string: [
              {
                pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
                lookbehind: !0,
                greedy: !0,
                inside: t,
              },
              {
                pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
                greedy: !0,
                inside: t,
              },
            ],
            variable: t.variable,
            function: {
              pattern: /(^|[\s;|&])(?:add|alias|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|hash|head|help|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logout|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tail|tar|tee|test|time|timeout|times|top|touch|tr|traceroute|trap|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zip|zypper)(?=$|[\s;|&])/,
              lookbehind: !0,
            },
            keyword: {
              pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
              lookbehind: !0,
            },
            boolean: { pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/, lookbehind: !0 },
            operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
            punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/,
          };
          var n = t.variable[1].inside;
          (n.string = e.languages.bash.string),
            (n.function = e.languages.bash.function),
            (n.keyword = e.languages.bash.keyword),
            (n.boolean = e.languages.bash.boolean),
            (n.operator = e.languages.bash.operator),
            (n.punctuation = e.languages.bash.punctuation),
            (e.languages.shell = e.languages.bash);
        })(a),
        (a.languages.cpp = a.languages.extend("c", {
          "class-name": { pattern: /(\b(?:class|enum|struct)\s+)\w+/, lookbehind: !0 },
          keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
          boolean: /\b(?:true|false)\b/,
          operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
        })),
        a.languages.insertBefore("cpp", "string", {
          "raw-string": {
            pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
            alias: "string",
            greedy: !0,
          },
        }),
        (function (e) {
          var t = /#(?!\{).+/,
            n = { pattern: /#\{[^}]+\}/, alias: "variable" };
          (e.languages.coffeescript = e.languages.extend("javascript", {
            comment: t,
            string: [
              { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
              { pattern: /"(?:\\[\s\S]|[^\\"])*"/, greedy: !0, inside: { interpolation: n } },
            ],
            keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
            "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" },
          })),
            e.languages.insertBefore("coffeescript", "comment", {
              "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" },
              "block-regex": {
                pattern: /\/{3}[\s\S]*?\/{3}/,
                alias: "regex",
                inside: { comment: t, interpolation: n },
              },
            }),
            e.languages.insertBefore("coffeescript", "string", {
              "inline-javascript": {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                inside: {
                  delimiter: { pattern: /^`|`$/, alias: "punctuation" },
                  rest: e.languages.javascript,
                },
              },
              "multiline-string": [
                { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
                {
                  pattern: /"""[\s\S]*?"""/,
                  greedy: !0,
                  alias: "string",
                  inside: { interpolation: n },
                },
              ],
            }),
            e.languages.insertBefore("coffeescript", "keyword", {
              property: /(?!\d)\w+(?=\s*:(?!:))/,
            }),
            delete e.languages.coffeescript["template-string"],
            (e.languages.coffee = e.languages.coffeescript);
        })(a),
        (function (e) {
          e.languages.ruby = e.languages.extend("clike", {
            comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
            keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
          });
          var t = {
            pattern: /#\{[^}]+\}/,
            inside: { delimiter: { pattern: /^#\{|\}$/, alias: "tag" }, rest: e.languages.ruby },
          };
          delete e.languages.ruby.function,
            e.languages.insertBefore("ruby", "keyword", {
              regex: [
                {
                  pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
                  lookbehind: !0,
                  greedy: !0,
                },
              ],
              variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
              symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
              "method-definition": {
                pattern: /(\bdef\s+)[\w.]+/,
                lookbehind: !0,
                inside: { function: /\w+$/, rest: e.languages.ruby },
              },
            }),
            e.languages.insertBefore("ruby", "number", {
              builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
              constant: /\b[A-Z]\w*(?:[?!]|\b)/,
            }),
            (e.languages.ruby.string = [
              {
                pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                greedy: !0,
                inside: { interpolation: t },
              },
              {
                pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
                greedy: !0,
                inside: { interpolation: t },
              },
              {
                pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
                greedy: !0,
                inside: { interpolation: t },
              },
              {
                pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
                greedy: !0,
                inside: { interpolation: t },
              },
              {
                pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
                greedy: !0,
                inside: { interpolation: t },
              },
              {
                pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0,
                inside: { interpolation: t },
              },
            ]),
            (e.languages.rb = e.languages.ruby);
        })(a),
        (a.languages.csp = {
          directive: {
            pattern: /\b(?:(?:base-uri|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox) |(?:block-all-mixed-content|disown-opener|upgrade-insecure-requests)(?: |;)|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src )/i,
            alias: "keyword",
          },
          safe: {
            pattern: /'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=/]+)'/,
            alias: "selector",
          },
          unsafe: {
            pattern: /(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,
            alias: "function",
          },
        }),
        (a.languages.css.selector = {
          pattern: a.languages.css.selector,
          inside: {
            "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            "pseudo-class": /:[-\w]+/,
            class: /\.[-:.\w]+/,
            id: /#[-:.\w]+/,
            attribute: {
              pattern: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/,
              greedy: !0,
              inside: {
                punctuation: /^\[|\]$/,
                "case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword" },
                namespace: {
                  pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
                  lookbehind: !0,
                  inside: { punctuation: /\|$/ },
                },
                attribute: { pattern: /^(\s*)[-\w\xA0-\uFFFF]+/, lookbehind: !0 },
                value: [
                  /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                  { pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/, lookbehind: !0 },
                ],
                operator: /[|~*^$]?=/,
              },
            },
            "n-th": {
              pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
              lookbehind: !0,
              inside: { number: /[\dn]+/, operator: /[+-]/ },
            },
            punctuation: /[()]/,
          },
        }),
        a.languages.insertBefore("css", "property", {
          variable: {
            pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
            lookbehind: !0,
          },
        }),
        a.languages.insertBefore("css", "function", {
          operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
          hexcode: /#[\da-f]{3,8}/i,
          entity: /\\[\da-f]{1,8}/i,
          unit: { pattern: /(\d)(?:%|[a-z]+)/, lookbehind: !0 },
          number: /-?[\d.]+/,
        }),
        (a.languages.diff = {
          coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
          deleted: /^[-<].*$/m,
          inserted: /^[+>].*$/m,
          diff: { pattern: /^!(?!!).+$/m, alias: "important" },
        }),
        (function (e) {
          function t(e, t) {
            return "___" + e.toUpperCase() + t + "___";
          }
          Object.defineProperties((e.languages["markup-templating"] = {}), {
            buildPlaceholders: {
              value: function (n, a, i, r) {
                if (n.language === a) {
                  var o = (n.tokenStack = []);
                  (n.code = n.code.replace(i, function (e) {
                    if ("function" == typeof r && !r(e)) return e;
                    for (var i, s = o.length; -1 !== n.code.indexOf((i = t(a, s))); ) ++s;
                    return (o[s] = e), i;
                  })),
                    (n.grammar = e.languages.markup);
                }
              },
            },
            tokenizePlaceholders: {
              value: function (n, a) {
                if (n.language === a && n.tokenStack) {
                  n.grammar = e.languages[a];
                  var i = 0,
                    r = Object.keys(n.tokenStack);
                  !(function o(s) {
                    for (var l = 0; l < s.length && !(i >= r.length); l++) {
                      var d = s[l];
                      if ("string" == typeof d || (d.content && "string" == typeof d.content)) {
                        var c = r[i],
                          u = n.tokenStack[c],
                          p = "string" == typeof d ? d : d.content,
                          g = t(a, c),
                          f = p.indexOf(g);
                        if (-1 < f) {
                          ++i;
                          var m = p.substring(0, f),
                            b = new e.Token(a, e.tokenize(u, n.grammar), "language-" + a, u),
                            h = p.substring(f + g.length),
                            v = [];
                          m && v.push.apply(v, o([m])),
                            v.push(b),
                            h && v.push.apply(v, o([h])),
                            "string" == typeof d
                              ? s.splice.apply(s, [l, 1].concat(v))
                              : (d.content = v);
                        }
                      } else d.content && o(d.content);
                    }
                    return s;
                  })(n.tokens);
                }
              },
            },
          });
        })(a),
        (a.languages.docker = {
          keyword: {
            pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
            lookbehind: !0,
          },
          string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
          comment: /#.*/,
          punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
        }),
        (a.languages.dockerfile = a.languages.docker),
        (a.languages.elixir = {
          comment: { pattern: /#.*/m, lookbehind: !0 },
          regex: {
            pattern: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
            greedy: !0,
          },
          string: [
            {
              pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
              greedy: !0,
              inside: {},
            },
            { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
            { pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0, inside: {} },
          ],
          atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: "symbol" },
          "attr-name": /\w+:(?!:)/,
          capture: {
            pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
            lookbehind: !0,
            alias: "function",
          },
          argument: { pattern: /(^|[^&])&\d+/, lookbehind: !0, alias: "variable" },
          attribute: { pattern: /@\w+/, alias: "variable" },
          number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
          keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
          boolean: /\b(?:true|false|nil)\b/,
          operator: [
            /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
            { pattern: /([^<])<(?!<)/, lookbehind: !0 },
            { pattern: /([^>])>(?!>)/, lookbehind: !0 },
          ],
          punctuation: /<<|>>|[.,%\[\]{}()]/,
        }),
        a.languages.elixir.string.forEach(function (e) {
          e.inside = {
            interpolation: {
              pattern: /#\{[^}]+\}/,
              inside: {
                delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
                rest: a.languages.elixir,
              },
            },
          };
        }),
        (a.languages.elm = {
          comment: /--.*|{-[\s\S]*?-}/,
          char: { pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/, greedy: !0 },
          string: [
            { pattern: /"""[\s\S]*?"""/, greedy: !0 },
            { pattern: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/, greedy: !0 },
          ],
          import_statement: {
            pattern: /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+([A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
            inside: { keyword: /\b(?:import|as|exposing)\b/ },
          },
          keyword: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
          builtin: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
          number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
          operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
          hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
          constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
          punctuation: /[{}[\]|(),.:]/,
        }),
        (a.languages.erlang = {
          comment: /%.+/,
          string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
          "quoted-function": { pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/, alias: "function" },
          "quoted-atom": { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: "atom" },
          boolean: /\b(?:true|false)\b/,
          keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
          number: [/\$\\?./, /\d+#[a-z0-9]+/i, /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i],
          function: /\b[a-z][\w@]*(?=\()/,
          variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
          operator: [
            /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
            { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
            { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
          ],
          atom: /\b[a-z][\w@]*/,
          punctuation: /[()[\]{}:;,.#|]|<<|>>/,
        }),
        (a.languages.fsharp = a.languages.extend("clike", {
          comment: [
            { pattern: /(^|[^\\])\(\*[\s\S]*?\*\)/, lookbehind: !0 },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
          ],
          string: {
            pattern: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")B?|'(?:[^\\']|\\.)'B?/,
            greedy: !0,
          },
          "class-name": {
            pattern: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
            lookbehind: !0,
            inside: { operator: /->|\*/, punctuation: /\./ },
          },
          keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
          number: [
            /\b0x[\da-fA-F]+(?:un|lf|LF)?\b/,
            /\b0b[01]+(?:y|uy)?\b/,
            /(?:\b\d+\.?\d*|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
            /\b\d+(?:[IlLsy]|u[lsy]?|UL)?\b/,
          ],
          operator: /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-+*/%=<>])\??|[!?^&]|~[+~-]|:>|:\?>?/,
        })),
        a.languages.insertBefore("fsharp", "keyword", {
          preprocessor: {
            pattern: /^[^\r\n\S]*#.*/m,
            alias: "property",
            inside: {
              directive: {
                pattern: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/,
                lookbehind: !0,
                alias: "keyword",
              },
            },
          },
        }),
        a.languages.insertBefore("fsharp", "punctuation", {
          "computation-expression": { pattern: /[_a-z]\w*(?=\s*\{)/i, alias: "keyword" },
        }),
        a.languages.insertBefore("fsharp", "string", {
          annotation: {
            pattern: /\[<.+?>\]/,
            inside: {
              punctuation: /^\[<|>\]$/,
              "class-name": { pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/, lookbehind: !0 },
              "annotation-content": { pattern: /[\s\S]+/, inside: a.languages.fsharp },
            },
          },
        }),
        (function (e) {
          (e.languages.flow = e.languages.extend("javascript", {})),
            e.languages.insertBefore("flow", "keyword", {
              type: [
                {
                  pattern: /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/,
                  alias: "tag",
                },
              ],
            }),
            (e.languages.flow[
              "function-variable"
            ].pattern = /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i),
            delete e.languages.flow.parameter,
            e.languages.insertBefore("flow", "operator", {
              "flow-punctuation": { pattern: /\{\||\|\}/, alias: "punctuation" },
            }),
            Array.isArray(e.languages.flow.keyword) ||
              (e.languages.flow.keyword = [e.languages.flow.keyword]),
            e.languages.flow.keyword.unshift(
              { pattern: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/, lookbehind: !0 },
              {
                pattern: /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/,
                lookbehind: !0,
              },
            );
        })(a),
        (a.languages.git = {
          comment: /^#.*/m,
          deleted: /^[-–].*/m,
          inserted: /^\+.*/m,
          string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
          command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
          coord: /^@@.*@@$/m,
          commit_sha1: /^commit \w{40}$/m,
        }),
        (a.languages.go = a.languages.extend("clike", {
          keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
          builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
          boolean: /\b(?:_|iota|nil|true|false)\b/,
          operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
          number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
          string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
        })),
        delete a.languages.go["class-name"],
        (a.languages.graphql = {
          comment: /#.*/,
          string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
          number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
          boolean: /\b(?:true|false)\b/,
          variable: /\$[a-z_]\w*/i,
          directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
          "attr-name": {
            pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
            greedy: !0,
          },
          "class-name": {
            pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
            lookbehind: !0,
          },
          fragment: {
            pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
            lookbehind: !0,
            alias: "function",
          },
          keyword: /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
          operator: /[!=|]|\.{3}/,
          punctuation: /[!(){}\[\]:=,]/,
          constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
        }),
        (a.languages.less = a.languages.extend("css", {
          comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
          atrule: {
            pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
            inside: { punctuation: /[:()]/ },
          },
          selector: {
            pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
            inside: { variable: /@+[\w-]+/ },
          },
          property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
          operator: /[+\-*\/]/,
        })),
        a.languages.insertBefore("less", "property", {
          variable: [{ pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } }, /@@?[\w-]+/],
          "mixin-usage": {
            pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
            lookbehind: !0,
            alias: "function",
          },
        }),
        (function (e) {
          (e.languages.handlebars = {
            comment: /\{\{![\s\S]*?\}\}/,
            delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
            string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
            boolean: /\b(?:true|false)\b/,
            block: {
              pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
              lookbehind: !0,
              alias: "keyword",
            },
            brackets: {
              pattern: /\[[^\]]+\]/,
              inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
            },
            punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
            variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/,
          }),
            e.hooks.add("before-tokenize", function (t) {
              e.languages["markup-templating"].buildPlaceholders(
                t,
                "handlebars",
                /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g,
              );
            }),
            e.hooks.add("after-tokenize", function (t) {
              e.languages["markup-templating"].tokenizePlaceholders(t, "handlebars");
            });
        })(a),
        (a.languages.haskell = {
          comment: {
            pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
            lookbehind: !0,
          },
          char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
          string: {
            pattern: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
            greedy: !0,
          },
          keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
          import_statement: {
            pattern: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
            lookbehind: !0,
            inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
          },
          builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
          number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
          operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][\w']*\.)*[_a-z][\w']*`/,
          hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
          constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (a.languages.hs = a.languages.haskell),
        (function (e) {
          e.languages.http = {
            "request-line": {
              pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
              inside: {
                property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
                "attr-name": /:\w+/,
              },
            },
            "response-status": {
              pattern: /^HTTP\/1.[01] \d+.*/m,
              inside: { property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 } },
            },
            "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
          };
          var t,
            n,
            a,
            i = e.languages,
            r = {
              "application/javascript": i.javascript,
              "application/json": i.json || i.javascript,
              "application/xml": i.xml,
              "text/xml": i.xml,
              "text/html": i.html,
              "text/css": i.css,
            },
            o = { "application/json": !0, "application/xml": !0 };
          for (var s in r)
            if (r[s]) {
              t = t || {};
              var l = o[s]
                ? ((a = (n = s).replace(/^[a-z]+\//, "")),
                  "(?:" + n + "|\\w+/(?:[\\w.-]+\\+)+" + a + "(?![+\\w.-]))")
                : s;
              t[s] = {
                pattern: RegExp(
                  "(content-type:\\s*" + l + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*",
                  "i",
                ),
                lookbehind: !0,
                inside: { rest: r[s] },
              };
            }
          t && e.languages.insertBefore("http", "header-name", t);
        })(a),
        (function (e) {
          var t = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/,
            n = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
          (e.languages.java = e.languages.extend("clike", {
            "class-name": [n, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
            keyword: t,
            function: [e.languages.clike.function, { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 }],
            number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
            operator: {
              pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m,
              lookbehind: !0,
            },
          })),
            e.languages.insertBefore("java", "class-name", {
              annotation: { alias: "punctuation", pattern: /(^|[^.])@\w+/, lookbehind: !0 },
              namespace: {
                pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
              },
              generics: {
                pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                inside: {
                  "class-name": n,
                  keyword: t,
                  punctuation: /[<>(),.:]/,
                  operator: /[?&|]/,
                },
              },
            });
        })(a),
        (function (e) {
          (e.languages.php = e.languages.extend("clike", {
            keyword: /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
            boolean: { pattern: /\b(?:false|true)\b/i, alias: "constant" },
            constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
            comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
          })),
            e.languages.insertBefore("php", "string", {
              "shell-comment": { pattern: /(^|[^\\])#.*/, lookbehind: !0, alias: "comment" },
            }),
            e.languages.insertBefore("php", "comment", {
              delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" },
            }),
            e.languages.insertBefore("php", "keyword", {
              variable: /\$+(?:\w+\b|(?={))/i,
              package: {
                pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
              },
            }),
            e.languages.insertBefore("php", "operator", {
              property: { pattern: /(->)[\w]+/, lookbehind: !0 },
            });
          var t = {
            pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
            lookbehind: !0,
            inside: { rest: e.languages.php },
          };
          e.languages.insertBefore("php", "string", {
            "nowdoc-string": {
              pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
              greedy: !0,
              alias: "string",
              inside: {
                delimiter: {
                  pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                  alias: "symbol",
                  inside: { punctuation: /^<<<'?|[';]$/ },
                },
              },
            },
            "heredoc-string": {
              pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
              greedy: !0,
              alias: "string",
              inside: {
                delimiter: {
                  pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                  alias: "symbol",
                  inside: { punctuation: /^<<<"?|[";]$/ },
                },
                interpolation: t,
              },
            },
            "single-quoted-string": {
              pattern: /'(?:\\[\s\S]|[^\\'])*'/,
              greedy: !0,
              alias: "string",
            },
            "double-quoted-string": {
              pattern: /"(?:\\[\s\S]|[^\\"])*"/,
              greedy: !0,
              alias: "string",
              inside: { interpolation: t },
            },
          }),
            delete e.languages.php.string,
            e.hooks.add("before-tokenize", function (t) {
              /<\?/.test(t.code) &&
                e.languages["markup-templating"].buildPlaceholders(
                  t,
                  "php",
                  /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi,
                );
            }),
            e.hooks.add("after-tokenize", function (t) {
              e.languages["markup-templating"].tokenizePlaceholders(t, "php");
            });
        })(a),
        (a.languages.json = {
          comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
          property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
          string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
          number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
          punctuation: /[{}[\],]/,
          operator: /:/,
          boolean: /\b(?:true|false)\b/,
          null: { pattern: /\bnull\b/, alias: "keyword" },
        }),
        (function (e) {
          (e.languages.kotlin = e.languages.extend("clike", {
            keyword: {
              pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
              lookbehind: !0,
            },
            function: [/\w+(?=\s*\()/, { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 }],
            number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
            operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
          })),
            delete e.languages.kotlin["class-name"],
            e.languages.insertBefore("kotlin", "string", {
              "raw-string": { pattern: /("""|''')[\s\S]*?\1/, alias: "string" },
            }),
            e.languages.insertBefore("kotlin", "keyword", {
              annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: "builtin" },
            }),
            e.languages.insertBefore("kotlin", "function", {
              label: { pattern: /\w+@|@\w+/, alias: "symbol" },
            });
          var t = [
            {
              pattern: /\$\{[^}]+\}/,
              inside: {
                delimiter: { pattern: /^\$\{|\}$/, alias: "variable" },
                rest: e.languages.kotlin,
              },
            },
            { pattern: /\$\w+/, alias: "variable" },
          ];
          e.languages.kotlin.string.inside = e.languages.kotlin["raw-string"].inside = {
            interpolation: t,
          };
        })(a),
        (function (e) {
          var t = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
            n = { "equation-command": { pattern: t, alias: "regex" } };
          a.languages.latex = {
            comment: /%.*/m,
            cdata: {
              pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
              lookbehind: !0,
            },
            equation: [
              {
                pattern: /\$(?:\\[\s\S]|[^\\$])*\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
                inside: n,
                alias: "string",
              },
              {
                pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
                lookbehind: !0,
                inside: n,
                alias: "string",
              },
            ],
            keyword: {
              pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
              lookbehind: !0,
            },
            url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
            headline: {
              pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
              lookbehind: !0,
              alias: "class-name",
            },
            function: { pattern: t, alias: "selector" },
            punctuation: /[[\]{}&]/,
          };
        })(),
        (a.languages.markdown = a.languages.extend("markup", {})),
        a.languages.insertBefore("markdown", "prolog", {
          blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
          code: [
            { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
            { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" },
            {
              pattern: /^```[\s\S]*?^```$/m,
              greedy: !0,
              inside: {
                "code-block": {
                  pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,
                  lookbehind: !0,
                },
                "code-language": { pattern: /^(```).+/, lookbehind: !0 },
                punctuation: /```/,
              },
            },
          ],
          title: [
            {
              pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)/,
              alias: "important",
              inside: { punctuation: /==+$|--+$/ },
            },
            {
              pattern: /(^\s*)#+.+/m,
              lookbehind: !0,
              alias: "important",
              inside: { punctuation: /^#+|#+$/ },
            },
          ],
          hr: {
            pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: !0,
            alias: "punctuation",
          },
          list: {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: !0,
            alias: "punctuation",
          },
          "url-reference": {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
              string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              punctuation: /^[\[\]!:]|[<>]/,
            },
            alias: "url",
          },
          bold: {
            pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            greedy: !0,
            inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
          },
          italic: {
            pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            greedy: !0,
            inside: { punctuation: /^[*_]|[*_]$/ },
          },
          strike: {
            pattern: /(^|[^\\])(~~?)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            greedy: !0,
            inside: { punctuation: /^~~?|~~?$/ },
          },
          url: {
            pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
            inside: {
              variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
              string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
            },
          },
        }),
        ["bold", "italic", "strike"].forEach(function (e) {
          ["url", "bold", "italic", "strike"].forEach(function (t) {
            e !== t && (a.languages.markdown[e].inside[t] = a.languages.markdown[t]);
          });
        }),
        a.hooks.add("after-tokenize", function (e) {
          ("markdown" !== e.language && "md" !== e.language) ||
            (function e(t) {
              if (t && "string" != typeof t)
                for (var n = 0, a = t.length; n < a; n++) {
                  var i = t[n];
                  if ("code" === i.type) {
                    var r = i.content[1],
                      o = i.content[3];
                    if (
                      r &&
                      o &&
                      "code-language" === r.type &&
                      "code-block" === o.type &&
                      "string" == typeof r.content
                    ) {
                      var s = "language-" + r.content.trim().split(/\s+/)[0].toLowerCase();
                      o.alias
                        ? "string" == typeof o.alias
                          ? (o.alias = [o.alias, s])
                          : o.alias.push(s)
                        : (o.alias = [s]);
                    }
                  } else e(i.content);
                }
            })(e.tokens);
        }),
        a.hooks.add("wrap", function (e) {
          if ("code-block" === e.type) {
            for (var t = "", n = 0, i = e.classes.length; n < i; n++) {
              var r = e.classes[n],
                o = /language-(.+)/.exec(r);
              if (o) {
                t = o[1];
                break;
              }
            }
            var s = a.languages[t];
            if (s) {
              var l = e.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&");
              e.content = a.highlight(l, s, t);
            }
          }
        }),
        (a.languages.md = a.languages.markdown),
        (a.languages.makefile = {
          comment: { pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/, lookbehind: !0 },
          string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
          symbol: {
            pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
            inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ },
          },
          variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
          keyword: [
            /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
            {
              pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
              lookbehind: !0,
            },
          ],
          operator: /(?:::|[?:+!])?=|[|@]/,
          punctuation: /[:;(){}]/,
        }),
        (function (e) {
          e.languages.django = {
            comment: /^{#[\s\S]*?#}$/,
            tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: "keyword" },
            delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: "punctuation" },
            string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: "function" },
            test: {
              pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
              lookbehind: !0,
              alias: "function",
            },
            function: /\b[a-z_]\w+(?=\s*\()/i,
            keyword: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
            operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
            number: /\b\d+(?:\.\d+)?\b/,
            boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
            variable: /\b\w+?\b/,
            punctuation: /[{}[\](),.:;]/,
          };
          var t = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
            n = e.languages["markup-templating"];
          e.hooks.add("before-tokenize", function (e) {
            n.buildPlaceholders(e, "django", t);
          }),
            e.hooks.add("after-tokenize", function (e) {
              n.tokenizePlaceholders(e, "django");
            }),
            (e.languages.jinja2 = e.languages.django),
            e.hooks.add("before-tokenize", function (e) {
              n.buildPlaceholders(e, "jinja2", t);
            }),
            e.hooks.add("after-tokenize", function (e) {
              n.tokenizePlaceholders(e, "jinja2");
            });
        })(a),
        (a.languages.typescript = a.languages.extend("javascript", {
          keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
          builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
        })),
        (a.languages.ts = a.languages.typescript),
        (a.languages.objectivec = a.languages.extend("c", {
          keyword: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
          string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
          operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
        })),
        delete a.languages.objectivec["class-name"],
        (a.languages.ocaml = {
          comment: /\(\*[\s\S]*?\*\)/,
          string: [
            { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
            { pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i, greedy: !0 },
          ],
          number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
          type: { pattern: /\B['`]\w*/, alias: "variable" },
          directive: { pattern: /\B#\w+/, alias: "function" },
          keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
          boolean: /\b(?:false|true)\b/,
          operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
          punctuation: /[(){}\[\]|_.,:;]/,
        }),
        (a.languages.perl = {
          comment: [
            { pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m, lookbehind: !0 },
            { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
          ],
          string: [
            {
              pattern: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
              greedy: !0,
            },
            { pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
            { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
            { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
            { pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, greedy: !0 },
            { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
            { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
            { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
          ],
          regex: [
            {
              pattern: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
              greedy: !0,
            },
            {
              pattern: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
              greedy: !0,
            },
            { pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/, greedy: !0 },
            { pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/, greedy: !0 },
            { pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/, greedy: !0 },
            { pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/, greedy: !0 },
            {
              pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
              lookbehind: !0,
              greedy: !0,
            },
            {
              pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
              lookbehind: !0,
              greedy: !0,
            },
            {
              pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
              lookbehind: !0,
              greedy: !0,
            },
            {
              pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
              lookbehind: !0,
              greedy: !0,
            },
            {
              pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
              lookbehind: !0,
              greedy: !0,
            },
            {
              pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
              lookbehind: !0,
              greedy: !0,
            },
            {
              pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
              greedy: !0,
            },
          ],
          variable: [
            /[&*$@%]\{\^[A-Z]+\}/,
            /[&*$@%]\^[A-Z_]/,
            /[&*$@%]#?(?=\{)/,
            /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
            /[&*$@%]\d+/,
            /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
          ],
          filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: "symbol" },
          vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: "string" },
          function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
          keyword: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
          number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
          operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
          punctuation: /[{}[\];(),:]/,
        }),
        a.languages.insertBefore("php", "variable", {
          this: /\$this\b/,
          global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
          scope: {
            pattern: /\b[\w\\]+::/,
            inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
          },
        }),
        (a.languages.sql = {
          comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
          variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
          string: {
            pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
            greedy: !0,
            lookbehind: !0,
          },
          function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
          keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
          boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
          number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
          operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
          punctuation: /[;[\]()`,.]/,
        }),
        (a.languages.processing = a.languages.extend("clike", {
          keyword: /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
          operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/,
        })),
        a.languages.insertBefore("processing", "number", {
          constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
          type: {
            pattern: /\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/,
            alias: "variable",
          },
        }),
        (a.languages.processing.function.pattern = /\w+(?=\s*\()/),
        (a.languages.processing["class-name"].alias = "variable"),
        (a.languages.scss = a.languages.extend("css", {
          comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
          atrule: {
            pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
            inside: { rule: /@[\w-]+/ },
          },
          url: /(?:[-a-z]+-)*url(?=\()/i,
          selector: {
            pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
            inside: {
              parent: { pattern: /&/, alias: "important" },
              placeholder: /%[-\w]+/,
              variable: /\$[-\w]+|#\{\$[-\w]+\}/,
            },
          },
          property: {
            pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
            inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
          },
        })),
        a.languages.insertBefore("scss", "atrule", {
          keyword: [
            /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
            { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
          ],
        }),
        a.languages.insertBefore("scss", "important", { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
        a.languages.insertBefore("scss", "function", {
          placeholder: { pattern: /%[-\w]+/, alias: "selector" },
          statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
          boolean: /\b(?:true|false)\b/,
          null: { pattern: /\bnull\b/, alias: "keyword" },
          operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/, lookbehind: !0 },
        }),
        (a.languages.scss.atrule.inside.rest = a.languages.scss),
        (a.languages.python = {
          comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
          "string-interpolation": {
            pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
            greedy: !0,
            inside: {
              interpolation: {
                pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                lookbehind: !0,
                inside: {
                  "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
                  "conversion-option": { pattern: /![sra](?=[:}]$)/, alias: "punctuation" },
                  rest: null,
                },
              },
              string: /[\s\S]+/,
            },
          },
          "triple-quoted-string": {
            pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
            greedy: !0,
            alias: "string",
          },
          string: { pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
          function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
          "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
          decorator: {
            pattern: /(^\s*)@\w+(?:\.\w+)*/i,
            lookbehind: !0,
            alias: ["annotation", "punctuation"],
            inside: { punctuation: /\./ },
          },
          keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
          builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
          boolean: /\b(?:True|False|None)\b/,
          number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
          operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (a.languages.python["string-interpolation"].inside.interpolation.inside.rest =
          a.languages.python),
        (a.languages.py = a.languages.python),
        (a.languages.r = {
          comment: /#.*/,
          string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          "percent-operator": { pattern: /%[^%\s]*%/, alias: "operator" },
          boolean: /\b(?:TRUE|FALSE)\b/,
          ellipsis: /\.\.(?:\.|\d+)/,
          number: [
            /\b(?:NaN|Inf)\b/,
            /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/,
          ],
          keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
          operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
          punctuation: /[(){}\[\],;]/,
        }),
        (function (e) {
          var t = e.util.clone(e.languages.javascript);
          (e.languages.jsx = e.languages.extend("markup", t)),
            (e.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
            (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
            (e.languages.jsx.tag.inside[
              "attr-value"
            ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
            (e.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
            e.languages.insertBefore(
              "inside",
              "attr-name",
              {
                spread: {
                  pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
                  inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ },
                },
              },
              e.languages.jsx.tag,
            ),
            e.languages.insertBefore(
              "inside",
              "attr-value",
              {
                script: {
                  pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
                  inside: {
                    "script-punctuation": { pattern: /^=(?={)/, alias: "punctuation" },
                    rest: e.languages.jsx,
                  },
                  alias: "language-javascript",
                },
              },
              e.languages.jsx.tag,
            );
          var n = function e(t) {
            return t
              ? "string" == typeof t
                ? t
                : "string" == typeof t.content
                ? t.content
                : t.content.map(e).join("")
              : "";
          };
          e.hooks.add("after-tokenize", function (t) {
            ("jsx" !== t.language && "tsx" !== t.language) ||
              (function t(a) {
                for (var i = [], r = 0; r < a.length; r++) {
                  var o = a[r],
                    s = !1;
                  if (
                    ("string" != typeof o &&
                      ("tag" === o.type && o.content[0] && "tag" === o.content[0].type
                        ? "</" === o.content[0].content[0].content
                          ? 0 < i.length &&
                            i[i.length - 1].tagName === n(o.content[0].content[1]) &&
                            i.pop()
                          : "/>" === o.content[o.content.length - 1].content ||
                            i.push({ tagName: n(o.content[0].content[1]), openedBraces: 0 })
                        : 0 < i.length && "punctuation" === o.type && "{" === o.content
                        ? i[i.length - 1].openedBraces++
                        : 0 < i.length &&
                          0 < i[i.length - 1].openedBraces &&
                          "punctuation" === o.type &&
                          "}" === o.content
                        ? i[i.length - 1].openedBraces--
                        : (s = !0)),
                    (s || "string" == typeof o) &&
                      0 < i.length &&
                      0 === i[i.length - 1].openedBraces)
                  ) {
                    var l = n(o);
                    r < a.length - 1 &&
                      ("string" == typeof a[r + 1] || "plain-text" === a[r + 1].type) &&
                      ((l += n(a[r + 1])), a.splice(r + 1, 1)),
                      0 < r &&
                        ("string" == typeof a[r - 1] || "plain-text" === a[r - 1].type) &&
                        ((l = n(a[r - 1]) + l), a.splice(r - 1, 1), r--),
                      (a[r] = new e.Token("plain-text", l, null, l));
                  }
                  o.content && "string" != typeof o.content && t(o.content);
                }
              })(t.tokens);
          });
        })(a),
        (a.languages.reason = a.languages.extend("clike", {
          comment: { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
          string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 },
          "class-name": /\b[A-Z]\w*/,
          keyword: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
          operator: /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/,
        })),
        a.languages.insertBefore("reason", "class-name", {
          character: {
            pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
            alias: "string",
          },
          constructor: { pattern: /\b[A-Z]\w*\b(?!\s*\.)/, alias: "variable" },
          label: { pattern: /\b[a-z]\w*(?=::)/, alias: "symbol" },
        }),
        delete a.languages.reason.function,
        (function (e) {
          var t = "(?:\\([^|)]+\\)|\\[[^\\]]+\\]|\\{[^}]+\\})+",
            n = {
              css: { pattern: /\{[^}]+\}/, inside: { rest: e.languages.css } },
              "class-id": { pattern: /(\()[^)]+(?=\))/, lookbehind: !0, alias: "attr-value" },
              lang: { pattern: /(\[)[^\]]+(?=\])/, lookbehind: !0, alias: "attr-value" },
              punctuation: /[\\\/]\d+|\S/,
            },
            a = (e.languages.textile = e.languages.extend("markup", {
              phrase: {
                pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
                lookbehind: !0,
                inside: {
                  "block-tag": {
                    pattern: RegExp("^[a-z]\\w*(?:" + t + "|[<>=()])*\\."),
                    inside: {
                      modifier: {
                        pattern: RegExp("(^[a-z]\\w*)(?:" + t + "|[<>=()])+(?=\\.)"),
                        lookbehind: !0,
                        inside: n,
                      },
                      tag: /^[a-z]\w*/,
                      punctuation: /\.$/,
                    },
                  },
                  list: {
                    pattern: RegExp("^[*#]+(?:" + t + ")?\\s+.+", "m"),
                    inside: {
                      modifier: { pattern: RegExp("(^[*#]+)" + t), lookbehind: !0, inside: n },
                      punctuation: /^[*#]+/,
                    },
                  },
                  table: {
                    pattern: RegExp(
                      "^(?:(?:" +
                        t +
                        "|[<>=()^~])+\\.\\s*)?(?:\\|(?:(?:" +
                        t +
                        "|[<>=()^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|",
                      "m",
                    ),
                    inside: {
                      modifier: {
                        pattern: RegExp(
                          "(^|\\|(?:\\r?\\n|\\r)?)(?:" + t + "|[<>=()^~_]|[\\\\/]\\d+)+(?=\\.)",
                        ),
                        lookbehind: !0,
                        inside: n,
                      },
                      punctuation: /\||^\./,
                    },
                  },
                  inline: {
                    pattern: RegExp("(\\*\\*|__|\\?\\?|[*_%@+\\-^~])(?:" + t + ")?.+?\\1"),
                    inside: {
                      bold: {
                        pattern: RegExp("(^(\\*\\*?)(?:" + t + ")?).+?(?=\\2)"),
                        lookbehind: !0,
                      },
                      italic: {
                        pattern: RegExp("(^(__?)(?:" + t + ")?).+?(?=\\2)"),
                        lookbehind: !0,
                      },
                      cite: {
                        pattern: RegExp("(^\\?\\?(?:" + t + ")?).+?(?=\\?\\?)"),
                        lookbehind: !0,
                        alias: "string",
                      },
                      code: {
                        pattern: RegExp("(^@(?:" + t + ")?).+?(?=@)"),
                        lookbehind: !0,
                        alias: "keyword",
                      },
                      inserted: {
                        pattern: RegExp("(^\\+(?:" + t + ")?).+?(?=\\+)"),
                        lookbehind: !0,
                      },
                      deleted: { pattern: RegExp("(^-(?:" + t + ")?).+?(?=-)"), lookbehind: !0 },
                      span: { pattern: RegExp("(^%(?:" + t + ")?).+?(?=%)"), lookbehind: !0 },
                      modifier: {
                        pattern: RegExp("(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])" + t),
                        lookbehind: !0,
                        inside: n,
                      },
                      punctuation: /[*_%?@+\-^~]+/,
                    },
                  },
                  "link-ref": {
                    pattern: /^\[[^\]]+\]\S+$/m,
                    inside: {
                      string: { pattern: /(\[)[^\]]+(?=\])/, lookbehind: !0 },
                      url: { pattern: /(\])\S+$/, lookbehind: !0 },
                      punctuation: /[\[\]]/,
                    },
                  },
                  link: {
                    pattern: RegExp('"(?:' + t + ')?[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
                    inside: {
                      text: { pattern: RegExp('(^"(?:' + t + ')?)[^"]+(?=")'), lookbehind: !0 },
                      modifier: { pattern: RegExp('(^")' + t), lookbehind: !0, inside: n },
                      url: { pattern: /(:).+/, lookbehind: !0 },
                      punctuation: /[":]/,
                    },
                  },
                  image: {
                    pattern: RegExp(
                      "!(?:" +
                        t +
                        "|[<>=()])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?",
                    ),
                    inside: {
                      source: {
                        pattern: RegExp(
                          "(^!(?:" + t + "|[<>=()])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)",
                        ),
                        lookbehind: !0,
                        alias: "url",
                      },
                      modifier: {
                        pattern: RegExp("(^!)(?:" + t + "|[<>=()])+"),
                        lookbehind: !0,
                        inside: n,
                      },
                      url: { pattern: /(:).+/, lookbehind: !0 },
                      punctuation: /[!:]/,
                    },
                  },
                  footnote: {
                    pattern: /\b\[\d+\]/,
                    alias: "comment",
                    inside: { punctuation: /\[|\]/ },
                  },
                  acronym: {
                    pattern: /\b[A-Z\d]+\([^)]+\)/,
                    inside: {
                      comment: { pattern: /(\()[^)]+(?=\))/, lookbehind: !0 },
                      punctuation: /[()]/,
                    },
                  },
                  mark: {
                    pattern: /\b\((?:TM|R|C)\)/,
                    alias: "comment",
                    inside: { punctuation: /[()]/ },
                  },
                },
              },
            })),
            i = a.phrase.inside,
            r = {
              inline: i.inline,
              link: i.link,
              image: i.image,
              footnote: i.footnote,
              acronym: i.acronym,
              mark: i.mark,
            };
          a.tag.pattern = /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;
          var o = i.inline.inside;
          (o.bold.inside = r),
            (o.italic.inside = r),
            (o.inserted.inside = r),
            (o.deleted.inside = r),
            (o.span.inside = r);
          var s = i.table.inside;
          (s.inline = r.inline),
            (s.link = r.link),
            (s.image = r.image),
            (s.footnote = r.footnote),
            (s.acronym = r.acronym),
            (s.mark = r.mark);
        })(a),
        (a.languages.rust = {
          comment: [
            { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
          ],
          string: [
            { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
            { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
          ],
          char: {
            pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
            alias: "string",
          },
          "lifetime-annotation": { pattern: /'[^\s>']+/, alias: "symbol" },
          keyword: /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|Self|struct|super|true|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
          attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: "attr-name" },
          function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
          "macro-rules": { pattern: /\w+!/, alias: "function" },
          number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
          "closure-params": {
            pattern: /\|[^|]*\|(?=\s*[{-])/,
            inside: { punctuation: /[|:,]/, operator: /[&*]/ },
          },
          punctuation: /[{}[\];(),:]|\.+|->/,
          operator: /[-+*\/%!^]=?|=[=>]?|@|&[&=]?|\|[|=]?|<<?=?|>>?=?/,
        }),
        (function (e) {
          (e.languages.sass = e.languages.extend("css", {
            comment: { pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m, lookbehind: !0 },
          })),
            e.languages.insertBefore("sass", "atrule", {
              "atrule-line": {
                pattern: /^(?:[ \t]*)[@+=].+/m,
                inside: { atrule: /(?:@[\w-]+|[+=])/m },
              },
            }),
            delete e.languages.sass.atrule;
          var t = /\$[-\w]+|#\{\$[-\w]+\}/,
            n = [
              /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
              { pattern: /(\s+)-(?=\s)/, lookbehind: !0 },
            ];
          e.languages.insertBefore("sass", "property", {
            "variable-line": {
              pattern: /^[ \t]*\$.+/m,
              inside: { punctuation: /:/, variable: t, operator: n },
            },
            "property-line": {
              pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
              inside: {
                property: [/[^:\s]+(?=\s*:)/, { pattern: /(:)[^:\s]+/, lookbehind: !0 }],
                punctuation: /:/,
                variable: t,
                operator: n,
                important: e.languages.sass.important,
              },
            },
          }),
            delete e.languages.sass.property,
            delete e.languages.sass.important,
            e.languages.insertBefore("sass", "punctuation", {
              selector: {
                pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
                lookbehind: !0,
              },
            });
        })(a),
        (function (e) {
          var t = {
            url: /url\((["']?).*?\1\)/i,
            string: { pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/, greedy: !0 },
            interpolation: null,
            func: null,
            important: /\B!(?:important|optional)\b/i,
            keyword: {
              pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
              lookbehind: !0,
            },
            hexcode: /#[\da-f]{3,6}/i,
            number: /\b\d+(?:\.\d+)?%?/,
            boolean: /\b(?:true|false)\b/,
            operator: [
              /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
            ],
            punctuation: /[{}()\[\];:,]/,
          };
          (t.interpolation = {
            pattern: /\{[^\r\n}:]+\}/,
            alias: "variable",
            inside: { delimiter: { pattern: /^{|}$/, alias: "punctuation" }, rest: t },
          }),
            (t.func = { pattern: /[\w-]+\([^)]*\).*/, inside: { function: /^[^(]+/, rest: t } }),
            (e.languages.stylus = {
              comment: { pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
              "atrule-declaration": {
                pattern: /(^\s*)@.+/m,
                lookbehind: !0,
                inside: { atrule: /^@[\w-]+/, rest: t },
              },
              "variable-declaration": {
                pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
                lookbehind: !0,
                inside: { variable: /^\S+/, rest: t },
              },
              statement: {
                pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
                lookbehind: !0,
                inside: { keyword: /^\S+/, rest: t },
              },
              "property-declaration": {
                pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
                lookbehind: !0,
                inside: {
                  property: { pattern: /^[^\s:]+/, inside: { interpolation: t.interpolation } },
                  rest: t,
                },
              },
              selector: {
                pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
                lookbehind: !0,
                inside: { interpolation: t.interpolation, punctuation: /[{},]/ },
              },
              func: t.func,
              string: t.string,
              interpolation: t.interpolation,
              punctuation: /[{}()\[\];:.]/,
            });
        })(a),
        (a.languages.scheme = {
          comment: /;.*/,
          string: { pattern: /"(?:[^"\\\r\n]|\\.)*"|'[^()#'\s]+/, greedy: !0 },
          character: { pattern: /#\\(?:u[a-fA-F\d]{4}|[a-zA-Z]+|\S)/, alias: "string" },
          keyword: {
            pattern: /(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)(?=[()\s])/,
            lookbehind: !0,
          },
          builtin: {
            pattern: /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)(?=[()\s])/,
            lookbehind: !0,
          },
          number: { pattern: /(\s|[()])[-+]?\d*\.?\d+(?:\s*[-+]\s*\d*\.?\d+i)?\b/, lookbehind: !0 },
          boolean: /#[tf]/,
          operator: { pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)(?=\s|$)/, lookbehind: !0 },
          function: { pattern: /(\()[^()'\s]+(?=[()\s)]|$)/, lookbehind: !0 },
          punctuation: /[()']/,
        }),
        (a.languages.twig = {
          comment: /\{#[\s\S]*?#\}/,
          tag: {
            pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
            inside: {
              ld: {
                pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
                inside: { punctuation: /^(?:\{\{|\{%)-?/, keyword: /\w+/ },
              },
              rd: { pattern: /-?(?:%\}|\}\})$/, inside: { punctuation: /.+/ } },
              string: {
                pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
                inside: { punctuation: /^['"]|['"]$/ },
              },
              keyword: /\b(?:even|if|odd)\b/,
              boolean: /\b(?:true|false|null)\b/,
              number: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/,
              operator: [
                {
                  pattern: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
                  lookbehind: !0,
                },
                /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/,
              ],
              property: /\b[a-zA-Z_]\w*\b/,
              punctuation: /[()\[\]{}:.,]/,
            },
          },
          other: { pattern: /\S(?:[\s\S]*\S)?/, inside: a.languages.markup },
        }),
        (a.languages.swift = a.languages.extend("clike", {
          string: {
            pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
            inside: {
              interpolation: {
                pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
                inside: { delimiter: { pattern: /^\\\(|\)$/, alias: "variable" } },
              },
            },
          },
          keyword: /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
          number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
          constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
          atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
          builtin: /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
        })),
        (a.languages.swift.string.inside.interpolation.inside.rest = a.languages.swift),
        (a.languages.yaml = {
          scalar: {
            pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
            lookbehind: !0,
            alias: "string",
          },
          comment: /#.*/,
          key: {
            pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
            lookbehind: !0,
            alias: "atrule",
          },
          directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" },
          datetime: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
            lookbehind: !0,
            alias: "number",
          },
          boolean: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
            lookbehind: !0,
            alias: "important",
          },
          null: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
            lookbehind: !0,
            alias: "important",
          },
          string: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
            lookbehind: !0,
            greedy: !0,
          },
          number: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
            lookbehind: !0,
          },
          tag: /![^\s]+/,
          important: /[&*][\w]+/,
          punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
        }),
        (a.languages.yml = a.languages.yaml),
        (function (e) {
          e.languages.haml = {
            "multiline-comment": {
              pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/,
              lookbehind: !0,
              alias: "comment",
            },
            "multiline-code": [
              {
                pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ]+.+)/,
                lookbehind: !0,
                inside: { rest: e.languages.ruby },
              },
              {
                pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
                lookbehind: !0,
                inside: { rest: e.languages.ruby },
              },
            ],
            filter: {
              pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
              lookbehind: !0,
              inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
            },
            markup: {
              pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
              lookbehind: !0,
              inside: { rest: e.languages.markup },
            },
            doctype: { pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/, lookbehind: !0 },
            tag: {
              pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
              lookbehind: !0,
              inside: {
                attributes: [
                  {
                    pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
                    lookbehind: !0,
                    inside: { rest: e.languages.ruby },
                  },
                  {
                    pattern: /\([^)]+\)/,
                    inside: {
                      "attr-value": {
                        pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                        lookbehind: !0,
                      },
                      "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                      punctuation: /[=(),]/,
                    },
                  },
                  { pattern: /\[[^\]]+\]/, inside: { rest: e.languages.ruby } },
                ],
                punctuation: /[<>]/,
              },
            },
            code: {
              pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
              lookbehind: !0,
              inside: { rest: e.languages.ruby },
            },
            interpolation: {
              pattern: /#\{[^}]+\}/,
              inside: {
                delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
                rest: e.languages.ruby,
              },
            },
            punctuation: { pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/, lookbehind: !0 },
          };
          for (
            var t = [
                "css",
                { filter: "coffee", language: "coffeescript" },
                "erb",
                "javascript",
                "less",
                "markdown",
                "ruby",
                "scss",
                "textile",
              ],
              n = {},
              a = 0,
              i = t.length;
            a < i;
            a++
          ) {
            var r = t[a];
            (r = "string" == typeof r ? { filter: r, language: r } : r),
              e.languages[r.language] &&
                (n["filter-" + r.filter] = {
                  pattern: RegExp(
                    "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+".replace(
                      "{{filter_name}}",
                      r.filter,
                    ),
                  ),
                  lookbehind: !0,
                  inside: {
                    "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
                    rest: e.languages[r.language],
                  },
                });
          }
          e.languages.insertBefore("haml", "filter", n);
        })(a),
        (function (e) {
          var t = "(?:[\\w-]+|'[^'\n\r]*'|\"(?:\\.|[^\\\\\"\r\n])*\")";
          a.languages.toml = {
            comment: { pattern: /#.*/, greedy: !0 },
            table: {
              pattern: RegExp("(\\[\\s*)" + t + "(?:\\s*\\.\\s*" + t + ")*(?=\\s*\\])"),
              lookbehind: !0,
              greedy: !0,
              alias: "class-name",
            },
            key: {
              pattern: RegExp("(^\\s*|[{,]\\s*)" + t + "(?:\\s*\\.\\s*" + t + ")*(?=\\s*=)", "m"),
              lookbehind: !0,
              greedy: !0,
              alias: "property",
            },
            string: {
              pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
              greedy: !0,
            },
            date: [
              {
                pattern: /\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?/i,
                alias: "number",
              },
              { pattern: /\d{2}:\d{2}:\d{2}(?:\.\d+)?/i, alias: "number" },
            ],
            number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?(?:inf|nan)\b/,
            boolean: /\b(?:true|false)\b/,
            punctuation: /[.,=[\]{}]/,
          };
        })(),
        (function (e) {
          e.languages.pug = {
            comment: { pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m, lookbehind: !0 },
            "multiline-script": {
              pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
              lookbehind: !0,
              inside: { rest: e.languages.javascript },
            },
            filter: {
              pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
              lookbehind: !0,
              inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
            },
            "multiline-plain-text": {
              pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
              lookbehind: !0,
            },
            markup: {
              pattern: /(^[\t ]*)<.+/m,
              lookbehind: !0,
              inside: { rest: e.languages.markup },
            },
            doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
            "flow-control": {
              pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
              lookbehind: !0,
              inside: {
                each: {
                  pattern: /^each .+? in\b/,
                  inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ },
                },
                branch: {
                  pattern: /^(?:if|unless|else|case|when|default|while)\b/,
                  alias: "keyword",
                },
                rest: e.languages.javascript,
              },
            },
            keyword: {
              pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
              lookbehind: !0,
            },
            mixin: [
              {
                pattern: /(^[\t ]*)mixin .+/m,
                lookbehind: !0,
                inside: { keyword: /^mixin/, function: /\w+(?=\s*\(|\s*$)/, punctuation: /[(),.]/ },
              },
              {
                pattern: /(^[\t ]*)\+.+/m,
                lookbehind: !0,
                inside: {
                  name: { pattern: /^\+\w+/, alias: "function" },
                  rest: e.languages.javascript,
                },
              },
            ],
            script: {
              pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
              lookbehind: !0,
              inside: { rest: e.languages.javascript },
            },
            "plain-text": {
              pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
              lookbehind: !0,
            },
            tag: {
              pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
              lookbehind: !0,
              inside: {
                attributes: [
                  { pattern: /&[^(]+\([^)]+\)/, inside: { rest: e.languages.javascript } },
                  {
                    pattern: /\([^)]+\)/,
                    inside: {
                      "attr-value": {
                        pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                        lookbehind: !0,
                        inside: { rest: e.languages.javascript },
                      },
                      "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
                      punctuation: /[!=(),]+/,
                    },
                  },
                ],
                punctuation: /:/,
              },
            },
            code: [
              {
                pattern: /(^[\t ]*(?:-|!?=)).+/m,
                lookbehind: !0,
                inside: { rest: e.languages.javascript },
              },
            ],
            punctuation: /[.\-!=|]+/,
          };
          for (
            var t = [
                { filter: "atpl", language: "twig" },
                { filter: "coffee", language: "coffeescript" },
                "ejs",
                "handlebars",
                "less",
                "livescript",
                "markdown",
                { filter: "sass", language: "scss" },
                "stylus",
              ],
              n = {},
              a = 0,
              i = t.length;
            a < i;
            a++
          ) {
            var r = t[a];
            (r = "string" == typeof r ? { filter: r, language: r } : r),
              e.languages[r.language] &&
                (n["filter-" + r.filter] = {
                  pattern: RegExp(
                    "(^([\t ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\\2[\t ]+.+|\\s*?(?=\r?\n|\r)))+".replace(
                      "{{filter_name}}",
                      r.filter,
                    ),
                    "m",
                  ),
                  lookbehind: !0,
                  inside: {
                    "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
                    rest: e.languages[r.language],
                  },
                });
          }
          e.languages.insertBefore("pug", "filter", n);
        })(a);
      var i = a.util.clone(a.languages.typescript);
      (a.languages.tsx = a.languages.extend("jsx", i)),
        (a.languages["visual-basic"] = {
          comment: { pattern: /(?:['‘’]|REM\b).*/i, inside: { keyword: /^REM/i } },
          directive: {
            pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
            alias: "comment",
            greedy: !0,
          },
          string: { pattern: /["“”](?:["“”]{2}|[^"“”])*["“”]C?/i, greedy: !0 },
          date: {
            pattern: /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))[^\S\r\n]*#/i,
            alias: "builtin",
          },
          number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
          boolean: /\b(?:True|False|Nothing)\b/i,
          keyword: /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Xor)\b/i,
          operator: [
            /[+\-*/\\^<=>&#@$%!]/,
            { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 },
          ],
          punctuation: /[{}().,:?]/,
        }),
        (a.languages.vb = a.languages["visual-basic"]),
        (a.languages.vim = {
          string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
          comment: /".*/,
          function: /\w+(?=\()/,
          keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
          builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
          number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
          operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
          punctuation: /[{}[\](),;:]/,
        }),
        (a.languages.wasm = {
          comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
          string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
          keyword: [
            { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
            {
              pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
              inside: { punctuation: /\./ },
            },
            /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
          ],
          variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
          number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
          punctuation: /[()]/,
        }),
        (function () {
          if ("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
            var e,
              t = function () {
                if (void 0 === e) {
                  var t = document.createElement("div");
                  (t.style.fontSize = "13px"),
                    (t.style.lineHeight = "1.5"),
                    (t.style.padding = 0),
                    (t.style.border = 0),
                    (t.innerHTML = "&nbsp;<br />&nbsp;"),
                    document.body.appendChild(t),
                    (e = 38 === t.offsetHeight),
                    document.body.removeChild(t);
                }
                return e;
              },
              n = 0;
            a.hooks.add("before-sanity-check", function (e) {
              var t = e.element.parentNode,
                n = t && t.getAttribute("data-line");
              if (t && n && /pre/i.test(t.nodeName)) {
                var a = 0;
                i(".line-highlight", t).forEach(function (e) {
                  (a += e.textContent.length), e.parentNode.removeChild(e);
                }),
                  a && /^( \n)+$/.test(e.code.slice(-a)) && (e.code = e.code.slice(0, -a));
              }
            }),
              a.hooks.add("complete", function e(t) {
                var i = t.element.parentNode,
                  l = i && i.getAttribute("data-line");
                if (i && l && /pre/i.test(i.nodeName)) {
                  clearTimeout(n);
                  var d = a.plugins.lineNumbers,
                    c = t.plugins && t.plugins.lineNumbers;
                  r(i, "line-numbers") && d && !c
                    ? a.hooks.add("line-numbers", e)
                    : (o(i, l), (n = setTimeout(s, 1)));
                }
              }),
              window.addEventListener("hashchange", s),
              window.addEventListener("resize", function () {
                var e = document.querySelectorAll("pre[data-line]");
                Array.prototype.forEach.call(e, function (e) {
                  o(e);
                });
              });
          }
          function i(e, t) {
            return Array.prototype.slice.call((t || document).querySelectorAll(e));
          }
          function r(e, t) {
            return (
              (t = " " + t + " "), -1 < (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t)
            );
          }
          function o(e, n, i) {
            for (
              var o,
                s = (n = "string" == typeof n ? n : e.getAttribute("data-line"))
                  .replace(/\s+/g, "")
                  .split(","),
                l = +e.getAttribute("data-line-offset") || 0,
                d = (t() ? parseInt : parseFloat)(getComputedStyle(e).lineHeight),
                c = r(e, "line-numbers"),
                u = 0;
              (o = s[u++]);

            ) {
              var p = o.split("-"),
                g = +p[0],
                f = +p[1] || g,
                m =
                  e.querySelector('.line-highlight[data-range="' + o + '"]') ||
                  document.createElement("div");
              if (
                (m.setAttribute("aria-hidden", "true"),
                m.setAttribute("data-range", o),
                (m.className = (i || "") + " line-highlight"),
                c && a.plugins.lineNumbers)
              ) {
                var b = a.plugins.lineNumbers.getLine(e, g),
                  h = a.plugins.lineNumbers.getLine(e, f);
                b && (m.style.top = b.offsetTop + "px"),
                  h && (m.style.height = h.offsetTop - b.offsetTop + h.offsetHeight + "px");
              } else
                m.setAttribute("data-start", g),
                  g < f && m.setAttribute("data-end", f),
                  (m.style.top = (g - l - 1) * d + "px"),
                  (m.textContent = new Array(f - g + 2).join(" \n"));
              c ? e.appendChild(m) : (e.querySelector("code") || e).appendChild(m);
            }
          }
          function s() {
            var e = location.hash.slice(1);
            i(".temporary.line-highlight").forEach(function (e) {
              e.parentNode.removeChild(e);
            });
            var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
            if (t && !document.getElementById(e)) {
              var n = e.slice(0, e.lastIndexOf(".")),
                a = document.getElementById(n);
              a &&
                (a.hasAttribute("data-line") || a.setAttribute("data-line", ""),
                o(a, t, "temporary "),
                document.querySelector(".temporary.line-highlight").scrollIntoView());
            }
          }
        })(),
        (function () {
          if ("undefined" != typeof self && self.Prism && self.document) {
            var e = "line-numbers",
              t = /\n(?!$)/g,
              n = function (e) {
                var n = i(e)["white-space"];
                if ("pre-wrap" === n || "pre-line" === n) {
                  var a = e.querySelector("code"),
                    r = e.querySelector(".line-numbers-rows"),
                    o = e.querySelector(".line-numbers-sizer"),
                    s = a.textContent.split(t);
                  o ||
                    (((o = document.createElement("span")).className = "line-numbers-sizer"),
                    a.appendChild(o)),
                    (o.style.display = "block"),
                    s.forEach(function (e, t) {
                      o.textContent = e || "\n";
                      var n = o.getBoundingClientRect().height;
                      r.children[t].style.height = n + "px";
                    }),
                    (o.textContent = ""),
                    (o.style.display = "none");
                }
              },
              i = function (e) {
                return e
                  ? window.getComputedStyle
                    ? getComputedStyle(e)
                    : e.currentStyle || null
                  : null;
              };
            window.addEventListener("resize", function () {
              Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n);
            }),
              a.hooks.add("complete", function (e) {
                if (e.code) {
                  var i = e.element,
                    r = i.parentNode;
                  if (r && /pre/i.test(r.nodeName) && !i.querySelector(".line-numbers-rows")) {
                    for (var o = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, l = i; l; l = l.parentNode)
                      if (s.test(l.className)) {
                        o = !0;
                        break;
                      }
                    if (o) {
                      (i.className = i.className.replace(s, " ")),
                        s.test(r.className) || (r.className += " line-numbers");
                      var d,
                        c = e.code.match(t),
                        u = c ? c.length + 1 : 1,
                        p = new Array(u + 1).join("<span></span>");
                      (d = document.createElement("span")).setAttribute("aria-hidden", "true"),
                        (d.className = "line-numbers-rows"),
                        (d.innerHTML = p),
                        r.hasAttribute("data-start") &&
                          (r.style.counterReset =
                            "linenumber " + (parseInt(r.getAttribute("data-start"), 10) - 1)),
                        e.element.appendChild(d),
                        n(r),
                        a.hooks.run("line-numbers", e);
                    }
                  }
                }
              }),
              a.hooks.add("line-numbers", function (e) {
                (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
              }),
              (a.plugins.lineNumbers = {
                getLine: function (t, n) {
                  if ("PRE" === t.tagName && t.classList.contains(e)) {
                    var a = t.querySelector(".line-numbers-rows"),
                      i = parseInt(t.getAttribute("data-start"), 10) || 1,
                      r = i + (a.children.length - 1);
                    n < i && (n = i), r < n && (n = r);
                    var o = n - i;
                    return a.children[o];
                  }
                },
              });
          }
        })(),
        (function () {
          if ("undefined" != typeof self && self.Prism && self.document) {
            var e = [],
              t = {},
              n = function () {};
            a.plugins.toolbar = {};
            var i = (a.plugins.toolbar.registerButton = function (n, a) {
                var i;
                (i =
                  "function" == typeof a
                    ? a
                    : function (e) {
                        var t;
                        return (
                          "function" == typeof a.onClick
                            ? (((t = document.createElement("button")).type = "button"),
                              t.addEventListener("click", function () {
                                a.onClick.call(this, e);
                              }))
                            : "string" == typeof a.url
                            ? ((t = document.createElement("a")).href = a.url)
                            : (t = document.createElement("span")),
                          (t.textContent = a.text),
                          t
                        );
                      }),
                  e.push((t[n] = i));
              }),
              r = (a.plugins.toolbar.hook = function (a) {
                var i = a.element.parentNode;
                if (
                  i &&
                  /pre/i.test(i.nodeName) &&
                  !i.parentNode.classList.contains("code-toolbar")
                ) {
                  var r = document.createElement("div");
                  r.classList.add("code-toolbar"),
                    i.parentNode.insertBefore(r, i),
                    r.appendChild(i);
                  var o = document.createElement("div");
                  o.classList.add("toolbar"),
                    document.body.hasAttribute("data-toolbar-order") &&
                      (e = document.body
                        .getAttribute("data-toolbar-order")
                        .split(",")
                        .map(function (e) {
                          return t[e] || n;
                        })),
                    e.forEach(function (e) {
                      var t = e(a);
                      if (t) {
                        var n = document.createElement("div");
                        n.classList.add("toolbar-item"), n.appendChild(t), o.appendChild(n);
                      }
                    }),
                    r.appendChild(o);
                }
              });
            i("label", function (e) {
              var t = e.element.parentNode;
              if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
                var n,
                  a,
                  i = t.getAttribute("data-label");
                try {
                  a = document.querySelector("template#" + i);
                } catch (e) {}
                return (
                  a
                    ? (n = a.content)
                    : (t.hasAttribute("data-url")
                        ? ((n = document.createElement("a")).href = t.getAttribute("data-url"))
                        : (n = document.createElement("span")),
                      (n.textContent = i)),
                  n
                );
              }
            }),
              a.hooks.add("complete", r);
          }
        })(),
        (function () {
          if (self.Prism && self.document && document.querySelectorAll && [].filter) {
            var e = [];
            i(function (e, t) {
              if (e && e.meta && e.data) {
                if (e.meta.status && 400 <= e.meta.status)
                  return "Error: " + (e.data.message || e.meta.status);
                if ("string" == typeof e.data.content)
                  return "function" == typeof atob
                    ? atob(e.data.content.replace(/\s/g, ""))
                    : "Your browser cannot decode base64";
              }
              return null;
            }, "github"),
              i(function (e, t) {
                if (e && e.meta && e.data && e.data.files) {
                  if (e.meta.status && 400 <= e.meta.status)
                    return "Error: " + (e.data.message || e.meta.status);
                  var n = e.data.files,
                    a = t.getAttribute("data-filename");
                  if (null == a)
                    for (var i in n)
                      if (n.hasOwnProperty(i)) {
                        a = i;
                        break;
                      }
                  return void 0 !== n[a]
                    ? n[a].content
                    : "Error: unknown or missing gist file " + a;
                }
                return null;
              }, "gist"),
              i(function (e, t) {
                return e && e.node && "string" == typeof e.data ? e.data : null;
              }, "bitbucket");
            var t = 0,
              n = "Loading…";
            (a.plugins.jsonphighlight = {
              registerAdapter: i,
              removeAdapter: function (t) {
                if (("string" == typeof t && (t = r(t)), "function" == typeof t)) {
                  var n = e
                    .map(function (e) {
                      return e.adapter;
                    })
                    .indexOf(t);
                  0 <= n && e.splice(n, 1);
                }
              },
              highlight: o,
            }),
              o();
          }
          function i(t, n) {
            (n = n || t.name),
              "function" != typeof t || r(t) || r(n) || e.push({ adapter: t, name: n });
          }
          function r(t) {
            if ("function" == typeof t) {
              for (var n = 0; (a = e[n++]); )
                if (a.adapter.valueOf() === t.valueOf()) return a.adapter;
            } else if ("string" == typeof t) {
              var a;
              for (n = 0; (a = e[n++]); ) if (a.name === t) return a.adapter;
            }
            return null;
          }
          function o() {
            Array.prototype.slice
              .call(document.querySelectorAll("pre[data-jsonp]"))
              .forEach(function (i) {
                i.textContent = "";
                var r = document.createElement("code");
                (r.textContent = n), i.appendChild(r);
                var o = i.getAttribute("data-adapter"),
                  s = null;
                if (o) {
                  if ("function" != typeof window[o])
                    return void (r.textContent =
                      "JSONP adapter function '" + o + "' doesn't exist");
                  s = window[o];
                }
                var l = "prismjsonp" + t++,
                  d = document.createElement("a"),
                  c = (d.href = i.getAttribute("data-jsonp"));
                d.href +=
                  (d.search ? "&" : "?") +
                  (i.getAttribute("data-callback") || "callback") +
                  "=" +
                  l;
                var u = setTimeout(function () {
                    r.textContent === n && (r.textContent = "Timeout loading '" + c + "'");
                  }, 5e3),
                  p = document.createElement("script");
                (p.src = d.href),
                  (window[l] = function (t) {
                    document.head.removeChild(p), clearTimeout(u), delete window[l];
                    var n = "";
                    if (s) n = s(t, i);
                    else for (var o in e) if (null !== (n = e[o].adapter(t, i))) break;
                    null === n
                      ? (r.textContent =
                          "Cannot parse response (perhaps you need an adapter function?)")
                      : ((r.textContent = n), a.highlightElement(r));
                  }),
                  document.head.appendChild(p);
              });
          }
        })(),
        (function () {
          if ("undefined" != typeof self && self.Prism && self.document) {
            var e = /(?:^|\s)command-line(?:\s|$)/;
            a.hooks.add("before-highlight", function (t) {
              var n = (t.vars = t.vars || {}),
                a = (n["command-line"] = n["command-line"] || {});
              if (!a.complete && t.code) {
                var i = t.element.parentNode;
                if (
                  i &&
                  /pre/i.test(i.nodeName) &&
                  (e.test(i.className) || e.test(t.element.className))
                )
                  if (t.element.querySelector(".command-line-prompt")) a.complete = !0;
                  else {
                    var r = t.code.split("\n");
                    a.numberOfLines = r.length;
                    var o = (a.outputLines = []),
                      s = i.getAttribute("data-output"),
                      l = i.getAttribute("data-filter-output");
                    if (s || "" === s) {
                      s = s.split(",");
                      for (var d = 0; d < s.length; d++) {
                        var c = s[d].split("-"),
                          u = parseInt(c[0], 10),
                          p = 2 === c.length ? parseInt(c[1], 10) : u;
                        if (!isNaN(u) && !isNaN(p)) {
                          u < 1 && (u = 1), p > r.length && (p = r.length), p--;
                          for (var g = --u; g <= p; g++) (o[g] = r[g]), (r[g] = "");
                        }
                      }
                    } else if (l)
                      for (d = 0; d < r.length; d++)
                        0 === r[d].indexOf(l) && ((o[d] = r[d].slice(l.length)), (r[d] = ""));
                    t.code = r.join("\n");
                  }
                else a.complete = !0;
              } else a.complete = !0;
            }),
              a.hooks.add("before-insert", function (e) {
                var t = (e.vars = e.vars || {}),
                  n = (t["command-line"] = t["command-line"] || {});
                if (!n.complete) {
                  for (var a = e.highlightedCode.split("\n"), i = 0; i < n.outputLines.length; i++)
                    n.outputLines.hasOwnProperty(i) && (a[i] = n.outputLines[i]);
                  e.highlightedCode = a.join("\n");
                }
              }),
              a.hooks.add("complete", function (t) {
                var n = (t.vars = t.vars || {}),
                  a = (n["command-line"] = n["command-line"] || {});
                if (!a.complete) {
                  var i = t.element.parentNode;
                  e.test(t.element.className) &&
                    (t.element.className = t.element.className.replace(e, " ")),
                    e.test(i.className) || (i.className += " command-line");
                  var r = function (e, t) {
                      return (i.getAttribute(e) || t).replace(/"/g, "&quot");
                    },
                    o = new Array(a.numberOfLines + 1),
                    s = r("data-prompt", "");
                  if ("" !== s) o = o.join('<span data-prompt="' + s + '"></span>');
                  else {
                    var l = r("data-user", "user"),
                      d = r("data-host", "localhost");
                    o = o.join('<span data-user="' + l + '" data-host="' + d + '"></span>');
                  }
                  var c = document.createElement("span");
                  (c.className = "command-line-prompt"), (c.innerHTML = o);
                  for (var u = 0; u < a.outputLines.length; u++)
                    if (a.outputLines.hasOwnProperty(u)) {
                      var p = c.children[u];
                      p.removeAttribute("data-user"),
                        p.removeAttribute("data-host"),
                        p.removeAttribute("data-prompt");
                    }
                  t.element.insertBefore(c, t.element.firstChild), (a.complete = !0);
                }
              });
          }
        })(),
        (function () {
          if ("undefined" != typeof self && self.Prism && self.document)
            if (a.plugins.toolbar) {
              var e = window.ClipboardJS || void 0;
              e || (e = n(5));
              var t = [];
              if (!e) {
                var i = document.createElement("script"),
                  r = document.querySelector("head");
                (i.onload = function () {
                  if ((e = window.ClipboardJS)) for (; t.length; ) t.pop()();
                }),
                  (i.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"),
                  r.appendChild(i);
              }
              a.plugins.toolbar.registerButton("copy-to-clipboard", function (n) {
                var a = document.createElement("a");
                return (a.textContent = "Copy"), e ? i() : t.push(i), a;
                function i() {
                  var t = new e(a, {
                    text: function () {
                      return n.code;
                    },
                  });
                  t.on("success", function () {
                    (a.textContent = "Copied!"), r();
                  }),
                    t.on("error", function () {
                      (a.textContent = "Press Ctrl+C to copy"), r();
                    });
                }
                function r() {
                  setTimeout(function () {
                    a.textContent = "Copy";
                  }, 5e3);
                }
              });
            } else console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");
        })();
    }.call(this, n(4)));
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t, n) {
    /*!
     * clipboard.js v2.0.4
     * https://zenorocha.github.io/clipboard.js
     *
     * Licensed MIT © Zeno Rocha
     */
    !(function (t, n) {
      e.exports = n();
    })(0, function () {
      return (function (e) {
        var t = {};
        function n(a) {
          if (t[a]) return t[a].exports;
          var i = (t[a] = { i: a, l: !1, exports: {} });
          return e[a].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
        }
        return (
          (n.m = e),
          (n.c = t),
          (n.d = function (e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
          }),
          (n.r = function (e) {
            "undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(e, "__esModule", { value: !0 });
          }),
          (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var a = Object.create(null);
            if (
              (n.r(a),
              Object.defineProperty(a, "default", { enumerable: !0, value: e }),
              2 & t && "string" != typeof e)
            )
              for (var i in e)
                n.d(
                  a,
                  i,
                  function (t) {
                    return e[t];
                  }.bind(null, i),
                );
            return a;
          }),
          (n.n = function (e) {
            var t =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return n.d(t, "a", t), t;
          }),
          (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (n.p = ""),
          n((n.s = 0))
        );
      })([
        function (e, t, n) {
          "use strict";
          var a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            i = (function () {
              function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var a = t[n];
                  (a.enumerable = a.enumerable || !1),
                    (a.configurable = !0),
                    "value" in a && (a.writable = !0),
                    Object.defineProperty(e, a.key, a);
                }
              }
              return function (t, n, a) {
                return n && e(t.prototype, n), a && e(t, a), t;
              };
            })(),
            r = l(n(1)),
            o = l(n(3)),
            s = l(n(4));
          function l(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var d = (function (e) {
            function t(e, n) {
              !(function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var a = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return a.resolveOptions(n), a.listenClick(e), a;
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " + typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
                })),
                  t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
              })(t, o.default),
              i(
                t,
                [
                  {
                    key: "resolveOptions",
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                      (this.action = "function" == typeof e.action ? e.action : this.defaultAction),
                        (this.target =
                          "function" == typeof e.target ? e.target : this.defaultTarget),
                        (this.text = "function" == typeof e.text ? e.text : this.defaultText),
                        (this.container =
                          "object" === a(e.container) ? e.container : document.body);
                    },
                  },
                  {
                    key: "listenClick",
                    value: function (e) {
                      var t = this;
                      this.listener = (0, s.default)(e, "click", function (e) {
                        return t.onClick(e);
                      });
                    },
                  },
                  {
                    key: "onClick",
                    value: function (e) {
                      var t = e.delegateTarget || e.currentTarget;
                      this.clipboardAction && (this.clipboardAction = null),
                        (this.clipboardAction = new r.default({
                          action: this.action(t),
                          target: this.target(t),
                          text: this.text(t),
                          container: this.container,
                          trigger: t,
                          emitter: this,
                        }));
                    },
                  },
                  {
                    key: "defaultAction",
                    value: function (e) {
                      return c("action", e);
                    },
                  },
                  {
                    key: "defaultTarget",
                    value: function (e) {
                      var t = c("target", e);
                      if (t) return document.querySelector(t);
                    },
                  },
                  {
                    key: "defaultText",
                    value: function (e) {
                      return c("text", e);
                    },
                  },
                  {
                    key: "destroy",
                    value: function () {
                      this.listener.destroy(),
                        this.clipboardAction &&
                          (this.clipboardAction.destroy(), (this.clipboardAction = null));
                    },
                  },
                ],
                [
                  {
                    key: "isSupported",
                    value: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : ["copy", "cut"],
                        t = "string" == typeof e ? [e] : e,
                        n = !!document.queryCommandSupported;
                      return (
                        t.forEach(function (e) {
                          n = n && !!document.queryCommandSupported(e);
                        }),
                        n
                      );
                    },
                  },
                ],
              ),
              t
            );
          })();
          function c(e, t) {
            var n = "data-clipboard-" + e;
            if (t.hasAttribute(n)) return t.getAttribute(n);
          }
          e.exports = d;
        },
        function (e, t, n) {
          "use strict";
          var a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            i = (function () {
              function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var a = t[n];
                  (a.enumerable = a.enumerable || !1),
                    (a.configurable = !0),
                    "value" in a && (a.writable = !0),
                    Object.defineProperty(e, a.key, a);
                }
              }
              return function (t, n, a) {
                return n && e(t.prototype, n), a && e(t, a), t;
              };
            })(),
            r = (function (e) {
              return e && e.__esModule ? e : { default: e };
            })(n(2));
          var o = (function () {
            function e(t) {
              !(function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
              })(this, e),
                this.resolveOptions(t),
                this.initSelection();
            }
            return (
              i(e, [
                {
                  key: "resolveOptions",
                  value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (this.action = e.action),
                      (this.container = e.container),
                      (this.emitter = e.emitter),
                      (this.target = e.target),
                      (this.text = e.text),
                      (this.trigger = e.trigger),
                      (this.selectedText = "");
                  },
                },
                {
                  key: "initSelection",
                  value: function () {
                    this.text ? this.selectFake() : this.target && this.selectTarget();
                  },
                },
                {
                  key: "selectFake",
                  value: function () {
                    var e = this,
                      t = "rtl" == document.documentElement.getAttribute("dir");
                    this.removeFake(),
                      (this.fakeHandlerCallback = function () {
                        return e.removeFake();
                      }),
                      (this.fakeHandler =
                        this.container.addEventListener("click", this.fakeHandlerCallback) || !0),
                      (this.fakeElem = document.createElement("textarea")),
                      (this.fakeElem.style.fontSize = "12pt"),
                      (this.fakeElem.style.border = "0"),
                      (this.fakeElem.style.padding = "0"),
                      (this.fakeElem.style.margin = "0"),
                      (this.fakeElem.style.position = "absolute"),
                      (this.fakeElem.style[t ? "right" : "left"] = "-9999px");
                    var n = window.pageYOffset || document.documentElement.scrollTop;
                    (this.fakeElem.style.top = n + "px"),
                      this.fakeElem.setAttribute("readonly", ""),
                      (this.fakeElem.value = this.text),
                      this.container.appendChild(this.fakeElem),
                      (this.selectedText = (0, r.default)(this.fakeElem)),
                      this.copyText();
                  },
                },
                {
                  key: "removeFake",
                  value: function () {
                    this.fakeHandler &&
                      (this.container.removeEventListener("click", this.fakeHandlerCallback),
                      (this.fakeHandler = null),
                      (this.fakeHandlerCallback = null)),
                      this.fakeElem &&
                        (this.container.removeChild(this.fakeElem), (this.fakeElem = null));
                  },
                },
                {
                  key: "selectTarget",
                  value: function () {
                    (this.selectedText = (0, r.default)(this.target)), this.copyText();
                  },
                },
                {
                  key: "copyText",
                  value: function () {
                    var e = void 0;
                    try {
                      e = document.execCommand(this.action);
                    } catch (t) {
                      e = !1;
                    }
                    this.handleResult(e);
                  },
                },
                {
                  key: "handleResult",
                  value: function (e) {
                    this.emitter.emit(e ? "success" : "error", {
                      action: this.action,
                      text: this.selectedText,
                      trigger: this.trigger,
                      clearSelection: this.clearSelection.bind(this),
                    });
                  },
                },
                {
                  key: "clearSelection",
                  value: function () {
                    this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.removeFake();
                  },
                },
                {
                  key: "action",
                  set: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                    if (((this._action = e), "copy" !== this._action && "cut" !== this._action))
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  },
                  get: function () {
                    return this._action;
                  },
                },
                {
                  key: "target",
                  set: function (e) {
                    if (void 0 !== e) {
                      if (
                        !e ||
                        "object" !== (void 0 === e ? "undefined" : a(e)) ||
                        1 !== e.nodeType
                      )
                        throw new Error('Invalid "target" value, use a valid Element');
                      if ("copy" === this.action && e.hasAttribute("disabled"))
                        throw new Error(
                          'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute',
                        );
                      if (
                        "cut" === this.action &&
                        (e.hasAttribute("readonly") || e.hasAttribute("disabled"))
                      )
                        throw new Error(
                          'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes',
                        );
                      this._target = e;
                    }
                  },
                  get: function () {
                    return this._target;
                  },
                },
              ]),
              e
            );
          })();
          e.exports = o;
        },
        function (e, t) {
          e.exports = function (e) {
            var t;
            if ("SELECT" === e.nodeName) e.focus(), (t = e.value);
            else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
              var n = e.hasAttribute("readonly");
              n || e.setAttribute("readonly", ""),
                e.select(),
                e.setSelectionRange(0, e.value.length),
                n || e.removeAttribute("readonly"),
                (t = e.value);
            } else {
              e.hasAttribute("contenteditable") && e.focus();
              var a = window.getSelection(),
                i = document.createRange();
              i.selectNodeContents(e), a.removeAllRanges(), a.addRange(i), (t = a.toString());
            }
            return t;
          };
        },
        function (e, t) {
          function n() {}
          (n.prototype = {
            on: function (e, t, n) {
              var a = this.e || (this.e = {});
              return (a[e] || (a[e] = [])).push({ fn: t, ctx: n }), this;
            },
            once: function (e, t, n) {
              var a = this;
              function i() {
                a.off(e, i), t.apply(n, arguments);
              }
              return (i._ = t), this.on(e, i, n);
            },
            emit: function (e) {
              for (
                var t = [].slice.call(arguments, 1),
                  n = ((this.e || (this.e = {}))[e] || []).slice(),
                  a = 0,
                  i = n.length;
                a < i;
                a++
              )
                n[a].fn.apply(n[a].ctx, t);
              return this;
            },
            off: function (e, t) {
              var n = this.e || (this.e = {}),
                a = n[e],
                i = [];
              if (a && t)
                for (var r = 0, o = a.length; r < o; r++)
                  a[r].fn !== t && a[r].fn._ !== t && i.push(a[r]);
              return i.length ? (n[e] = i) : delete n[e], this;
            },
          }),
            (e.exports = n);
        },
        function (e, t, n) {
          var a = n(5),
            i = n(6);
          e.exports = function (e, t, n) {
            if (!e && !t && !n) throw new Error("Missing required arguments");
            if (!a.string(t)) throw new TypeError("Second argument must be a String");
            if (!a.fn(n)) throw new TypeError("Third argument must be a Function");
            if (a.node(e))
              return (function (e, t, n) {
                return (
                  e.addEventListener(t, n),
                  {
                    destroy: function () {
                      e.removeEventListener(t, n);
                    },
                  }
                );
              })(e, t, n);
            if (a.nodeList(e))
              return (function (e, t, n) {
                return (
                  Array.prototype.forEach.call(e, function (e) {
                    e.addEventListener(t, n);
                  }),
                  {
                    destroy: function () {
                      Array.prototype.forEach.call(e, function (e) {
                        e.removeEventListener(t, n);
                      });
                    },
                  }
                );
              })(e, t, n);
            if (a.string(e))
              return (function (e, t, n) {
                return i(document.body, e, t, n);
              })(e, t, n);
            throw new TypeError(
              "First argument must be a String, HTMLElement, HTMLCollection, or NodeList",
            );
          };
        },
        function (e, t) {
          (t.node = function (e) {
            return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType;
          }),
            (t.nodeList = function (e) {
              var n = Object.prototype.toString.call(e);
              return (
                void 0 !== e &&
                ("[object NodeList]" === n || "[object HTMLCollection]" === n) &&
                "length" in e &&
                (0 === e.length || t.node(e[0]))
              );
            }),
            (t.string = function (e) {
              return "string" == typeof e || e instanceof String;
            }),
            (t.fn = function (e) {
              return "[object Function]" === Object.prototype.toString.call(e);
            });
        },
        function (e, t, n) {
          var a = n(7);
          function i(e, t, n, i, r) {
            var o = function (e, t, n, i) {
              return function (n) {
                (n.delegateTarget = a(n.target, t)), n.delegateTarget && i.call(e, n);
              };
            }.apply(this, arguments);
            return (
              e.addEventListener(n, o, r),
              {
                destroy: function () {
                  e.removeEventListener(n, o, r);
                },
              }
            );
          }
          e.exports = function (e, t, n, a, r) {
            return "function" == typeof e.addEventListener
              ? i.apply(null, arguments)
              : "function" == typeof n
              ? i.bind(null, document).apply(null, arguments)
              : ("string" == typeof e && (e = document.querySelectorAll(e)),
                Array.prototype.map.call(e, function (e) {
                  return i(e, t, n, a, r);
                }));
          };
        },
        function (e, t) {
          var n = 9;
          if ("undefined" != typeof Element && !Element.prototype.matches) {
            var a = Element.prototype;
            a.matches =
              a.matchesSelector ||
              a.mozMatchesSelector ||
              a.msMatchesSelector ||
              a.oMatchesSelector ||
              a.webkitMatchesSelector;
          }
          e.exports = function (e, t) {
            for (; e && e.nodeType !== n; ) {
              if ("function" == typeof e.matches && e.matches(t)) return e;
              e = e.parentNode;
            }
          };
        },
      ]);
    });
  },
]);
