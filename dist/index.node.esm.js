async function o(o){console.log("Running helloWorld in a ESM module");const e=`Hello ${o}!`;if(e===`Hello ${o}!`){const o=await import("node:process");console.log(`Node.js ${o.version} says "${e}"`)}else console.log("This is not going to be printed");return e}var e=Object.freeze({__proto__:null,helloWorld:o});async function l(){const o=(await Promise.resolve().then((function(){return e}))).helloWorld;await o("hello")}export{l as default,o as helloWorld};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5lc20uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9oZWxsby13b3JsZC50cyIsIi4uL3NyYy90cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiYXN5bmMiLCJoZWxsb1dvcmxkIiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0IiwicHJvY2VzcyIsImltcG9ydCIsInZlcnNpb24iLCJzYXlIZWxsbyIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImhlbGxvV29ybGQkMSJdLCJtYXBwaW5ncyI6IkFBV09BLGVBQWVDLEVBQVlDLEdBQ2hDQyxRQUFRQyxJQUFJLHNDQUNaLE1BQU1DLEVBQU8sU0FBU0gsS0FDdEIsR0FBSUcsSUFBUyxTQUFTSCxLQUdiLENBRUwsTUFBTUksUUFBZ0JDLE9BQU8sZ0JBQzdCSixRQUFRQyxJQUFJLFdBQVdFLEVBQVFFLGlCQUFpQkgsS0FDakQsTUFFREYsUUFBUUMsSUFBSSxtQ0FFZCxPQUFPQyxDQUNULG9EQ2ZlTCxlQUFlUyxJQUM1QixNQUFNUixTQUFvQlMsUUFBMEJDLFVBQUFDLE1BQUEsV0FBQSxPQUFBQyxDQUFBLEtBQUVaLGlCQUNoREEsRUFBVyxRQUNuQiJ9