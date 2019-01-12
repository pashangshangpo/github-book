import Marked from 'marked'
import Prism from 'prismjs'

const Renderer = new Marked.Renderer()

Renderer.link = (href, title, text) => {
  return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`
}

Renderer.image = (href, title, text) => {
  return `<img src="${href}" title="${title || ''}" alt="${text ||
    ''}" ondblclick="window.open('${href}');">`
}

Renderer.code = (code, language) => {
  let languageParse = Prism.languages[language]

  if (languageParse == undefined) {
    language = 'javascript'
    languageParse = Prism.languages.javascript
  }

  const value = Prism.highlight(code, languageParse, language)

  return `<code><pre class="language-${language}">${value}</pre></code>`
}

Marked.setOptions({
  renderer: Renderer,
  breaks: true,
})

export default Marked
