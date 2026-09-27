// Lists every piece of content that still has to be filled in.  Run: npm run content:todo
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith(".ts") && files.push(join(d, f))));
walk("content");

let total = 0;
let demo = 0;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  const hits = [];
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/todo\("([^"]+)"/g)) hits.push(`  ${String(i + 1).padStart(4)}  ${m[1]}`);
    for (const m of line.matchAll(/"\[([^\]]+INVULLEN)\]"/g)) hits.push(`  ${String(i + 1).padStart(4)}  ${m[1].replace(/ INVULLEN$/, "")}`);
    if (/demo: true/.test(line)) demo++;
  });
  if (hits.length) {
    console.log(`\n${file}  (${hits.length})`);
    hits.forEach((h) => console.log(h));
    total += hits.length;
  }
}
console.log(`\n${total} open items · ${demo} demo entries to verify (search for "demo: true").\n`);
