#!/bin/bash

# Detect file changes for conditional checks
# Usage: scripts/detect-changes.sh <base_branch> <head_ref>
#
# This script outputs environment variables for conditional execution.
# When GITHUB_OUTPUT is set, it writes to that file for GitHub Actions.
# Otherwise, it outputs shell variable assignments for local use.

set -e

BASE_BRANCH="$1"
HEAD_REF="$2"

if [ -z "$BASE_BRANCH" ] || [ -z "$HEAD_REF" ]; then
  echo "Error: Both base_branch and head_ref are required" >&2
  exit 1
fi

# Check for Rust file changes
if git diff --name-only "$BASE_BRANCH" "$HEAD_REF" \
  | grep -q '\.rs$'; then
  HAS_RUST_CHANGES=true
else
  HAS_RUST_CHANGES=false
fi

# Check for test file changes (.stories.tsx or .test.ts)
if git diff --name-only "$BASE_BRANCH" "$HEAD_REF" \
  | grep -q '\.stories\.tsx$\|\.test\.ts$'; then
  HAS_TEST_CHANGES=true
else
  HAS_TEST_CHANGES=false
fi

# Check for frontend file changes (.vue, .ts, .scss, .html, .json in app/)
if git diff --name-only "$BASE_BRANCH" "$HEAD_REF" \
  | grep -q '^app/.*\.\(vue\|ts\|scss\|html\|json\)$'; then
  HAS_FRONTEND_CHANGES=true
else
  HAS_FRONTEND_CHANGES=false
fi

# Output for GitHub Actions or local shell
if [ -n "$GITHUB_OUTPUT" ]; then
  echo "has-rust-changes=$HAS_RUST_CHANGES" >> "$GITHUB_OUTPUT"
  echo "has-test-changes=$HAS_TEST_CHANGES" >> "$GITHUB_OUTPUT"
  echo "has-frontend-changes=$HAS_FRONTEND_CHANGES" >> "$GITHUB_OUTPUT"
else
  echo "HAS_RUST_CHANGES=$HAS_RUST_CHANGES"
  echo "HAS_TEST_CHANGES=$HAS_TEST_CHANGES"
  echo "HAS_FRONTEND_CHANGES=$HAS_FRONTEND_CHANGES"
fi

# Debug output to stderr (only when not in GitHub Actions)
if [ -z "$GITHUB_OUTPUT" ]; then
  echo "Changed files:" >&2
  git diff --name-only "$BASE_BRANCH" "$HEAD_REF" >&2
  echo "Rust changes: $HAS_RUST_CHANGES" >&2
  echo "Test changes: $HAS_TEST_CHANGES" >&2
  echo "Frontend changes: $HAS_FRONTEND_CHANGES" >&2
fi
