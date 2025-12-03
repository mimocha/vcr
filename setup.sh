npm install

# Install Oh My Zsh and Powerlevel10k
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
git clone https://github.com/zsh-users/zsh-autosuggestions "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions"
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting"

# If gpg is configured, fix git waiting for gpg passphrase input, by using ssh key to sign
# Configure SSH keys if they exist
if [ -d "$HOME/.ssh" ] && [ "$(ls -A $HOME/.ssh 2>/dev/null)" ]; then
    echo "🔑 Configuring SSH keys..."
    chmod 700 "$HOME/.ssh"
    chmod 600 "$HOME/.ssh"/*
fi

# Configure GPG keys if they exist
if [ -d "$HOME/.gnupg" ] && [ "$(ls -A $HOME/.gnupg 2>/dev/null)" ]; then
    echo "🔐 Configuring GPG keys..."
    chmod 700 "$HOME/.gnupg"
    chmod 600 "$HOME/.gnupg"/*
fi

# Optional: Configure git to use SSH signing instead of GPG
git config --local gpg.format ssh
git config --local user.signingkey ~/.ssh/id_ed25519.pub
