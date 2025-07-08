# CI/CD Pipeline Setup

This repository includes a comprehensive CI/CD pipeline that automatically runs TypeScript type checking and ESLint on changed files for every pull request and push to main/develop branches.

## Pipeline Features

### ✅ **Automated Quality Checks**

- **ESLint**: Lints JavaScript/TypeScript files for code quality
- **TypeScript**: Type checking for type safety
- **Turbo**: Efficient caching and parallel execution
- **Changed Files Detection**: Only runs checks on modified files for faster execution

### ✅ **Trigger Conditions**

- Pull requests to `main` or `develop` branches
- Direct pushes to `main` or `develop` branches
- Automatically runs on every commit

### ✅ **Smart File Detection**

The pipeline only processes relevant files:

- `**/*.{ts,tsx,js,jsx}` (TypeScript and JavaScript files)
- Excludes: `node_modules`, `.next`, `dist` directories

## How It Works

1. **Checkout**: Fetches the repository code with full git history
2. **Setup**: Installs Node.js 20 and pnpm package manager
3. **Dependencies**: Installs all project dependencies
4. **File Detection**: Identifies changed TypeScript/JavaScript files
5. **Linting**: Runs ESLint on changed files using Turbo's smart filtering
6. **Type Checking**: Runs TypeScript compiler on affected packages
7. **Fallback**: Runs full lint if no changes detected

## Required Scripts

Each package in your monorepo should have these scripts in `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  }
}
```

## Turbo Configuration

The `turbo.json` includes:

- `lint`: ESLint task with no outputs (since it's validation only)
- `type-check`: TypeScript checking with no outputs

## Making Checks Required

To require these checks to pass before merging:

1. Go to **Repository Settings → Branches**
2. Add/edit branch protection rule for `main`
3. Enable "Require status checks to pass before merging"
4. Add required check: `Lint and Type Check`

## Local Development

Run the same checks locally:

```bash
# Lint all packages
pnpm turbo lint

# Type check all packages
pnpm turbo type-check

# Run on specific package
pnpm turbo lint --filter=ssc
```

## Performance Benefits

- **Turbo Caching**: Skips unchanged packages
- **Changed Files**: Only processes modified files
- **Parallel Execution**: Runs tasks across packages simultaneously
- **Incremental**: Uses git SHA comparison for targeted checks

## Troubleshooting

### Pipeline Failing?

1. Check the failed step in GitHub Actions logs
2. Run the same commands locally to reproduce
3. Ensure all packages have required scripts
4. Verify ESLint and TypeScript configurations

### Adding New Packages?

Make sure each new package includes:

- `lint` script in package.json
- `type-check` script in package.json
- Proper TypeScript configuration
- ESLint configuration (inherited or local)
