# Contributing Guidelines

## Gravatar Page and Function

Changes to the `gravatar` page or related functions must be versioned and
tested before they are released:

1. **Versioning**
   - Use semantic versioning.
   - Bump the version in `package.json` with `npm version`.
   - Record the change in `Changelog.md`.
2. **Testing**
   - Run `npm test` to ensure all tests, including those for gravatar, pass.
   - Address any failures before merging.
3. **Release Tags**
   - For significant gravatar updates, create a Git tag:
     `git tag -a vX.Y.Z -m "gravatar: describe the change"`
   - Push tags to the repository with `git push --tags`.

These steps ensure gravatar changes are traceable, reliable and properly
released.

