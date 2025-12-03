FROM mcr.microsoft.com/devcontainers/javascript-node:24

# Set timezone (defaults to Bangkok, but can be overridden with host timezone)
ARG TIME_ZONE=Asia/Bangkok
RUN rm -f /etc/localtime \
    && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime

# Create non-root user
ARG USERNAME=node

# Create a working directory
WORKDIR /workspace

# Update NPM
RUN npm install -g npm@latest
# Install Claude Code
RUN npm install -g @anthropic-ai/claude-code
# Install Codex
RUN npm install -g @openai/codex

# Set the NPM prefix and cache to the user's home directory
RUN npm config set prefix /home/$USERNAME/.npm-global --global \
    && npm config set cache /home/$USERNAME/.npm --global

USER ${USERNAME}

# Set GPG for the user
RUN mkdir -p /home/${USERNAME}/.gnupg \
    && echo "use-agent" > /home/${USERNAME}/.gnupg/gpg.conf \
    && echo "pinentry-mode loopback" >> /home/${USERNAME}/.gnupg/gpg.conf \
    && chmod 700 /home/${USERNAME}/.gnupg

CMD ["/bin/zsh"]