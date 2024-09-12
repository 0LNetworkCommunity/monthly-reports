import fs from 'node:fs';
// call with `bun run report.ts <address1> <address2>` with no args and only spaces between each address

// get addresses from args
let addrs = process.argv.slice(2)
addrs = addrs.map(a => a.toUpperCase())

const files = fs.readdirSync(process.cwd());

let report: object[] = []

files.map((f) => {

  if (f.includes(".json") && f.includes("report")) {
    const text = fs.readFileSync(f, 'utf8')
    const json = JSON.parse(text)

    let accountJsonList = json.filter((j) => {
      return addrs.includes(j.account.toUpperCase())
    })

    accountJsonList.forEach(j => {
      report.push({
        file: f,
        account: j.account,
        balance: j.balance.coin / 1_000_000
      })
    })

    // console.log(report)
  }
})

// console.log(files)
console.log(report.length)
fs.writeFileSync("out.json", JSON.stringify(report))
