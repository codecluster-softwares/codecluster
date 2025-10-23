#!/bin/bash

# Detect file changes in pull request
# Usage: scripts/detect-changes.sh <base_branch> <head_ref>

# This script is designed for GitHub workflow runtime.
# When test locally, run like this:
#
# GITHUB_OUTPUT=<testing-output-file> sh <this-file.sh> <base_branch> <head_ref>
#
# <testing-output-file>: a file path to store the output, maybe relative path.
# <this-file.sh>: the path to this script file.
# <base_branch>: the base branch name (e.g., main)
# <head_ref>: the head reference (e.g., HEAD)

set -e

BASE_BRANCH="$1"
HEAD_REF="$2"

if [ -z "$BASE_BRANCH" ] || [ -z "$HEAD_REF" ]; then
  echo "Error: Both base_branch and head_ref are required"
  exit 1
fi

echo "Changed files:"
git diff --name-only "$BASE_BRANCH" "$HEAD_REF"

# Check for Rust file changes
if git diff --name-only "$BASE_BRANCH" "$HEAD_REF" \
  | grep -q '\.rs$'; then
  echo "has-rust-changes=true" >> "$GITHUB_OUTPUT"
else
  echo "has-rust-changes=false" >> "$GITHUB_OUTPUT"
fi

# Check for test file changes (.stories.tsx or .test.ts)
if git diff --name-only "$BASE_BRANCH" "$HEAD_REF" \
  | grep -q '\.stories\.tsx$\|\.test\.ts$'; then
  echo "has-test-changes=true" >> "$GITHUB_OUTPUT"
else
  echo "has-test-changes=false" >> "$GITHUB_OUTPUT"
fi

# Check for frontend file changes (.vue, .ts, .scss, .html, .json in app/)
if git diff --name-only "$BASE_BRANCH" "$HEAD_REF" \
  | grep -q '^app/.*\.\(vue\|ts\|scss\|html\|json\)$'; then
  echo "has-frontend-changes=true" >> "$GITHUB_OUTPUT"
else
  echo "has-frontend-changes=false" >> "$GITHUB_OUTPUT"
fi
