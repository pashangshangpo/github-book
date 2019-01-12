;(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    0: function(t, e) {},
    1: function(t, e) {},
    2: function(t, e) {},
    3: function(t, e) {},
    4: function(t, e) {},
    '8+Lt': function(t, e, n) {
      'use strict'
      var a = n('eoFA')
      n.n(a).a
    },
    BU3A: function(t, e, n) {
      'use strict'
      var a = n('DlQD'),
        i = n.n(a),
        s = n('wZee'),
        r = n.n(s),
        c = new i.a.Renderer()
      ;(c.link = function(t, e, n) {
        return '<a href="'
          .concat(t, '" title="')
          .concat(e || '', '" target="_blank">')
          .concat(n, '</a>')
      }),
        (c.image = function(t, e, n) {
          return '<img src="'
            .concat(t, '" title="')
            .concat(e || '', '" alt="')
            .concat(n || '', '" ondblclick="window.open(\'')
            .concat(t, '\');">')
        }),
        (c.code = function(t, e) {
          var n = r.a.languages[e]
          null == n && ((e = 'javascript'), (n = r.a.languages.javascript))
          var a = r.a.highlight(t, n, e)
          return '<code><pre class="language-'
            .concat(e, '">')
            .concat(a, '</pre></code>')
        }),
        i.a.setOptions({ renderer: c, breaks: !0 }),
        (e.a = i.a)
    },
    Lr2C: function(t, e, n) {},
    P1IR: function(t, e, n) {
      'use strict'
      var a = n('Lr2C')
      n.n(a).a
    },
    eoFA: function(t, e, n) {},
    j8fq: function(t, e, n) {
      'use strict'
      n.d(e, 'b', function() {
        return o
      }),
        n.d(e, 'a', function() {
          return u
        }),
        n.d(e, 'c', function() {
          return l
        })
      var a = n('3T81'),
        i = n.n(a),
        s = n('dVI3'),
        r = Object(s.a)('github'),
        c = r.token,
        o = r.projectPath,
        u = i.a.client(c),
        l = u.repo(o)
    },
    rLL6: function(t, e, n) {
      'use strict'
      n.r(e)
      var a = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e
        return n('div', { staticClass: 'box' }, [
          n('div', { staticClass: 'preview' }, [
            n('h1', { staticClass: 'title' }, [t._v(t._s(t.title))]),
            t._v(' '),
            n('div', {
              staticClass: 'markdown',
              domProps: { innerHTML: t._s(t.htmlContent) },
            }),
          ]),
          t._v(' '),
          n('div', { staticClass: 'write' }, [
            n('input', {
              directives: [
                {
                  name: 'model',
                  rawName: 'v-model',
                  value: t.title,
                  expression: 'title',
                },
              ],
              staticClass: 'input',
              attrs: {
                type: 'text',
                autofocus: 'true',
                placeholder: '请输入文章标题',
              },
              domProps: { value: t.title },
              on: {
                input: function(e) {
                  e.target.composing || (t.title = e.target.value)
                },
              },
            }),
            t._v(' '),
            n(
              'div',
              { staticClass: 'tags' },
              [
                t._l(t.tags, function(e) {
                  return n(
                    'el-tag',
                    {
                      key: e.name,
                      attrs: {
                        'data-active': e.__active,
                        'disable-transitions': !1,
                      },
                    },
                    [
                      n(
                        'span',
                        {
                          staticClass: 'tag',
                          on: {
                            click: function(n) {
                              t.handleTagClick(e)
                            },
                          },
                        },
                        [t._v(t._s(e.name))]
                      ),
                    ]
                  )
                }),
                t._v(' '),
                n('el-input', {
                  directives: [
                    {
                      name: 'show',
                      rawName: 'v-show',
                      value: t.inputTagVisible,
                      expression: 'inputTagVisible',
                    },
                  ],
                  ref: 'tagInput',
                  staticClass: 'input-new-tag',
                  attrs: { size: 'small' },
                  on: { blur: t.handleInputTagConfirm },
                  nativeOn: {
                    keyup: function(e) {
                      return 'button' in e ||
                        !t._k(e.keyCode, 'enter', 13, e.key, 'Enter')
                        ? t.handleInputTagConfirm(e)
                        : null
                    },
                  },
                  model: {
                    value: t.newTagValue,
                    callback: function(e) {
                      t.newTagValue = e
                    },
                    expression: 'newTagValue',
                  },
                }),
                t._v(' '),
                n(
                  'el-button',
                  {
                    directives: [
                      {
                        name: 'show',
                        rawName: 'v-show',
                        value: !t.inputTagVisible,
                        expression: '!inputTagVisible',
                      },
                    ],
                    staticClass: 'button-new-tag',
                    attrs: { size: 'small' },
                    on: { click: t.handleShowTagInput },
                  },
                  [t._v('+ 添加标签')]
                ),
              ],
              2
            ),
            t._v(' '),
            n('div', { staticClass: 'edit' }, [
              n('textarea', {
                directives: [
                  {
                    name: 'model',
                    rawName: 'v-model',
                    value: t.content,
                    expression: 'content',
                  },
                ],
                ref: 'editor',
                staticClass: 'text',
                attrs: {
                  placeholder: '请输入文章内容',
                  cols: '30',
                  rows: '10',
                },
                domProps: { value: t.content },
                on: {
                  input: function(e) {
                    e.target.composing || (t.content = e.target.value)
                  },
                },
              }),
            ]),
            t._v(' '),
            n('div', { staticClass: 'tool' }, [
              n('div', { staticClass: 'back', on: { click: t.handleBack } }, [
                t._v('返回'),
              ]),
              t._v(' '),
              n(
                'div',
                { staticClass: 'release', on: { click: t.handleRelease } },
                [t._v('发布')]
              ),
            ]),
          ]),
        ])
      }
      a._withStripped = !0
      var i = n('MVZn'),
        s = n.n(i),
        r = n('o0o1'),
        c = n.n(r),
        o = n('yXPU'),
        u = n.n(o),
        l = n('XJYT'),
        h = n('LvDl'),
        d = n.n(h),
        f = n('VrN/'),
        g = n.n(f),
        p = (n('RKCW'), n('+dQi'), n('mki7'), n('p77/'), n('BU3A')),
        m = n('j8fq'),
        v = n('dVI3'),
        b = {
          data: function() {
            return {
              action: 'create',
              number: this.$route.query.number,
              title: '',
              content: '',
              tags: [],
              newTagValue: '',
              inputTagVisible: !1,
              username: Object(v.a)('github').username,
            }
          },
          computed: {
            htmlContent: function() {
              return Object(p.a)(this.content)
            },
          },
          mounted: function() {
            this.init()
          },
          methods: {
            handleTagClick: function(t) {
              t.__active = !t.__active
            },
            handleTagClose: function(t) {
              this.tags.splice(this.tags.indexOf(t), 1)
            },
            handleInputTagConfirm: function() {
              var t = this.newTagValue
              t &&
                (this.tags = d.a.uniq(
                  this.tags.concat({ name: t, __active: !0 })
                )),
                (this.inputTagVisible = !1),
                (this.newTagValue = '')
            },
            handleShowTagInput: function() {
              var t = this
              ;(this.inputTagVisible = !0),
                this.$nextTick(function() {
                  t.$refs.tagInput.focus()
                })
            },
            init: function() {
              var t = this
              this.number
                ? ((this.action = 'update'),
                  this.initData().then(function() {
                    setTimeout(function() {
                      t.initEditor()
                    })
                  }))
                : this.getTags().then(function(e) {
                    t.processTags(e), t.initEditor()
                  })
            },
            initData: (function() {
              var t = u()(
                c.a.mark(function t() {
                  var e,
                    n = this
                  return c.a.wrap(
                    function(t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.next = 2),
                              Promise.all([
                                this.getTags(),
                                m.a
                                  .issue(m.b, this.number)
                                  .infoAsync()
                                  .then(function(t) {
                                    ;(t = t[0]),
                                      (n.title = t.title),
                                      (n.content = t.body),
                                      (n.tags = t.labels)
                                  }),
                              ])
                            )
                          case 2:
                            ;(e = t.sent), this.processTags(e[0])
                          case 4:
                          case 'end':
                            return t.stop()
                        }
                    },
                    t,
                    this
                  )
                })
              )
              return function() {
                return t.apply(this, arguments)
              }
            })(),
            initEditor: function() {
              var t = this
              g.a
                .fromTextArea(this.$refs.editor, {
                  mode: 'gfm',
                  indentUnit: 2,
                  tabSize: 2,
                  lineWrapping: !0,
                  keyMap: 'sublime',
                })
                .on('change', function(e) {
                  t.content = e.getValue()
                })
            },
            handleBack: function() {
              this.$router.push({ name: 'home' })
            },
            handleRelease: function() {
              if (!this.title.trim() || !this.content.trim())
                return (
                  Object(l.Message)({
                    message: '不允许提交空文章',
                    type: 'info',
                    duration: 1e3,
                  }),
                  null
                )
              var t = this.tags.filter(function(t) {
                  return t.__active
                }),
                e = {
                  title: this.title,
                  body: this.content,
                  labels: [this.username].concat(
                    t.map(function(t) {
                      return t.name
                    })
                  ),
                }
              'update' === this.action
                ? this.updateArticles(e)
                : this.createArticles(e)
            },
            getTags: function() {
              return m.c
                .labelsAsync()
                .then(function(t) {
                  return t[0]
                })
                .then(function(t) {
                  return t.filter(function(t) {
                    return !1 === t.default
                  })
                })
            },
            processTags: function(t) {
              var e = this
              this.tags = t.map(function(t) {
                return s()({}, t, {
                  __active: !(
                    !e.tags.find(function(e) {
                      return e.name === t.name
                    }) && t.name !== e.username
                  ),
                })
              })
            },
            updateArticles: function(t) {
              var e = this
              m.a
                .issue(m.b, this.number)
                .updateAsync(t)
                .then(function(t) {
                  ;(t = t[0]).message
                    ? l.Message.error(t.message, 1e3)
                    : (l.Message.success('更新文章成功！', 1e3),
                      e.$router.replace({
                        name: 'article-details',
                        query: { number: t.number },
                      }))
                })
            },
            createArticles: function(t) {
              var e = this
              m.c.createIssueAsync(t).then(function(t) {
                ;(t = t[0]).message
                  ? l.Message.error(t.message, 1e3)
                  : (l.Message.success('发布文章成功！', 1e3),
                    e.$router.replace({
                      name: 'article-details',
                      query: { number: t.number },
                    }))
              })
            },
          },
        },
        w = (n('8+Lt'), n('P1IR'), n('KHd+')),
        _ = Object(w.a)(b, a, [], !1, null, '0114cdeb', null)
      _.options.__file = 'src/router/write-articles/index.vue'
      e.default = _.exports
    },
  },
])
