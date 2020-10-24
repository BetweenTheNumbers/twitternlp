/*!
 * chartjs-plugin-annotation.js
 * http://chartjs.org/
 * Version: 0.5.7
 *
 * Copyright 2016 Evert Timberg
 * Released under the MIT license
 * https://github.com/chartjs/Chart.Annotation.js/blob/master/LICENSE.md
 */
!function e(t,n,i){function o(r,l){if(!n[r]){if(!t[r]){var s="function"==typeof require&&require;if(!l&&s)return s(r,!0);if(a)return a(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[r]={exports:{}};t[r][0].call(u.exports,function(e){var n=t[r][1][e];return o(n?n:e)},u,u.exports,e,t,n,i)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(e,t,n){},{}],2:[function(e,t,n){t.exports=function(t){function n(e){a.decorate(e,"afterDataLimits",function(e,t){e&&e(t),a.adjustScaleRange(t)})}function i(e){return function(t,n){var i=t.annotation.options.drawTime;a.elements(t).filter(function(t){return e===(t.options.drawTime||i)}).forEach(function(e){e.transition(n).draw()})}}var o=t.helpers,a=e("./helpers.js")(t),r=e("./events.js")(t),l=t.Annotation.types;return{beforeInit:function(e){var t=e.options,i=e.annotation={elements:{},options:a.initConfig(t.annotation||{}),onDestroy:[],firstRun:!0,supported:!1};e.ensureScalesHaveIDs(),t.scales&&(i.supported=!0,o.each(t.scales.xAxes,n),o.each(t.scales.yAxes,n))},beforeUpdate:function(e){var t=e.annotation;if(t.supported){t.firstRun?t.firstRun=!1:t.options=a.initConfig(e.options.annotation||{});var n=[];t.options.annotations.forEach(function(i){var o=i.id||a.objectId();if(!t.elements[o]&&l[i.type]){var r=l[i.type],s=new r({id:o,options:i,chartInstance:e});s.initialize(),t.elements[o]=s,i.id=o,n.push(o)}else t.elements[o]&&n.push(o)}),Object.keys(t.elements).forEach(function(e){n.indexOf(e)===-1&&(t.elements[e].destroy(),delete t.elements[e])})}},afterScaleUpdate:function(e){a.elements(e).forEach(function(e){e.configure()})},beforeDatasetsDraw:i("beforeDatasetsDraw"),afterDatasetsDraw:i("afterDatasetsDraw"),afterDraw:i("afterDraw"),afterInit:function(e){var t=e.annotation.options.events;if(o.isArray(t)&&t.length>0){var n=e.chart.canvas,i=r.dispatcher.bind(e);r.collapseHoverEvents(t).forEach(function(t){o.addEvent(n,t,i),e.annotation.onDestroy.push(function(){o.removeEvent(n,t,i)})})}},destroy:function(e){for(var t=e.annotation.onDestroy;t.length>0;)t.pop()()}}}},{"./events.js":4,"./helpers.js":5}],3:[function(e,t,n){t.exports=function(e){var t=e.helpers,n=e.Element.extend({initialize:function(){this.hidden=!1,this.hovering=!1,this._model=t.clone(this._model)||{},this.setDataLimits()},destroy:function(){},setDataLimits:function(){},configure:function(){},inRange:function(){},getCenterPoint:function(){},getWidth:function(){},getHeight:function(){},getArea:function(){},draw:function(){}});return n}},{}],4:[function(e,t,n){t.exports=function(t){function n(e){var t=!1,n=e.filter(function(e){switch(e){case"mouseenter":case"mouseover":case"mouseout":case"mouseleave":return t=!0,!1;default:return!0}});return t&&n.indexOf("mousemove")===-1&&n.push("mousemove"),n}function i(e){var t=this.annotation,i=a.elements(this),r=o.getRelativePosition(e,this.chart),l=a.getNearestItems(i,r),s=n(t.options.events),c=t.options.dblClickSpeed,u=[],f=a.getEventHandlerName(e.type),d=(l||{}).options;if("mousemove"===e.type&&(l&&!l.hovering?["mouseenter","mouseover"].forEach(function(t){var n=a.getEventHandlerName(t),i=a.createMouseEvent(t,e);l.hovering=!0,"function"==typeof d[n]&&u.push([d[n],i,l])}):l||i.forEach(function(t){if(t.hovering){t.hovering=!1;var n=t.options;["mouseout","mouseleave"].forEach(function(i){var o=a.getEventHandlerName(i),r=a.createMouseEvent(i,e);"function"==typeof n[o]&&u.push([n[o],r,t])})}})),l&&s.indexOf("dblclick")>-1&&"function"==typeof d.onDblclick){if("click"===e.type&&"function"==typeof d.onClick)return clearTimeout(l.clickTimeout),l.clickTimeout=setTimeout(function(){delete l.clickTimeout,d.onClick.call(l,e)},c),e.stopImmediatePropagation(),void e.preventDefault();"dblclick"===e.type&&l.clickTimeout&&(clearTimeout(l.clickTimeout),delete l.clickTimeout)}l&&"function"==typeof d[f]&&0===u.length&&u.push([d[f],e,l]),u.length>0&&(e.stopImmediatePropagation(),e.preventDefault(),u.forEach(function(e){e[0].call(e[2],e[1])}))}var o=t.helpers,a=e("./helpers.js")(t);return{dispatcher:i,collapseHoverEvents:n}}},{"./helpers.js":5}],5:[function(e,t,n){function i(){}function o(e){var t=e.annotation.elements;return Object.keys(t).map(function(e){return t[e]})}function a(){return Math.random().toString(36).substr(2,6)}function r(e){return null!==e&&"undefined"!=typeof e&&("number"==typeof e?isFinite(e):!!e)}function l(e,t,n){var i="$";e[i+t]||(e[t]?(e[i+t]=e[t].bind(e),e[t]=function(){var o=[e[i+t]].concat(Array.prototype.slice.call(arguments));return n.apply(e,o)}):e[t]=function(){var t=[void 0].concat(Array.prototype.slice.call(arguments));return n.apply(e,t)})}function s(e,t){e.forEach(function(e){(t?e[t]:e)()})}function c(e){return"on"+e[0].toUpperCase()+e.substring(1)}function u(e,t){try{return new MouseEvent(e,t)}catch(n){try{var i=document.createEvent("MouseEvent");return i.initMouseEvent(e,t.canBubble,t.cancelable,t.view,t.detail,t.screenX,t.screenY,t.clientX,t.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,t.button,t.relatedTarget),i}catch(o){var a=document.createEvent("Event");return a.initEvent(e,t.canBubble,t.cancelable),a}}}t.exports=function(e){function t(t){return t=h.configMerge(e.Annotation.defaults,t),h.isArray(t.annotations)&&t.annotations.forEach(function(t){t.label=h.configMerge(e.Annotation.labelDefaults,t.label)}),t}function n(e,t,n,i){var o=t.filter(function(t){return!!t._model.ranges[e]}).map(function(t){return t._model.ranges[e]}),a=o.map(function(e){return Number(e.min)}).reduce(function(e,t){return isFinite(t)&&!isNaN(t)&&t<e?t:e},n),r=o.map(function(e){return Number(e.max)}).reduce(function(e,t){return isFinite(t)&&!isNaN(t)&&t>e?t:e},i);return{min:a,max:r}}function f(e){var t=n(e.id,o(e.chart),e.min,e.max);"undefined"==typeof e.options.ticks.min&&"undefined"==typeof e.options.ticks.suggestedMin&&(e.min=t.min),"undefined"==typeof e.options.ticks.max&&"undefined"==typeof e.options.ticks.suggestedMax&&(e.max=t.max),e.handleTickRangeOptions&&e.handleTickRangeOptions()}function d(e,t){var n=Number.POSITIVE_INFINITY;return e.filter(function(e){return e.inRange(t.x,t.y)}).reduce(function(e,i){var o=i.getCenterPoint(),a=h.distanceBetweenPoints(t,o);return a<n?(e=[i],n=a):a===n&&e.push(i),e},[]).sort(function(e,t){var n=e.getArea(),i=t.getArea();return n>i||n<i?n-i:e._index-t._index}).slice(0,1)[0]}var h=e.helpers;return{initConfig:t,elements:o,callEach:s,noop:i,objectId:a,isValid:r,decorate:l,adjustScaleRange:f,getNearestItems:d,getEventHandlerName:c,createMouseEvent:u}}},{}],6:[function(e,t,n){var i=e("chart.js");i="function"==typeof i?i:window.Chart,i.Annotation=i.Annotation||{},i.Annotation.drawTimeOptions={afterDraw:"afterDraw",afterDatasetsDraw:"afterDatasetsDraw",beforeDatasetsDraw:"beforeDatasetsDraw"},i.Annotation.defaults={drawTime:"afterDatasetsDraw",dblClickSpeed:350,events:[],annotations:[]},i.Annotation.labelDefaults={backgroundColor:"rgba(0,0,0,0.8)",fontFamily:i.defaults.global.defaultFontFamily,fontSize:i.defaults.global.defaultFontSize,fontStyle:"bold",fontColor:"#fff",xPadding:6,yPadding:6,cornerRadius:6,position:"center",xAdjust:0,yAdjust:0,enabled:!1,content:null},i.Annotation.Element=e("./element.js")(i),i.Annotation.types={line:e("./types/line.js")(i),box:e("./types/box.js")(i)};var o=e("./annotation.js")(i);t.exports=o,i.pluginService.register(o)},{"./annotation.js":2,"./element.js":3,"./types/box.js":7,"./types/line.js":8,"chart.js":1}],7:[function(e,t,n){t.exports=function(t){var n=e("../helpers.js")(t),i=t.Annotation.Element.extend({setDataLimits:function(){var e=this._model,t=this.options,i=this.chartInstance,o=i.scales[t.xScaleID],a=i.scales[t.yScaleID],r=i.chartArea;if(e.ranges={},r){var l=0,s=0;o&&(l=n.isValid(t.xMin)?t.xMin:o.getPixelForValue(r.left),s=n.isValid(t.xMax)?t.xMax:o.getPixelForValue(r.right),e.ranges[t.xScaleID]={min:Math.min(l,s),max:Math.max(l,s)}),a&&(l=n.isValid(t.yMin)?t.yMin:a.getPixelForValue(r.bottom),s=n.isValid(t.yMax)?t.yMax:a.getPixelForValue(r.top),e.ranges[t.yScaleID]={min:Math.min(l,s),max:Math.max(l,s)})}},configure:function(){var e=this._model,t=this.options,i=this.chartInstance,o=i.scales[t.xScaleID],a=i.scales[t.yScaleID],r=i.chartArea;e.clip={x1:r.left,x2:r.right,y1:r.top,y2:r.bottom};var l,s,c=r.left,u=r.top,f=r.right,d=r.bottom;o&&(l=n.isValid(t.xMin)?o.getPixelForValue(t.xMin):r.left,s=n.isValid(t.xMax)?o.getPixelForValue(t.xMax):r.right,c=Math.min(l,s),f=Math.max(l,s)),a&&(l=n.isValid(t.yMin)?a.getPixelForValue(t.yMin):r.bottom,s=n.isValid(t.yMax)?a.getPixelForValue(t.yMax):r.top,u=Math.min(l,s),d=Math.max(l,s)),e.left=c,e.top=u,e.right=f,e.bottom=d,e.borderColor=t.borderColor,e.borderWidth=t.borderWidth,e.backgroundColor=t.backgroundColor},inRange:function(e,t){var n=this._model;return n&&e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom},getCenterPoint:function(){var e=this._model;return{x:(e.right+e.left)/2,y:(e.bottom+e.top)/2}},getWidth:function(){var e=this._model;return Math.abs(e.right-e.left)},getHeight:function(){var e=this._model;return Math.abs(e.bottom-e.top)},getArea:function(){return this.getWidth()*this.getHeight()},draw:function(){var e=this._view,t=this.chartInstance.chart.ctx;t.save(),t.beginPath(),t.rect(e.clip.x1,e.clip.y1,e.clip.x2-e.clip.x1,e.clip.y2-e.clip.y1),t.clip(),t.lineWidth=e.borderWidth,t.strokeStyle=e.borderColor,t.fillStyle=e.backgroundColor;var n=e.right-e.left,i=e.bottom-e.top;t.fillRect(e.left,e.top,n,i),t.strokeRect(e.left,e.top,n,i),t.restore()}});return i}},{"../helpers.js":5}],8:[function(e,t,n){t.exports=function(t){function n(e){var t=(e.x2-e.x1)/(e.y2-e.y1),n=e.x1||0;this.m=t,this.b=n,this.getX=function(i){return t*(i-e.y1)+n},this.getY=function(i){return(i-n)/t+e.y1},this.intersects=function(e,t,n){n=n||.001;var i=this.getY(e),o=this.getX(t);return(!isFinite(i)||Math.abs(t-i)<n)&&(!isFinite(o)||Math.abs(e-o)<n)}}function i(e,t,n,i,o){var a=e.line,s={},c=0,u=0;switch(!0){case e.mode==l&&"top"==e.labelPosition:u=o+e.labelYAdjust,c=t/2+e.labelXAdjust,s.y=e.y1+u,s.x=(isFinite(a.m)?a.getX(s.y):e.x1)-c;break;case e.mode==l&&"bottom"==e.labelPosition:u=n+o+e.labelYAdjust,c=t/2+e.labelXAdjust,s.y=e.y2-u,s.x=(isFinite(a.m)?a.getX(s.y):e.x1)-c;break;case e.mode==r&&"left"==e.labelPosition:c=i+e.labelXAdjust,u=-(n/2)+e.labelYAdjust,s.x=e.x1+c,s.y=a.getY(s.x)+u;break;case e.mode==r&&"right"==e.labelPosition:c=t+i+e.labelXAdjust,u=-(n/2)+e.labelYAdjust,s.x=e.x2-c,s.y=a.getY(s.x)+u;break;default:s.x=(e.x1+e.x2-t)/2+e.labelXAdjust,s.y=(e.y1+e.y2-n)/2+e.labelYAdjust}return s}var o=t.helpers,a=e("../helpers.js")(t),r="horizontal",l="vertical",s=t.Annotation.Element.extend({setDataLimits:function(){var e=this._model,t=this.options;e.ranges={},e.ranges[t.scaleID]={min:t.value,max:t.endValue||t.value}},configure:function(){var e,t,l=this._model,s=this.options,c=this.chartInstance,u=c.chart.ctx,f=c.scales[s.scaleID];if(f&&(e=a.isValid(s.value)?f.getPixelForValue(s.value):NaN,t=a.isValid(s.endValue)?f.getPixelForValue(s.endValue):e),!isNaN(e)){var d=c.chartArea;l.clip={x1:d.left,x2:d.right,y1:d.top,y2:d.bottom},this.options.mode==r?(l.x1=d.left,l.x2=d.right,l.y1=e,l.y2=t):(l.y1=d.top,l.y2=d.bottom,l.x1=e,l.x2=t),l.line=new n(l),l.mode=s.mode,l.labelBackgroundColor=s.label.backgroundColor,l.labelFontFamily=s.label.fontFamily,l.labelFontSize=s.label.fontSize,l.labelFontStyle=s.label.fontStyle,l.labelFontColor=s.label.fontColor,l.labelXPadding=s.label.xPadding,l.labelYPadding=s.label.yPadding,l.labelCornerRadius=s.label.cornerRadius,l.labelPosition=s.label.position,l.labelXAdjust=s.label.xAdjust,l.labelYAdjust=s.label.yAdjust,l.labelEnabled=s.label.enabled,l.labelContent=s.label.content,u.font=o.fontString(l.labelFontSize,l.labelFontStyle,l.labelFontFamily);var h=u.measureText(l.labelContent).width,b=u.measureText("M").width,p=i(l,h,b,l.labelXPadding,l.labelYPadding);l.labelX=p.x-l.labelXPadding,l.labelY=p.y-l.labelYPadding,l.labelWidth=h+2*l.labelXPadding,l.labelHeight=b+2*l.labelYPadding,l.borderColor=s.borderColor,l.borderWidth=s.borderWidth,l.borderDash=s.borderDash||[],l.borderDashOffset=s.borderDashOffset||0}},inRange:function(e,t){var n=this._model;return n.line&&n.line.intersects(e,t,this.getHeight())||n.labelEnabled&&n.labelContent&&e>=n.labelX&&e<=n.labelX+n.labelWidth&&t>=n.labelY&&t<=n.labelY+n.labelHeight},getCenterPoint:function(){return{x:(this._model.x2+this._model.x1)/2,y:(this._model.y2+this._model.y1)/2}},getWidth:function(){return Math.abs(this._model.right-this._model.left)},getHeight:function(){return this._model.borderWidth||1},getArea:function(){return Math.sqrt(Math.pow(this.getWidth(),2)+Math.pow(this.getHeight(),2))},draw:function(){var e=this._view,t=this.chartInstance.chart.ctx;e.clip&&(t.save(),t.beginPath(),t.rect(e.clip.x1,e.clip.y1,e.clip.x2-e.clip.x1,e.clip.y2-e.clip.y1),t.clip(),t.lineWidth=e.borderWidth,t.strokeStyle=e.borderColor,t.setLineDash&&t.setLineDash(e.borderDash),t.lineDashOffset=e.borderDashOffset,t.beginPath(),t.moveTo(e.x1,e.y1),t.lineTo(e.x2,e.y2),t.stroke(),e.labelEnabled&&e.labelContent&&(t.beginPath(),t.rect(e.clip.x1,e.clip.y1,e.clip.x2-e.clip.x1,e.clip.y2-e.clip.y1),t.clip(),t.fillStyle=e.labelBackgroundColor,o.drawRoundedRectangle(t,e.labelX,e.labelY,e.labelWidth,e.labelHeight,e.labelCornerRadius),t.fill(),t.font=o.fontString(e.labelFontSize,e.labelFontStyle,e.labelFontFamily),t.fillStyle=e.labelFontColor,t.textAlign="center",t.textBaseline="middle",t.fillText(e.labelContent,e.labelX+e.labelWidth/2,e.labelY+e.labelHeight/2)),t.restore())}});return s}},{"../helpers.js":5}]},{},[6]);