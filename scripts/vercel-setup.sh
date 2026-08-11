#!/usr/bin/env bash
# Install JS deps + Rust WASM toolchain for Vercel (and similar CI hosts).
# Mirrors .github/workflows/deploy.yml so @opendaw/studio-core-wasm can build.
set -euo pipefail

if ! command -v rustup >/dev/null 2>&1; then
  echo "Installing rustup..."
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal --default-toolchain stable
fi

if [ -f "${HOME}/.cargo/env" ]; then
  # shellcheck disable=SC1091
  . "${HOME}/.cargo/env"
elif [ -d /usr/local/cargo ] && [ -d /usr/local/rustup ]; then
  export CARGO_HOME="${CARGO_HOME:-/usr/local/cargo}"
  export RUSTUP_HOME="${RUSTUP_HOME:-/usr/local/rustup}"
  if [ -f /usr/local/cargo/env ]; then
    # shellcheck disable=SC1091
    . /usr/local/cargo/env
  fi
fi
export PATH="${HOME}/.cargo/bin:/usr/local/cargo/bin:${PATH}"

# Engine no_std code needs f32::abs in core (stable since ~1.97).
rustup toolchain install stable --profile minimal
rustup default stable
rustup target add wasm32-unknown-unknown
rustup toolchain install nightly --profile minimal --component rust-src
rustup target add wasm32-unknown-unknown --toolchain nightly

if command -v apt-get >/dev/null 2>&1 && ! command -v wasm-opt >/dev/null 2>&1; then
  if command -v sudo >/dev/null 2>&1; then
    sudo apt-get update && sudo apt-get install -y binaryen || true
  else
    apt-get update && apt-get install -y binaryen || true
  fi
fi

npm ci
