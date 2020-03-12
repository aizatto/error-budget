(this["webpackJsonperror-budget"]=this["webpackJsonperror-budget"]||[]).push([[0],{125:function(e,a,n){e.exports=n(231)},130:function(e,a,n){},131:function(e,a,n){},231:function(e,a,n){"use strict";n.r(a);var r=n(0),t=n.n(r),s=n(6),o=n.n(s),u=(n(130),n(32)),c=(n(131),n(122)),l=n(232),m=n(234),i=n(235),h=n(233);var d,y=function(e){var a=function(e){var a=e>=100?100:e,n=(100-(a=a<=0?0:a))/100,r={secondsPerDay:24*n*60*60,minutesPerDay:24*n*60,hoursPerDay:24*n};return Object(c.a)({},r,{secondsPerWeek:7*r.secondsPerDay,minutesPerWeek:7*r.minutesPerDay,hoursPerWeek:7*r.hoursPerDay,secondsPerMonth:31*r.secondsPerDay,minutesPerMonth:31*r.minutesPerDay,hoursPerMonth:31*r.hoursPerDay,secondsPerYear:365*r.secondsPerDay,minutesPerYear:365*r.minutesPerDay,hoursPerYear:365*r.hoursPerDay})}(e.availability),n=[{key:"secondsPerDay",name:"Seconds Per Day",shorthand:"seconds/day",value:a.secondsPerDay},{key:"minutesPerDay",name:"Minutes Per Day",shorthand:"minutes/day",value:a.minutesPerDay},{key:"hoursPerDay",name:"Hours Per Day",shorthand:"hours/day",value:a.hoursPerDay},{key:"secondsPerWeek",name:"Seconds Per Week",shorthand:"seconds/week",value:a.secondsPerWeek},{key:"minutesPerWeek",name:"Minutes Per Week",shorthand:"minutes/week",value:a.minutesPerWeek},{key:"hoursPerWeek",name:"Hours Per Week",shorthand:"hours/week",value:a.hoursPerWeek},{key:"secondsPerMonth",name:"Seconds Per Month",shorthand:"seconds/month",value:a.secondsPerMonth},{key:"minutesPerMonth",name:"Minutes Per Month",shorthand:"weeks/month",value:a.minutesPerMonth},{key:"hoursPerMonth",name:"Hours Per Month",shorthand:"hours/month",value:a.hoursPerMonth},{key:"secondsPerYear",name:"Seconds Per Year",shorthand:"seconds/year",value:a.secondsPerYear},{key:"minutesPerYear",name:"Minutes Per Year",shorthand:"minutes/year",value:a.minutesPerYear},{key:"hoursPerYear",name:"Hours Per Year",shorthand:"hours/year",value:a.hoursPerYear}],r=[{title:"Name",dataIndex:"name"},{title:"Downtime",dataIndex:"value",align:"right",render:function(e){return e.toFixed(3)}},{title:"Shorthand",dataIndex:"shorthand"}];return t.a.createElement(l.a,{pagination:!1,dataSource:n,columns:r})},k=function(){var e=Object(r.useState)(99.99),a=Object(u.a)(e,2),n=a[0],s=a[1];return t.a.createElement(t.a.Fragment,null,t.a.createElement(m.a,{justify:"center"},t.a.createElement(i.a,{span:"6"},t.a.createElement(h.a,{style:{fontSize:"2rem",width:"12rem"},defaultValue:n,min:0,max:100,step:.1,onChange:function(e){return e&&s(e)}}),"%")),t.a.createElement(y,{availability:n}))},P=n(34),v=n(50),E=v.a.Option,b=function(){var e=Object(r.useState)(60),a=Object(u.a)(e,2),n=a[0],s=a[1],o=Object(r.useState)("seconds/day"),c=Object(u.a)(o,2),l=c[0],d=c[1],k=0;switch(l){case"seconds/day":k=n/86400;break;case"minutes/day":k=n/1440;break;case"hours/day":k=n/24;break;case"seconds/week":k=n/604800;break;case"minutes/week":k=n/10080;break;case"hours/week":k=n/168;break;case"seconds/month":k=n/2678400;break;case"minutes/month":k=n/44640;break;case"hours/month":k=n/744;break;case"seconds/year":k=n/31536e3;break;case"minutes/year":k=n/525600;break;case"hours/year":k=n/8760}var P=100-(k*=100);return t.a.createElement(t.a.Fragment,null,t.a.createElement(m.a,{justify:"center"},t.a.createElement(i.a,{span:"6"},t.a.createElement("div",null,t.a.createElement(h.a,{size:"large",defaultValue:n,min:0,step:.1,onChange:function(e){return e&&s(e)}}),t.a.createElement(v.a,{defaultValue:l,size:"large",onChange:function(e){return d(e)}},t.a.createElement(E,{value:"seconds/day"},"seconds/day"),t.a.createElement(E,{value:"minutes/day"},"minutes/day"),t.a.createElement(E,{value:"hours/day"},"hours/day"),t.a.createElement(E,{value:"seconds/week"},"seconds/week"),t.a.createElement(E,{value:"minutes/week"},"minutes/week"),t.a.createElement(E,{value:"hours/week"},"hours/week"),t.a.createElement(E,{value:"seconds/month"},"seconds/month"),t.a.createElement(E,{value:"minutes/month"},"minutes/month"),t.a.createElement(E,{value:"hours/month"},"hours/month"),t.a.createElement(E,{value:"seconds/year"},"seconds/year"),t.a.createElement(E,{value:"minutes/year"},"minutes/year"),t.a.createElement(E,{value:"hours/year"},"hours/year"))),t.a.createElement("div",null,t.a.createElement(h.a,{size:"large",value:P,readOnly:!0}),"%"))),t.a.createElement(y,{availability:P}))};!function(e){e.AVAILABILITY="availability",e.ERROR_BUDGET="error-budget"}(d||(d={}));var w=function(){var e=Object(r.useState)(d.AVAILABILITY),a=Object(u.a)(e,2),n=a[0],s=a[1],o=null;switch(n){case d.AVAILABILITY:o=t.a.createElement(k,null);break;case d.ERROR_BUDGET:o=t.a.createElement(b,null)}return t.a.createElement(t.a.Fragment,null,t.a.createElement(P.a,{mode:"horizontal",onClick:function(e){return s(e.key)},selectedKeys:[n]},t.a.createElement(P.a.Item,{key:d.AVAILABILITY},"Availability"),t.a.createElement(P.a.Item,{key:d.ERROR_BUDGET},"Error Budget")),o)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(t.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[125,1,2]]]);
//# sourceMappingURL=main.597d165d.chunk.js.map