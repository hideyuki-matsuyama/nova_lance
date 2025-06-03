# syntax=docker/dockerfile:1
# check=error=true

ARG RUBY_VERSION=3.4.4
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails_web

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
        build-essential \
        git \
        libyaml-dev \
        curl \
        gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        nodejs \
        yarn \
    && rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set production environment
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT=""

FROM base AS build

COPY Gemfile Gemfile.lock package.json yarn.lock ./
RUN bundle check || bundle install && \
    yarn install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

RUN echo "--- yarn install後のnode_modules/@hotwired の内容 ---" && \
    ls -la node_modules/@hotwired || echo "node_modules/@hotwired が見つかりません"
RUN echo "--- yarn install後のnode_modules/react の内容 ---" && \
    ls -la node_modules/react || echo "node_modules/react が見つかりません"
RUN echo "--- web/app/javascript/application.js の内容 ---" && \
    cat app/javascript/application.js || echo "app/javascript/application.js が見つかりません"
RUN echo "--- web/app/javascript/controllers/index.js の内容 ---" && \
    cat app/javascript/controllers/index.js || echo "app/javascript/controllers/index.js が見つかりません"
RUN echo "--- web/app/javascript/controllers/application.js (Stimulus) の内容 ---" && \
    cat app/javascript/controllers/application.js || echo "app/javascript/controllers/application.js が見つかりません"
RUN echo "--- web/package.json の scripts.build ---" && \
    cat package.json | grep '"build":'

COPY . .

RUN bundle exec bootsnap precompile app/ lib/

RUN yarn install --verbose # 詳細ログを出力
RUN echo "--- Contents of web/node_modules/@hotwired ---" && ls -la node_modules/@hotwired || echo "node_modules/@hotwired not found"
RUN echo "--- Contents of web/app/javascript/controllers ---" && ls -la app/javascript/controllers || echo "app/javascript/controllers not found"
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails_web /rails_web

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails /usr/local/bundle && \
    chown -R rails:rails /rails_web
USER 1000:1000

ENTRYPOINT ["/rails_web/bin/docker-entrypoint"]

EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
