(this["webpackJsonperror-budget"]=this["webpackJsonperror-budget"]||[]).push([[0],{122:function(e,a,r){e.exports=r(228)},127:function(e,a,r){},128:function(e,a,r){},228:function(e,a,r){"use strict";r.r(a);var n=r(0),s=r.n(n),t=r(6),o=r.n(t),u=(r(127),r(128),r(47)),c=r(46),h=r(231),m=r(232),i=r(230),d=r(229),l=r(118);function y(e){var a=e>=100?100:e,r=(100-(a=a<=0?0:a))/100,n={secondsPerDay:24*r*60*60,minutesPerDay:24*r*60,hoursPerDay:24*r};return Object(l.a)({},n,{secondsPerWeek:7*n.secondsPerDay,minutesPerWeek:7*n.minutesPerDay,hoursPerWeek:7*n.hoursPerDay,secondsPerMonth:31*n.secondsPerDay,minutesPerMonth:31*n.minutesPerDay,hoursPerMonth:31*n.hoursPerDay,secondsPerYear:365*n.secondsPerDay,minutesPerYear:365*n.minutesPerDay,hoursPerYear:365*n.hoursPerDay})}function P(e,a){var r=y(e);switch(a){case"seconds/day":return r.secondsPerDay;case"minutes/day":return r.minutesPerDay;case"hours/day":return r.hoursPerDay;case"seconds/week":return r.secondsPerWeek;case"minutes/week":return r.minutesPerWeek;case"hours/week":return r.hoursPerWeek;case"seconds/month":return r.secondsPerMonth;case"minutes/month":return r.minutesPerMonth;case"hours/month":return r.hoursPerMonth;case"seconds/year":return r.secondsPerYear;case"minutes/year":return r.minutesPerYear;case"hours/year":return r.hoursPerYear;default:return 0}}var k=function(e){var a=y(e.availability),r=[{key:"secondsPerDay",name:"Seconds Per Day",shorthand:"seconds/day",value:a.secondsPerDay},{key:"minutesPerDay",name:"Minutes Per Day",shorthand:"minutes/day",value:a.minutesPerDay},{key:"hoursPerDay",name:"Hours Per Day",shorthand:"hours/day",value:a.hoursPerDay},{key:"secondsPerWeek",name:"Seconds Per Week",shorthand:"seconds/week",value:a.secondsPerWeek},{key:"minutesPerWeek",name:"Minutes Per Week",shorthand:"minutes/week",value:a.minutesPerWeek},{key:"hoursPerWeek",name:"Hours Per Week",shorthand:"hours/week",value:a.hoursPerWeek},{key:"secondsPerMonth",name:"Seconds Per Month",shorthand:"seconds/month",value:a.secondsPerMonth},{key:"minutesPerMonth",name:"Minutes Per Month",shorthand:"weeks/month",value:a.minutesPerMonth},{key:"hoursPerMonth",name:"Hours Per Month",shorthand:"hours/month",value:a.hoursPerMonth},{key:"secondsPerYear",name:"Seconds Per Year",shorthand:"seconds/year",value:a.secondsPerYear},{key:"minutesPerYear",name:"Minutes Per Year",shorthand:"minutes/year",value:a.minutesPerYear},{key:"hoursPerYear",name:"Hours Per Year",shorthand:"hours/year",value:a.hoursPerYear}],n=[{title:"Name",dataIndex:"name"},{title:"Downtime",dataIndex:"value",align:"right",render:function(e){return e.toFixed(3)}},{title:"Shorthand",dataIndex:"shorthand"}];return s.a.createElement(d.a,{pagination:!1,dataSource:r,columns:n})},v=c.a.Option,w=function(){var e=Object(n.useState)("seconds/day"),a=Object(u.a)(e,2),r=a[0],t=a[1],o=Object(n.useState)(60),d=Object(u.a)(o,2),l=d[0],y=d[1],w=function(e,a){var r=0;switch(a){case"seconds/day":r=e/86400;break;case"minutes/day":r=e/1440;break;case"hours/day":r=e/24;break;case"seconds/week":r=e/604800;break;case"minutes/week":r=e/10080;break;case"hours/week":r=e/168;break;case"seconds/month":r=e/2678400;break;case"minutes/month":r=e/44640;break;case"hours/month":r=e/744;break;case"seconds/year":r=e/31536e3;break;case"minutes/year":r=e/525600;break;case"hours/year":r=e/8760}return 100-(r*=100)}(l,r),E=Object(n.useRef)();return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,{justify:"center"},s.a.createElement(m.a,{span:"8"},s.a.createElement("div",null,s.a.createElement(i.a,{ref:E,size:"large",value:l,min:0,step:.1,onChange:function(e){return e&&y(e)}}),s.a.createElement(c.a,{defaultValue:r,size:"large",onChange:function(e){var a=P(w,e);t(e),y(a)}},s.a.createElement(v,{value:"seconds/day"},"seconds/day"),s.a.createElement(v,{value:"minutes/day"},"minutes/day"),s.a.createElement(v,{value:"hours/day"},"hours/day"),s.a.createElement(v,{value:"seconds/week"},"seconds/week"),s.a.createElement(v,{value:"minutes/week"},"minutes/week"),s.a.createElement(v,{value:"hours/week"},"hours/week"),s.a.createElement(v,{value:"seconds/month"},"seconds/month"),s.a.createElement(v,{value:"minutes/month"},"minutes/month"),s.a.createElement(v,{value:"hours/month"},"hours/month"),s.a.createElement(v,{value:"seconds/year"},"seconds/year"),s.a.createElement(v,{value:"minutes/year"},"minutes/year"),s.a.createElement(v,{value:"hours/year"},"hours/year"))),s.a.createElement("div",null,s.a.createElement(i.a,{size:"large",value:w,min:0,max:100,step:.1,style:{width:"14rem"},onChange:function(e){e&&function(e){if(E.current){var a=P(e,r);y(a)}}(e)}}),"%"))),s.a.createElement(k,{availability:w}))};var E=function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(w,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[122,1,2]]]);
//# sourceMappingURL=main.a025dfdb.chunk.js.map