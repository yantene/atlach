FROM debian:bullseye-slim

ENV LANG "C.UTF-8"

# Prepare
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN \
  apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y \
  gosu=1.12-1+b6 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Add dev user
ARG UID=1000
ARG GID=1000
ARG USERNAME=devuser
ARG GROUPNAME=devusers
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
  sudo=1.9.5p2-3 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  groupadd --gid ${GID} -o ${GROUPNAME} && \
  useradd --uid ${UID} --gid ${GID} --shell /usr/bin/fish -m -o ${USERNAME} && \
  echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USERNAME}

# Setup shell
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
  fish=3.1.2-3 \
  less=551-2 \
  ca-certificates=20210119 \
  curl=7.74.0-1.3+deb11u2 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  gosu ${USERNAME} fish -c ' \
  curl -sL https://git.io/fisher | source && \
  fisher install jorgebucaran/fisher && \
  fisher install pure-fish/pure \
  '

# Install asdf
ARG ASDF_VERSION=0.10.2
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
  git=1:2.30.2-1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  gosu ${USERNAME} fish -c " \
  git clone https://github.com/asdf-vm/asdf.git /home/${USERNAME}/.asdf --branch v${ASDF_VERSION} && \
  mkdir -p /home/${USERNAME}/.config/fish/completions && \
  ln -s /home/${USERNAME}/.asdf/completions/asdf.fish /home/${USERNAME}/.config/fish/completions && \
  mkdir -p /home/${USERNAME}/.config/fish/conf.d && \
  echo 'source ~/.asdf/asdf.fish' > /home/${USERNAME}/.config/fish/conf.d/asdf.fish \
  "

# Install nodejs
# cf. https://github.com/nodejs/node/blob/main/BUILDING.md#building-nodejs-on-supported-platforms
ARG NODE_VERSION=16.15.1
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
  g++=4:10.2.1-1 \
  make=4.3-4.1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  gosu ${USERNAME} fish -c " \
  asdf plugin add nodejs && \
  asdf install nodejs ${NODE_VERSION} && \
  asdf global nodejs ${NODE_VERSION} \
  "

# Install python
# cf. https://github.com/pyenv/pyenv/wiki#suggested-build-environment
ARG PYTHON_VERSION=3.10.6
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
  bzip2=1.0.8-4 \
  make=4.3-4.1 \
  build-essential=12.9 \
  libssl-dev=1.1.1n-0+deb11u3 \
  zlib1g-dev=1:1.2.11.dfsg-2+deb11u1 \
  libbz2-dev=1.0.8-4 \
  libreadline-dev=8.1-1 \
  libsqlite3-dev=3.34.1-3 \
  wget=1.21-1+deb11u1 \
  curl=7.74.0-1.3+deb11u2 \
  llvm=1:11.0-51+nmu5 \
  libncursesw5-dev=6.2+20201114-2 \
  xz-utils=5.2.5-2.1~deb11u1 \
  tk-dev=8.6.11+1 \
  libxml2-dev=2.9.10+dfsg-6.7+deb11u2 \
  libxmlsec1-dev=1.2.31-1 \
  libffi-dev=3.3-6 \
  liblzma-dev=5.2.5-2.1~deb11u1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  gosu ${USERNAME} fish -c " \
  asdf plugin add python && \
  asdf install python ${PYTHON_VERSION} && \
  asdf global python ${PYTHON_VERSION} \
  "

# Install tools
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
  tmux=3.1c-1+deb11u1 \
  unzip=6.0-26+deb11u1 \
  openssh-client=1:8.4p1-5+deb11u1 \
  neovim=0.4.4-1 \
  ripgrep=12.1.1-1+b1 \
  bat=0.12.1-6+b2 \
  exa=0.9.0-5+b1 \
  fd-find=8.2.1-1+b1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  ln -s /usr/bin/batcat /usr/local/bin/bat && \
  curl -L 'https://github.com/dandavison/delta/releases/download/0.13.0/delta-0.13.0-x86_64-unknown-linux-musl.tar.gz' | tar xz -C /tmp && \
  mv /tmp/delta-0.13.0-x86_64-unknown-linux-musl/delta /usr/local/bin && \
  rm -rf /tmp/delta-0.13.0-x86_64-unknown-linux-musl && \
  curl -L 'https://github.com/lotabout/skim/releases/download/v0.9.4/skim-v0.9.4-x86_64-unknown-linux-musl.tar.gz' | tar xz -C /tmp && \
  mv /tmp/sk /usr/local/bin && \
  curl -L 'https://github.com/hadolint/hadolint/releases/download/v2.10.0/hadolint-Linux-x86_64' -o /usr/local/bin/hadolint && \
  chmod 755 /usr/local/bin/hadolint && \
  mkdir /tmp/awscli && \
  curl -L 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o /tmp/awscli/awscli-exe-linux-x86_64.zip && \
  unzip /tmp/awscli/awscli-exe-linux-x86_64.zip -d /tmp/awscli && \
  /tmp/awscli/aws/install && \
  rm -rf /tmp/awscli && \
  mkdir /tmp/aws-sam-cli && \
  curl -L 'https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip' -o /tmp/aws-sam-cli/aws-sam-cli-linux-x86_64.zip && \
  unzip /tmp/aws-sam-cli/aws-sam-cli-linux-x86_64.zip -d /tmp/aws-sam-cli && \
  /tmp/aws-sam-cli/install && \
  rm -rf /tmp/aws-sam-cli && \
  gosu ${USERNAME} fish -c " \
  npm install --location=global prettier@2.7.1 && \
  asdf reshim nodejs \
  " && \
  gosu ${USERNAME} fish -c " \
  pip install cfn-lint==0.61.5 && \
  asdf reshim python \
  "

# Copy .config/
COPY ./.devcontainer/docker/config/ /home/${USERNAME}/.config
RUN \
  chown devuser:devusers -R /home/${USERNAME}/.config

ENV SAM_CLI_TELEMETRY=0

WORKDIR /workspace

EXPOSE 3000

CMD ["/usr/bin/tail", "-f", "/dev/null"]
