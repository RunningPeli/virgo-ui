import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { copyFileSync } from 'fs-extra'
import { virgoVuePkgRoot, repoRoot } from './paths'

execSync('pnpm run clean', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm --filter @virgo-ui/vue build', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=!@virgo-ui/vue --filter=@virgo-ui/preset-* --filter=@virgo-ui/theme-* --filter=./packages/* build', { stdio: 'inherit', cwd: repoRoot })

// copy README.md file to dist dir for npm publish
copyFileSync(path.join(repoRoot, 'README.md'), path.join(virgoVuePkgRoot, 'dist', 'README.md'))

consola.success('Build complete!')
