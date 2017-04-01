;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-suodinglie" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M960.512 128l-320 0c-35.392 0-64 28.608-64 64l0 640c0 35.328 28.608 64 64 64l320 0c35.392 0 64-28.672 64-64L1024.512 192C1024.512 156.608 995.904 128 960.512 128zM768.512 832l-128 0 0-192 128 0L768.512 832zM768.512 576l-128 0L640.512 448l128 0L768.512 576zM768.512 384l-128 0L640.512 192l128 0L768.512 384zM960.512 832l-128 0 0-192 128 0L960.512 832zM960.512 576l-128 0L832.512 448l128 0L960.512 576zM960.512 384l-128 0L832.512 192l128 0L960.512 384zM448.512 128c-35.392 0-64 28.608-64 64l0 640c0 35.328 28.608 64 64 64s64-28.672 64-64L512.512 192C512.512 156.608 483.904 128 448.512 128zM256.512 256 256.512 224c0-52.992-43.008-96-96-96s-96 43.008-96 96L64.512 256c-35.392 0-64 28.608-64 64l0 192c0 35.328 28.608 64 64 64l192 0c35.392 0 64-28.672 64-64L320.512 320C320.512 284.608 291.904 256 256.512 256zM192.512 448l-64 0L128.512 384l64 0L192.512 448zM192.512 256l-64 0L128.512 224c0-17.664 14.336-32 32-32s32 14.336 32 32L192.512 256z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-paixu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M278.4 313.6l134.4 35.2L211.2 38.4l-201.6 310.4 134.4-35.2 0 396.8-134.4-35.2 204.8 310.4 201.6-310.4-134.4 35.2L281.6 313.6zM540.8 217.6l0 118.4 473.6 0L1014.4 217.6 540.8 217.6zM540.8 572.8l473.6 0 0-118.4L540.8 454.4 540.8 572.8zM540.8 809.6l473.6 0 0-118.4L540.8 691.2 540.8 809.6z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)