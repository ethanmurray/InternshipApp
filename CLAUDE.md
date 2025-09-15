# Claude Development Guidelines

## Branch Management
- Always create a new branch for new work
- Use descriptive branch names (e.g., `feature/user-authentication`, `fix/login-validation`)
- Never work directly on main/master branch

## Development Approach
- Work in the smallest possible testable chunks
- Each change should be focused and atomic
- Test functionality after each small increment
- Commit frequently with clear, descriptive messages

## Git Configuration
- Always use SSH authentication for GitHub operations
- If remote URL needs to be updated: `git remote set-url origin git@github.com:username/repo.git`

## Workflow
1. Create new branch: `git checkout -b feature/your-feature-name`
2. Make small, focused changes
3. Test the changes
4. Commit: `git commit -m "descriptive message"`
5. Repeat steps 2-4 until feature is complete
6. Push branch and create pull request when ready