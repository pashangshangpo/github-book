;(window.webpackJsonp = window.webpackJsonp || []).push([
  [6],
  {
    '6NUn': function(e, t, n) {
      'use strict'
      var a = n('RiWD')
      n.n(a).a
    },
    RiWD: function(e, t, n) {},
    ySvi: function(e, t, n) {
      'use strict'
      n.r(t)
      var a = function() {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n('div', { staticClass: 'box' }, [
          n(
            'div',
            { staticClass: 'form' },
            [
              n('el-input', {
                attrs: { placeholder: '请输入姓名', clearable: '' },
                model: {
                  value: e.username,
                  callback: function(t) {
                    e.username = t
                  },
                  expression: 'username',
                },
              }),
              e._v(' '),
              n('el-input', {
                attrs: { placeholder: '请填写项目路径', clearable: '' },
                model: {
                  value: e.projectPath,
                  callback: function(t) {
                    e.projectPath = t
                  },
                  expression: 'projectPath',
                },
              }),
              e._v(' '),
              n('el-input', {
                attrs: {
                  placeholder: '请填写github生成的token',
                  clearable: '',
                },
                model: {
                  value: e.token,
                  callback: function(t) {
                    e.token = t
                  },
                  expression: 'token',
                },
              }),
              e._v(' '),
              n(
                'el-button',
                {
                  staticClass: 'btn',
                  attrs: { type: 'primary' },
                  on: { click: e.handleLogin },
                },
                [e._v('登录')]
              ),
            ],
            1
          ),
        ])
      }
      a._withStripped = !0
      var r = n('dVI3'),
        o = {
          data: function() {
            return { username: '', token: '', projectPath: '' }
          },
          created: function() {
            var e = Object(r.a)('github')
            e &&
              ((this.username = e.username),
              (this.token = e.token),
              (this.projectPath = e.projectPath))
          },
          methods: {
            handleLogin: function() {
              var e = this.token.trim(),
                t = this.projectPath.trim(),
                n = this.username.trim()
              e && t
                ? (Object(r.b)('github', {
                    username: n,
                    token: e,
                    projectPath: t,
                  }),
                  this.$router.push({ name: 'home' }))
                : this.$message('输入的 github token为空！')
            },
          },
        },
        i = (n('6NUn'), n('KHd+')),
        s = Object(i.a)(o, a, [], !1, null, 'c2401d02', null)
      s.options.__file = 'src/router/login/index.vue'
      t.default = s.exports
    },
  },
])
