# Repository Instructions

## Internal package dependencies

Use ordinary semver ranges such as `^2.5.1` for dependencies between published
`@novastar/*` packages. Do not use the `workspace:` protocol in a publishable
package manifest: this repository may publish packages directly with `npm
publish`, which does not rewrite workspace ranges.

Before publishing a package, create its tarball and inspect the packaged
`package.json`. After publishing, verify the version, dependency ranges, and
dist-tags from the npm registry. Do not push release commits or tags until those
registry checks pass.

## Commit messages

Use Conventional Commits for all commit messages.
