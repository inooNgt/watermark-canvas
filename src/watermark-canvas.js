(function(root) {
  function watermark() {
    let wm = {
      init,
      instances: []
    };
    let defaultSettings = {
      container: document.body,
      width: "240px",
      height: "120px",
      textAlign: "left",
      textBaseline: "middle",
      font: "14px PingFang SC Regular,Microsoft Yahei",
      color: "rgba(0, 0, 0, 0.25)",
      text: "username",
      rotate: "30",
      zIndex: "",
      x: 10,
      y: 100,
      observe: true
    };

    /**
     * 初始化
     * @param {Object} options
     */
    function init(options) {
      options = Object.assign(defaultSettings, options || {});

      wm.options = options;

      let canvas = document.createElement("canvas");

      canvas.setAttribute("width", options.width);
      canvas.setAttribute("height", options.height);
      let ctx = canvas.getContext("2d");

      ctx.textAlign = options.textAlign;
      ctx.textBaseline = options.textBaseline;
      ctx.font = options.font;
      ctx.fillStyle = options.color;
      ctx.rotate(-(Math.PI / 180) * options.rotate);
      ctx.fillText(options.text, options.x, options.y);

      let dataurl = canvas.toDataURL();
      let watermarkElem = document.createElement("div");
      watermarkElem.setAttribute(
        "style",
        `position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:${
        isEmpty(options.zIndex) ? Math.max(getMaxZIndex(), 99) : options.zIndex
      };
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${dataurl}')`
      );
      clear();
      options.container.appendChild(watermarkElem);
      wm.instances.push(watermarkElem);

      if (options.observe) {
        observe(options);
      }
    }

    /**
     * 清除
     */
    function clear() {
      wm.instances.forEach(elem => {
        elem.parentElement && elem.parentElement.removeChild(elem);
      });
    }

    /**
     * MutationObserver 监控
     * @param {Object} options
     */
    function observe(options) {
      const MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;
      if (MutationObserver) {
        let mutationIns = new MutationObserver(function() {
          console.log("MutationObserver Change");
          mutationIns.disconnect();
          mutationIns = null;
          wm.init(options);
        });

        mutationIns.observe(options.container, {
          attributes: true,
          subtree: true,
          childList: true
        });
      }
    }

    return wm;
  }

  /**
   * 获取最大z-index
   */
  function getMaxZIndex() {
    let arr = [...document.all].map(
      e => +window.getComputedStyle(e).zIndex || 0
    );
    return arr.length ? Math.max(...arr) : 0;
  }

  /**
   * 判断值是否为空
   * @param {Any} val
   */
  function isEmpty(val) {
    return val === null || val === undefined || val === "";
  }

  if (typeof module != "undefined" && module.exports) {
    module.exports = watermark();
  } else if (typeof define == "function" && define.amd) {
    define(function() {
      return watermark();
    });
  } else {
    root.watermark = watermark();
  }
})(this);
