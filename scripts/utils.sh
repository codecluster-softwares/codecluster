#!/bin/bash

# ANSI color codes for terminal output.
# Reset codes.
RESET="\033[0m"
RESET_DIM="\033[22m"
RESET_COLOR="\033[39m"

# Text styles.
DIM="\033[2m"

# Foreground colors.
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
MAGENTA="\033[35m"
CYAN="\033[36m"

# Color functions.
red() { echo "${RED}$1${RESET_COLOR}"; }
green() { echo "${GREEN}$1${RESET_COLOR}"; }
yellow() { echo "${YELLOW}$1${RESET_COLOR}"; }
blue() { echo "${BLUE}$1${RESET_COLOR}"; }
magenta() { echo "${MAGENTA}$1${RESET_COLOR}"; }
cyan() { echo "${CYAN}$1${RESET_COLOR}"; }
dim() { echo "${DIM}$1${RESET_DIM}"; }

# Export functions for use in other scripts.
export -f red green yellow blue magenta cyan dim
