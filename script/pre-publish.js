const childProcess = require('child_process')
const path = require('path')
const fs = require('fs')
const main = () => {
    try {
       const cmd = `npm run test:unit && npm run build`
       childProcess.execSync(cmd, {stdio: 'inherit'}) 
       const pkgPath = path.join(__dirname, '../package.json')
       let pkg = fs.readFileSync(pkgPath);
       pkg = JSON.parse(pkg);
       const versionArr = pkg.version.split('.')
       const nextVersion = [...versionArr.slice(0,versionArr.length-1), String(+versionArr[versionArr.length-1] + 1)].join('.')
       console.log('next version: ', nextVersion)
       pkg.version = nextVersion
       fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
       console.log('finish.')
    } catch (error) {
        console.log(error)
    }
}
main()