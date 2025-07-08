# Branch Protection Rules

To make the CI pipeline required for merging pull requests, configure the following branch protection rules in your GitHub repository:

## Steps to Configure:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Click **Add rule** or edit existing rule for your main branch
4. Configure the following settings:

### Required Settings:
- ✅ **Restrict pushes that create files**: No
- ✅ **Require status checks to pass before merging**: Yes
  - ✅ **Require branches to be up to date before merging**: Yes
  - ✅ **Status checks that are required**:
    - `Lint and Type Check`
- ✅ **Require pull request reviews before merging**: Recommended
- ✅ **Dismiss stale pull request approvals when new commits are pushed**: Recommended
- ✅ **Require review from code owners**: Optional
- ✅ **Include administrators**: Recommended

### Additional Recommended Settings:
- ✅ **Require linear history**: Optional (helps keep git history clean)
- ✅ **Require deployments to succeed before merging**: If you have deployment workflows

## Status Check Name
The status check name that will appear is: **Lint and Type Check**

This matches the `name` field in the GitHub Actions workflow job.

## Testing the Pipeline
1. Create a test branch
2. Make changes to TypeScript/JavaScript files
3. Open a pull request
4. Verify that the "Lint and Type Check" status appears and must pass before merging
