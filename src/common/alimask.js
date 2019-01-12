let canvas = null
let ctx = null

function mergeOptions(options) {
  return Object.assign(
    {
      width: 250,
      height: 80,
      color: '#ebebeb',
      alpha: 0.8,
      font: '10px Arial',
    },
    options
  )
}

/**
 *  alimask( text, options ) -> string
 *  - text (String): this text on water mask.
 *  - options(Object): water mask options. 
 *    With keys: 
    { 
      width: 250,
      height: 80,
      color: '#ebebeb',
      alpha: 0.8,
      font: '10px Arial'
    }
 *
 *  return base64 of background water mask image.
**/
export default (text, options) => {
  if (!canvas || !ctx) {
    // if not exist, then initial
    if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas')
    }

    ctx = canvas && canvas.getContext && canvas.getContext('2d')
    if (!canvas || !ctx) return '' // if not exist also, then return blank.
  }
  options = mergeOptions(options)
  var width = options.width,
    height = options.height

  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, width, height) // clear the canvas
  ctx.globalAlpha = 0 // backgroud is alpha

  // ctx.fillStyle = 'white'; // no need because of alipha = 0;
  ctx.fillRect(0, 0, width, height)

  ctx.globalAlpha = options.alpha // text alpha
  ctx.fillStyle = options.color
  ctx.font = options.font

  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'

  ctx.translate(width * 0.1, height * 0.9) // margin: 10
  ctx.rotate(-Math.PI / 12) // 15 degree
  ctx.fillText(text, 0, 0)

  return canvas.toDataURL()
}
