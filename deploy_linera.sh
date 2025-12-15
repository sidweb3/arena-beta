#!/bin/bash
# Script to deploy the Agent Arena contract to Linera

echo "Checking for Linera toolchain..."
if ! command -v linera &> /dev/null; then
    echo "Error: 'linera' command not found."
    echo "Please install the Linera toolchain first."
    echo "Visit https://github.com/linera-io/linera-protocol for installation instructions."
    exit 1
fi

echo "Building contract..."
cd linera
cargo build --release --target wasm32-unknown-unknown

if [ $? -ne 0 ]; then
    echo "Build failed."
    exit 1
fi

echo "Publishing bytecode..."
BYTECODE_ID=$(linera publish-bytecode \
    target/wasm32-unknown-unknown/release/agent_arena_contract.wasm \
    target/wasm32-unknown-unknown/release/agent_arena_service.wasm)

if [ -z "$BYTECODE_ID" ]; then
    echo "Failed to publish bytecode."
    exit 1
fi

echo "Bytecode ID: $BYTECODE_ID"

echo "Creating application..."
APP_ID=$(linera create-application $BYTECODE_ID)

if [ -z "$APP_ID" ]; then
    echo "Failed to create application."
    exit 1
fi

echo "---------------------------------------------------"
echo "Deployment Successful!"
echo "Application ID: $APP_ID"
echo "---------------------------------------------------"
echo "Please update src/lib/linera.ts with this App ID:"
echo "export const LINERA_APP_ID = \"$APP_ID\";"
