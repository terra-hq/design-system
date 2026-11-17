// Local work: rebuild dist/ every time a file of src/scss changes, so a project linked with `npm link` sees it at once.
// Run: npm run watch
import { execSync } from 'node:child_process'
try { execSync('npm run build', { stdio: 'inherit' }) } catch { /* keep watching: the next save tries again */ }
