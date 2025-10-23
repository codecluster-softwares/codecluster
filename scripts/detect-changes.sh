#!/bin/bash

# Detect file changes in pull request
# Usage: scripts/detect-changes.sh <base_sha> <head_sha>

# This script is designed for GitHub workflow runtime.
# When test locally, run like this:
#
# GITHUB_OUTPUT=<testing-output-file> sh <this-file.sh> <base_hash> <head_hash>
#
# <testing-output-file>: a file path to store the output, maybe relative path.
# <this-file.sh>: the path to this script file.
# <base_hash>: the base commit hash of the pull request.
# <head_hash>: the head commit hash of the pull request.

set -e

BASE_SHA="$1"
HEAD_SHA="$2"

if [ -z "$BASE_SHA" ] || [ -z "$HEAD_SHA" ]; then
  echo "Error: Both base_sha and head_sha are required"
  exit 1
fi

echo "Changed files:"
git diff --name-only "$BASE_SHA" "$HEAD_SHA"

# Check for Rust file changes
if git diff --name-only "$BASE_SHA" "$HEAD_SHA" \
  | grep -q '\.rs$'; then
  echo "has-rust-changes=true" >> "$GITHUB_OUTPUT"
else
  echo "has-rust-changes=false" >> "$GITHUB_OUTPUT"
fi

# Check for test file changes (.stories.tsx or .test.ts)
if git diff --name-only "$BASE_SHA" "$HEAD_SHA" \
  | grep -q '\.stories\.tsx$\|\.test\.ts$'; then
  echo "has-test-changes=true" >> "$GITHUB_OUTPUT"
else
  echo "has-test-changes=false" >> "$GITHUB_OUTPUT"
fi

# Check for frontend file changes (.vue, .ts, .scss, .html, .json in app/)
if git diff --name-only "$BASE_SHA" "$HEAD_SHA" \
  | grep -q '^app/.*\.\(vue\|ts\|scss\|html\|json\)$'; then
  echo "has-frontend-changes=true" >> "$GITHUB_OUTPUT"
else
  echo "has-frontend-changes=false" >> "$GITHUB_OUTPUT"
fi
