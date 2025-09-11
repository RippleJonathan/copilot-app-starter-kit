# Copilot App Starter Kit – Instructions for Copilot Agent (workspace)

This file restates key environment and tooling guidance for Copilot Agents operating in this repo.

## Environment & Tools (devcontainer)
This workspace runs in a devcontainer on Ubuntu 24.04.2 LTS. Agents may assume these tools are available on PATH:

- apt, dpkg, docker, git, gh, kubectl, curl, wget, ssh, scp, rsync, gpg, ps, lsof, netstat, top, tree, find, grep, zip, unzip, tar, gzip, bzip2, xz

Browser usage:
- Use `$BROWSER <url>` to open links in the host browser from the devcontainer.

Hard rule — follow user coding instructions
- If the user provides workspace-specific instructions (environment, allowed tools, command preferences), the agent should follow them unless they conflict with higher-priority system rules (safety, security, copyright).
- Ensure agent output is non-destructive by default: prefer temp dirs, `--defaults`, and request confirmation before commits/PRs or destructive changes.
